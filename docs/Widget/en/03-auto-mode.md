# Widget — Automatic Mode

Active when `widget.data.advertising.mode === 'auto'`.

In this mode the widget requests ads from the server on a schedule, receives creatives via Pusher, and displays them by timer.

---

## Cycle Overview

```
RequestLoop (every 15 min)
  └── POST ads/widget/{slug}/auto
        └── Server → Pusher AUTO_LAUNCH
              └── Preparer → creative preparation, SSP/CPMStar enrichment
                    └── CreativesLoop.addAd()  ← writes to queue
                          └── CreativesLoop.check() (every 5s)
                                └── CreativesManager.displayAd()
                                      └── playIntro → playCreatives → nextCreative → switchCreative
```

---

## RequestLoop — Server Request Cycle

Starts **10 minutes** after widget load. Ticks every second, checking the cooldown for each request type.

### Conditions to skip the entire cycle

- Window resolution below `1200×700`
- `pusher.subscribersCount > 1` (duplicate tab open)
- `creativesLoop.queue.length > 10` (queue is full)

### 1. Brand Safety

```
GET ads/brand-safety/{slug}/visual
→ isSafe = response.status
```

**Skipped if:**

- `widget.data.bsRequired === false`
- Ad frequency is `FIVE` (5 min) or `TEN` (10 min)

Cooldown: **15 min**. First run — immediately on `requestLoop.init()`.

If the request fails — `isSafe = false`.

### 2. Ad Request

```
POST ads/widget/{slug}/auto
Body: { width: window.innerWidth, height: window.innerHeight }
```

**Skipped if:**

- `bsRequired === true && isSafe === false`

Cooldown: **15 min** (first fires 5 min after BS check, i.e. ~10 min from startup).

The server **does not return data in the response**. Instead it sends `AUTO_LAUNCH` via Pusher.

On receiving `AUTO_LAUNCH` — the Brand Awareness timer is reset (`resetNextCall`) so the next request fires exactly 15 min from this point.

---

## Preparer — Creative Preparation

`AUTO_LAUNCH` carries `{ items: ICreativeResponse[], stream: IStreamInfo }`.

`Preparer` processes each incoming `ICreativeResponse` and turns it into a display-ready `ICreative`. For `FULLSCREEN`, `PIP`, `CUSTOM`, and `CHATBOT_TEXT` formats this is a straightforward data adaptation. For SSP and CPMStar formats an additional request is made to an external service to fetch the actual ad content (see [05-ssp-creatives.md](./05-ssp-creatives.md) for details).

### findLowestFrequency

Before processing, analyzes the frequencies of all creatives in the batch. If the minimum found frequency is lower than the current `widget.frequency` **and** not lower than the streamer's configured minimum — it lowers `widget.frequency`. This speeds up the next RequestLoop cycle.

### Processing by Format

| Format | External Request | Where It Writes |
|---|---|---|
| `YANDEX_FS` / `YANDEX_PF` | `POST {SspMediaApi}/yandex/fs` | `attachments.video` |
| `YANDEX_TEXT` | `POST {SspTextApi}/yandex/text` | `attachments.unit` |
| `CPMSTAR_BANNER` | `POST {CpmStarApi}/cpmstar/banner` | `attachments.unit` |
| `CHATBOT_TEXT` | — | adapted directly |
| `FULLSCREEN`, `PIP`, `CUSTOM` | — | adapted directly |

`YANDEX_TEXT` and `CHATBOT_TEXT` are **skipped** at low frequency (5/10 min). If the external service returns an empty response or an error — the creative is **discarded**.

All prepared creatives → `creativesLoop.addAd(resolvedCreatives)`.

---

## CreativesLoop — Queue and Scheduler

### Queue Structure

```ts
queue: Array<{
  adSet: ICreative[],
  whenDisplay: number  // display timestamp
}>
```

### addAd() in auto mode

- Queue is empty → `whenDisplay = now`
- Queue is not empty → `whenDisplay = lastItem.whenDisplay + 15 min`

Displays are evenly distributed 15 min apart.

### check() — every 5 seconds

Skips if: `isPreloading || isPlaying || isIntro`

If a new `AUTO_LAUNCH` arrives during playback — `addAd()` appends the batch to the queue, but `check()` won't touch it until the current display finishes. Playback is never interrupted.

Priority:

1. If `demo.length > 0` → immediately runs `startDemo()`
2. Otherwise, if `queue[0].whenDisplay < now - 1 min` → `startAd()`

> Preloading starts **1 minute** before the scheduled display time.

### startAd()

1. `queue.shift()` — extracts the first item
2. `creativesManager.preload(adSet)` — media preloading (blocking)
3. `creativesManager.displayAd(preloaded, whenDisplay)`

---

## Media Preloading

For each creative in adSet:

