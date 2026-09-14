<template>
  <ElTableColumn
    :label="t('campaigns.tables.columns.state')"
    width="100"
  >
    <template #default="{ row }: {row: AdEntity}">
      <Status :row="row" />
    </template>
  </ElTableColumn>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElTableColumn } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import type { AdEntity } from '@/modules/Partner/views/Campaigns/types'

import { Status } from './components'

defineProps<{
	items: AdEntity[]
}>()

const { t } = useLocale<typeof messages>(messages)
</script>
