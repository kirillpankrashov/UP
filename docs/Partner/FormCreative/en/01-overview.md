# FormCreative — Overview

## What It Is

A Partner dashboard screen for **creating** or **editing a creative** within an ad set. The creative is the lowest level in the "campaign → ad set → creative" hierarchy: it defines **placement content** — uploaded files, URLs, chatbot text, analytics pixels.

For the ad set form screen, see [FormAdset — Overview](../../FormAdset/en/01-overview.md).

---

## Key Ideas

- The creative form depends on the **campaign type** — field sets, uploadable file types, and additional sections differ.
- **Supported types**: Brand Awareness, Extension, Special Project. Performance and Preroll **do not have a creative form** — content for these types is configured at the ad set level.
- **Creating** — opens a blank form; campaign type is inferred from the campaign slug in the URL.
- **Editing** — data is loaded from the server (`fetchCreative`); campaign type is determined from the API response.
- There is **no Duplicate button** — unlike FormAdset, the creative form only has "Back" and "Save".

---

## Screen Structure

```
CampaignLayout (title + sidebar campaign structure navigation)
 ├── While loading: form skeleton
 ├── On error: message + Retry button
 ├── Settings form (varies by campaign type)
 │    └── BrandAwareness | Extension | SpecialProject
 └── Action bar: Back, Save
```

---

## Campaign Types and Creative Forms

| Campaign type | Primary content | Form highlights |
|---|---|---|
| Brand Awareness | Video / ZIP (depends on ad set format) | Full form: file, product URLs, chatbot, QR code, Ad Tag (ADMNG), pixels, ERID |
| Extension | Banner / Quiz / Gallery (depends on format) | Specialized editors per format, preview file, no chatbot |
| Special Project | Video / ZIP (depends on ad set format) | Like Brand Awareness, but file requirements come from the dictionary (`formatRequirements`) |

### Where Creatives Are Displayed

- **Brand Awareness** — creatives are shown in the main **widget** (`src/modules/Widget`) embedded in the streamer's OBS.
- **Special Project** — creatives are shown in a dedicated **Special Project widget** (`src/modules/SpecialProjectWidget`), also embedded in the streamer's OBS.
- **Extension** — creatives are shown in the **Twitch Extension**. The extension's code and documentation live in a separate repository.

---

## Backend Dictionaries

The creative form uses the **campaign dictionary** (`getCampaignDictionary`), loaded when the screen opens.

| On-screen field / block | `dictStore` field | What it provides |
|---|---|---|
| File requirements (SP) | `campaigns.formatRequirements` | Textual file requirement descriptions for the ad set format |

> Most creative form data does not depend on dictionaries — it is user input (text, URLs, files). The dictionary is critical for Special Project, where file requirement descriptions are built dynamically.

---

## Data Flow

The Pinia store `useFormCreativeStore` manages:

- **`creative`** — loaded/created creative data (typed union: `IBrandAwarenessCreative | IExtensionCreative | ISpecialProjectCreative`).
- **`currentCampaignType`** — current campaign type; determines which form section renders and which APIs are called.
- `isFetchingCreative` and `fetchError` flags.

On create the store calls `createCreative(model)`, on edit — `updateCreative(model)` (which re-fetches the creative via `fetchCreative` after a successful update). The specific API endpoint is chosen by `currentCampaignType`.

After a successful create, the router redirects to the edit screen for the new creative and the campaign structure is refreshed.

**Caching:** read responses are cached on the client (TTL 1 hour); create and update requests invalidate related cache entries.
