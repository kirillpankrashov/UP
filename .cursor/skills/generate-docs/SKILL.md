---
name: generate-docs
description: Generate or update project documentation in Russian and English. Creates bilingual docs in docs/<topic>/<lang>/ structure. Use when the user asks to write docs, create documentation, document a module, update docs, or generate documentation for any part of the project.
---

# Generate Documentation

## Purpose

Create bilingual (ru/en) documentation that serves as a knowledge base for technical and non-technical team members. Docs explain **what things do and how they work** — not implementation details that are already in the code.

## Before Writing

1. **Read the reference docs** to match the established style:
   - [Reference: style and structure](reference.md)
2. **Explore the source code** of the topic you're documenting — understand it deeply before writing.
3. **Plan the document structure** — break the topic into logical documents numbered `01-`, `02-`, etc.

## Output Structure

```
docs/
  <Topic>/
    ru/
      01-overview.md
      02-<subtopic>.md
      ...
    en/
      01-overview.md
      02-<subtopic>.md
      ...
```

- `<Topic>` — PascalCase (e.g. `Widget`, `Campaign`, `Streamer`)
- `<lang>` — `ru` or `en`
- Files are numbered with zero-padded prefix: `01-`, `02-`, etc.
- Filenames are lowercase-kebab-case after the prefix

## Writing Process

### Step 1: Explore

Use semantic search and grep to understand the module/feature:
- Entry points, main classes/components
- Data flow and key interactions
- Important business rules and edge cases
- Configuration and settings
- **Dictionary usage** — search for `useDictStore`, `dictStore`, `getCampaignDictionary` and similar patterns to find where components consume backend dictionaries

### Step 2: Plan

Create a TODO list with planned documents. First document is always `01-overview.md`. Break remaining content into logical documents (one concern per file).

### Step 3: Write Both Languages Simultaneously

For each planned document:
1. Write the Russian version first (primary language)
2. Write the English version — **a full equivalent**, not a mechanical translation. Both versions should feel native.

### Important: Don't Fabricate

If the code doesn't make something clear — **ask the user**. Never guess business logic, invent explanations, or fill gaps with assumptions. It's better to leave a `TODO: clarify with team` placeholder or ask directly than to write something incorrect.

### Step 4: Verify

- Each file pair (ru/en) covers the same topics
- Numbering and filenames match between languages
- No orphan files in one language without the other

## Writing Guidelines

### What to Include

- **What** the thing is and **why** it exists
- **How** it works at the behavioral level (user/system perspective)
- Key concepts, modes, states, and their transitions
- Business rules and constraints
- Interaction between subsystems (who calls whom, when, why)
- Configuration options and their effects
- Edge cases that affect behavior
- Timelines / sequences for complex flows
- **Backend dictionaries** — if components use data from `dictStore` (or similar dictionary stores), document what dictionary fields are used, where they come from, and how they affect the UI (dropdown options, placeholders, icons, filtering, etc.). Include the `dictStore` field path in a table column so developers can grep the codebase. See `docs/Partner/Agency` and `docs/Partner/FormCampaign` for examples.

### What NOT to Include

- Full code listings (a short snippet is OK if it clarifies a non-obvious mechanism)
- Implementation details that are obvious from reading the code
- Internal variable names unless they're essential for understanding
- Type definitions (unless they define an important contract)

### Technical Details Policy

Minimal by default. Include technical specifics **only** when they're necessary to understand behavior:

**OK** — a short code snippet showing a key branching condition:
```ts
else if (this.queue.length && !this.widget.isManual) {
  // auto-play — only when !isManual
}
```

**OK** — a config table with field names because they're needed to configure the system:
```markdown
| Field | Type | Purpose |
|---|---|---|
| `advertising.mode` | `'auto' \| 'manual'` | Ad playback mode |
```

**NOT OK** — dumping a full class implementation or listing every method signature.

### Style

- Clear, concise prose. No filler words.
- Use tables for structured data (settings, states, comparisons)
- Use `---` horizontal rules to separate major sections
- Use blockquotes (`>`) for important notes and caveats
- ASCII diagrams or tree structures for architecture
- Markdown headers: `# Title`, `## Section`, `### Subsection`
- Title format: `# <Topic> — <Document Subject>` (e.g. `# Widget — Manual Mode` / `# Виджет — Ручной режим`)
- Keep documents focused — 80-150 lines is the sweet spot, avoid going over 200
