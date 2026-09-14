# Widget — Manual Mode

Active when `widget.data.advertising.mode === 'manual'`.

In this mode the widget receives ad creatives from the server automatically (same as auto mode), but **does not play them on its own**. Playback only starts on an explicit command from the streamer.

---

## Differences from Automatic Mode

| | Auto | Manual |
|---|---|---|
| BS / Brand Awareness requests | ✅ active | ✅ active (same) |
| SSP/CPMStar enrichment | ✅ | ✅ |
| Adding to queue | ✅ | ✅ (replaces, not appends) |
| Automatic playback from queue | ✅ | ❌ |
| Playback on streamer's command | ❌ | ✅ |

---

## How the Queue Works in Manual Mode

`CreativesLoop.addAd()` behaves differently:

```ts
// Auto mode:
queue.push({ whenDisplay: lastItem.whenDisplay + 15min, adSet })

// Manual mode:
queue = [{ whenDisplay: new Date().getTime(), adSet }]
```

In manual mode the queue always holds **exactly one item** — the latest batch received from the server. `whenDisplay` is set to `now` at the time `AUTO_LAUNCH` arrives.

Each new `AUTO_LAUNCH` **overwrites** the previous queue item. Accumulation is impossible: if the streamer hasn't clicked the button for a long time, all intermediate batches have been overwritten, and the next click will play only the most recent ad.

If `AUTO_LAUNCH` arrives while an ad is actively playing — the queue is overwritten, but the current playback is not interrupted. `check()` is blocked by the `isPlaying` flag and won't touch the new batch until the display finishes.

---

## Why Auto-Play Doesn't Trigger

In `CreativesLoop.check()`:

```ts
else if (this.queue.length && !this.widget.isManual) {
  // auto-play — only when !isManual
}
```

In manual mode this branch is skipped. The item sits in the queue waiting for a command.

---

## How the Streamer Triggers Playback

### Step 1. Streamer clicks "Run Ad"

In `Streamer → Settings → AdvertSettings → ManualPlayback`:

```
GET ads/widget/manual
```

The button is active only when `widget.adManualEnabled === true` (a server-side flag indicating a ready batch is available).

### Step 2. Server sends a Pusher event

```
PusherEventName.MANUAL_LAUNCH → .manual.launch
```

### Step 3. Widget starts playback

```ts
.listen(PusherEventName.MANUAL_LAUNCH, async () => {
  await this.widget.creativesLoop.startAd()
})
```

`startAd()` takes the item from the queue (which was placed there after the last `AUTO_LAUNCH`) and starts playback.

---

## What Happens During Playback

Playback is identical to automatic mode:

1. `preload(adSet)` — media preloading
2. `displayAd(preloaded, whenDisplay)`:
   - `whenDisplay = now` (was set at `AUTO_LAUNCH` time) → no waiting, playback starts immediately
   - `playIntro(20s)` — intro animation (except `YANDEX_TEXT` / `CHATBOT_TEXT`)
   - `playCreatives(adSet)` → `nextCreative` → `switchCreative`

> If time has passed between `AUTO_LAUNCH` and the button click — playback still starts immediately, without any extra waiting, because `whenDisplay` is already in the past.

---

## Manual Cycle Timeline

```
t=0         Widget loaded, initialization (same as auto mode)

t=+10 min   RequestLoop: POST ads/widget/{slug}/auto
            ← AUTO_LAUNCH (Pusher)
            ← Preparer: SSP/CPMStar enrichment
            ← CreativesLoop.addAd() → queue = [{ whenDisplay: now, adSet }]
            (playback does NOT start automatically)

            adManualEnabled = true — button in UI becomes active

t=X         Streamer clicks "Run Ad"
            → GET ads/widget/manual
            ← MANUAL_LAUNCH (Pusher)
            → creativesLoop.startAd()
            → preload → displayAd → playIntro(20s) → playCreatives

t=+30 min   Next AUTO_LAUNCH (15 min after the first BA request,
            regardless of when the streamer clicked the button)
            → queue is updated, new adSet is ready for the next trigger
```

---

## Button State

| State | `adManualEnabled` | `manual.sending` | `manual.success` |
|---|---|---|---|
| Active, waiting | `true` | `false` | `false` |
| Request in flight | `true` | `true` | `false` |
| Sent successfully (1.5s) | `true` | `false` | `true` |
| Button disabled | `false` | — | — |

The `ADS_ERRORS_DISABLE` error on send is silently ignored (no ready ad available).

---

## Differences in finish()

At the end of playback:

```ts
if (this.widget.initialFrequency !== this.widget.frequency && !this.widget.isManual) {
  this.widget.restartWithNewFrequency(this.widget.frequency)
}
```

In manual mode **RequestLoop is not restarted when frequency changes**. Frequency has no practical effect in manual mode since displays are not automatic.
