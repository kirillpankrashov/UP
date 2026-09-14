# Campaigns — Campaign Types

Five campaign types differ in available tabs, table columns, and metrics.

---

## Available Tabs by Type

| Type | Campaigns | Groups | Creatives |
|---|---|---|---|
| Brand Awareness | + | + | + |
| Performance | + | + | — |
| Preroll | + | + | — |
| Extension | + | + | + |
| Special Project | + | + | + |

---

## Table Columns: Campaigns

All campaign tables include base columns **ID** and **Name** (always visible) and an **Actions** column (column settings + analytics).

| Column | Brand Awareness | Performance | Preroll | Extension | Special Project |
|---|---|---|---|---|---|
| Status | + | + | + | + | + |
| Moderation | + | + | + | + | + |
| Budget | progress | progress | progress | progress | number |
| Views | progress | progress | progress | progress | number |
| CTR | + | + | + | + | — |
| Days Remaining | + | + | + | + | + |
| Advertiser | + | + | + | + | + |
| Channels | + (hidden) | + (hidden) | + (hidden) | + (hidden) | — |
| Clicks | + (hidden) | + (hidden) | + (hidden) | + (hidden) | — |
| External ID | — | + | — | — | — |
| Analytics | + | + | + | + | — |

> "Hidden" means the column is available but not shown by default. Users can enable it through the column settings menu.

**Special Project** stands out:
- Budget and Views are plain numbers instead of a progress bar with forecast
- No CTR, Channels, Clicks
- No analytics link

**Performance** is the only type with an **External ID** column.

---

## Table Columns: Groups (Ad Sets)

| Column | Brand Awareness | Performance | Preroll | Extension | Special Project |
|---|---|---|---|---|---|
| Status | + | + | + | + | + |
| Moderation | + | + | + | + | + |
| Platform | + | + | + | + | + |
| Budget | + | + | + | + | — |
| Views | + | + | + | + | — |
| CTR | + | + | + | + | — |
| Days Remaining | + | + | + | + | — |
| Channels | + | + (hidden) | + (hidden) | + (hidden) | — |
| Clicks | + (hidden) | + (hidden) | + (hidden) | + (hidden) | — |
| Format | + | + | + | + | + |
| Related Campaign | + | + | + | + | + |
| Bid Cap | — | — | — | — | + |
| Analytics | + | + | + | + | + |

**Special Project** groups have a minimal set — no budget, views, or days remaining. A **Bid Cap** column is added instead.

---

## Table Columns: Creatives

Available only for Brand Awareness, Extension, and Special Project.

| Column | Brand Awareness | Extension | Special Project |
|---|---|---|---|
| Status | + | + | + |
| Platform | + | + | + |
| Views | + | + | + |
| CTR | + | + | — |
| Format | + | + | + |
| Related Group | + | + | + |
| Related Campaign | + | + | + |
| Analytics | + | + | + |
