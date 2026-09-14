# Campaigns — Overview

## What It Is

The Campaigns section is the central screen of the Partner dashboard for managing ad entities: campaigns, ad sets (groups), and creatives. All five campaign types share a single interface — a paginated table with search, filters, and an entity-level switcher.

## Entity Hierarchy

```
Campaign
 └── Ad Set (group)
      └── Creative
```

Each entity belongs to its parent: an ad set belongs to a campaign, a creative belongs to an ad set. A child entity's status depends on the parent's status (details in [05-status-and-actions.md](./05-status-and-actions.md)).

## Campaign Types

| Type | Tabs | UI Title |
|---|---|---|
| Brand Awareness | Campaigns, Groups, Creatives | Sponsorship campaigns |
| Performance | Campaigns, Groups | Interactive campaigns |
| Preroll | Campaigns, Groups | Preroll campaigns |
| Extension | Campaigns, Groups, Creatives | Extension campaigns |
| Special Project | Campaigns, Groups, Creatives | Special project campaigns |

> Performance and Preroll do not have a "Creatives" tab.

For details on how types differ, see [02-campaign-types.md](./02-campaign-types.md).

## Screen Structure

A single `Campaigns.vue` component serves all routes. The screen contains:

- **Tab switcher** — Campaigns / Groups / Creatives (set depends on the campaign type)
- **Search** — by name or slug
- **Filters** — status, platform, advertiser
- **Create button** — create a campaign, ad set, or creative
- **Table** — selected by campaign type and entity level (13 variants)
- **Sidebar panels** — drawers for picking a parent entity when creating an ad set or creative

The campaign type and entity level are derived from the current route. The default route (`/`) leads to Brand Awareness → Campaigns.

## Data Flow

A single Pinia store `useCampaignsStore` holds three collections — `campaigns`, `adsets`, `creatives` — with data for the table (item list, total count, page size, loading flags).

When the route, page, search, or filter changes, the store fetches data from the API (`GET partner/campaigns/{type}[/{entity}]`), writes it to the appropriate collection, and the table renders the result. API responses are cached for 1 hour.
