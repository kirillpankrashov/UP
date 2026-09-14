# FormCreative — Form by Campaign Type

**All fields and sections** on the creative settings screen by campaign type. **+** means present, **−** means absent. Detailed field descriptions: [field reference](./05-field-reference.md). File uploads: [file uploads](./04-file-uploads.md).

> Performance and Preroll **do not have a creative form** — content for these types is configured at the ad set level.

---

## General Settings

| Field or section | Brand Awareness | Extension | Special Project |
|---|---|---|---|
| Status (on / off) | + | + | + |
| Title | + | + | + |
| Alternative title | + | + | + |

> **Status** — **edit mode only**; hidden when creating.
>
> **Alternative title** — optional, added via an "Add alternative name" button.

---

## Files and Media

| Field or section | Brand Awareness | Extension | Special Project |
|---|---|---|---|
| Creative upload (video / ZIP) | + (Overlay 50%, Overlay 15%, Custom) | − | + |
| Banner (banner + unit, images/video) | − | + (EXT_BANNER) | − |
| Quiz (interactive, images/video) | − | + (EXT_QUIZ) | − |
| Gallery (slides: images/video) | − | + (EXT_GALLERY) | − |
| CSS style editor | − | + (all formats) | − |
| Preview file | − | + | − |
| Creative preview | + (if file uploaded) | + (banner / gallery / quiz) | − |

> **Brand Awareness**: the file section appears only for **Overlay 50%** (FULLSCREEN), **Overlay 15%** (PIP), or **Custom** (CUSTOM) formats. For sponsored message formats (Chatbot / Text), no file upload exists — content consists of text and URLs. For ADMNG, **Google Ad Tag** is used instead of a file.
>
> **Extension**: content type is determined by the ad set format — **EXT_BANNER** (banner + unit file), **EXT_QUIZ** (interactive quiz), **EXT_GALLERY** (slide gallery). All three formats accept both images and video (PNG, JPG, GIF, MP4, WEBM). Each format provides a **fullscreen CSS editor** that allows fully overriding the creative's appearance.

---

## Content

| Field or section | Brand Awareness | Extension | Special Project |
|---|---|---|---|
| Product URL (general + mobile) | + | + | + |
| Chatbot text | + | − | + |
| QR code | + | − | + |
| Google Ad Tag (script) | + (ADMNG only) | − | − |

> **Google Ad Tag** — shown only when the ad set format is **ADMNG**.

---

## Analytics

| Field or section | Brand Awareness | Extension | Special Project |
|---|---|---|---|
| Click pixels | + | + | + |
| Pixel script | + | − | + |
| Impression pixels | + | − | + |

---

## Legal Markup

| Field or section | Brand Awareness | Extension | Special Project |
|---|---|---|---|
| ERID (creative + chatbot) | + | + | + |

> The ERID section is shown only in **edit** mode and when `erid.media` or `marker.text` data is present in the API response.
