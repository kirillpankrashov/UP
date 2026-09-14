# Text Formats

Two formats are classified as text: `YANDEX_TEXT` and `CHATBOT_TEXT`. Neither has a visual display — the ad is delivered as a message in the streamer's chat via the backend (Nightbot).

---

## Position in adSet

Order is determined by the server. Text formats typically come **after media creatives** in the same batch.

Example adSet: `[FULLSCREEN, YANDEX_TEXT, CHATBOT_TEXT]`

---

## Filtering

Both formats are not added to the queue when low frequency mode is active (`isLowFrequency`). `YANDEX_TEXT` is additionally skipped if the SSP Text API returns no result.

---

## Delays Before Sending

After media ad playback ends, the widget visually disappears while text formats continue processing in the background. A pause is held before each message is sent:

| Format | Delay |
|---|---|
| `YANDEX_TEXT` | 7 / 5 / 3.3 min (controlled by `sspTextFrequency`) |
| `CHATBOT_TEXT` | 5 min (fixed) |

In addition, sending accounts for the streamer's broadcast delay (`stream.delay`) — so the message appears in chat in sync with the ad on screen.

---

## Sending the Message

The message is not sent if multiple widget tabs are open (only one copy runs at a time).

`YANDEX_TEXT` includes data from the SSP response in the message: text, link, click pixels. For `CHATBOT_TEXT`, the message text is composed by the backend based on the `impressionSlug`.

On error — one retry after 45 seconds.

---

## Differences Between YANDEX_TEXT and CHATBOT_TEXT

| | `YANDEX_TEXT` | `CHATBOT_TEXT` |
|---|---|---|
| Delay | 7 / 5 / 3.3 min | 5 min |
| Impression pixels | yes | no |
| Message text | from SSP response | composed by backend |
| External request during preparation | SSP Text API | none |

---

## Timeline Example

`[FULLSCREEN (30 sec), YANDEX_TEXT, CHATBOT_TEXT]`, `sspTextFrequency = 2`

| Time | Event |
|---|---|
| t=0 | Intro 20 sec |
| t=+20 sec | FULLSCREEN playback |
| t=+50 sec | FULLSCREEN done, widget hidden |
| t=+50 sec | 5 min pause before YANDEX_TEXT |
| t=+5 min 50 sec | YANDEX_TEXT message sent to chat |
| t=+5 min 53 sec | 5 min pause before CHATBOT_TEXT |
| t=+10 min 53 sec | CHATBOT_TEXT message sent to chat |
| t=+10 min 56 sec | Batch complete |
