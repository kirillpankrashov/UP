# FormCampaign — Overview

## What It Is

A Partner dashboard screen where users **create a new campaign** or **edit an existing one**. Layout matches other campaign-related screens: title, and when editing, sidebar navigation for the campaign structure (once it has loaded).

For list views, tabs, and tables, see [Campaigns — Overview](../../Campaigns/en/01-overview.md).

---

## Key Ideas

- **All campaign types** are supported — the same set as in the Campaigns area (see [campaign types](../../Campaigns/en/02-campaign-types.md)).
- **Creating** a campaign is usually **two steps**: pick a type, then fill in settings and save.
- **Editing** opens straight to settings; data is loaded when the card opens.

---

## Screen Structure

```
Title (campaign name or fallback text)
 ├── When creating: either type selection or settings form
 ├── When editing: settings form
 └── Bottom action bar: Back / Cancel and Next or Save
```

On the type step, some types may appear under a separate "coming soon" list. Card content and copy come from the backend (see [Backend dictionaries](#backend-dictionaries)).

---

## Campaign Types (Product Names)

| Name in docs | How it often appears in the UI |
|---|---|
| Brand Awareness | Sponsorship |
| Performance | Interactive |
| Preroll | Preroll |
| Extension | Extension |
| Special Project | Special project |

What each type means in lists and metrics is covered in [campaign types](../../Campaigns/en/02-campaign-types.md); this folder documents only the **campaign form** screen.

---

## Backend dictionaries

The screen uses two dictionary sources (both are API responses; content is defined on the server).

### Global Partner dictionary

Loaded for the Partner UI **locale** (same as on other dashboard screens). On the campaign form it supplies:

| On-screen field / block | `dictStore` field | What the backend provides |
|---|---|---|
| **Campaign category** (in campaign settings) | `all.campaignsCategories` | Category list with labels (plus flags such as dark market) |
| **Time zone** (when the field is shown for the type) | `all.timeZones` | Time zone list with labels |

### Campaign dictionary

Fetched **when the form screen opens**. The request includes **locale** and the **campaign type in context** (from the URL when creating, or from the opened record when editing). On this form the response is used for:

| On-screen field / block | `dictStore` field | What the backend provides |
|---|---|---|
| **Type selection step** (**create** only) | `campaigns.types` | Types list: type id, **card title and description**, icon, **selectable for creation** flag; non-selectable types appear under "coming soon" |
| **Advertiser holding** | `campaigns.holdings` | Holdings (title, description, logo, etc.) |
| **Media agency** | `campaigns.mediaAgencies` | Media agencies with titles |
| **Affiliate networks** (when the block exists for the type) | `campaigns.affiliateNetworks` | Networks with titles and currency-related data |

> The **Advertiser** dropdown is **not** from the campaign dictionary: the list comes from a **separate request** and is filtered by the selected holding.

The same campaign-dictionary payload often includes platforms, creative formats, and other entities **for other screens** (ad sets, creatives). The **campaign form** does not bind those to fields here — that is expected.

---

## Data Flow

A single Pinia store `useFormCampaignStore` holds the **current campaign type**, **wizard step** (type selection vs settings), the loaded **campaign** and **structure** for the sidebar when editing, plus loading flags and a load-error flag.

When editing, the store fetches structure and campaign data; on save it calls **create** or **update** through the API pair that matches the campaign type. Leaving the screen clears the store state.

**Caching:** **read** responses for the campaign and its structure (sidebar) are kept on the client for **up to one hour**, same idea as the Campaigns lists in [Campaigns — Overview](../../Campaigns/en/01-overview.md). **Create** and **update** requests invalidate related cache entries (campaign payload, structure, and other linked Partner data for that type) so stale data is not reused after a save.
