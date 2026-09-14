<template>
  <ElTableColumn
    :label="t('campaigns.tables.columns.name')"
    width="250"
    show-overflow-tooltip
  >
    <template #default="{ row }: {row: AdEntity}">
      <router-link
        :to="getRouterLink(row)"
        class="text-primary no-underline"
      >
        {{ row.title.default }}
      </router-link>
    </template>
  </ElTableColumn>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElTableColumn } from '@/components/element-plus'
import { getRouterLink } from '@/modules/Partner/views/Campaigns/helpers'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import type { AdEntity } from '@/modules/Partner/views/Campaigns/types'

defineProps<{
	items: AdEntity[]
}>()

const { t } = useLocale<typeof messages>(messages)
</script>
