<template>
  <div
    v-if="adset.status !== 'close'"
    data-name="campaigns-adset-card-tags-brand-awareness"
    class="mb-4 flex flex-wrap items-center gap-1 sm:mb-3 sm:flex-nowrap"
  >
    <Format :adset="adset" />
    <ImpressionsLimit :adset="adset" />
    <DailyActions :adset="adset" />
    <DailyActionsLimit :adset="adset" />
    <RestLimit :adset="adset" />

    <div class="flex flex-wrap items-center gap-1 ml-auto">
      <ReportBtn
        :adset="adset"
        :is-small="true"
      />

      <div class="mt-3 flex w-full sm:ml-auto sm:mt-0 sm:w-auto empty:hidden">
        <BlockLowCtr :adset="adset" />
        <BlockModerator :adset="adset" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBrandAwarenessAdset, IBrandAwarenessCompletedAdset } from '@/modules/Streamer/views/Campaigns/api'
import { ReportBtn } from '@/modules/Streamer/views/Campaigns/components'

import { BlockLowCtr, BlockModerator } from '../../components'

import {
	DailyActions,
	DailyActionsLimit,
	Format,
	ImpressionsLimit,
	RestLimit,
} from './sections'

defineProps<{
  adset: IBrandAwarenessAdset | IBrandAwarenessCompletedAdset
}>()
</script>
