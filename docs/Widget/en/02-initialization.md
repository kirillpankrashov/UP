# Widget — Initialization

## Launch Sequence (`Widget.init()`)

```
1.  disableStuff()          — shuts down Beamer and Intercom
2.  setIsDebug()            — enables debug mode if ?debug is in the URL
3.  activateWidget()        → GET streamer/widget/{slug}/enable
4.  fetchWidget()           → GET ads/widget/{slug} → widget.data
5.  obsWebSocket.init()     — connects to OBS WebSocket
6.  if streamer deactivated → return  (further startup is aborted)
7.  pusher.init()           — subscribes to Pusher channels
8.  isLoaded = true         — Vue renders the UI
9.  creativesLoop.init()    — starts queue check interval (every 5s)
10. wait(5 min)             — pause before RequestLoop starts
11. requestLoop.init()      — starts the ad request cycle
12. screenshot.enable()     — enables screenshot submissions for 1 hour
```

> After step 8 the UI is visible in OBS, but there are no ads yet — the first request fires ~10 minutes in (5 min pause + 5 min between BS check and Brand Awareness).

---

## Step 3. Widget Activation

```
GET streamer/widget/{slug}/enable
```

Registers the widget as active on the server. On 404 — throws with "Incorrect widget slug". On other errors — retries after 10 seconds.

---

## Step 4. Widget Data Fetch

```
GET ads/widget/{slug}
```

Returns the full `IWidget` object: ad settings, streamer data, platform, OBS WebSocket parameters, `botEnabled`, `bsRequired`, `relogin` flags, etc. Stored in the reactive `widget.data`.

After loading, the locale is set: `streamer.locale` → `VITE_APP_DEFAULT_LOCALE` → `en`.

---

## Step 5. Session — Client Identification

Starts immediately when `Widget` is created, running in parallel with the rest of initialization.

Collects three things:

| Source | Data |
|---|---|
| `FingerprintJS` | `visitorId` — unique browser identifier |
| `geojs.io/v1/ip/geo.json` | IP, city, country |
| `DeviceDetector` (user-agent) | OS, browser, device type and model |

Generates a session UUID (`uuidv4`). All data is sent over the Pusher channel on connect (`SESSION_INIT` whisper) — used in the debugger to identify open widget tabs.

---

## Step 6. OBS WebSocket

Runs **before** Pusher. Only active if `obsstudio` is present in `window` (i.e. the page is open inside OBS) and `obsWebSocket.port` is set in widget settings.

### Connection

```
ws://localhost:{port}  +  password (obsWebSocket.pass)
```

Subscribes to all OBS events including `SceneItemTransformChanged`.

### Finding the Browser Source

1. Gets the list of all OBS inputs of type `browser_source`
2. Finds the one whose `url` starts with `widget.data.url`
3. Iterates all scenes, finds the `sceneItemId` for that source

### Layer Setup (`setupWidget`)

Applies default browser source settings:

| Parameter | Value |
|---|---|
| Size | 1920 × 1080 |
| Position | (0, 0) |
| FPS | 60 (custom) |
| `reroute_audio` | true |
| `restart_when_active` | true |
| `shutdown` | true |
| `webpage_control_level` | 5 |

Scale is calculated as `videoBaseWidth / 1920` and `videoBaseHeight / 1080` to correctly fit the OBS canvas resolution.

The source is raised to the top position in the scene (`SetSceneItemIndex`).

### Event Listeners

After setup, OBS WebSocket subscribes to changes:
- `SceneItemTransformChanged`
- `InputSettingsChanged`
- `InputNameChanged`

On each change (debounced 3s), current settings are sent to the Pusher channel — for display in the debugger.

---

## Step 7. Pusher — Channel Subscription

Creates two channels for `uplify.ads.{slug}`:

### Public Channel

Listens for `subscription_count` — updates `subscribersCount`. If > 1, the widget blocks ad playback.

### Private Channel

On successful subscription (`SUBSCRIPTION_SUCCEEDED`) — whispers `SESSION_INIT` with session data.

Full list of handled events:

| Event | Action |
|---|---|
| `WIDGET_UPDATED` | Updates `widget.data` via adapter |
| `WIDGET_REFRESH` | `window.location.reload()` |
| `AUTO_LAUNCH` | Prepares and queues an automatic display |
| `MANUAL_LAUNCH` | Immediately calls `creativesLoop.startAd()` |
| `DEMO_LAUNCH` | Adds a demo to the priority queue |
| `DEMO_REAL_LAUNCH` | Same, with real creatives |
| `CHATBOT_DISCONNECT` | Sets `botEnabled = false` |
| `CONVERTION_ALERT` | Shows conversion notification |

### Versioning

Every Pusher event carries a `version`. On mismatch:
- First time: stores the version
- Subsequent mismatches: `window.location.reload()`

---

## Resolution Check

The widget subscribes to `load` and `resize` events and checks:

```
window.innerWidth >= 1200 && window.innerHeight >= 700
```

If the resolution doesn't match — `<Creatives>` is not rendered and a warning is shown.
