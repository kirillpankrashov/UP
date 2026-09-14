---
name: generate-skeleton
description: Generate a Vue skeleton component (ComponentNameSkeleton.vue) for a given component using ElSkeleton from element-plus to improve perceived performance and UX during data loading. Use when the user asks to create a skeleton, add a loading skeleton, write a skeleton component, or generate a skeleton for any Vue component.
---

# Generate Skeleton Component

## Rules

1. File created in the **same directory** as the source component.
2. Name: `ComponentNameSkeleton.vue`.
3. Wrap everything in `<ElSkeleton animated :loading="true"><template #template>…</template></ElSkeleton>`.
4. Root element always has `data-name` and `data-test` attributes with a kebab-case path identifier (derive from the component's module path, append `-skeleton`).
5. Import from `@/components/element-plus`.
6. **Reusable components** (`components/` folder): do **not** integrate the skeleton back into the source component unless the user explicitly asks.
7. **Non-reusable sections** (`sections/` folder): integrate by default unless user says otherwise.

## Table skeletons

Copy the original table's columns verbatim (labels, widths, align). Replace each cell body with `<ElSkeletonItem variant="text" class="!h-4" style="width: Xpx;" />` — adjust width to approximate the data length for that column. Add `skeletonRows` array. Add scoped style to clip cell overflow.

```vue
<template>
  <div
    data-name="module-component-skeleton"
    data-test="module-component-skeleton"
  >
    <ElSkeleton
      animated
      :loading="true"
    >
      <template #template>
        <ElTable
          :data="skeletonRows"
          class="w-full"
        >
          <ElTableColumn :label="t('…')">
            <template #default>
              <ElSkeletonItem variant="text" class="!h-4" style="width: 180px;" />
            </template>
          </ElTableColumn>
          <!-- repeat for each column -->
        </ElTable>
      </template>
    </ElSkeleton>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElSkeleton, ElSkeletonItem, ElTable, ElTableColumn } from '@/components/element-plus'
import { messages } from '@/modules/…/locales'

const { t } = useLocale<typeof messages>(messages)
const skeletonRows = Array.from({ length: 8 }).map((_, idx) => ({ id: idx + 1 }))
</script>

<style scoped lang="scss">
[data-test='module-component-skeleton'] :deep(.el-table .cell) {
  text-overflow: clip;
}
</style>
```

## Non-table skeletons

Mirror the visual structure of the source component. Use `ElSkeletonItem` variants:
- `text` — single line of text / label / value  
- `h3` — section heading  
- `button` — action button  
- `circle` — avatar / icon  
- `image` — image / media block  

Match grid layouts, spacing classes, and hierarchy from the source component. Use `v-for` for repeated items.

```vue
<template>
  <div
    data-name="module-component-skeleton"
    data-test="module-component-skeleton"
  >
    <ElSkeleton
      animated
      :loading="true"
    >
      <template #template>
        <div class="mb-4 grid gap-6 sm:grid-cols-2">
          <div v-for="n in 4" :key="`field-${n}`">
            <ElSkeletonItem variant="text" class="mb-1 !h-3" style="width: 120px;" />
            <ElSkeletonItem variant="text" class="!h-4" style="width: min(92%, 220px);" />
          </div>
        </div>
      </template>
    </ElSkeleton>
  </div>
</template>

<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem } from '@/components/element-plus'
</script>
```

Omit `<script>` i18n imports if the skeleton has no translated labels.

## Tests

If the source component has tests and the skeleton is being integrated into it, run the tests after integration. Fix any failures caused by the integration.

## Integration into source component (sections only)

When integrating, add a `showSkeleton` computed (or prop) and replace the loading branch:

```vue
<ComponentSkeleton v-if="showSkeleton" />
<div v-else><!-- original content --></div>
```

Import the skeleton with a relative path: `import ComponentSkeleton from './ComponentSkeleton.vue'`

## Reference examples

All files live at `src/modules/Partner/views/Agency/`:

| Skeleton | Type | Notes |
|---|---|---|
| `components/AdsetCard/AdsetCardSkeleton.vue` | card | circle avatar + text rows |
| `components/AdsetInfo/AdsetInfoSkeleton.vue` | form-like | grid fields + media block |
| `components/AdsetsList/AdsetsListSkeleton.vue` | list | composes `AdsetCardSkeleton` |
| `components/AdsetStreamers/AdsetStreamersSkeleton.vue` | table | 6 columns, 8 rows |
| `sections/Billing/sections/Invoices/InvoicesSkeleton.vue` | table | 3 columns, 10 rows |
| `sections/History/HistorySkeleton.vue` | table | 3 columns, 8 rows |
| `sections/Overview/sections/AgencySettings/AgencySettingsSkeleton.vue` | form | composed sections + `CostInputsSkeleton` |
