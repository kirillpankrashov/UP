# Agency — Referral Program

The referral program allows an agency to attract new streamers via a unique link and earn a share of their revenue. Basic referral functionality (link + balance) is available to all agencies; extended features (streamers list + history) are exclusive to the Uplify agency.

---

## Referral Link

Displayed in the "Invitation link" section on the **Overview** tab, if the agency has a referral (`referralStore.referral?.link`).

The `ReferralLink` component shows the link with a copy button (via `useClipboard`). A streamer who registers through this link is automatically attached to the agency.

> There is no "attach referral" endpoint in the codebase. Attachment happens on the backend during registration via the link. A `detachReferral` endpoint exists (`POST partner/referral/detach`) but is not wired to the UI.

---

## Balance and Stats

The `Balance` component on the **Overview** tab displays a summary. The data source depends on the agency type:

| Metric | Regular agency | Uplify agency |
|---|---|---|
| Invited | From agency data | `referral.invited` |
| Amount to be paid | From agency wallet | `referral.balance` |
| Currency | From agency wallet | `referral.currency` |

---

## Referral Streamers List (Uplify Only)

For the Uplify agency (`id === 1`), a `StreamersList` drawer is shown on the **Overview** tab listing referred streamers.

Data is loaded via `GET partner/referral/creators` during module initialization. The list contains streamer names and their lifetime earnings.

The "Creators list" link on Overview opens this drawer (for regular agencies, it switches to the Creators tab instead).

---

## Transaction History (Uplify Only)

The **Transaction history** tab (`Tab.HISTORY`) is available only to the Uplify agency.

### History Table

Loaded via `GET partner/referral/history` with pagination. Displays:

| Column | Description |
|---|---|
| Date | Transaction date |
| Payment per day | Daily payout amount |
| Details | Detail button |

The section header shows the total amount for all time (`history.amount`).

### Detail View

Clicking a row opens a drawer with a breakdown for that specific day. Loaded via `GET partner/referral/history/detail?date=YYYY-MM-DD`.

Shows the list of streamers who generated revenue on that day, with amounts.

---

## Data Loading

Referral data is loaded in a cascade during Agency initialization:

```
agencyStore.fetchData()
 └── referralStore.fetchReferral()           — GET partner/referral
      └── referralStore.fetchReferralStreamers()  — GET partner/referral/creators (id === 1 only)
```

All three requests have short-circuit logic: if data is already present, a repeat call skips the request.
