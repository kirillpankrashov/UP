
<template>
  <div
    v-if="adset.status !== 'close'"
    data-name="campaigns-adset-card-tags-performance"
    class="mb-4 flex flex-wrap items-center gap-1 sm:mb-3 sm:flex-nowrap"
  >
    <Format :adset="adset" />
    <DailyLimit :adset="adset" />

    <div class="flex flex-wrap items-center sm:ml-auto">
      <div class="flex items-center gap-1 sm:ml-auto">
        <ExtensionSetup :adset="adset" />
        <ExtensionCheck :adset="adset" />
      </div>

      <ReportBtn
        :adset="adset"
        :is-small="true"
      />

      <div class="mt-3 flex w-full sm:ml-auto sm:mt-0 sm:w-auto">
        <BlockLowCtr :adset="adset" />
        <BlockModerator :adset="adset" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPerformanceAdset, IPerformanceCompletedAdset } from '@/modules/Streamer/views/Campaigns/api'
import { ReportBtn } from '@/modules/Streamer/views/Campaigns/components'

import { BlockLowCtr, BlockModerator } from '../../components'

import { DailyLimit, ExtensionCheck, ExtensionSetup, Format } from './sections'

defineProps<{
  adset: IPerformanceAdset | IPerformanceCompletedAdset
}>()
</script>