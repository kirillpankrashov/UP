# Agency — Ad Campaigns

The **Campaigns** and **Closed** tabs display ad sets available to the agency's streamers. Visible only to regular agencies (not Uplify).

---

## Active and Closed Campaigns

Two tabs with identical mechanics but different data:

| Tab | API | Store |
|---|---|---|
| Campaigns (active) | `GET partner/agency/:campaignType/active` | `partner-agency-adsets-active` |
| Closed | `GET partner/agency/:campaignType/closed` | `partner-agency-adsets-closed` |

Default `campaignType = BRAND_AWARENESS`. Campaign type can be switched via the UI (`AdsetsList` component).

---

## Ad Sets List

The `AdsetsList` component renders ad set cards with pagination. Each card (`AdsetCard`) contains:

- Campaign and ad set title
- Tags (format, limits, extension status)
- Indicators (views, income, CTR)
- Buttons: open info, open streamers report

---

## "Campaign Info" Sidebar

Opens on card click. Loads data via `GET partner/agency/:campaignType/:slug/info`.

Displays:

| Field | Description |
|---|---|
| Dates | Campaign start and end |
| Bid cap | Maximum bid |
| Frequency | Display frequency |
| Format | Ad format |
| Payment type | Payment model (CPM/CPA/CPC) |
| Category | Advertiser category |
| Description | Campaign description |

The **Creative preview** section shows creatives from the `ads` array. Display varies by campaign type:

- **Brand Awareness** — attachments (images, video), chatbot text, product link
- **Performance** — similar, but emphasizing actions (CPA)

---

## "Campaign Report" Sidebar

Opens via the "Report" button on a card. Loads `GET partner/agency/:campaignType/:slug/report`.

A table of streamers participating in the ad set:

| Column | Description |
|---|---|
| Creator | Streamer name |
| Income | Revenue |
| Views | Impressions |
| CTR | Click-through rate |
| Status | Participation status |

---

## Campaign Type from Slug

When opening an ad set, the campaign type is determined from the slug via the `parseSlug()` utility. This ensures correct API routing even if the user has switched between types.

---

## Data

- Ad set info is cached by `slug` — reopening the same ad set doesn't trigger a request
- Switching campaign type reloads the list from page 1
- Streamers per ad set are paginated separately
