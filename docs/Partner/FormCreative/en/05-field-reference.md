# FormCreative — Field Reference

Detailed descriptions of creative form elements. Compact **present / absent** matrix by type: [forms by campaign type](./03-forms-by-campaign-type.md). File uploads: [file uploads](./04-file-uploads.md).

---

## Status (visibility)

Toggle **on / off** for the creative. Changing status calls `changeStatus` at the campaign level with entity type `CREATIVES`, then updates the creative.

For a streamer to **see a placement**, all of the following must be enabled: **campaign**, **ad set**, **creative** (and the creative must be valid). If the creative is off, the streamer will not see the placement.

> The component uses locales from **FormAdset**, not FormCreative.

**Forms:** all types — **edit mode only**.

---

## Title

Working name of the creative. Text field, required, max 120 characters.

**Forms:** all types.

---

## Alternative Title

Additional creative name. Hidden by default — appears when the user clicks "Add alternative name". Max 120 characters.

Available only when the creative data model contains `title.alternative` (Brand Awareness, Extension, Special Project — all three types).

**Forms:** all types.

---

## Creative Upload (Brand Awareness)

Primary creative file upload. File type depends on the ad set format:

| Format | Alt. name | Field | Type |
|---|---|---|---|
| FULLSCREEN | Overlay 50% | `video` | Video |
| PIP | Overlay 15% | `video` | Video |
| CUSTOM | Custom | `zip` | ZIP archive |

After upload, `verifyAttachment` is called for server-side validation. Deletion in edit mode calls `deleteAttachment`. If a file is uploaded, a preview dialog is available.

The section is **not shown** for sponsored message formats (Chatbot / Text), LEADERBOARD, ADMNG, and others. For sponsored message formats, the primary content is chatbot text and the product URL; no media file upload is provided.

**Forms:** Brand Awareness (Overlay 50%, Overlay 15%, Custom).

---

## Banner (Extension — EXT_BANNER)

Two files: **banner1** (728×90 panel, max 5 MB) and **banner2** / unit (550×310 overlay, max 10 MB). Both files can be **images or video** (PNG, JPG, GIF, MP4, WEBM) — the `ImageOrVideo` component auto-detects the type on render.

The preview shows `banner1` as a horizontal panel; interaction expands `banner2`.

**CSS editor** (`EditorBanner`): fullscreen editor built on CodeMirror with CSS highlighting. Edits `model.panel.styles` — arbitrary CSS injected into a `<style>` block in the preview. Allows fully overriding the appearance: colors, fonts, sizes, animations, positioning.

**Forms:** Extension (EXT_BANNER).

---

## Quiz (Extension — EXT_QUIZ)

Interactive quiz with configurable screens:

- **Welcome** — heading, description, background image/video
- **Questions** — text, 2–4 answer options, background images/video
- **Result** — text, CTA button

Screen backgrounds accept both images and video (PNG, JPG, GIF, MP4, WEBM), max 5 MB. Settings (`FormQuiz`): enable/disable quiz, show correct answers, pagination, show results, text, colors.

On create, initialized with a default structure (`getDefaultQuiz`) and base styles (`generateDefaultStyles`).

**CSS editor** (`EditorQuiz`): fullscreen CodeMirror for `model.quiz.styles`. The style template contains placeholders for `.wrapper`, `.welcome-screen`, `.question-screen`, `.result-screen`, etc. All CSS selectors must use the `._campaign` prefix. Live preview (`QuizInstance`) updates in real time.

**Forms:** Extension (EXT_QUIZ).

---

## Gallery (Extension — EXT_GALLERY)

A set of slides — **images or video** (PNG, JPG, GIF, MP4, WEBM). Each slide is uploaded individually (max 5 MB). Slide count is not limited on the client. For video slides, the carousel accounts for video duration during auto-scroll.

**CSS editor** (`EditorGallery`): fullscreen CodeMirror for `model.gallery.styles`. The carousel in the preview has fixed dimensions (236×350); CSS allows customizing elements within.

**Forms:** Extension (EXT_GALLERY).

---

## Preview File (Extension)

Preview video for the Extension creative. Accepts **.mp4** and **.webm**, max 2 MB. Uploaded via `ElUpload` to GCS.

**Required field** — validation requires a preview for saving.

**Forms:** Extension (all formats).

---

## Creative Upload (Special Project)

Primary file upload. Type depends on the ad set format:

| Format | Field | Type |
|---|---|---|
| SP_CUSTOM | `zip` | ZIP archive (max 10 MB) |
| Others | `video` | Video (max 50 MB) |

File requirements come from the **dictionary** (`dictStore.campaigns.formatRequirements`), not static locale strings. Server-side validation (`verifyAttachment`) is **not called**.

**Forms:** Special Project.

---

## Product URL

URL the user is redirected to from the intermediate page (middlepage) after all checks pass and all pixels fire. The middlepage template lives in the backend project; the script responsible for validation and pixels is in a separate repository along with its documentation.

Two fields: general (`productUrl.general`) and mobile (`productUrl.mobile`). General URL is **required** and validated as a URL. Mobile is optional, validated as a URL when filled.

**Forms:** all types.

---

## Chatbot Text

Text posted to the stream chat by the chatbot. Textarea, max 150 characters. **Required field**.

**Forms:** Brand Awareness, Special Project.

---

## QR Code

Checkbox — whether to display a QR code during creative playback in the widget.

**Forms:** Brand Awareness, Special Project.

---

## Google Ad Tag

Text field for a Google Ad Manager script. Textarea for entering `scriptCode`.

Shown **only** when the ad set format is **ADMNG**.

**Forms:** Brand Awareness (ADMNG).

---

## Click Pixels

List of URL pixels for click tracking. Rows can be added; adding is disabled if the previous row is empty. Each pixel is validated as a URL.

**Forms:** all types.

---

## Pixel Script

Textarea for an additional analytics script (`pixelClicksScripts`).

**Forms:** Brand Awareness, Special Project.

---

## Impression Pixels

List of URL pixels for impression tracking (`pixelImpressions`). On mount, the component ensures at least one row exists. Includes an informational alert with a description (HTML from locale).

**Forms:** Brand Awareness, Special Project.

---

## Legal Markup (ERID)

**Read-only** section: displays ERID identifiers when data is present in the API response.

- `legalCompliance.erid.media` → Creative ERID
- `legalCompliance.erid.text` → Chatbot ERID

The section is shown conditionally — the parent form checks for `erid.media` **or** `marker.text`.

**Forms:** all types — **edit mode only**.

---

## Companion Fields

The creative data model contains `companion.heading`, `companion.text`, `companion.cta`. These fields are **not shown in the UI** — users do not edit them. On create and update, API adapters send fixed values of `'done'` for all companion fields.

**Forms:** Brand Awareness, Special Project (API level only, not in UI).
