# FormCreative — Create and Edit Flow

User-visible behavior: steps, buttons, validation, saving, and leaving the screen.

---

## Creating a Creative

1. The user navigates to creative creation from the ad set screen. **Campaign type** is determined from the campaign slug in the URL.
2. In parallel: the **campaign dictionary** for the relevant type, the **advertiser list**, the **campaign structure** (for sidebar navigation), and the **ad set data** (to determine format) are loaded.
3. While loading, a form skeleton is shown.
4. Once loaded, a blank creative settings form opens (specific section depends on campaign type).
5. The primary action is **Save**. After a successful save, the user **does not return to a list** — the app redirects to the **edit** screen for the newly created creative.

---

## Editing a Creative

1. On open, creative data is fetched (`fetchCreative`) along with the campaign dictionary and ad set data. Campaign type is determined from the API response.
2. If loading **fails** (creative, ad set, or campaign structure), an error message is shown with a **Retry** button. Retrying clears error flags and re-triggers all fetches.
3. A **status toggle** (on / off) may appear at the top of the form. Changing status calls `changeStatus` at the campaign level (entity type `CREATIVES`), then updates the creative.

---

## Saving and Validation

- While the save request is in progress, the form is **locked** (the Save button shows a loading indicator) to prevent double submission.
- If **required fields** are missing, save does not go through: invalid fields are highlighted.
- After a successful save, a confirmation is shown (3 seconds), then on create — redirect to the edit screen.

### Required Fields by Type

| Campaign type | Required fields |
|---|---|
| Brand Awareness | Title, product URL (general), chatbot text |
| Extension | Title, product URL (general), preview file |
| Special Project | Title, product URL (general), chatbot text |

> Click pixels are validated as URLs when filled. Mobile product URL is validated as a URL but is not required.

---

## Unsaved Changes

If the user modified data compared to an empty draft (creating) or the last saved version (editing), a confirmation dialog appears when attempting to leave via `CampaignLayout.showCloseDialog`.

---

## Where Back / Close Leads

The return route depends on campaign type and mode:

| Mode | Route |
|---|---|
| Create (Brand Awareness) | Brand Awareness creatives list |
| Create (Extension) | Extension creatives list |
| Create (Special Project) | Special Project creatives list |
| Edit | Determined by type: `BRAND_AWARENESS_CREATIVES`, `EXTENSION_CREATIVES`, or `SPECIAL_PROJECT_CREATIVES` |
