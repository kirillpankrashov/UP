# Campaigns — Status and Actions

From the campaign list, only a limited set of actions is available: toggling visibility, creating, editing, and navigating to analytics.

---

## Status Fields

| Field | Purpose |
|---|---|
| `visible` | Entity on/off state. The only status manageable from the list |
| `closed` | Campaign locked by the system. Cannot be enabled from the UI |
| `published` | Whether moderation has been passed |

### Status Toggle

The Status column displays an On / Off switch. On toggle, a request is sent to the server; on success, the status is updated locally. List caches are invalidated.

### When the Toggle Is Disabled

| Level | Disabled When |
|---|---|
| Campaign | Campaign is closed (`closed`) |
| Ad Set | Parent campaign is off |
| Creative | Parent ad set or campaign is off |

Hovering over a disabled switch shows a tooltip with the reason:
- "Parent disabled" — for ad sets and creatives
- "Contact support to turn on" — for closed campaigns

### Moderation

The Moderation column shows a text status:
- "Complete" (green) or "Pending" (orange)

Moderation is not manageable from the list — it is an informational column.

---

## Creating

The create button changes behavior depending on the current tab:

| Tab | Action |
|---|---|
| Campaigns | Navigate to the campaign creation page |
| Groups | Open a drawer to pick a campaign, then navigate to ad set creation |
| Creatives | Open a drawer to pick an ad set, then navigate to creative creation |

### Sidebar Panels

**CampaignsSidebar** — a drawer with a paginated list of campaigns of the current type. Selecting a row navigates to ad set creation.

**AdsetsSidebar** — a similar drawer with a list of ad sets. Selecting a row navigates to creative creation.

Sidebar panels load data independently of the main table filters.

---

## Editing

The ID and Name columns are links to the edit page of the corresponding entity (campaign, ad set, or creative).

---

## Analytics

Every table row displays a chart icon. Clicking it navigates to the analytics page with the campaign's date range. For ad sets and creatives, analytics opens in the context of the parent campaign and navigates to the creatives tab.

> Special Project has analytics disabled.

---

## Unimplemented Actions

Locale keys exist for "Duplicate", "Remove", and "Download Report" actions, but they are not wired to any UI in the current codebase.
