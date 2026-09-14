# Campaigns — Column Reference

Description of each column in the Campaigns tables. Compact present / absent matrix by type: [campaign types](./02-campaign-types.md). Visibility settings: [table system](./03-table-system.md).

---

## ID

Entity slug rendered as a link. Clicking navigates to the edit screen (campaign, ad set, or creative). The column is **fixed** — it does not scroll horizontally. Always visible, cannot be toggled off.

**Tables:** all.

---

## Name

Entity name (`title.default`) rendered as a link to the edit screen — same route as ID. Always visible, cannot be toggled off.

**Tables:** all.

---

## Status

**On / off** toggle (`ElSwitch`). Toggling calls the `toggleStatus` API.

The toggle can be **disabled** with a popover tooltip:
- **Campaign** — when the campaign is closed (`closed`).
- **Ad set** — when the parent campaign is off.
- **Creative** — when the parent ad set or campaign is off.

**Tables:** all.

---

## Moderation

Text moderation status: "Complete" or "Pending". When moderation is incomplete, the text is styled as a warning.

**Tables:** campaigns (all types), ad sets (all types). Not on creatives.

---

## Budget

Two display variants depending on campaign type:

**Progress bar** (Brand Awareness, Performance, Preroll, Extension) — bar showing current vs total budget in the advertiser's currency. Also displays a **forecast** — a vertical marker on the bar with a hover popover. The forecast is calculated on the client from campaign dates, current impressions, and average CPM.

**Plain number** (Special Project) — formatted budget amount without a progress bar or forecast.

**Tables:** campaigns (all types), ad sets (BA, Performance, Preroll, Extension). Special Project ad sets do not have this column.

---

## Views (Impressions)

Two variants:

**Progress bar** (BA, Performance, Preroll, Extension) — bar showing current vs planned impressions. No forecast (unlike Budget).

**Plain number** (Special Project campaigns) — formatted impression count.

**Tables:** campaigns (all types), ad sets (BA, Performance, Preroll, Extension), creatives (BA, Extension). Special Project ad sets and creatives do not have this column.

---

## CTR

Click-through rate as text: `row.ctr` with two decimal places and a `%` sign.

**Tables:** campaigns (BA, Performance, Preroll, Extension), ad sets (same), creatives (BA, Extension). Special Project — absent at all levels.

---

## Days Remaining

Integer count of days until the campaign / ad set ends. Calculated on the client: difference between end date and today, minimum 0.

**Tables:** campaigns (all types), ad sets (BA, Performance, Preroll, Extension). Special Project ad sets — absent. Not on creatives.

---

## Advertiser

Advertiser name (`row.advertiser.title`). Long text shows a tooltip.

**Tables:** campaigns (all types, including Special Project). Not on ad sets or creatives.

---

## Channels

Channel count formatted with thousands separators.

**Hidden by default** at the campaign level; **visible by default** at the ad set level (except Special Project).

**Tables:** campaigns (BA, Performance, Preroll, Extension), ad sets (BA, Performance, Preroll, Extension). Special Project — absent.

---

## Clicks

Click count formatted with thousands separators.

**Hidden by default** at all levels.

**Tables:** campaigns (BA, Performance, Preroll, Extension), ad sets (BA, Performance, Preroll, Extension). Special Project — absent.

---

## External ID

Campaign identifier in an external system. Long values show a tooltip.

**Tables:** **Performance** campaigns only.

---

## Platform

Platform icon and name (Twitch, YouTube, Trovo, VK Play, TikTok). For ad sets — the ad set's own platform; for creatives — the parent ad set's platform.

**Tables:** ad sets (all types), creatives (all types). Not on campaigns.

---

## Format

Ad format name. For ad sets — the ad set's format; for creatives — the parent ad set's format.

**Tables:** ad sets (all types), creatives (all types). Not on campaigns.

---

## Related Campaign

Link to the parent campaign (campaign name; clicking navigates to the campaign edit screen).

**Tables:** ad sets (all types), creatives (all types). Not on campaigns.

---

## Related Group

Link to the parent ad set (ad set name; clicking navigates to the ad set edit screen).

**Tables:** creatives (all types). Not on campaigns or ad sets.

---

## Bid Cap

Bid amount in the advertiser's currency.

**Tables:** **Special Project** ad sets only.

---

## Analytics

Icon link to the analytics screen. Opens analytics with pre-filled parameters: campaign slug, start and end dates. For ad sets and creatives the URL includes a `#creatives` anchor.

**Tables:** campaigns (BA, Performance, Preroll, Extension), ad sets (all types), creatives (all types). Special Project campaigns — absent.
