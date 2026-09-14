# Компоненты креативов

Файл: `src/modules/Widget/sections/Creatives/Creatives.vue`

`Creatives.vue` — точка входа. Подписывается на `creativesManager.creative` и динамически выбирает компонент по `adSet.format`:

| Формат | Компонент |
|---|---|
| `FULLSCREEN` | `Fullscreen.vue` |
| `PIP` | `Pip.vue` |
| `CUSTOM` | `Custom.vue` |
| `YANDEX_FS` | `YandexFS.vue` |
| `YANDEX_PF` | `YandexFS.vue` |
| `YANDEX_TEXT` | `YandexText.vue` |
| `CHATBOT_TEXT` | `ChatbotText.vue` |
| `CPMSTAR_BANNER` | `CpmStar.vue` |

Все компоненты оборачиваются в `Wrapper.vue` и получают пропсы `creative` и `widget`. Каждый компонент эмитирует три события: `start-time`, `update-current-time(delta)`, `end-time`.

---

## Компоненты форматов

### Fullscreen

**Файл:** `sections/Fullscreen/Fullscreen.vue`  
**Формат:** `FULLSCREEN`

Полноэкранное видео (mp4 / webm). Воспроизводится через `<video autoplay>`. Использует хук `useInterval` — тик каждые ~33 мс (30 fps), отслеживает `currentTime >= duration` и эмитирует `end-time`. Фаерит impression-пиксели из `creative.pixels.impressions`.

Если вложение не является mp4 или webm, сразу эмитирует `end-time`.

---

### Pip

**Файл:** `sections/Pip/Pip.vue`  
**Формат:** `PIP`

Видео в углу экрана (440×240 px, на широких экранах 550×310 px). Поддерживает три позиции через `widget.advertising.position`:

| Значение | Расположение |
|---|---|
| по умолчанию | правый верхний угол |
| `LEFT_TOP_CORNER` | левый верхний угол |
| `RIGHT_BOTTOM_CORNER` | правый нижний угол |

Логика таймера и пикселей идентична `Fullscreen`.

---

### Custom (ZIP)

**Файл:** `sections/Custom/Custom.vue`  
**Формат:** `CUSTOM`

Полноэкранный HTML-баннер из ZIP-архива, отображается через `<iframe>`. Длительность — **15 секунд** (задаётся в `CreativeTimer` через `get-creative-duration.ts`).

Через 800 мс после монтирования отправляет `postMessage` в iframe:

```json
{
  "call": "sendValue",
  "data": {
    "username": "...",
    "signedUp": true,
    "lang": "ru",
    "title": "название стрима"
  }
}
```

Фаерит impression-пиксели.

---

### YandexFS

**Файл:** `sections/YandexFS/YandexFS.vue`  
**Форматы:** `YANDEX_FS`, `YANDEX_PF`

VAST-видеоплеер на базе `video.js` + плагин `vastClient`. Получает `.xml` файл из `creative.attachments.video.path`, запрашивает его через `axios` и передаёт в плеер.

Фаерит дополнительные пиксели из `extend`:

| Пиксель | Задержка |
|---|---|
| `metacount` | сразу при монтировании |
| `rtbcount` | +2 сек |
| `pixel_impressions[]` | сразу |

Завершает воспроизведение по событиям плеера `vast.adEnd`, `vast.adError`, `vast.adsCancel`, `vast.contentEnd`, а также по fallback-таймауту **15.5 сек**.

Оба формата (`YANDEX_FS` и `YANDEX_PF`) отображаются в PIP-размере (440×248 px) в углу — позиция управляется `widget.advertising.position`.

---

### YandexText

**Файл:** `sections/YandexText/YandexText.vue`  
**Формат:** `YANDEX_TEXT`

Невидимый компонент (пустой `div`). Визуального отображения нет — реклама доставляется через `Chatbot` (сообщение в чат). Фаерит пиксели (`metacount`, `rtbcount`, `pixel_impressions`), эмитирует `end-time` через **3 секунды**.

---

### ChatbotText

**Файл:** `sections/ChatbotText/ChatbotText.vue`  
**Формат:** `CHATBOT_TEXT`

Полностью невидимый компонент. Не рендерит ничего и не фаерит пикселей. Реклама — только текстовое сообщение, отправленное `Chatbot`-классом в стримерский чат через бекенд. Эмитирует `end-time` через **3 секунды**.

---

### CpmStar

**Файл:** `sections/CpmStar/CpmStar.vue`  
**Формат:** `CPMSTAR_BANNER`

HTML-баннер 728×90 px, полученный из `creative.attachments.unit.extend.cpmStar.payload` (путь к креативу). Рендерит баннер через `v-html` внутри одного из двух wrapper-компонентов, выбираемых случайно:

| Компонент | Описание |
|---|---|
| `Flash.vue` | Тёмный брендированный фон, intro/outro анимация (по 2 сек), баннер показывается 11 сек |
| `Clouds.vue` | Светлый фон с облаками, intro 4 сек / outro 5 сек, баннер показывается 6 сек |

Общая длительность обоих вариантов — **15 секунд**. Фаерит impression-пиксели.

---

## Вспомогательные компоненты (Wrapper)

Все форматы оборачиваются в `Wrapper.vue`, который управляет общими элементами UI.

### Wrapper

**Файл:** `sections/Wrapper/Wrapper.vue`

Контейнер для любого creative-компонента. Отображается пока `creativesManager.showWrapper` равен `true`. Содержит:

- `AdvertState` — оверлей статуса
- `Loader` — прогресс-бар
- `QrCode` — QR-код (если есть в креативе)

Добавляет чёрный фон для `FULLSCREEN` mp4-сетов с несколькими креативами (чтобы скрыть переход между роликами).

Скрывает `AdvertState` и `Loader` после показа всех медиа-креативов (не считая `YANDEX_TEXT` и `CHATBOT_TEXT`).

---

### AdvertState

**Файл:** `sections/Wrapper/sections/AdvertState/AdvertState.vue`

Оверлей в левом нижнем углу. Два состояния:

| Состояние | Фон | Текст |
|---|---|---|
| Интро (ожидание) | жёлтый `#FFC600` | `Реклама для поддержки {streamer} • начнётся через X` |
| Воспроизведение | тёмный полупрозрачный | `Реклама для поддержки {streamer} • 1 из 3 • 0:15` |

Для форматов `YANDEX_FS` и `YANDEX_PF` также выводит `advertiser.legalName` (ERID). Для `FULLSCREEN`, `PIP`, `CUSTOM` — строку `ERID {erid}, Реклама, {legalName}, ИНН {tin}` (если есть в `extend.legal_compliance`).

---

### Loader

**Файл:** `sections/Wrapper/sections/Loader/Loader.vue`

Жёлтая прогресс-полоска у нижнего края. Ширина = `timer.current / timer.total * 100%`. Таймер управляется `CreativeTimer` в `CreativesManager`.

---

### QrCode

**Файл:** `sections/Wrapper/sections/QrCode/QrCode.vue`

Отображается, если `creative.qr.code` и `creative.qr.link` заполнены. Использует библиотеку `vue-qr`. Размер рассчитывается как `ширина_экрана / 9.5`. По умолчанию — правый нижний угол; для PIP с `RIGHT_BOTTOM_CORNER` и Leaderboard с позицией `top` — переносится в правый верхний.
