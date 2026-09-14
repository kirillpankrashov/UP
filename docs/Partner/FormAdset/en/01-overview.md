# FormAdset — Overview

## What It Is

A Partner dashboard screen for **creating** or **editing an ad set (group)** within a campaign. The ad set sits between campaign and creative: it defines **budget**, **targeting**, **schedule**, and **format** for a placement.

For the campaign form screen, see [FormCampaign — Overview](../../FormCampaign/en/01-overview.md).

---

## Key Ideas

- The ad set form depends on the **campaign type** — fields, budget model, and targeting differ significantly.
- **Creating** — opens a blank form; campaign type is inferred from the URL (campaign slug).
- **Editing** — data is loaded from the server; campaign type is determined from the API response.
- **Duplicating** — from edit mode, users can navigate to a create screen with the current ad set's data pre-filled.

---

## Screen Structure

```
CampaignLayout (title + sidebar structure navigation)
 ├── While loading: form skeleton
 ├── On error: message + Retry button
 ├── Settings form (varies by campaign type)
 │    └── BrandAwareness | Performance | Preroll | Extension | SpecialProject
 └── Action bar: Back, Save, Duplicate (edit mode)
```

---

## Campaign Types and Ad Set Forms

Each campaign type has its **own form section** with a unique field set. Full matrix: [forms by campaign type](./03-forms-by-campaign-type.md).

| Campaign type | Budget model | Form highlights |
|---|---|---|
| Brand Awareness | PPV / CPC / CPA / PPVA (strategy selection) | Most complete form: view time, frequency, conversion alerts, extended targeting |
| Performance | Impressions / Actions (payout type) | Chatbot, creative, analytics pixels, legal markup |
| Preroll | Impressions / Actions | Similar to Performance, with video description instead of chatbot |
| Extension | PPV (strategy from dictionary) | Like Brand Awareness, but without view time, frequency, and alerts |
| Special Project | PPP (fixed strategy) | Custom streamer table with prices, format settings |

---

## Backend Dictionaries

### Campaign dictionary

Loaded when the screen opens: `getCampaignDictionary(locale, campaignType)`. Used for:

| On-screen field / block | `dictStore` field | What it provides |
|---|---|---|
| Ad format | `campaigns.formats` | Format list (excluding `isExternalFormat`) |
| Platform | `campaigns.platforms` | Platform list (Twitch, YouTube, etc.) |
| Payment strategy (BA, Extension, SP) | `campaigns.strategyPaymentTypes` | PPV, CPC, CPA, PPVA, PPP |
| Display frequency (BA) | `campaigns.frequency`, `campaigns.frequencyPeriods` | Presets and periods |
| Gender (targeting) | `campaigns.gender` | Male / female / any |
| Agencies (targeting) | `campaigns.agencies` | Agency list with CPM ranges |

### Global Partner dictionary

| On-screen field / block | `dictStore` field | What it provides |
|---|---|---|
| Languages (targeting) | `all.languages` | Streamer language list |
| Countries (creator targeting) | `all.countries` | Country list |
| Devices (audience targeting) | `all.devices` | Device list |
| Tags (targeting) | `all.tags` | Content tag list |
| Time zone | `all.timeZones` | Time zone list |
| Campaign categories | `all.campaignsCategories` | Dark market detection for streamer search |

---

## Data Flow

The Pinia store `useFormAdsetStore` manages:

- **`adset`** — loaded/updated ad set data (typed union across campaign types).
- **`currentCampaignType`** — current campaign type; determines which form section renders and which APIs are called.
- **`audience`** — audience estimation result (impressions, reach, streamer count).
- Loading and error flags.

On create the store calls `createAdset`, on edit — `updateAdset`; the specific API endpoint is chosen by `currentCampaignType`. After a successful create, the router redirects to the edit screen for the new ad set and the campaign structure is refreshed.

**Caching:** read responses are cached on the client; create and update requests invalidate related cache entries.
