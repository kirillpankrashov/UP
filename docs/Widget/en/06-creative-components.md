# Creative Components

File: `src/modules/Widget/sections/Creatives/Creatives.vue`

`Creatives.vue` is the entry point. It subscribes to `creativesManager.creative` and dynamically selects a component based on `adSet.format`:

| Format | Component |
|---|---|
| `FULLSCREEN` | `Fullscreen.vue` |
| `PIP` | `Pip.vue` |
| `CUSTOM` | `Custom.vue` |
| `YANDEX_FS` | `YandexFS.vue` |
| `YANDEX_PF` | `YandexFS.vue` |
| `YANDEX_TEXT` | `YandexText.vue` |
| `CHATBOT_TEXT` | `ChatbotText.vue` |
| `CPMSTAR_BANNER` | `CpmStar.vue` |

All components are wrapped in `Wrapper.vue` and receive `creative` and `widget` props. Each component emits three events: `start-time`, `update-current-time(delta)`, `end-time`.

---

## Format Components

### Fullscreen

**File:** `sections/Fullscreen/Fullscreen.vue`  
**Format:** `FULLSCREEN`

Full-screen video (mp4 / webm). Played via `<video autoplay>`. Uses the `useInterval` hook — tick every ~33 ms (30 fps), watches `currentTime >= duration` and emits `end-time`. Fires impression pixels from `creative.pixels.impressions`.

If the attachment is not mp4 or webm, `end-time` is emitted immediately.

---

### Pip

**File:** `sections/Pip/Pip.vue`  
**Format:** `PIP`

Corner video (440×240 px, 550×310 px on wide screens). Supports three positions via `widget.advertising.position`:

| Value | Position |
|---|---|
| default | top-right corner |
| `LEFT_TOP_CORNER` | top-left corner |
| `RIGHT_BOTTOM_CORNER` | bottom-right corner |

Timer and pixel logic is identical to `Fullscreen`.

---

### Custom (ZIP)

**File:** `sections/Custom/Custom.vue`  
**Format:** `CUSTOM`

Full-screen HTML banner from a ZIP archive, displayed via `<iframe>`. Duration — **15 seconds** (set in `CreativeTimer` via `get-creative-duration.ts`).

800 ms after mounting, sends a `postMessage` to the iframe:

```json
{
  "call": "sendValue",
  "data": {
    "username": "...",
    "signedUp": true,
    "lang": "en",
    "title": "stream title"
  }
}
```

Fires impression pixels.

---

### YandexFS

**File:** `sections/YandexFS/YandexFS.vue`  
**Formats:** `YANDEX_FS`, `YANDEX_PF`

VAST video player built on `video.js` + `vastClient` plugin. Fetches the `.xml` file from `creative.attachments.video.path` via `axios` and passes it to the player.

Fires additional pixels from `extend`:

| Pixel | Delay |
|---|---|
| `metacount` | immediately on mount |
| `rtbcount` | +2 sec |
| `pixel_impressions[]` | immediately |

Playback ends on player events `vast.adEnd`, `vast.adError`, `vast.adsCancel`, `vast.contentEnd`, and on a fallback timeout of **15.5 sec**.

Both formats (`YANDEX_FS` and `YANDEX_PF`) are rendered at PIP size (440×248 px) in a corner — position is controlled by `widget.advertising.position`.

---

### YandexText

**File:** `sections/YandexText/YandexText.vue`  
**Format:** `YANDEX_TEXT`

An invisible component (empty `div`). No visual output — the ad is delivered via `Chatbot` (a message sent to stream chat). Fires pixels (`metacount`, `rtbcount`, `pixel_impressions`), emits `end-time` after **3 seconds**.

---

### ChatbotText

**File:** `sections/ChatbotText/ChatbotText.vue`  
**Format:** `CHATBOT_TEXT`

Completely invisible component. Renders nothing and fires no pixels. The ad is a text message sent by the `Chatbot` class to the streamer's chat via the backend. Emits `end-time` after **3 seconds**.

---

### CpmStar

**File:** `sections/CpmStar/CpmStar.vue`  
**Format:** `CPMSTAR_BANNER`

An HTML banner 728×90 px obtained from `creative.attachments.unit.extend.cpmStar.payload` (path to creative). Renders the banner via `v-html` inside one of two wrapper components chosen at random:

| Component | Description |
|---|---|
| `Flash.vue` | Dark branded background, intro/outro animations (2 sec each), banner visible for 11 sec |
| `Clouds.vue` | Light background with clouds, intro 4 sec / outro 5 sec, banner visible for 6 sec |

Total duration for both variants is **15 seconds**. Fires impression pixels.

---

## Shared Components (Wrapper)

All formats are wrapped in `Wrapper.vue`, which manages shared UI elements.

### Wrapper

**File:** `sections/Wrapper/Wrapper.vue`

Container for any creative component. Shown while `creativesManager.showWrapper` is `true`. Contains:

- `AdvertState` — status overlay
- `Loader` — progress bar
- `QrCode` — QR code (if present in the creative)

Adds a black background for `FULLSCREEN` mp4 sets with multiple creatives (to hide transitions between videos).

Hides `AdvertState` and `Loader` after all media creatives have played (excluding `YANDEX_TEXT` and `CHATBOT_TEXT`).

---

### AdvertState

**File:** `sections/Wrapper/sections/AdvertState/AdvertState.vue`

Overlay in the bottom-left corner. Two states:

| State | Background | Text |
|---|---|---|
| Intro (waiting) | yellow `#FFC600` | `Ad for {streamer} • will start in X` |
| Playing | dark semi-transparent | `Ad for {streamer} • 1 of 3 • 0:15` |

For `YANDEX_FS` and `YANDEX_PF` formats, also displays `advertiser.legalName` (ERID). For `FULLSCREEN`, `PIP`, `CUSTOM` — renders the string `ERID {erid}, Ad, {legalName}, TIN {tin}` (if present in `extend.legal_compliance`).

---

### Loader

**File:** `sections/Wrapper/sections/Loader/Loader.vue`

A yellow progress bar at the bottom edge. Width = `timer.current / timer.total * 100%`. Timer is driven by `CreativeTimer` inside `CreativesManager`.

---

### QrCode

**File:** `sections/Wrapper/sections/QrCode/QrCode.vue`

Shown when `creative.qr.code` and `creative.qr.link` are populated. Uses the `vue-qr` library. Size is calculated as `screen_width / 9.5`. Default position — bottom-right corner; for PIP with `RIGHT_BOTTOM_CORNER` and Leaderboard with `top` position — moves to the top-right.
