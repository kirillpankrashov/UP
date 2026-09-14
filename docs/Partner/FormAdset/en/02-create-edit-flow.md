# FormAdset — Create and Edit Flow

User-visible behavior: steps, buttons, validation, saving, and leaving the screen.

---

## Creating an Ad Set

1. The user navigates to ad set creation from the campaign screen. **Campaign type** is determined from the campaign slug in the URL — it decides which form opens.
2. In parallel: the **campaign dictionary** for the relevant type, the **advertiser list**, and the **campaign structure** (for sidebar navigation) are loaded.
3. While loading, a form skeleton is shown.
4. Once loaded, a blank ad set settings form opens (specific section depends on campaign type).
5. The primary action is **Save**. After a successful save, the user **does not return to a list** — the app redirects to the **edit** screen for the newly created ad set.

---

## Editing an Ad Set

1. On open, ad set data is fetched (`fetchAdset`) along with the campaign dictionary. Campaign type is determined from the API response.
2. If loading **fails**, an error message is shown with a **Retry** button. Retrying clears error flags and re-triggers the fetch.
3. A **status toggle** (on / off) may appear at the top of the form. Changing status calls `changeStatus` at the campaign level, then updates the ad set.

---

## Duplicating

In edit mode, a **Duplicate** button is available:

1. The current ad set is saved to the store (`formAdsetStore.adset`).
2. The app navigates to the ad set **create** screen within the same campaign.
3. The create form picks up data from the store for pre-filling.

> Actual pre-fill behavior depends on how each form section handles store data during initialization. Verify on staging.

---

## Saving and Validation

- While the save request is in progress, the form is **locked** to prevent double submission.
- If **required** fields are missing, save does not go through: invalid fields are highlighted and the view scrolls to the first error.
- After a successful save, a confirmation is shown.

---

## Unsaved Changes

If the user modified data compared to an empty draft (creating) or the last saved version (editing), a confirmation dialog may appear when attempting to leave.

---

## Where Back / Close Leads

- The return route depends on the campaign type and mode (create / edit).
- When **creating** — returns to the campaign screen or the campaign list for the relevant type.
- When **editing** — the return route is determined by the child form (`closeAndReturnRoute` method).
