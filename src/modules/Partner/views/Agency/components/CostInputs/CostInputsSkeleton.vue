<template>
  <div
    data-name="partner-agency-cost-inputs-skeleton"
    data-test="partner-agency-cost-inputs-skeleton"
    class="grid grid-cols-1 gap-4"
  >
    <div
      v-for="i in DEFAULT_ROW_COUNT"
      :key="i"
      class="space-y-2"
    >
      <ElSkeletonItem
        variant="text"
        class="!h-4"
        style="width: 110px;"
      />
      <ElSkeletonItem
        variant="text"
        class="!h-10"
        style="width: 100%;"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElSkeletonItem } from '@/components/element-plus'
import { EDITABLE_FORMATS } from '@/modules/Partner/views/Agency/consts/formats'

/** Matches CostInputs: editable CPM rows + CPC + CPA */
const DEFAULT_ROW_COUNT = EDITABLE_FORMATS.length + 2
</script>
