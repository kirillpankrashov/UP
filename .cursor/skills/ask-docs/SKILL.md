---
name: ask-docs
description: Answer questions about the Uplify platform using project documentation in docs/. Use when the user asks how something works in Uplify, asks about campaigns, creatives, adsets, widgets, agencies, billing, referrals, or any product-related question. Also use when the user explicitly mentions docs, documentation, or asks "how do I…" questions about the platform.
---

# Ask Docs

Answer user questions **strictly** based on the project documentation in `docs/`.

## Core Rules

1. **Never fabricate information.** If the answer is not in the docs — say so directly: "В документации нет информации по этому вопросу."
2. **Ask clarifying questions** if the user's question is ambiguous or too broad. Use the AskQuestion tool when available.
3. **Keep it simple.** The audience is non-technical. Avoid code snippets, API details, internal component names, and implementation specifics unless the user explicitly asks for them.
4. **Always cite sources.** End every answer with a "Источники" section listing the doc files you used.

## Workflow

1. **Understand the question.** Determine the topic area:

   | Topic keywords | Where to search |
   |---|---|
   | кампания, campaign, создание кампании | `docs/Partner/FormCampaign/`, `docs/Partner/Campaigns/` |
   | адсет, adset, группа объявлений, бюджет | `docs/Partner/FormAdset/` |
   | креатив, creative, баннер, загрузка файлов | `docs/Partner/FormCreative/` |
   | виджет, widget, показ, инициализация | `docs/Widget/` |
   | агентство, agency, стримеры | `docs/Partner/Agency/` |
   | реферал, referral, приглашение | `docs/General/` |
   | API, эндпоинт, endpoint | `docs/api/` |

2. **Pick the language.** Match the user's language — if they ask in Russian, search `ru/` docs first; if in English, search `en/` first.

3. **Search the docs.** Use Grep or SemanticSearch scoped to the relevant `docs/` subdirectory. Start with the `01-overview.md` of the matching section to orient yourself, then drill into specific files.

4. **Read and synthesize.** Read the relevant files. Combine information from multiple docs if needed, but do not add anything beyond what is written.

5. **Compose the answer:**
   - Use plain, conversational language
   - Use bullet points or numbered lists for clarity
   - If there are steps — present them as a simple sequence
   - Omit technical field names, enums, and code unless asked

6. **Cite sources.** At the end, add:

   ```
   ---
   Источники:
   - docs/Partner/FormCreative/ru/01-overview.md
   - docs/Partner/FormCreative/ru/04-file-uploads.md
   ```

## If the Answer Is Not Found

Say explicitly:

> К сожалению, в текущей документации нет информации по этому вопросу. Попробуйте уточнить вопрос или обратиться к команде разработки.

Do **not** guess, speculate, or fill in from general knowledge.

## If the Question Is Unclear

Ask the user to clarify before searching. Examples:

- "Вы имеете в виду создание кампании или редактирование существующей?"
- "Уточните, пожалуйста — речь о виджете или о партнёрском кабинете?"
