# FormAdset — Form by Campaign Type

**All fields and sections** on the ad set settings screen by campaign type. **+** means present, **−** means absent. Detailed field descriptions: [field reference](./05-field-reference.md). Budget models: [budget models](./04-budget-models.md).

**Where list values come from:** formats, platforms, payment strategies, frequency, gender — from the **campaign dictionary**; languages, countries, devices, tags, time zones — from the **global Partner dictionary**. Summary: [overview](./01-overview.md).

---

## General Settings

| Field or section | Brand Awareness | Performance | Preroll | Extension | Special Project |
|---|---|---|---|---|---|
| Status (on / off) | + | + | + | + | + |
| Title | + | + | + | + | + |
| Description | + | + | + | + | + |
| Platform | + | + | + | + | + |
| Format | + | + | + | + | + |
| Format settings | − | − | − | − | + |
| Schedule (dates) | + | + | + | + | + |
| Time zone | + | + (locked) | − | − | + |
| View time (daypart) | + | − | − | − | − |

> **Status** — **edit mode only**; hidden when creating.
>
> **Time zone** for Performance is shown but **locked** (value cannot be changed). Preroll and Extension **do not** show the time zone block.

---

## Budget and Targets

| Field or section | Brand Awareness | Performance | Preroll | Extension | Special Project |
|---|---|---|---|---|---|
| Payment strategy (selector) | + | − | − | + | + |
| Budget (PPV / CPC / CPA / PPVA) | + | − | − | − | − |
| Budget (Impressions / Actions) | − | + | + | − | − |
| Budget (PPV only) | − | − | − | + | − |
| Budget (PPP) | − | − | − | − | + |
| Targets (CTR / EVR) | + | + | + | + | − |

---

## Creator Targeting

| Field or section | Brand Awareness | Performance | Preroll | Extension | Special Project |
|---|---|---|---|---|---|
| Agencies | + | − | − | + | − |
| Streamers (search + include/exclude) | + | + | + | + | − |
| Streamers (table with prices) | − | − | − | − | + |
| Languages | + | + | + | + | − |
| Countries (creators) | + | + | + | + | − |
| Gender | + | − | − | + | − |
| Age | + | − | − | + | − |
| Age restriction (18+) | + | − | − | + | − |
| Tags | + | + | + | + | − |
| Audience estimate | + | − | − | + | − |

> For Brand Awareness and Extension: when the streamer list is populated and is **not** in exclude mode, all other creator targeting fields (agencies, languages, countries, gender, age, 18+, tags) are **disabled** — targeting is driven by the streamer list.

---

## Audience Targeting

| Field or section | Brand Awareness | Performance | Preroll | Extension | Special Project |
|---|---|---|---|---|---|
| Countries (audience) | + | + | + | + | + |
| Devices (audience) | + | + | + | + | + |

---

## Content and Analytics

| Field or section | Brand Awareness | Performance | Preroll | Extension | Special Project |
|---|---|---|---|---|---|
| Product URL | − | + | + | − | − |
| Short URL | − | + | − | − | − |
| Chatbot text | − | + | − | − | − |
| Video text | − | − | + | − | − |
| Analytics pixel | − | + | + | − | − |
| Pixel script | − | + | + | − | − |
| Creative (upload) | − | + | + | − | − |
| Legal markup (erid) | − | + | + | − | − |

> **Legal markup** is shown only in **edit** mode and when `erid` data is present in the API response.

---

## Alerts (Brand Awareness)

| Field or section | Brand Awareness | Performance | Preroll | Extension | Special Project |
|---|---|---|---|---|---|
| Alert animation | + (CPA / PPVA) | − | − | − | − |
| Alert text | + (CPA / PPVA) | − | − | − | − |

> The conversion alert section only appears with **CPA** or **PPVA** strategies.

---

## Display Frequency

| Field or section | Brand Awareness | Performance | Preroll | Extension | Special Project |
|---|---|---|---|---|---|
| Display frequency | + | − | − | − | − |
