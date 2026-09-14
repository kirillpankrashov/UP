# Reference: Documentation Style and Structure

This file contains detailed style guidance. The agent should read this when generating docs.

## Document Types

### 01-overview.md (always first)

The overview document for every topic must contain:

1. **What it is** — one-paragraph definition
2. **Key concepts** — modes, types, roles involved
3. **Architecture** — high-level structure (tree diagram or table)
4. **Formats / variants** — if applicable (table)
5. **Key settings** — config fields that affect behavior (table)

Example title: `# Widget — Overview` / `# Виджет — Обзор`

### Behavioral documents (02+)

Each subsequent document covers one aspect of behavior:

- A mode of operation (e.g. auto mode, manual mode)
- A subsystem (e.g. initialization, pusher events)
- A process (e.g. creative playback, screenshot capture)
- A feature (e.g. debug layer, conversion alerts)

Structure per document:
1. Title with topic prefix: `# Widget — Initialization`
2. One-line context (when/how this activates)
3. Sections with `## Heading`
4. Comparison tables when contrasting modes/states
5. Sequence/timeline for complex flows
6. State tables for UI elements

## Formatting Conventions

### Tables

Use for: settings, states, comparisons, format listings.

```markdown
| Column A | Column B | Column C |
|---|---|---|
| value | value | value |
```

### Timelines

Use for multi-step processes:

```
t=0         Step one description
t=+5 min    Step two description
            ← event or side effect
            → action taken
t=+10 min   Step three
```

### Architecture Trees

```
MainClass
 ├── SubsystemA     — brief description
 ├── SubsystemB     — brief description
 └── SubsystemC     — brief description
```

### Code Snippets

Only when they reveal a non-obvious decision or branching logic. Keep under 5 lines. Always add a brief explanation before or after.

### State Tables

For UI elements with multiple states:

```markdown
| State | Condition A | Condition B |
|---|---|---|
| Active | `true` | `false` |
| Disabled | `false` | — |
```

## Language-Specific Notes

### Russian (ru/)

- Use professional but accessible tone
- Technical terms can stay in English when they're industry-standard (e.g. Brand Awareness, OBS, Pusher, SSP)
- Use «кавычки-ёлочки» for quoting UI labels in prose, backticks for code references
- Prefer short sentences

### English (en/)

- Same professional tone
- Keep same structure and section order as ru/ counterpart
- Technical terms stay as-is
- Use backticks for code references, regular quotes for UI labels

## Audience

The documentation serves as a knowledge base for:

- **Developers** who need to understand how a feature works before modifying it
- **Product managers** who need to understand system behavior and constraints
- **QA engineers** who need to know expected behavior and edge cases
- **New team members** onboarding onto the project

Write so that a person with basic tech literacy can understand the "what" and "why", while developers get enough behavioral detail to work with the code.
