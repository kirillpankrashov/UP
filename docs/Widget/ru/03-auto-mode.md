# Виджет — Автоматический режим

Активируется когда `widget.data.advertising.mode === 'auto'`.

В этом режиме виджет сам запрашивает рекламу у сервера по расписанию, получает креативы через Pusher и показывает их по таймеру.

---

## Обзор цикла

```
RequestLoop (каждые 15 мин)
  └── POST ads/widget/{slug}/auto
        └── Сервер → Pusher AUTO_LAUNCH
              └── Preparer → подготовка креатива, обогащение для SSP/CPMStar
                    └── CreativesLoop.addAd()  ← запись в очередь
                          └── CreativesLoop.check() (каждые 5с)
                                └── CreativesManager.displayAd()
                                      └── playIntro → playCreatives → nextCreative → switchCreative
```

---

## RequestLoop — цикл запросов

Запускается через **10 минут** после загрузки виджета. Тикает каждую секунду, проверяя cooldown каждого типа запроса.

### Условия пропуска всего цикла

- Разрешение окна меньше `1200×700`
- `pusher.subscribersCount > 1` (открыта дублирующая вкладка)
- `creativesLoop.queue.length > 10` (очередь переполнена)

### 1. Brand Safety

```
GET ads/brand-safety/{slug}/visual
→ isSafe = response.status
```

**Пропускается если:**

- `widget.data.bsRequired === false`
- Частота показов `FIVE` (5 мин) или `TEN` (10 мин)

Кулдаун: **15 мин**. Первый запуск — немедленно при старте `requestLoop.init()`.

Если запрос упал — `isSafe = false`.

### 2. Запрос рекламы

```
POST ads/widget/{slug}/auto
Body: { width: window.innerWidth, height: window.innerHeight }
```

**Пропускается если:**

- `bsRequired === true && isSafe === false`

Кулдаун: **15 мин** (первый — через 5 мин после BS-чека, т.е. ~10 мин от старта).

Сервер **не возвращает данные в ответе**. Вместо этого шлёт `AUTO_LAUNCH` через Pusher.

При получении `AUTO_LAUNCH` — таймер Brand Awareness сбрасывается (`resetNextCall`), чтобы следующий запрос был ровно через 15 мин от этого момента.

---

## Preparer — подготовка креативов

`AUTO_LAUNCH` несёт `{ items: ICreativeResponse[], stream: IStreamInfo }`.

`Preparer` обрабатывает каждый пришедший `ICreativeResponse` и превращает его в готовый к показу `ICreative`. Для форматов `FULLSCREEN`, `PIP`, `CUSTOM`, `CHATBOT_TEXT` это просто адаптация данных. Для SSP и CPMStar форматов — дополнительно делается запрос к внешнему сервису за актуальным рекламным контентом (подробнее см. [05-ssp-creatives.md](./05-ssp-creatives.md)).

### findLowestFrequency

Перед обработкой анализирует частоты всех креативов в пакете. Если минимальная частота из пришедших ниже текущего `widget.frequency` **и** не ниже частоты, заданной стримером — понижает `widget.frequency`. Это ускорит следующий цикл RequestLoop.

### Обработка по форматам

| Формат | Внешний запрос | Куда пишет |
|---|---|---|
| `YANDEX_FS` / `YANDEX_PF` | `POST {SspMediaApi}/yandex/fs` | `attachments.video` |
| `YANDEX_TEXT` | `POST {SspTextApi}/yandex/text` | `attachments.unit` |
| `CPMSTAR_BANNER` | `POST {CpmStarApi}/cpmstar/banner` | `attachments.unit` |
| `CHATBOT_TEXT` | — | адаптируется напрямую |
| `FULLSCREEN`, `PIP`, `CUSTOM` | — | адаптируются напрямую |

`YANDEX_TEXT` и `CHATBOT_TEXT` **пропускаются** при low frequency (5/10 мин). Если внешний сервис вернул пустой ответ или ошибку — креатив **отбрасывается**.

Все подготовленные креативы → `creativesLoop.addAd(resolvedCreatives)`.

---

## CreativesLoop — очередь и планировщик

### Структура очереди

```ts
queue: Array<{
  adSet: ICreative[],
  whenDisplay: number  // timestamp показа
}>
```

### addAd() в авто-режиме

- Очередь пуста → `whenDisplay = now`
- Очередь не пуста → `whenDisplay = lastItem.whenDisplay + 15 мин`

Т.е. показы равномерно распределяются с интервалом 15 мин.

### check() — каждые 5 секунд

Пропускает если: `isPreloading || isPlaying || isIntro`

Если во время показа пришёл новый `AUTO_LAUNCH` — `addAd()` добавит пакет в очередь, но `check()` его не тронет до окончания текущего показа. Реклама не прерывается.

Приоритеты:

1. Если `demo.length > 0` → немедленно запускает `startDemo()`
2. Иначе, если `queue[0].whenDisplay < now - 1 мин` → `startAd()`

> Предзагрузка начинается **за 1 минуту** до запланированного показа.

### startAd()

1. `queue.shift()` — извлекает первый элемент
2. `creativesManager.preload(adSet)` — предзагрузка медиа (блокирует)
3. `creativesManager.displayAd(preloaded, whenDisplay)`

