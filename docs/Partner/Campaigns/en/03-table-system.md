# Campaigns — Table System

The section contains 13 tables — one for each combination of campaign type and entity level. All tables use a uniform pattern for loading, pagination, and column visibility. Column sets by campaign type are described in [02-campaign-types.md](./02-campaign-types.md).

---

## Column Visibility Settings

On the right side of the table there is a column with a filter icon. Clicking it opens a popover with a checkbox for each toggleable column. **ID** and **Name** columns are always visible.

Settings are persisted in `localStorage` and applied on next visit. Each table has its own set of default values.

---

## Pagination

All tables are paginated: page size is determined by the API, the current page comes from the `page` URL query parameter. Pagination is hidden when there is only one page. Changing the page updates the URL and reloads data.

---

## Loading States

| State | What Is Shown |
|---|---|
| Initial load | Table skeleton placeholder |
| Subsequent loads | Loading indicator over content |
| Empty list | "You have no campaigns" text |
| Error | Logged; no dedicated UI |

> Skeleton placeholders respect current column visibility settings — placeholders are only rendered for visible columns.
