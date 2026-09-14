# Виджет — Подготовка SSP и CPMStar креативов

Для форматов `YANDEX_FS`, `YANDEX_PF`, `YANDEX_TEXT` и `CPMSTAR_BANNER` виджет не просто адаптирует данные, пришедшие от бекенда, а делает дополнительный запрос к внешнему рекламному сервису за актуальным контентом. Этим занимается класс `Preparer`.

---

## Форматы и сервисы

| Формат | Сервис | Эндпоинт | Что получает | Куда пишет |
|---|---|---|---|---|
| `YANDEX_FS` / `YANDEX_PF` | `SspMediaApi` | `POST /yandex/fs` | `vast_path`, `duration`, `pixel_impressions`, `ssp` | `attachments.video` |
| `YANDEX_TEXT` | `SspTextApi` | `POST /yandex/text` | SSP-объект с текстом и пикселями | `attachments.unit` |
| `CPMSTAR_BANNER` | `CpmStarApi` | `POST /cpmstar/banner` | `payload` (путь к креативу), `duration`, `pixel_impressions` | `attachments.unit` |

---

## Параметры запроса (`ISspStreamInfo`)

Каждый запрос передаёт объект `ISspStreamInfo`, собранный из нескольких источников:

| Параметр | Источник | Описание |
|---|---|---|
| данные стрима | `stream` из `AUTO_LAUNCH` | просмотры, категория, язык и т.д. |
| `platform` | `widget.data.platform` | платформа стримера |
| `allow_adult_content` | `widget.data.allowAdultContent` | разрешён ли контент 18+ |
| `debug` | `widget.isDebug` | режим отладки |
| `impression_slug` | `creative.impression_slug` | идентификатор показа из креатива |
| `skip_token` | `Preparer.lastSspMediaCreativeId` | id предыдущего SSP-креатива |

---

## skip_token — дедупликация

При каждом успешном получении SSP/CPMStar креатива `Preparer` сохраняет его `id` в `lastSspMediaCreativeId`. Этот `id` передаётся в следующем запросе как `skip_token` — чтобы сервис не вернул тот же самый креатив подряд.

`lastSspMediaCreativeId` сбрасывается в `null` раз в час — чтобы тот же креатив мог появиться снова после длительного перерыва.

---

## Что происходит после получения ответа

### YANDEX_FS / YANDEX_PF

Если сервис вернул `vast_path`:

1. `attachments.video.path` = `vast_path` (VAST URL для плеера)
2. `attachments.video.properties.duration` = `duration + 0.1` (небольшой буфер)
3. `attachments.video.extend.ssp` = объект SSP-ответа
4. `attachments.video.extend.pixel_impressions`, `metacount`, `rtbcount` — пиксели и счётчики
5. `ad_set.advertiser.legal_name` — трансформируется (сокращается «общество с ограниченной ответственностью» → «ООО», «INN» → «ИНН»)

### YANDEX_TEXT

Если сервис вернул объект:

1. `attachments.unit.extend.ssp` = SSP-объект
2. `attachments.unit.extend.pixel_impressions`, `metacount`, `rtbcount` — пиксели и счётчики

### CPMSTAR_BANNER

Если сервис вернул `payload`:

1. `attachments.unit.path` = `payload` (путь к креативу)
2. `attachments.unit.properties.duration` = `duration`
3. `attachments.unit.extend.cpmStar` = объект CPMStar-ответа
4. `attachments.unit.extend.pixel_impressions`, `metacount` — пиксели и счётчики
5. `ad_set.advertiser.legal_name` — трансформируется аналогично Yandex

---

## Обработка ошибок

- Пустой ответ от сервиса (нет `vast_path` / нет `payload`) → креатив **отбрасывается**
- Исключение при запросе → креатив **отбрасывается**, ошибка логируется
- Отброшенные креативы не попадают в очередь `CreativesLoop`

---

## Ограничения

- `YANDEX_TEXT` и `CHATBOT_TEXT` **не запрашиваются** при low frequency (5/10 мин) — слишком частые показы не имеют смысла для текстовых форматов
- Все запросы к SSP/CPMStar выполняются **последовательно** (один за другим) внутри одного `prepareCreatives()` вызова
