# Campaigns — Filters and Search

Search and filtering work via URL query parameters. Any change triggers a data reload from the API.

---

## Search

A text input with a 600 ms debounce. Supports two modes:

- **By name** — regular text is sent as the `name` parameter
- **By slug** — if the input is recognized as a campaign slug, it is sent as the `slug` parameter

Changing the search resets the page to the first one.

---

## Filters

Three filters, each added via an "Add Filter" popover:

| Filter | Description | Availability |
|---|---|---|
| Status | Entity on/off state | Always |
| Platform | Twitch, YouTube, Trovo, VK Play | Groups tab only |
| Advertiser | Pick an advertiser from a list | Always |

### Behavior

- If the URL already contains a filter parameter, the filter is displayed automatically on page load.
- When switching tabs, filter availability is recalculated: Platform is only available for groups.
- Each filter can be closed via a button — the parameter is cleared from the URL.
- If all filters are already active, the "Add Filter" button is hidden.

> Sidebar panels (for creating ad sets and creatives) load data independently of the main table filters — only the page number is sent.
