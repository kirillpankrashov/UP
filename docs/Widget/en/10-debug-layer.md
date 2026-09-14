# DebugLayer

`DebugLayer` is a debug overlay displayed on top of the widget. It is always mounted in `Widget.vue` but only shown when the `?debug_active` query parameter is present in the widget URL.

---

## Activation

```
https://platform.uplify.app/ads/v1/{slug}?debug_active=1
```

---

## Content

Updated every second via `setInterval`.

### Widget

| Field | Value |
|---|---|
| **Session UUID** | `session.uuid` — unique identifier of the current session |
| **Resolution** | `window.innerWidth × window.innerHeight` |
| **Link** | Current page `origin + pathname` |
| **Is manual** | `widget.isManual` — display mode |
| **Frequency** | `widget.frequency` in minutes — current interval between ad displays |
| **Initial frequency** | `widget.initialFrequency` in minutes — frequency at startup (before any possible reduction due to a creative with a lower frequency) |

### OBS

| Field | Value |
|---|---|
| **Plugin version** | `window.obsstudio.pluginVersion` |
| **Control Level** | `obsstudio.getControlLevel()` — OBS access level for the browser source |
| **Streaming status** | `obsstudio.getStatus().streaming` |
| **Recording status** | `obsstudio.getStatus().recording` |
| **User navigator** | Device type from `userAgent`: `desktop` / `tablet` / `mobile` |

### Requests

| Field | Value |
|---|---|
| **Brand Safety request in** | Time until the next BS request (`Xm Ys` format). Hidden if `nextCall` is not set |
| **Next ad request in** | Time until the next BA request |

### Queue

| Field | Value |
|---|---|
| **Display next creative in** | Time until the nearest scheduled display from the `CreativesLoop` queue |
| **Queue (JSON)** | Full queue list: `whenDisplay` (time as `HH:mm:ss`), `slug`, `impressionSlug`, `format`, `campaign`, `makeScreenshots` per creative |

---

## Notes

- `DebugLayer` renders **independently** of the widget state (no `chatBotConnected` or similar restrictions) — it is always visible when the parameter is present
- OBS status data is fetched via `window.obsstudio` — available only inside an OBS Browser Source
- `getUserDeviceType()` determines the device type from `navigator.userAgent` — inside OBS this will be the OBS CEF User Agent
