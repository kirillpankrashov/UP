# FormCreative — File Uploads

File types and constraints depend on the **campaign type** and the **ad set format**. Files are uploaded via GCS (`gcp/upload/config`); for Brand Awareness and Extension, `verifyAttachment` is called afterward to validate on the server.

---

## Brand Awareness

The file upload section is shown only for **Overlay 50%**, **Overlay 15%**, and **Custom** formats. For other formats, no upload section is displayed.

| Ad set format | Alt. name | Field | File type | Max size |
|---|---|---|---|---|
| FULLSCREEN | Overlay 50% | `video` | Video | 15 MB |
| PIP | Overlay 15% | `video` | Video | 15 MB |
| CUSTOM | Custom | `zip` | ZIP archive | 10 MB |

### Formats Without File Upload

| Format | What replaces the file |
|---|---|
| ADMNG | **Google Ad Tag** section — text field for a script |
| LEADERBOARD | No file section |
| Sponsored message (Chatbot / Text) | No file upload — the creative consists only of chatbot text, URLs, and pixels |

> For sponsored message formats, the primary content is **chatbot text** and the **product URL**. No media file upload section is shown.

- After upload, `verifyAttachment` is called with `format: BRAND_AWARENESS` and the file key.
- Deletion in edit mode calls `deleteAttachment`.
- If a file is uploaded, a preview dialog is available.
- File requirements are shown from locale strings: `creative.form.files.requirements.fullscreen`, `pip_video`, `custom` with size interpolation.

---

## Extension

Media content type is determined by the ad set format. All three Extension formats accept both images and video: **PNG, JPG, GIF, MP4, WEBM**.

Each format provides a **fullscreen CSS editor** — CodeMirror with CSS syntax highlighting. CSS styles are saved in the model's `styles` field and allow **fully overriding the creative's appearance**: colors, fonts, sizes, positioning, animations. Styles are injected into the preview as a `<style>` block.

### EXT_BANNER (banner)

Two files: **banner1** (728×90 panel) and **banner2** / unit (550×310 overlay).

| File | Max size | Accepted types | Description |
|---|---|---|---|
| `banner1` | 5 MB | PNG, JPG, GIF, MP4, WEBM | Main banner (panel) |
| `banner2` (unit) | 10 MB | PNG, JPG, GIF, MP4, WEBM | Unit file (expanded view) |

Both files can be **images or video** — the `ImageOrVideo` component auto-detects the type on render. The preview shows `banner1` as a horizontal panel; interaction expands `banner2`.

**CSS editor** (`EditorBanner`): edits `model.panel.styles`. Left pane — CodeMirror, right pane — live banner preview with applied styles.

### EXT_QUIZ (quiz)

Interactive quiz with settings: welcome screen, questions (2–4 answer options), results. Background images for screens are uploaded separately.

| File | Max size | Accepted types |
|---|---|---|
| Quiz screen background | 5 MB | PNG, JPG, GIF, MP4, WEBM |

Quiz settings (`FormQuiz`): enable/disable quiz, show correct answers, pagination, show results, text, colors, CTA button.

**CSS editor** (`EditorQuiz`): edits `model.quiz.styles`. On create, styles are initialized with a `generateDefaultStyles()` template containing placeholders for `.wrapper`, `.welcome-screen`, `.question-screen`, `.result-screen`, etc. All CSS selectors must be prefixed with `._campaign`.

Live preview (`QuizInstance`) updates in real time as styles and content change.

### EXT_GALLERY (gallery)

A set of slides. Each slide can be an **image or video**.

| File | Max size | Accepted types |
|---|---|---|
| Gallery slide | 5 MB | PNG, JPG, GIF, MP4, WEBM |

Slide count is **not limited** on the client side. For video slides, the carousel accounts for video duration during auto-scroll.

**CSS editor** (`EditorGallery`): edits `model.gallery.styles`. The carousel in the preview has fixed dimensions (236×350); styles allow customizing elements within.

### Preview file (all Extension formats)

Common to all Extension formats — a preview video upload.

| File | Accepted types | Max size |
|---|---|---|
| `preview` | MP4, WEBM | 2 MB |

> The preview file is a **required** field for Extension.

---

## Special Project

| Ad set format | Field | File type | Max size |
|---|---|---|---|
| SP_CUSTOM | `zip` | ZIP archive | 10 MB |
| Others (SP_FULLSCREEN, etc.) | `video` | Video | 50 MB |

- File requirements come from the **dictionary** — `dictStore.campaigns.formatRequirements`, not static locale strings.
- `verifyAttachment` is **not called** for Special Project.
- Deletion in edit mode calls `deleteAttachment`.

---

## Common Upload Mechanism

1. The user selects or drags a file.
2. The client obtains a signed URL via `gcp/upload/config`.
3. The file is uploaded directly to GCS.
4. The file key is stored in the form model.
5. For BA and Extension: `verifyAttachment` validates the file on the server.
6. When updating a creative, the file is sent to the server **only if the path contains `tmp/`** (new upload); existing files are not re-uploaded.
