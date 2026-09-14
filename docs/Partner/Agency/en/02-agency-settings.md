# Agency — Payout Settings

Agency payout settings define the rules for compensating streamers for ad impressions. Available only for regular agencies (not Uplify). Editing is restricted to users with the Admin role.

---

## Location

**Overview** tab → "Creators payout" section (`AgencySettings` component).

---

## Settings Structure

### Third-Party Participation

The `streamersParticipate` checkbox allows third-party partners to place ads on the agency's streamers. When enabled, external rate fields become visible.

### Commission

The `commission` field — the agency's commission percentage. Used for campaigns with individual agreements or when streamer rates are not configured.

### CPM/CPA/CPC Rates

Rates are set per ad format. Editable formats:

| Format | Description |
|---|---|
| Fullscreen (Overlay 50%) | Full-screen overlay |
| PiP (Overlay 15%) | Picture-in-Picture |
| Custom | Custom format |
| Interactive | Interactive format |
| Preroll | Pre-Roll video |

For each format, up to four rate groups can be configured:

| Group | Field in `TCPM` | When available |
|---|---|---|
| Internal rates | `internalCpm` | Always |
| External rates | `externalCpm` | When `streamersParticipate = true` |
| Dark market internal | `darkMarketInternalCpm` | When `useDarkMarket = true` |
| Dark market external | `darkMarketExternalCpm` | When both flags are enabled |

### Rate Field Placeholders

The `CostInputs` component, which renders CPM/CPA/CPC input fields, uses base rates from the campaign dictionary as placeholders:

| Type | Source |
|---|---|
| CPM (per format) | `dictStore.campaigns.agenciesPayableCpm[format]` |
| CPA | `dictStore.campaigns.agenciesPayableCpa` |
| CPC | `dictStore.campaigns.agenciesPayableCpc` |

These values appear as hints in empty fields so the admin can see current base rates when configuring custom ones.

### Dark Market

The `useDarkMarket` checkbox enables elevated rates for "dark market" categories (gambling, casino, crypto, etc.). When enabled, additional dark-market rate fields appear.

### Categories Stop List

The "Categories stop list" section (`ignoredCategories`) lets the agency select campaign categories that will be automatically hidden from the agency's streamers in the In-stream ads section. Categories come from the global dictionary `dictStore.all.campaignsCategories`.

---

## Saving

The form is submitted via `agencyStore.updateData()` → `POST partner/agency/save`. The payload includes all agency fields: `commission`, `streamersParticipate`, `useDarkMarket`, `cpm`, `ignoredCategories`.

> After saving, `fetchData()` does not re-fetch data from the server (short-circuits on `if (this.data) return`). UI updates come from form reactivity, but server-side normalizations won't be reflected until a full page reload.

---

## Per-Streamer Rate Overrides

In addition to agency-wide rates, individual rates can be set for each streamer. This is done via the "Settings" sidebar on the **Creators** tab (see [03-streamers](03-streamers.md) for details).

The override structure mirrors agency rates (`TCPM`) but applies to a specific streamer via `POST partner/agency/streamer/:id/save`.
