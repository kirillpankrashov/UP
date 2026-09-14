<template>
  <ElTableColumn
    :label="t('campaigns.tables.columns.moderation')"
    width="120"
  >
    <template #default="{ row }: {row: { published: boolean }}">
      <span :class="{'text-warning': !row.published}">
        {{ row.published ? t('campaigns.tables.columns.moderationStatus.complete') : t('campaigns.tables.columns.moderationStatus.pending') }}
      </span>
    </template>
  </ElTableColumn>
</template>

<script setup lang="ts">

import { useLocale } from '@/core/hooks'
import { ElTableColumn } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Campaigns/locales'

defineProps<{
	items: {
    published: boolean
  }[]
}>()

const { t } = useLocale<typeof messages>(messages)
</script>
