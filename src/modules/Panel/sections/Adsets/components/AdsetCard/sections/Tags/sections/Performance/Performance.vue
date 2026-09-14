
<template>
  <div
    v-if="adset.status !== 'close'"
    data-name="campaigns-adset-card-tags-performance"
    class="mb-4 flex flex-wrap items-center gap-1 sm:mb-3 sm:flex-nowrap"
  >
    <Format :adset="adset" />
    <DailyLimit :adset="adset" />
  </div>
</template>

<script setup lang="ts">
import type { IPerformanceAdset, IPerformanceCompletedAdset } from '@/modules/Streamer/views/Campaigns/api'

import { DailyLimit, Format } from './sections'

defineProps<{
  adset: IPerformanceAdset | IPerformanceCompletedAdset
}>()
</script>
