# FormCampaign — Field Reference

Detailed descriptions of campaign form elements. For a compact **present / absent** matrix by type, see [form by campaign type](./03-forms-by-campaign-type.md).

---

## Status (visibility)

**Description:** Toggles whether the **campaign itself** is on or off. UI label: **Status**. Saved together with the rest of the form.

In the streamer dashboard, streamers do **not** see “campaign” as an entity — they see **ad sets (groups)**. For a streamer to **see a placement**, the whole chain must be satisfied:

- **Campaign** status is on (**true**);
- **Ad set** status is on;
- **Creative** status is on and the creative is **valid** (e.g. when a file is required, it must be uploaded).

If the **campaign** is off, the **ad set** is off or the streamer **does not match ad set targeting**, the **creative** is off, the creative is **invalid**, or a **required file is missing** — the streamer will **not** see that placement in their dashboard, even when other levels are enabled.

**Forms:** all types — **edit mode only**; hidden while **creating** a campaign.

---

## Campaign name

**Description:** The campaign’s working name (text field with a length limit). Used in the dashboard and **shown to streamers** in the placement context. Next to the settings block there is a **hint** titled “What is this data?” — it is not a form field; it explains how the name relates to what streamers see.

**Forms:** All types.

---

## Campaign description

**Description:** Text for streamers: what the campaign is about, terms, expectations. The UI placeholder suggests describing the campaign for streamers.

**Forms:** All types.

---

## External ID

**Description:** Campaign identifier in an external system.

**Forms:** **Performance** (Interactive) only.

---

## Campaign category

**Description:** Topic category from a directory. Used for classification and platform policy alignment. Options come from the **global Partner dictionary**.

**Forms:** All types.

---

## Start date and finish date

**Description:** The campaign’s active date range. Both dates are typically required to save.

**Forms:** All types.

---

## Time zone

**Description:** Time zone used to interpret campaign dates. Options come from the **global dictionary**. For **Performance**, the field is **shown but locked** — the value cannot be changed on this form. **Preroll** and **Extension** **do not** show a time zone block on this campaign form.

**Forms:** Brand Awareness, Performance (read-only / locked), Special Project — with selection; **Preroll** and **Extension** — not present.

---

## Advertiser holding

**Description:** The advertiser’s holding group. The chosen holding drives which **advertisers** appear in the next field. Options come from the **campaign dictionary**.

**Forms:** All types.

---

## Advertiser

**Description:** The specific advertiser under the selected holding. The list is loaded via a **separate API** and filtered by holding; until a holding is chosen, the advertiser field stays disabled.

**Forms:** All types.

---

## Media agency

**Description:** Associated media agency where relevant to contracts. Options come from the **campaign dictionary**.

**Forms:** All types.

---

## ORD markup

**Description:** Free-text field for markup tied to the advertising data operator (ORD) — identifiers or notes required by the client’s compliance process.

**Forms:** All types.

---

## Affiliate networks

**Description:** Section for integrating with an external affiliate network (UI copy: integration and setup with external affiliate networks). Pick a network or a “no integrations” option. Options come from the **campaign dictionary**.

**Forms:** Brand Awareness, Special Project.

---

## GET parameters builder

**Description:** Section for building extra **query parameters** on the product link: each row sets a **URL parameter name** (letters, digits, and a limited set of symbols) and a **substitution type** from the system placeholder list — e.g. campaign, ad set, and creative ids, user id, impressions, device, `visit_id`, random value, and more. Use it to shape links for analytics and attribution (UTM-like in spirit, but with platform tokens). Rows can be **added** and, where needed, **removed** (see **`erid`** restrictions below). It only defines **which** GET parameters and **which** substitution types are **actually appended** to the product URL when the placement runs.

If the value type **`visit_id`** is selected, the **`{{visit_id}}`** marker is inserted into the link. On the **middle page**, the **frontend** **replaces** it with the real **visit id**.

**`erid` and RUB advertiser currency:** if the selected **advertiser’s** wallet currency is **RUB**, a block is **auto-inserted** at the top: parameter name **`erid`**, value type **`erid_token`** (ad-marking token for reporting). That **first** block **cannot be deleted** or **edited** in the UI — required marking for RUB advertisers. For a non-RUB advertiser, **`erid_token`** is **not** offered in the value-type list; switching the advertiser to RUB adds the `erid` block if it is still missing.

**Forms:** All types.

---

## Uplify Pixel

**Description:** A **non-editable field** with an **HTML template of an `img` tag** (pixel `src` with a visit placeholder) that the **advertiser can place on their own site**. Copy-to-clipboard is available. Intended to track user actions on the advertiser’s site.

**Forms:** All types.
