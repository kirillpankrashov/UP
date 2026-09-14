<template>
  <div
    v-if="adset.status !== 'close'"
    data-name="campaigns-adset-card-tags-preroll"
    class="mb-4 flex flex-wrap items-center gap-1 sm:mb-3 sm:flex-nowrap"
  >
    <div class="flex flex-wrap items-center sm:ml-auto">
      <Status :adset="adset" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPrerollAdset, IPrerollCompletedAdset } from '@/modules/Streamer/views/Campaigns/api'

import { Status } from './sections'

defineProps<{
  adset: IPrerollAdset | IPrerollCompletedAdset
}>()
</script>