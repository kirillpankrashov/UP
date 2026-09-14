<template>
  <div
    data-name="panel-adset-card"
    class="relative -mx-4 w-[calc(100%+32px)] border-b border-lightest-gray px-4  last-of-type:border-b-0"
  >
    <div class="py-6 sm:flex">
      <div class="mb-2 sm:mb-0 sm:mr-4 sm:shrink-0">
        <div
          data-test="campaigns-adset-card-logo"
          class="h-12 w-12 rounded-full bg-cover bg-center bg-no-repeat sm:h-16 sm:w-16"
          :style="{backgroundImage: `url(${adset.logo})`}"
        />
      </div>

      <div class="sm:w-calc(100%-80px) w-full">
        <div class="mb-2 flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-5">
          <ElTooltip
            effect="light"
            :content="adset.title"
            placement="top"
          >
            <div class="_text-m-regular max-w-full truncate transition-all hover:text-primary">
              {{ adset.title }}
            </div>
          </ElTooltip>
        </div>

        <Tags :adset="adset" />
        <Indicators :adset="adset" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElTooltip } from '@/components/element-plus'
import type { IAdset } from '@/modules/Streamer/views/Campaigns/types'

import { Indicators, Tags } from './sections'

defineProps<{
  adset: IAdset
}>()
</script>
