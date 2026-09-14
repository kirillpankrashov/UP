# FormCampaign — Create and Edit Flow

User-visible behavior: steps, buttons, errors, saving, and leaving the screen.

---

## Creating a Campaign

1. **Type selection** — type cards (title, description, icon, whether the type can be chosen) come from the **campaign dictionary** on the backend; types **not yet available** to create appear separately under “coming soon” (details in [overview — Backend dictionaries](./01-overview.md)).
2. The button to continue to settings stays **disabled** until a type is selected.
3. **Back** or **cancel** on this step closes the flow and returns to the **campaign list for the relevant type** (from the link used to open the screen, or the type already chosen on step one).
4. After choosing a type — the **settings** step. **Back** returns to type selection (without closing the whole screen).
5. On the settings step the main action is **save**. After the **first successful save**, the user does not land on the list: they stay on the **edit** screen for the campaign that was just created (so they can review or adjust immediately).

---

## Editing a Campaign

1. When the card opens, campaign data is **loaded**. In parallel, the **campaign dictionary** for that campaign type is fetched — it feeds dropdowns in settings (holding, media agency, affiliate networks). While campaign data is loading, a waiting state is shown (e.g. a lightweight skeleton layout).
2. If loading **fails**, an error message appears with a **retry** action.
3. A **campaign status** block (on / off) may appear at the top of the form. It is saved with the other fields. **An enabled campaign is not sufficient on its own:** streamers see **ad sets** in their dashboard; a placement appears only when campaign, ad set, and creative are enabled and valid and the streamer matches ad set targeting (details in the [field reference](./04-field-reference.md)).

---

## Saving and Validation

- While save is in progress, the form is usually **locked** so the same data is not submitted twice.
- If **required** fields are missing, save does not go through: invalid fields are **highlighted** and the view **scrolls** to the first problem so it is clear what to fix.
- After a successful save, a short confirmation is shown (e.g. that the campaign was updated).

---

## Unsaved Changes and Closing

- If the user changed something compared to an **empty draft** (when creating) or the **last saved version** (when editing), trying to leave may show a **warning** about unsaved changes.
- Confirming leave is handled in the overall campaign layout (close / exit), not only via the bottom button bar.

---

## Where Close / Cancel Leads

- When **creating**, cancel or close returns to the **campaign list for the selected type** (sponsorship, interactive, preroll, etc.), not always the same section for every type.
- When **editing**, the user should return to the **list for that campaign type**. If for any type the app opens a different list section, treat it as something to verify on staging and align with the team (bug vs intended).
