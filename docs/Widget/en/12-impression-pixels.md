# Impression Pixels

Pixels are tracking URLs for impressions and clicks configured by the partner at the creative level. The widget fires them at the moment the ad plays.

---

## Pixel Types

### Impression pixels (`creative.pixels.impressions`)

Standard impression pixels configured by the partner in the ad set. Used for formats: `FULLSCREEN`, `PIP`, `CUSTOM`, `CPMSTAR_BANNER`.

Fired on component mount: each URL is inserted into the DOM as an `<img width="1" height="1">`.

### SSP impression pixels (`extend.pixel_impressions`)

A separate set of pixels returned by the SSP or CPMStar API during creative preparation. Used for formats: `YANDEX_FS`, `YANDEX_PF`, `YANDEX_TEXT`, `CPMSTAR_BANNER`.

Fired the same way — 1×1 img tags on mount.

### Click pixels (`creative.pixels.clicks`)

The widget **does not fire click pixels directly**. They are passed in the chatbot SSP message (`pixel_clicks`) and processed by the backend when the user follows the link.

---

## URL Macros

Before insertion, pixels are processed — macros in the URL are replaced:

| Macro | Value |
|---|---|
| `{{viewers}}` | Number of stream viewers at the time of display (`viewersCount`) |
| `{{random}}` | Random 10-character string — to prevent caching |

---

## Insertion Mechanism

Each pixel is inserted as an `<img>` with a unique `id` into the component's DOM element. If a pixel with that `id` already exists — it is removed before re-insertion (protection against duplication when switching creatives).
