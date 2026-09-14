# Agency — Overview

The **Agency** section (labeled "Creators" in the UI) is the agency management panel within the partner dashboard. Partners use it to manage connected streamers, configure payout rates, browse ad campaigns, and handle billing.

---

## Key Concepts

| Concept | Description |
|---|---|
| **Agency** | A partner organization with attached streamers. Each agency has its own `id`, payout settings, and wallet |
| **Uplify agency** | A special agency with `id === 1`. Shows a reduced UI: only the overview with the referral program and transaction history |
| **Streamer (Creator)** | A content creator attached to the agency. The agency manages their rates and views their stats |
| **Referral link** | A link to invite new streamers. Available to all agencies |
| **Dark market** | Elevated rates for categories like gambling, casino, crypto |
| **CPM / CPA / CPC** | Payment models: per thousand impressions / per action / per click |

---

## Module Architecture

```
Agency/
 ├── Agency.vue              — root component with tabs
 ├── types/                  — Tab enum
 ├── consts/                 — EDITABLE_FORMATS
 ├── locales/                — i18n (en, ru, es, pt)
 ├── api/                    — 17 endpoint functions
 ├── store/                  — 6 Pinia stores
 ├── sections/               — tab-level components
 │    ├── Overview/          — overview + settings / referral list
 │    ├── History/           — transaction history (Uplify only)
 │    ├── Streamers/         — streamer management
 │    ├── AdsetsActive/      — active campaigns
 │    ├── AdsetsClosed/      — closed campaigns
 │    └── Billing/           — billing
 └── components/             — shared components (AdsetCard, AdsetInfo, CostInputs, …)
```

---

## Tabs

The available tabs depend on the agency type:

| Tab | URL `?tab=` | Regular agency | Uplify agency |
|---|---|---|---|
| Overview | `overview` | Yes | Yes |
| Transaction history | `history` | — | Yes |
| Creators | `streamers` | Yes | — |
| Campaigns | `adsets-active` | Yes | — |
| Closed | `adsets-closed` | Yes | — |
| Billing | `billing` | Yes | — |

The active tab is synced with the `?tab=` query parameter in the URL. Defaults to `overview`.

---

## Initialization

When `Agency.vue` mounts:

1. The campaign dictionary is loaded via `dictStore.getCampaignDictionary(locale, BRAND_AWARENESS)`. It provides data consumed by child components:
   - `campaignsCategories` — list of campaign categories (used for the stop list in agency settings)
   - `agenciesPayableCpm` / `agenciesPayableCpa` / `agenciesPayableCpc` — base rates per format (used as placeholders in rate input fields)
   - `currencies` — currency reference (used to display the currency icon in forms)
2. `agencyStore.fetchData()` is called, which:
   - Fetches agency data (`GET partner/agency`)
   - Fetches referral data (`GET partner/referral`)
   - If this is the Uplify agency — additionally fetches the referral streamers list

> Agency data is fetched once and cached in the store. Subsequent `fetchData()` calls return immediately if `data` is already populated.

---

## Roles and Access

The section is available to partners with an attached agency. Within the section, access level is determined by the `roleExtended` field from the partner profile:

- **Admin** — full access to edit rates (agency-wide and per-streamer)
- **Other roles** — read-only view, forms are disabled
