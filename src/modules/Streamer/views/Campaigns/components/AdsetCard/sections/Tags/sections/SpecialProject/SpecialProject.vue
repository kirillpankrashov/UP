<template>
  <div
    v-if="adset.status !== AdsetStatus.CLOSED"
    data-name="campaigns-adset-card-tags-special-project"
    class="mb-4 flex flex-wrap items-center gap-1 sm:mb-3 sm:flex-nowrap"
  >
    <ElTag
      size="small"
      round
    >
      <span class="font-regular">{{ adset.format?.title || t('campaignRow.tags.undefinedFormat') }}</span>
    </ElTag>
  </div>
</template>

<script setup lang="ts">
import { AdsetStatus } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { ElTag } from '@/components/element-plus'
import type { ISpecialProjectAdset } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

defineProps<{
  adset: ISpecialProjectAdset
}>()

const { t } = useLocale<typeof messages>(messages)
</script>
