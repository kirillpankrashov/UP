# Widget — SSP and CPMStar Creative Preparation

For the `YANDEX_FS`, `YANDEX_PF`, `YANDEX_TEXT`, and `CPMSTAR_BANNER` formats the widget doesn't just adapt the data received from the backend — it makes an additional request to an external ad service to fetch the actual ad content. This is handled by the `Preparer` class.

---

## Formats and Services

| Format | Service | Endpoint | What It Receives | Where It Writes |
|---|---|---|---|---|
| `YANDEX_FS` / `YANDEX_PF` | `SspMediaApi` | `POST /yandex/fs` | `vast_path`, `duration`, `pixel_impressions`, `ssp` | `attachments.video` |
| `YANDEX_TEXT` | `SspTextApi` | `POST /yandex/text` | SSP object with text and pixels | `attachments.unit` |
| `CPMSTAR_BANNER` | `CpmStarApi` | `POST /cpmstar/banner` | `payload` (path to creative), `duration`, `pixel_impressions` | `attachments.unit` |

---

## Request Parameters (`ISspStreamInfo`)

Each request sends an `ISspStreamInfo` object assembled from several sources:

| Parameter | Source | Description |
|---|---|---|
| stream data | `stream` from `AUTO_LAUNCH` | viewers count, category, language, etc. |
| `platform` | `widget.data.platform` | the streamer's platform |
| `allow_adult_content` | `widget.data.allowAdultContent` | whether 18+ content is allowed |
| `debug` | `widget.isDebug` | debug mode flag |
| `impression_slug` | `creative.impression_slug` | display identifier from the creative |
| `skip_token` | `Preparer.lastSspMediaCreativeId` | id of the previous SSP creative |

---

## skip_token — Deduplication

After each successful SSP/CPMStar response, `Preparer` stores the creative's `id` in `lastSspMediaCreativeId`. This `id` is passed in the next request as `skip_token` — so the service doesn't return the same creative twice in a row.

`lastSspMediaCreativeId` is reset to `null` every hour — so the same creative can reappear after a long gap.

---

## What Happens After Receiving a Response

### YANDEX_FS / YANDEX_PF

If the service returns a `vast_path`:

1. `attachments.video.path` = `vast_path` (VAST URL for the player)
2. `attachments.video.properties.duration` = `duration + 0.1` (small buffer)
3. `attachments.video.extend.ssp` = the SSP response object
4. `attachments.video.extend.pixel_impressions`, `metacount`, `rtbcount` — pixels and counters
5. `ad_set.advertiser.legal_name` — transformed (abbreviates legal entity names, translates `INN` → `ИНН`)

### YANDEX_TEXT

If the service returns an object:

1. `attachments.unit.extend.ssp` = the SSP object
2. `attachments.unit.extend.pixel_impressions`, `metacount`, `rtbcount` — pixels and counters

### CPMSTAR_BANNER

If the service returns a `payload`:

1. `attachments.unit.path` = `payload` (path to the creative)
2. `attachments.unit.properties.duration` = `duration`
3. `attachments.unit.extend.cpmStar` = the CPMStar response object
4. `attachments.unit.extend.pixel_impressions`, `metacount` — pixels and counters
5. `ad_set.advertiser.legal_name` — transformed the same way as Yandex

---

## Error Handling

- Empty response from the service (no `vast_path` / no `payload`) → creative is **discarded**
- Exception during request → creative is **discarded**, error is logged
- Discarded creatives do not enter the `CreativesLoop` queue

---

## Constraints

- `YANDEX_TEXT` and `CHATBOT_TEXT` are **not requested** at low frequency (5/10 min) — frequent displays don't make sense for text formats
- All SSP/CPMStar requests are executed **sequentially** (one after another) within a single `prepareCreatives()` call
