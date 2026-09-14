# Agency — Billing

The **Billing** tab contains the agency's legal details and invoice history. Available only to regular agencies (not Uplify).

---

## Details Form

The `Form` component displays two sections:

### Company information

| Field | Description |
|---|---|
| Name | Business name |
| E-mail | Contact email |
| Address | Company address |
| Phone | Phone number |

### Payment details

| Field | Description |
|---|---|
| Bank name | Bank name |
| Bank account name | Account name |
| Bank account holder address | Account holder address |
| Bank address | Bank address |
| Bank account number | Account number |
| BIC / SWIFT code | SWIFT code |
| Routing number | Routing number |

Data is loaded via `GET partner/agency/billing` when navigating to the tab. Save: `POST partner/agency/billing/save`.

---

## Invoices

The `Invoices` component shows a paginated table of agency wallet transactions.

| Column | Description |
|---|---|
| Date | Transaction date |
| Amount | Amount |
| Invoice | Document link |

Data is loaded via `GET agency/wallet/transactions`.