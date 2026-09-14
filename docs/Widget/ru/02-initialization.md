# Виджет — Инициализация

## Последовательность запуска (`Widget.init()`)

```
1.  disableStuff()          — отключает Beamer и Intercom
2.  setIsDebug()            — включает debug-режим если в URL есть ?debug
3.  activateWidget()        → GET streamer/widget/{slug}/enable
4.  fetchWidget()           → GET ads/widget/{slug} → widget.data
5.  obsWebSocket.init()     — подключение к OBS WebSocket
6.  if streamer deactivated → return  (дальнейший запуск прерывается)
7.  pusher.init()           — подписка на Pusher-каналы
8.  isLoaded = true         — Vue рендерит UI
9.  creativesLoop.init()    — интервал проверки очереди (каждые 5с)
10. wait(5 мин)             — пауза перед стартом RequestLoop
11. requestLoop.init()      — запускает цикл запросов рекламы
12. screenshot.enable()     — включает отправку скриншотов на 1 час
```

> После шага 8 UI уже виден в OBS, но рекламы ещё нет — первый запрос уйдёт через ~10 минут (5 мин паузы + 5 мин до Brand Awareness после BS-чека).

---

## Шаг 3. Активация виджета

```
GET streamer/widget/{slug}/enable
```

Регистрирует виджет как активный на сервере. При ошибке 404 — бросает исключение с сообщением об неверном slug. При других ошибках — повторяет запрос через 10 секунд.

---

## Шаг 4. Загрузка данных виджета

```
GET ads/widget/{slug}
```

Возвращает полный объект `IWidget`: настройки рекламы, данные стримера, платформу, OBS WebSocket параметры, флаги `botEnabled`, `bsRequired`, `relogin` и т.д. Сохраняется в реактивный `widget.data`.

После загрузки выставляется локаль: берётся `streamer.locale`, затем `VITE_APP_DEFAULT_LOCALE`, затем `en`.

---

## Шаг 5. Session — идентификация клиента

Запускается немедленно при создании `Widget`, параллельно с инициализацией.

Собирает три вещи:

| Источник | Данные |
|---|---|
| `FingerprintJS` | `visitorId` — уникальный идентификатор браузера |
| `geojs.io/v1/ip/geo.json` | IP, город, страна |
| `DeviceDetector` (user-agent) | OS, браузер, тип и модель устройства |

Генерирует UUID сессии (`uuidv4`). Все данные отправляются в Pusher-канал при подключении (`SESSION_INIT` whisper) — используются в дебаггере для идентификации открытых вкладок.

---

## Шаг 6. OBS WebSocket

Запускается **до** Pusher. Работает только если `obsstudio` присутствует в `window` (т.е. вкладка открыта внутри OBS) и заданы `obsWebSocket.port` в настройках виджета.

### Подключение

```
ws://localhost:{port}  +  password (obsWebSocket.pass)
```

Подписывается на все события OBS включая `SceneItemTransformChanged`.

### Поиск браузерного источника

1. Берёт список всех инпутов OBS типа `browser_source`
2. Находит тот, у которого `url` начинается с `widget.data.url`
3. Перебирает все сцены, ищет `sceneItemId` этого источника

### Настройка слоя (`setupWidget`)

Применяет дефолтные настройки браузерного источника:

| Параметр | Значение |
|---|---|
| Размер | 1920 × 1080 |
| Позиция | (0, 0) |
| FPS | 60 (кастомный) |
| `reroute_audio` | true |
| `restart_when_active` | true |
| `shutdown` | true |
| `webpage_control_level` | 5 |

Масштаб рассчитывается как `videoBaseWidth / 1920` и `videoBaseHeight / 1080` — чтобы корректно вписаться в разрешение канваса OBS.

Источник поднимается на верхнюю позицию в сцене (`SetSceneItemIndex`).

### Слушатели событий

После настройки OBS WebSocket подписывается на изменения:
- `SceneItemTransformChanged`
- `InputSettingsChanged`
- `InputNameChanged`

При каждом изменении (debounce 3с) отправляет актуальные настройки в Pusher-канал — для отображения в дебаггере.

---

## Шаг 7. Pusher — подписка на каналы

Создаёт два канала для `uplify.ads.{slug}`:

### Публичный канал

Слушает `subscription_count` — обновляет `subscribersCount`. Если значение > 1, виджет блокирует показ рекламы.

### Приватный канал

При успешной подписке (`SUBSCRIPTION_SUCCEEDED`) — whisper `SESSION_INIT` с данными сессии.

Полный список обрабатываемых событий:

| Событие | Действие |
|---|---|
| `WIDGET_UPDATED` | Обновляет `widget.data` через адаптер |
| `WIDGET_REFRESH` | `window.location.reload()` |
| `AUTO_LAUNCH` | Подготавливает и ставит в очередь автоматический показ |
| `MANUAL_LAUNCH` | Немедленно запускает `creativesLoop.startAd()` |
| `DEMO_LAUNCH` | Добавляет демо-показ в приоритетную очередь |
| `DEMO_REAL_LAUNCH` | То же, с реальными креативами |
| `CHATBOT_DISCONNECT` | Устанавливает `botEnabled = false` |
| `CONVERTION_ALERT` | Показывает уведомление о конверсии |

### Версионирование

Каждое Pusher-событие несёт `version`. При расхождении версий:
- Первый раз: запоминает версию
- Последующие расхождения: `window.location.reload()`

---

## Проверка разрешения

Виджет подписывается на события `load` и `resize` и проверяет:

```
window.innerWidth >= 1200 && window.innerHeight >= 700
```

Если разрешение не соответствует — `<Creatives>` не рендерится, показывается предупреждение.
