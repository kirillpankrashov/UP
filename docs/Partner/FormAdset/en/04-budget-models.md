# FormAdset — Budget Models

Budget models define **how placement costs are calculated** and **what the advertiser pays for**. The model depends on the campaign type; some types let the user choose a strategy.

---

## Brand Awareness — Payment Strategies

Strategy is selected from a dropdown (`dictStore.campaigns.strategyPaymentTypes`). Four options are available:

### PPV (Pay Per View)

Pay for impressions.

| Field | Description |
|---|---|
| `bidCap` (CPM) | Bid per 1,000 impressions |
| `impressions` | Number of impressions |
| **Total** | (impressions / 1,000) × bidCap |

### CPC (Cost Per Click)

Pay for clicks.

| Field | Description |
|---|---|
| `cpc` | Cost per click |
| `clicks` | Number of clicks |
| `cpcDailyLimit` | Daily spend limit |
| **Total** | cpc × clicks |

### CPA (Cost Per Action)

Pay for conversions.

| Field | Description |
|---|---|
| `cpa` | Cost per conversion |
| `conversions` | Number of conversions |
| `cpaDailyLimit` | Daily spend limit |
| **Total** | cpa × conversions |

> With the CPA strategy, the form shows a **targets** section — target EVR (expected conversion rate) — and an **alerts** section (animation and text for the conversion alert).

### PPVA (Pay Per View + Action)

Combined model: pay for impressions **and** conversions. The most complex strategy.

| Field | Description |
|---|---|
| `bidCap` (CPM) | Bid per 1,000 impressions |
| `impressions` | Number of impressions |
| `margin` (%) | Margin |
| `agencyCommission` (%) | Agency commission |
| `cpmPercent` (%) | CPM share in breakdown |
| `cpa` | Cost per conversion |
| **Total** | (impressions / 1,000) × bidCap |

The total budget is calculated the same way as PPV. The form then shows a **breakdown**:

- **Margin** = total × margin%
- **Agency commission** = total × agencyCommission%
- **Remainder** = total − margin − commission → split by `cpmPercent` into CPM share and CPA share for creators
- **Conversions** = total / cpa (rounded)
- **Creator CPM** and **Creator CPA** — derived rates from the breakdown

PPVA also triggers the **targets** section (target CTR) and the **alerts** section.

---

## Performance and Preroll — Payout Type

Instead of a strategy, a **payout type** (`PayoutType`) is used:

### Impressions

| Field | Description |
|---|---|
| `bidCap` | Bid per 1,000 impressions |
| `impressions` | Number of impressions |
| **Total** | (impressions / 1,000) × bidCap (in currency) |

### Actions

| Field | Description |
|---|---|
| `bidCpa` | Cost per action |
| `budget` | Total budget |
| **Total** | floor(budget / bidCpa) — action count |

> In the targets section, Performance and Preroll show **target CTR** and **target CPA** fields.

---

## Extension — PPV

Extension uses a strategy selector from the dictionary (like Brand Awareness), but the current implementation **only renders the PPV** UI section. Other strategies from the dictionary have no corresponding budget components.

| Field | Description |
|---|---|
| `bidCap` (CPM) | Bid per 1,000 impressions |
| `impressions` | Number of impressions |
| **Total** | (impressions / 1,000) × bidCap |

---

## Special Project — PPP (Pay Per Placement)

Fixed strategy; no selection provided.

| Field | Description |
|---|---|
| `bidCap` | Bid (displayed as CPM in the UI) |

> No total is calculated on the form. Placement cost per streamer is set individually in the **streamer table** — each streamer has their own price in the advertiser's currency.

---

## How Strategy Connects to Other Form Sections

| Strategy | Targets | Alerts | Frequency |
|---|---|---|---|
| PPV (BA) | target CTR | − | + |
| CPC (BA) | − | − | + |
| CPA (BA) | target EVR | + (animation, text) | + |
| PPVA (BA) | target CTR | + (animation, text) | + |
| Impressions (Perf/Preroll) | target CTR + CPA | − | − |
| Actions (Perf/Preroll) | target CTR + CPA | − | − |
| PPV (Extension) | target CTR | − | − |
| PPP (Special Project) | − | − | − |
