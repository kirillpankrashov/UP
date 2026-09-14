# DebugLayer

`DebugLayer` — отладочный оверлей, отображаемый поверх виджета. Рендерится всегда (в `Widget.vue`), но показывается только при наличии query-параметра `?debug_active` в URL виджета.

---

## Активация

```
https://platform.uplify.app/ads/v1/{slug}?debug_active=1
```

---

## Содержимое

Обновляется раз в секунду через `setInterval`.

### Widget

| Поле | Значение |
|---|---|
| **Session UUID** | `session.uuid` — уникальный идентификатор текущего сеанса |
| **Resolution** | `window.innerWidth × window.innerHeight` |
| **Link** | `origin + pathname` текущей страницы |
| **Is manual** | `widget.isManual` — режим показа |
| **Frequency** | `widget.frequency` в минутах — текущий интервал между показами |
| **Initial frequency** | `widget.initialFrequency` в минутах — частота при старте (до возможного понижения из-за креатива с меньшей частотой) |

### OBS

| Поле | Значение |
|---|---|
| **Plugin version** | `window.obsstudio.pluginVersion` |
| **Control Level** | `obsstudio.getControlLevel()` — уровень доступа OBS к браузерному источнику |
| **Streaming status** | `obsstudio.getStatus().streaming` |
| **Recording status** | `obsstudio.getStatus().recording` |
| **User navigator** | Тип устройства по `userAgent`: `desktop` / `tablet` / `mobile` |

### Requests

| Поле | Значение |
|---|---|
| **Brand Safety request in** | Время до следующего BS-запроса (формат `Xm Ys`). Скрыто, если `nextCall` не задан |
| **Next ad request in** | Время до следующего BA-запроса |

### Queue

| Поле | Значение |
|---|---|
| **Display next creative in** | Время до ближайшего запланированного показа из очереди `CreativesLoop` |
| **Queue (JSON)** | Полный список очереди: `whenDisplay` (время в формате `HH:mm:ss`), `slug`, `impressionSlug`, `format`, `campaign`, `makeScreenshots` по каждому креативу |

---

## Особенности

- `DebugLayer` рендерится **независимо** от состояния виджета (нет ограничений по `chatBotConnected` и т.д.) — он виден всегда, пока есть параметр
- Данные OBS-статуса запрашиваются через `window.obsstudio` — доступно только внутри OBS Browser Source
- `getUserDeviceType()` определяет тип устройства по `navigator.userAgent` — в OBS это будет OBS CEF User Agent
