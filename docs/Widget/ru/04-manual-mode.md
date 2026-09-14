# Виджет — Ручной режим

Активируется когда `widget.data.advertising.mode === 'manual'`.

В этом режиме виджет получает рекламные креативы от сервера автоматически (так же, как в auto), но **не показывает их сам**. Показ запускается только по явной команде стримера.

---

## Отличие от автоматического режима

| | Авто | Ручной |
|---|---|---|
| Запросы BS / Brand Awareness | ✅ работают | ✅ работают (те же) |
| Обогащение SSP/CPMStar | ✅ | ✅ |
| Добавление в очередь | ✅ | ✅ (но заменяет, не добавляет) |
| Автоматический показ из очереди | ✅ | ❌ |
| Показ по команде стримера | ❌ | ✅ |

---

## Как работает очередь в ручном режиме

Метод `CreativesLoop.addAd()` ведёт себя иначе:

```ts
// Авто:
queue.push({ whenDisplay: lastItem.whenDisplay + 15мин, adSet })

// Ручной:
queue = [{ whenDisplay: new Date().getTime(), adSet }]
```

В ручном режиме очередь всегда содержит **ровно один элемент** — последний полученный от сервера пакет. `whenDisplay` устанавливается в `now` на момент получения `AUTO_LAUNCH`.

Каждый новый `AUTO_LAUNCH` **перезаписывает** предыдущий элемент очереди. Накопление невозможно: если стример долго не нажимал кнопку, все промежуточные пакеты были перезаписаны, и при следующем нажатии покажется только актуальная реклама.

Если `AUTO_LAUNCH` пришёл во время активного показа — очередь будет перезаписана, но текущая реклама не прерывается. `check()` заблокирован флагом `isPlaying` и не тронет новый пакет до окончания показа.

---

## Почему автоплей не срабатывает

В `CreativesLoop.check()`:

```ts
else if (this.queue.length && !this.widget.isManual) {
  // авто-плей — только если !isManual
}
```

В ручном режиме эта ветка пропускается. Элемент висит в очереди и ждёт команды.

---

## Как стример запускает показ

### Шаг 1. Стример нажимает "Запустить рекламу"

В `Streamer → Settings → AdvertSettings → ManualPlayback`:

```
GET ads/widget/manual
```

Кнопка активна только если `widget.adManualEnabled === true` (серверный флаг, означает что есть готовый пакет для показа).

### Шаг 2. Сервер отправляет Pusher-событие

```
PusherEventName.MANUAL_LAUNCH → .manual.launch
```

### Шаг 3. Виджет запускает показ

```ts
.listen(PusherEventName.MANUAL_LAUNCH, async () => {
  await this.widget.creativesLoop.startAd()
})
```

`startAd()` берёт элемент из очереди (который там уже лежит после AUTO_LAUNCH) и запускает показ.

---

## Что происходит во время показа

Показ полностью идентичен автоматическому режиму:

1. `preload(adSet)` — предзагрузка медиа
2. `displayAd(preloaded, whenDisplay)`:
   - `whenDisplay = now` (был выставлен в момент AUTO_LAUNCH) → ждать не нужно, показ начинается сразу
   - `playIntro(20с)` — анимация появления (кроме `YANDEX_TEXT` / `CHATBOT_TEXT`)
   - `playCreatives(adSet)` → `nextCreative` → `switchCreative`

> Если между получением AUTO_LAUNCH и нажатием кнопки прошло время — показ всё равно начнётся немедленно, без дополнительного ожидания, т.к. `whenDisplay` уже в прошлом.

---

## Таймлайн ручного цикла

```
t=0         Виджет загружен, инициализация (как в авто-режиме)

t=+10 мин   RequestLoop: POST ads/widget/{slug}/auto
            ← AUTO_LAUNCH (Pusher)
            ← Preparer: SSP/CPMStar обогащение
            ← CreativesLoop.addAd() → queue = [{ whenDisplay: now, adSet }]
            (показ НЕ запускается автоматически)

            adManualEnabled = true — кнопка в UI становится активной

t=X         Стример нажимает "Запустить рекламу"
            → GET ads/widget/manual
            ← MANUAL_LAUNCH (Pusher)
            → creativesLoop.startAd()
            → preload → displayAd → playIntro(20с) → playCreatives

t=+30 мин   Следующий AUTO_LAUNCH (через 15 мин после первого BA-запроса,
            независимо от того, когда стример нажал кнопку)
            → очередь обновляется, новый adSet готов к следующему запуску
```

---

## Состояние кнопки запуска

| Состояние | `adManualEnabled` | `manual.sending` | `manual.success` |
|---|---|---|---|
| Кнопка активна, ждёт | `true` | `false` | `false` |
| Отправка запроса | `true` | `true` | `false` |
| Успешно отправлено (1.5с) | `true` | `false` | `true` |
| Кнопка недоступна | `false` | — | — |

Ошибка `ADS_ERRORS_DISABLE` при отправке — молча игнорируется (нет готовой рекламы).

---

## Отличия в поведении finish()

В конце показа:

```ts
if (this.widget.initialFrequency !== this.widget.frequency && !this.widget.isManual) {
  this.widget.restartWithNewFrequency(this.widget.frequency)
}
```

В ручном режиме **перезапуск RequestLoop при изменении частоты не происходит**. Частота для ручного режима не имеет практического значения, т.к. показы не автоматические.
