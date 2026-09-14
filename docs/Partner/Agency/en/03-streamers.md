# Agency — Streamer Management

The **Creators** tab contains the list of streamers attached to the agency. Available only for regular agencies (not Uplify).

---

## Streamers List

A table with "Load more" pagination and debounced search.

| Column | Description |
|---|---|
| Creator | Streamer name |
| Last activity | Date of last activity |
| Balance | Streamer wallet balance |
| Campaign | Number of campaigns |

The search (`Search`) calls `fetchStreamers(1, false, query)` with a delay, resetting pagination. The "Load more" button calls `fetchStreamers(page + 1, true)`, appending the next page.

---

## Streamer Statuses

Each streamer has three status flags displayed as icons with popover tooltips:

| Flag | Condition | Meaning |
|---|---|---|
| `checkListStatus` | `false` | Streamer hasn't completed onboarding |
| `payableStatus` | `false` | Payout not configured |
| `ctrStatus` | `false` | Low CTR across campaigns |

Statuses are display-only — no API call on click.

---

## "Settings" Sidebar

Opens when clicking on a streamer → settings icon. Loads data via `GET partner/agency/streamer/:id/info`.

Contains a form for individual streamer rates:

- **Custom payout** — CPM/CPA/CPC rates per format, mirroring agency settings
- **Dark market rates** — if `useDarkMarket` is enabled at the agency level

### Currency Icon

The currency sign displayed in rate input fields is resolved via the `dictStore.all.currencies` dictionary. The component finds a currency whose `id` matches `agencyStore.data.wallet.currency` and uses its `icon` field. Falls back to `$` (USD) if not found.

### Rate Placeholders

Rate fields are rendered by the `CostInputs` component. If the streamer has an individual rate set, it is shown as the placeholder. Otherwise, the base rate from the campaign dictionary (`dictStore.campaigns.agenciesPayableCpm/Cpa/Cpc`) is used. See [02-agency-settings](02-agency-settings.md) for more on the placeholder mechanism.

### Field Availability

Field availability depends on:
- `agencyStore.data.streamersParticipate` — whether external rate fields are shown
- `agencyStore.data.useDarkMarket` — whether dark-market rate fields are shown
- User role (`isAdmin`) — whether editing is allowed

Save: `POST partner/agency/streamer/:id/save` via `streamersStore.updateStreamerInfo()`.

---

## "Campaigns" Sidebar

Opens when clicking on a streamer → campaigns icon. Loads data via `GET partner/agency/streamer/:id/report`.

Shows a table of the streamer's campaigns with columns: campaign title, income, views, CTR, status.

---

## Caching and Data

- The streamers list is not cached between loads — every request hits the server
- Streamer info is cached by `streamerId` — reopening the same streamer doesn't trigger a request
- Opening a different streamer replaces the previous data
