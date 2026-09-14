# ConversionAlert

A visual notification displayed on top of the widget when a conversion action is completed. Configured by the partner in the Brand Awareness ad set form: an animation (video file) and text with macros.

---

## Trigger

Arrives as a Pusher event on the widget's private channel. Contains the animation, text, and conversion data.

**Text macros:**
- `{{current_actions}}` — current conversion count
- `{{target_actions}}` — daily limit

---

## Display Logic

The notification is **not shown** if an ad is currently playing or another alert is already active — in that case the event is lost with no retry.

The video is preloaded before display. The notification hides when the video ends, or is forcibly dismissed after **10 seconds** in case the video fails to play.

---

## Priority

The notification does not interrupt an ad. If the event arrives during playback — it is ignored.