---

## Предзагрузка медиа

Для каждого creative в adSet:

- `YANDEX_TEXT`, `CHATBOT_TEXT`, внешние форматы — пропускаются (нечего грузить)
- Нет ни одного attachment — warning + пропуск
- Иначе: параллельно `tryPreloadImage()` + `tryPreloadVideo()` + `tryPreloadUnit()`
- ZIP — предзагрузка не нужна
- Ошибка предзагрузки → creative пропускается с warning

---

## Воспроизведение

### displayAd(adSet, whenDisplay)

```
whenDisplay > 0:
  ждёт setInterval(1с) пока now >= whenDisplay
  → playIntro(20с, firstCreative)
  → playCreatives(adSet)
```

Intro пропускается для `YANDEX_TEXT` и `CHATBOT_TEXT`.

### playCreatives(adSet)

1. `isPlaying = true`
2. `timer.reset(totalDuration)` — суммарная длительность adSet
3. `nextCreative()`

### nextCreative()

Увеличивает индекс. Если index === adSet.length → `finish()`.

Иначе — в зависимости от формата:

| Формат | Поведение перед switchCreative |
|---|---|
| `YANDEX_FS` / `YANDEX_PF` | Сбрасывает creative в `null` → `isUpdating = true` → ждёт 100ms → `isUpdating = false` (Vue перемонтирует компонент) |
| `YANDEX_TEXT` | Ждёт delay (7/5/3.3 мин по `sspTextFrequency`), затем `switchCreative` |
| `CHATBOT_TEXT` | Ждёт 5 мин, затем `switchCreative` |
| Всё остальное | `switchCreative` сразу |

### switchCreative(creative)

1. `screenshot.makeScreenshot(creative)` — если формат не текстовый
2. `setCreative(creative)` → Vue рендерит соответствующий компонент
3. `chatbot.sendMessage(creative)` → отправляет сообщение в чат
4. Для текстовых форматов: выход (таймер не нужен)
5. Для изображений и ZIP (нет `duration`): `timer.play(15с)` → `onPlayEnd()`
6. Для видео/unit: ждёт `@end-time` от компонента

### finish()

1. GA `ecommerce:send`
2. Сброс: `isPlaying = false`, `isIntro = false`, `creative = null`, `timer.reset()`
3. Если `widget.frequency` изменился в процессе (Preparer понизил) → `restartWithNewFrequency()`:
  - Останавливает и перезапускает RequestLoop с новым кулдауном

---

## Скриншоты

- Активны **1 час** после `screenshot.enable()`, или всегда если `creative.adSet.makeScreenshots = true`
- Задержка **8 секунд** от момента `switchCreative`
- Пропускаются: Demo-креативы, `subscribersCount > 1`
- `POST {ScreenshotApi}/{platform}` с platform-специфичным payload:

| Платформа | Payload |
|---|---|
| Twitch, Trovo, VK Play | `{ nickname, ad, impression }` |
| YouTube | `{ slug (streamId), ad, impression }` |

- 1 повтор через 45 секунд при ошибке

---

## Таймлайн цикла

```
t=0         Виджет загружен, CreativesLoop запущен (тик 5с)

t=+5 мин    RequestLoop: первый BS-чек
            GET ads/brand-safety/{slug}/visual

t=+10 мин   RequestLoop: первый запрос рекламы
            POST ads/widget/{slug}/auto
            ← AUTO_LAUNCH (Pusher)
            ← Preparer: запросы к SSP/CPMStar API
            ← CreativesLoop.addAd(creatives) → whenDisplay = now

t=now-1мин  CreativesLoop: начинает preload

t=whenDisplay
            displayAd: ждёт точного момента
            playIntro(20с)
            playCreatives → nextCreative → switchCreative
            Длительность показа:
              image → 15с
              video/unit → по duration файла
            finish() → сброс состояния

t=+25 мин   Плановый BS-чек (nextCall истёк)

t=+30 мин   ВТОРОЙ запрос рекламы (первый был в t+15, кулдаун 15 мин)
            POST ads/widget/{slug}/auto
            ← AUTO_LAUNCH → Preparer → CreativesLoop.addAd
            whenDisplay = предыдущий whenDisplay + 15 мин
```

---

## Константы

| Константа | Значение | Назначение |
|---|---|---|
| `REQUEST_LOOP_TICK` | 1с | Тик проверки RequestLoop |
| `REQUEST_INTERVAL` | 15 мин | Кулдаун между запросами рекламы |
| `CREATIVES_LOOP_TICK` | 5с | Тик проверки очереди |
| `PRIMAL_TIMER_TIMEOUT` | 10 мин | Задержка до старта RequestLoop |
| `BS_CHECK_BEFORE_REQUEST` | 5 мин | BS раньше Brand Awareness |
| `TIME_BEFORE_PRELOAD` | 1 мин | Предзагрузка до показа |
| `CHATBOT_TEXT_DELAY` | 5 мин | Задержка перед CHATBOT_TEXT |
| `YandexTextDelay.ONE/TWO/THREE` | 7/5/3.3 мин | Задержки Yandex Text |
| `SCREENSHOT_TIMEOUT` | 1 час | Окно активности скриншотов |
| `SCREENSHOT_DELAY` | 8с | Задержка после смены creative |
