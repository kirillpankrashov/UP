# Кампании — Типы кампаний

Пять типов кампаний отличаются набором доступных вкладок, колонками таблиц и метриками.

---

## Доступные вкладки по типам

| Тип | Кампании | Группы | Креативы |
|---|---|---|---|
| Brand Awareness | + | + | + |
| Performance | + | + | — |
| Preroll | + | + | — |
| Extension | + | + | + |
| Special Project | + | + | + |

---

## Колонки таблиц: кампании

Все таблицы кампаний содержат базовые колонки **ID** и **Name** (всегда видимы) и колонку **Actions** (настройка видимости + аналитика).

| Колонка | Brand Awareness | Performance | Preroll | Extension | Special Project |
|---|---|---|---|---|---|
| Status | + | + | + | + | + |
| Moderation | + | + | + | + | + |
| Budget | прогресс | прогресс | прогресс | прогресс | число |
| Views | прогресс | прогресс | прогресс | прогресс | число |
| CTR | + | + | + | + | — |
| Days Remaining | + | + | + | + | + |
| Advertiser | + | + | + | + | + |
| Channels | + (скрыт) | + (скрыт) | + (скрыт) | + (скрыт) | — |
| Clicks | + (скрыт) | + (скрыт) | + (скрыт) | + (скрыт) | — |
| External ID | — | + | — | — | — |
| Analytics | + | + | + | + | — |

> «Скрыт» означает — колонка доступна, но по умолчанию не отображается. Пользователь может включить её через меню настройки колонок.

**Special Project** отличается от остальных:
- Budget и Views — простые числа вместо прогресс-бара с прогнозом
- Нет CTR, Channels, Clicks
- Нет ссылки на аналитику

**Performance** — единственный тип с колонкой **External ID**.

---

## Колонки таблиц: группы (ad sets)

| Колонка | Brand Awareness | Performance | Preroll | Extension | Special Project |
|---|---|---|---|---|---|
| Status | + | + | + | + | + |
| Moderation | + | + | + | + | + |
| Platform | + | + | + | + | + |
| Budget | + | + | + | + | — |
| Views | + | + | + | + | — |
| CTR | + | + | + | + | — |
| Days Remaining | + | + | + | + | — |
| Channels | + | + (скрыт) | + (скрыт) | + (скрыт) | — |
| Clicks | + (скрыт) | + (скрыт) | + (скрыт) | + (скрыт) | — |
| Format | + | + | + | + | + |
| Related Campaign | + | + | + | + | + |
| Bid Cap | — | — | — | — | + |
| Analytics | + | + | + | + | + |

**Special Project** группы имеют минимальный набор — без бюджета, просмотров, дней. Вместо них — колонка **Bid Cap**.

---

## Колонки таблиц: креативы

Доступны только для Brand Awareness, Extension и Special Project.

| Колонка | Brand Awareness | Extension | Special Project |
|---|---|---|---|
| Status | + | + | + |
| Platform | + | + | + |
| Views | + | + | + |
| CTR | + | + | — |
| Format | + | + | + |
| Related Group | + | + | + |
| Related Campaign | + | + | + |
| Analytics | + | + | + |
