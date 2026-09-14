# FormCampaign — Form by Campaign Type

**All fields and sections** on the campaign settings screen by type. **+** means the item exists on that type’s form, **−** means it does not. Labels match the **English** UI copy. Longer field descriptions: [field reference](./04-field-reference.md).

**Where list values come from:** **category** and **time zone** (when shown) use the **global Partner dictionary**; **holding**, **media agency**, and **affiliate network** options use the **campaign dictionary**; **advertiser** uses a **separate API** scoped by holding. Summary: [overview](./01-overview.md).

---

## Fields and Sections by Campaign Type

| Field or section | Brand Awareness | Performance | Preroll | Extension | Special Project |
|---|---|---|---|---|---|
| Status (visibility) | + | + | + | + | + |
| Campaign name | + | + | + | + | + |
| Campaign description | + | + | + | + | + |
| External ID | − | + | − | − | − |
| Campaign category | + | + | + | + | + |
| Start date / finish date | + | + | + | + | + |
| Time zone | + | + | − | − | + |
| Advertiser holding | + | + | + | + | + |
| Advertiser | + | + | + | + | + |
| Media agency | + | + | + | + | + |
| ORD markup | + | + | + | + | + |
| Affiliate networks | + | − | − | − | + |
| GET parameters builder | + | + | + | + | + |
| Uplify Pixel | + | + | + | + | + |

> **Status** — the table row applies to **edit** mode; when **creating** a campaign, this block is not shown for any type. This toggles the **campaign** only; whether a streamer actually sees a placement also depends on the ad set, creative, and targeting — see the [field reference](./04-field-reference.md).
>
> **Time zone** for **Performance** is **shown** (`+`) but the field is **locked** (not editable). **Preroll** and **Extension** do **not** show a time zone block on this form (`−`).
