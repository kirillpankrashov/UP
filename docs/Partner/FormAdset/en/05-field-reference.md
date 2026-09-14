# FormAdset — Field Reference

Detailed descriptions of ad set form elements. Compact **present / absent** matrix by type: [forms by campaign type](./03-forms-by-campaign-type.md). Budget models: [budget models](./04-budget-models.md).

---

## Status (visibility)

Toggle **on / off** for the ad set. Changing status calls `changeStatus` at the campaign level, then updates the ad set.

For a streamer to **see a placement**, all of the following must be enabled: **campaign**, **ad set**, **creative** (and the creative must be valid). If the ad set is off, the streamer will not see the placement even when the campaign and creative are on.

**Forms:** all types — **edit mode only**.

---

## Title

Working name of the ad set (group). Text field with a length limit.

**Forms:** all types.

---

## Description

Text description of the ad set for internal use.

**Forms:** all types.

---

## Platform

Streaming platform (Twitch, YouTube, etc.). Options from `dictStore.campaigns.platforms`.

**Forms:** all types.

---

## Format

Ad placement format. Options from `dictStore.campaigns.formats`, excluding formats flagged as `isExternalFormat`. May be locked when editing (`formatEdit: false`).

**Forms:** all types.

---

## Format settings

Additional format parameters: **duration** (seconds) and **frequency** (seconds). Displayed with tooltips.

**Forms:** **Special Project** only.

---

## Schedule (dates)

Start date and end date for the placement. Format `DD.MM.YYYY`. Cannot select a date before today. Start and end constrain each other (start cannot be later than end).

**Forms:** all types.

---

## Time zone

Time zone used to interpret ad set dates. Options from `dictStore.all.timeZones`.

For **Performance**, the field is **shown but locked** — the value cannot be changed (presumably set at the campaign level). **Preroll** and **Extension** do **not** show the block.

**Forms:** Brand Awareness, Performance (locked), Special Project — with selection; Preroll and Extension — not present.

---

## View time (daypart)

Time-of-day range when ads can be shown. Set as `start_view` / `end_view` in `HH:mm:ss` format (seconds are locked in the picker).

**Forms:** **Brand Awareness** only.

---

## External ID

Ad set identifier in an external system. Labels are pulled from **FormCampaign** locales.

**Forms:** **Performance** only.

---

## Creator targeting — Agencies

Multi-select for agencies. Options from `dictStore.campaigns.agencies` with CPM range information.

**CPM warning:** if the ratio between the selected agency's minimum CPM and the current `bidCap` exceeds 60%, a warning is shown.

**Locking:** if the streamer list is populated and not in exclude mode, the field is locked.

**Forms:** Brand Awareness, Extension.

---

## Creator targeting — Streamers

Search and select streamers with **include** or **exclude** mode. Search uses the `searchStreamers` API, factoring in platform, agencies, format, and dark-market flag (from campaign category).

Search results show cost information next to each streamer name, depending on the payment strategy: PPV/PPVA → CPM fields, CPA/CPC → respective cost fields.

**Locking other fields:** when the streamer list is populated and not in exclude mode, agencies, languages, countries, gender, age, 18+, and tags are **locked** (Brand Awareness and Extension).

**Forms:** Brand Awareness, Performance, Preroll, Extension.

---

## Creator targeting — Streamers (Special Project)

A streamer table with **individual pricing** for each streamer. Price is set in the advertiser's currency (from `campaignStructure.advertiser.wallet.currency`). Streamers are added via search.

**Forms:** **Special Project** only.

---

## Creator targeting — Languages

Multi-select for streamer languages with include / exclude mode. Options from `dictStore.all.languages`.

**Forms:** Brand Awareness, Performance, Preroll, Extension.

---

## Creator targeting — Countries

Multi-select for streamer countries with include / exclude mode. Options from `dictStore.all.countries`.

**Forms:** Brand Awareness, Performance, Preroll, Extension.

---

## Creator targeting — Gender

Gender selector for target streamer audience. Options from `dictStore.campaigns.gender`.

**Forms:** Brand Awareness, Extension.

---

## Creator targeting — Age

Streamer age range: from / to. Hard-coded range 18–65. "From" and "to" values constrain each other.

**Forms:** Brand Awareness, Extension.

---

## Creator targeting — Age restriction (18+)

Checkbox `targeting.mature` — allow placement on channels marked 18+.

**Forms:** Brand Awareness, Extension.

---

## Creator targeting — Tags

Multi-select for content tags with include / exclude mode. Options from `dictStore.all.tags`.

**Forms:** Brand Awareness, Performance, Preroll, Extension.

---

## Audience estimate

Read-only. Shows estimates: **impressions**, **reach**, **streamer count**. Calculation is triggered automatically when targeting fields change (calls `formAdsetStore.calculateAudience`).

**Forms:** Brand Awareness, Extension.

---

## Audience targeting — Countries

Multi-select for viewer audience countries with include / exclude mode. Options from `dictStore.all.countries`.

Values are passed to the middlepage, where they are used to verify whether the client matches these settings before redirecting to the product URL.

**Forms:** all types.

---

## Audience targeting — Devices

Multi-select for viewer audience devices with include / exclude mode. Options from `dictStore.all.devices`.

Values are passed to the middlepage, where they are used to verify whether the client matches these settings before redirecting to the product URL.

**Forms:** all types.

---

## Product URL

URL the user is redirected to from the intermediate page (middlepage) after all checks pass and all pixels fire. The middlepage template lives in the backend project; the script responsible for validation and pixels is in a separate repository along with its documentation.

Two fields: general (`productUrl.general`) and mobile (`productUrl.mobile`). General URL is required, mobile is optional.

**Forms:** Performance, Preroll.

---

## Short URL

Non-editable field with a shortened version of the product URL. Copy-to-clipboard available.

**Forms:** **Performance** only.

---

## Chatbot text

Text posted to the stream chat by the chatbot.

**Forms:** **Performance** only.

---

## Video text

Video description accompanying the preroll.

**Forms:** **Preroll** only.

---

## Analytics pixel

URL pixel for tracking actions.

**Forms:** Performance, Preroll.

---

## Pixel script

Additional analytics script.

**Forms:** Performance, Preroll.

---

## Creative (upload)

Creative file upload. Format type depends on campaign type: `AdFormat.INTERACTIVE` (Performance) or `AdFormat.PREROLL` (Preroll). After upload, `verifyAttachment` is called for validation; on delete in edit mode — `deleteAttachment`.

**Forms:** Performance, Preroll.

---

## Legal markup (erid)

Read-only section: displays **Creative erid** and **Chatbot erid** when data exists in `adset.legalCompliance.erid`. Shown conditionally — only when the respective fields (`media`, `text`) are populated.

**Forms:** Performance, Preroll — **edit mode only**.

---

## Display frequency

Ad display frequency setting: preset from dictionary (`dictStore.campaigns.frequency`) or custom value (count + period from `dictStore.campaigns.frequencyPeriods`).

**Forms:** **Brand Awareness** only.

---

## Alert animation

Video upload for the conversion alert (`conversionAlert.animation`). Appears only with **CPA** or **PPVA** strategies.

**Forms:** **Brand Awareness** only (CPA / PPVA).

---

## Alert text

Text for the conversion alert. Appears only with **CPA** or **PPVA** strategies.

**Forms:** **Brand Awareness** only (CPA / PPVA).
