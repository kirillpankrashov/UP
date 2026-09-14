# Widget — Overview

## What is the Widget

The Widget is a browser overlay for OBS (Browser Source) that displays ad creatives on top of a stream. It is opened via a unique URL like `{domain}/widget/{slug}` and runs as a regular web page inside OBS.

The widget works exclusively with **Brand Awareness** campaigns.

## Operating Modes

| Mode | `advertising.mode` | Description |
|---|---|---|
| Automatic | `auto` | The widget requests ads from the server on a schedule |
| Manual | `manual` | The server delivers ads, but playback only starts on the streamer's command — via the OBS Dock or the settings page in the streamer's dashboard |

## Architecture

`Widget.vue` creates a single instance of the `Widget(slug)` class, which owns all subsystems:

```
Widget
 ├── Session          — client identification (fingerprint, geo, device)
 ├── ObsWebSocket     — manages the OBS browser source
 ├── Pusher           — real-time channel (Laravel Echo + Pusher)
 ├── RequestLoop      — periodic server requests (Brand Safety + Brand Awareness)
 ├── CreativesLoop    — queue of scheduled ad displays
 ├── CreativesManager — active playback and creative switching
 ├── CreativeTimer    — playback timer (60fps)
 ├── Chatbot          — sends chat messages via backend (Nightbot)
 ├── Preparer         — enriches SSP/CPMStar creatives with external data
 ├── ConvertionAlert  — displays conversion notifications
 └── Screenshot       — triggers the screenshot capture service for ad displays
```

## Creative Formats

| Format | Component | Type |
|---|---|---|
| `FULLSCREEN` | `Fullscreen.vue` | Full-screen image/video |
| `PIP` | `Pip.vue` | Picture-in-picture |
| `CUSTOM` | `Custom.vue` | ZIP banner with custom markup |
| `YANDEX_FS` / `YANDEX_PF` | `YandexFS.vue` | SSP media ad (VAST video) |
| `YANDEX_TEXT` | `YandexText.vue` | SSP text block |
| `CHATBOT_TEXT` | `ChatbotText.vue` | Text delivered via chatbot |
| `CPMSTAR_BANNER` | `CpmStar.vue` | CPMStar HTML banner |

## UI Rendering Conditions

| Variable | Source |
|---|---|
| `chatBotConnected` | `widget.data.botEnabled` |
| `tooManySubscribers` | `pusher.subscribersCount > 1` |
| `resolutionCorrect` | `window.innerWidth >= 1200 && window.innerHeight >= 700` |

**Components:**

| Component | Display Condition |
|---|---|
| `<Creatives>` | `chatBotConnected && resolutionCorrect && !tooManySubscribers` |
| `<ConvertionAlert>` | same + `conversionAlert.isShowing` |

**Warnings (`<WarningMessage>`):**

| Message | Condition |
|---|---|
| "Too many subscribers" | `tooManySubscribers` |
| "Re-login required" | `widget.data.relogin` |
| "Chatbot disconnected" | `!chatBotConnected` |
| "Incorrect resolution" | `!resolutionCorrect` |

> If the same widget URL is open in more than one tab (`subscribersCount > 1`), ad playback is blocked and a warning is shown.

## Key Widget Settings (`IWidget`)

| Field | Type | Purpose |
|---|---|---|
| `advertising.mode` | `'auto' \| 'manual'` | Ad playback mode |
| `advertising.frequency` | `number` | Minimum display frequency (min) set by the streamer |
| `bsRequired` | `boolean` | Whether Brand Safety check is required before requesting ads |
| `botEnabled` | `boolean` | Whether the chatbot is connected |
| `adManualEnabled` | `boolean` | Whether manual playback is allowed (server-side flag) |
| `sspTextFrequency` | `1 \| 2 \| 3` | Yandex Text frequency (7/5/3.3 min) |
| `allowAdultContent` | `boolean` | Whether 18+ content is allowed for SSP |
| `obsWebSocket.port/pass` | `number \| null` | OBS WebSocket connection parameters |

## Frequency Map (`AdFrequencyMap`)

| Key | Value |
|---|---|
| `FIVE` | 5 min |
| `TEN` | 10 min |
| `FAST` | 15 min (default) |
| `ACCELERATED` | 20 min |
| `STANDARD` | 30 min |

`FIVE` and `TEN` are considered **low frequency** — `YANDEX_TEXT` and `CHATBOT_TEXT` formats are skipped at these frequencies, as is the Brand Safety check.
