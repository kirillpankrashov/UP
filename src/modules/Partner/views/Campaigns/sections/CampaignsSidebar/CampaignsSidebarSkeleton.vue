<template>
  <div
    data-name="partner-campaigns-campaigns-sidebar-skeleton"
    data-test="partner-campaigns-campaigns-sidebar-skeleton"
  >
    <ElSkeleton
      animated
      :loading="true"
    >
      <template #template>
        <div class="_text-m-regular mb-8">
          <ElSkeletonItem
            variant="text"
            class="!h-4"
            style="width: 80%;"
          />
        </div>

        <ElTable
          :data="skeletonRows"
          class="w-full"
        >
          <ElTableColumn
            :label="t('campaigns.tables.columns.name')"
            show-overflow-tooltip
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: min(92%, 220px);"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            :label="t('campaigns.tables.columns.id')"
            show-overflow-tooltip
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 160px"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            :label="t('campaigns.tables.columns.advertiser')"
            show-overflow-tooltip
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 180px"
              />
            </template>
          </ElTableColumn>
        </ElTable>
      </template>
    </ElSkeleton>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElSkeleton, ElSkeletonItem, ElTable, ElTableColumn } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Campaigns/locales'

const { t } = useLocale<typeof messages>(messages)

const skeletonRows = Array.from({ length: 10 }).map((_, idx) => ({ id: idx + 1 }))
</script>

<style scoped lang="scss">
[data-test='partner-campaigns-campaigns-sidebar-skeleton'] :deep(.el-table .cell) {
  text-overflow: clip;
}
</style>