- `YANDEX_TEXT`, `CHATBOT_TEXT`, external formats — skipped (nothing to load)
- No attachments at all — warning + skip
- Otherwise: `tryPreloadImage()` + `tryPreloadVideo()` + `tryPreloadUnit()`
- ZIP — no preloading needed
- Preload failure → creative is skipped with a warning

---

## Playback

### displayAd(adSet, whenDisplay)

```
whenDisplay > 0:
  waits via setInterval(1s) until now >= whenDisplay
  → playIntro(20s, firstCreative)
  → playCreatives(adSet)
```

Intro is skipped for `YANDEX_TEXT` and `CHATBOT_TEXT`.

### playCreatives(adSet)

1. `isPlaying = true`
2. `timer.reset(totalDuration)` — total adSet duration
3. `nextCreative()`

### nextCreative()

Increments the index. If index === adSet.length → `finish()`.

Otherwise — depending on format:

| Format | Behavior before switchCreative |
|---|---|
| `YANDEX_FS` / `YANDEX_PF` | Resets creative to `null` → `isUpdating = true` → waits 100ms → `isUpdating = false` (Vue remounts the component) |
| `YANDEX_TEXT` | Waits delay (7/5/3.3 min based on `sspTextFrequency`), then `switchCreative` |
| `CHATBOT_TEXT` | Waits 5 min, then `switchCreative` |
| Everything else | `switchCreative` immediately |

### switchCreative(creative)

1. `screenshot.makeScreenshot(creative)` — for non-text formats
2. `setCreative(creative)` → Vue renders the appropriate component
3. `chatbot.sendMessage(creative)` → sends a message to chat
4. For text formats: returns early (no timer needed)
5. For images and ZIP (no `duration`): `timer.play(15s)` → `onPlayEnd()`
6. For video/unit: waits for `@end-time` from the component

### finish()

1. GA `ecommerce:send`
2. Reset: `isPlaying = false`, `isIntro = false`, `creative = null`, `timer.reset()`
3. If `widget.frequency` changed during playback (Preparer lowered it) → `restartWithNewFrequency()`:
   - Stops and restarts RequestLoop with the new cooldown

---

## Screenshots

- Active for **1 hour** after `screenshot.enable()`, or always if `creative.adSet.makeScreenshots = true`
- **8-second** delay from the moment of `switchCreative`
- Skipped for: Demo creatives, `subscribersCount > 1`
- `POST {ScreenshotApi}/{platform}` with platform-specific payload:

| Platform | Payload |
|---|---|
| Twitch, Trovo, VK Play | `{ nickname, ad, impression }` |
| YouTube | `{ slug (streamId), ad, impression }` |

- 1 retry after 45 seconds on failure

---

## Cycle Timeline

```
t=0         Widget loaded, CreativesLoop started (5s tick)

t=+5 min    RequestLoop: first BS check
            GET ads/brand-safety/{slug}/visual

t=+10 min   RequestLoop: first ad request
            POST ads/widget/{slug}/auto
            ← AUTO_LAUNCH (Pusher)
            ← Preparer: SSP/CPMStar API requests
            ← CreativesLoop.addAd(creatives) → whenDisplay = now

t=now-1min  CreativesLoop: starts preloading

t=whenDisplay
            displayAd: waits for exact moment
            playIntro(20s)
            playCreatives → nextCreative → switchCreative
            Playback duration:
              image → 15s
              video/unit → by file duration
            finish() → state reset

t=+25 min   Scheduled BS check (nextCall expired)

t=+30 min   SECOND ad request (first was at t+15, cooldown 15 min)
            POST ads/widget/{slug}/auto
            ← AUTO_LAUNCH → Preparer → CreativesLoop.addAd
            whenDisplay = previous whenDisplay + 15 min
```

---

## Constants

| Constant | Value | Purpose |
|---|---|---|
| `REQUEST_LOOP_TICK` | 1s | RequestLoop check tick |
| `REQUEST_INTERVAL` | 15 min | Cooldown between ad requests |
| `CREATIVES_LOOP_TICK` | 5s | Queue check tick |
| `PRIMAL_TIMER_TIMEOUT` | 10 min | Delay before RequestLoop starts |
| `BS_CHECK_BEFORE_REQUEST` | 5 min | BS fires before Brand Awareness |
| `TIME_BEFORE_PRELOAD` | 1 min | Preload starts before display time |
| `CHATBOT_TEXT_DELAY` | 5 min | Delay before CHATBOT_TEXT |
| `YandexTextDelay.ONE/TWO/THREE` | 7/5/3.3 min | Yandex Text delays |
| `SCREENSHOT_TIMEOUT` | 1 hour | Screenshot active window |
| `SCREENSHOT_DELAY` | 8s | Delay after creative switch |
