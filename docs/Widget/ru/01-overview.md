# Виджет — Обзор

## Что такое виджет

Виджет — это браузерный оверлей для OBS (Browser Source), который отображает рекламные креативы поверх стрима. Он открывается по уникальному URL вида `{domain}/widget/{slug}` и работает как обычная веб-страница внутри OBS.

Виджет работает исключительно с кампаниями формата **Brand Awareness**.

## Режимы работы

| Режим | `advertising.mode` | Описание |
|---|---|---|
| Автоматический | `auto` | Виджет сам запрашивает рекламу у сервера по расписанию |
| Ручной | `manual` | Сервер присылает рекламу, но показ запускается только по команде стримера — через OBS Dock или страницу настроек в личном кабинете |

## Архитектура

`Widget.vue` создаёт единственный экземпляр класса `Widget(slug)`, который держит все подсистемы:

```
Widget
 ├── Session          — идентификация клиента (fingerprint, geo, device)
 ├── ObsWebSocket     — управление браузерным источником в OBS
 ├── Pusher           — real-time канал (Laravel Echo + Pusher)
 ├── RequestLoop      — периодические запросы к серверу (Brand Safety + Brand Awareness)
 ├── CreativesLoop    — очередь запланированных показов
 ├── CreativesManager — активный показ, переключение креативов
 ├── CreativeTimer    — таймер воспроизведения (60fps)
 ├── Chatbot          — отправка сообщений в чат через бекенд (Nightbot)
 ├── Preparer         — обогащение SSP/CPMStar креативов внешними данными
 ├── ConvertionAlert  — показ уведомлений о конверсиях
 └── Screenshot       — запрос к сервису сохранения скриншотов показов
```

## Форматы креативов

| Формат | Компонент | Тип |
|---|---|---|
| `FULLSCREEN` | `Fullscreen.vue` | Изображение/видео на весь экран |
| `PIP` | `Pip.vue` | Picture-in-picture |
| `CUSTOM` | `Custom.vue` | ZIP-баннер с кастомной вёрсткой |
| `YANDEX_FS` / `YANDEX_PF` | `YandexFS.vue` | SSP медиа-реклама (VAST видео) |
| `YANDEX_TEXT` | `YandexText.vue` | SSP текстовый блок |
| `CHATBOT_TEXT` | `ChatbotText.vue` | Текст через чатбот |
| `CPMSTAR_BANNER` | `CpmStar.vue` | CPMStar HTML-баннер |

## Условия отображения UI

| Переменная | Откуда |
|---|---|
| `chatBotConnected` | `widget.data.botEnabled` |
| `tooManySubscribers` | `pusher.subscribersCount > 1` |
| `resolutionCorrect` | `window.innerWidth >= 1200 && window.innerHeight >= 700` |

**Компоненты:**

| Компонент | Условие отображения |
|---|---|
| `<Creatives>` | `chatBotConnected && resolutionCorrect && !tooManySubscribers` |
| `<ConvertionAlert>` | то же + `conversionAlert.isShowing` |

**Предупреждения (`<WarningMessage>`):**

| Сообщение | Условие |
|---|---|
| "Слишком много подписчиков" | `tooManySubscribers` |
| "Требуется повторный вход" | `widget.data.relogin` |
| "Чатбот отключён" | `!chatBotConnected` |
| "Неверное разрешение" | `!resolutionCorrect` |

> Если открыто более одной вкладки с одним и тем же виджетом (`subscribersCount > 1`), показ рекламы блокируется и отображается предупреждение.

## Ключевые настройки виджета (`IWidget`)

| Поле | Тип | Назначение |
|---|---|---|
| `advertising.mode` | `'auto' \| 'manual'` | Режим запуска рекламы |
| `advertising.frequency` | `number` | Минимальная частота показов (мин), заданная стримером |
| `bsRequired` | `boolean` | Нужна ли проверка Brand Safety перед запросом рекламы |
| `botEnabled` | `boolean` | Подключён ли чатбот |
| `adManualEnabled` | `boolean` | Разрешён ли ручной запуск (серверный флаг) |
| `sspTextFrequency` | `1 \| 2 \| 3` | Частота Yandex Text (7/5/3.3 мин) |
| `allowAdultContent` | `boolean` | Разрешён ли контент 18+ для SSP |
| `obsWebSocket.port/pass` | `number \| null` | Параметры подключения к OBS WebSocket |

## Карта частот (`AdFrequencyMap`)

| Ключ | Значение |
|---|---|
| `FIVE` | 5 мин |
| `TEN` | 10 мин |
| `FAST` | 15 мин (по умолчанию) |
| `ACCELERATED` | 20 мин |
| `STANDARD` | 30 мин |

`FIVE` и `TEN` считаются **low frequency** — при них пропускаются `YANDEX_TEXT` и `CHATBOT_TEXT` форматы, а также проверка Brand Safety.
