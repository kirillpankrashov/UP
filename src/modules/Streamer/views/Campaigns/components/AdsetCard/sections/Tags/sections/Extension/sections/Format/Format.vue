<template>
  <ElTag
    data-name="campaigns-adset-card-tags-extension-format"
    size="small"
    round
  >
    <span class="font-regular">{{ t('campaignRow.tags.extension') }}</span>
  </ElTag>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElTag } from '@/components/element-plus'
import type { IExtensionAdset } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

const { t } = useLocale<typeof messages>(messages)

defineProps<{
  adset: IExtensionAdset
}>()
</script>
