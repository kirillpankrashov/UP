# Screenshot

The `Screenshot` class records ad impressions — it sends a request to the screenshot service after playback starts for each media creative (text formats are skipped).

---

## When it fires

A request is made in two scenarios:

1. **First hour of widget operation** — screenshots are automatically enabled for 1 hour after initialization
2. **`makeScreenshots` flag on the ad set** — the partner can force screenshots for a specific ad set regardless of the time window

The request is delayed by **8 seconds** after playback starts, to give OBS time to capture the display.

Demo displays and situations with multiple open widget tabs are not screenshotted.

---

## What is sent

The streamer's platform + impression identifiers: `impressionSlug` and `creative.slug`. For YouTube, `stream_info.id` is sent instead of the nickname.

On error — one retry after 45 seconds.
