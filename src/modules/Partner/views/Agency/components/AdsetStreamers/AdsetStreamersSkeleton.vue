<template>
  <div
    data-name="partner-agency-adset-streamers-skeleton"
    data-test="partner-agency-adset-streamers-skeleton"
  >
    <ElSkeleton
      animated
      :loading="true"
    >
      <template #template>
        <ElTable
          :data="skeletonRows"
          class="w-full"
          size="small"
        >
          <ElTableColumn
            :label="t('creators.stats.columns.creator')"
            width="210"
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 160px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn :label="t('creators.stats.columns.income')">
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 100px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn :label="t('creators.stats.columns.views')">
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 72px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn :label="t('creators.stats.columns.avgCtr')">
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 52px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn :label="t('creators.stats.columns.ctr')">
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 52px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn :label="t('creators.stats.columns.status')">
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-6"
                style="width: 42px;"
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
import { messages } from '@/modules/Partner/views/Agency/locales'

const { t } = useLocale<typeof messages>(messages)

const skeletonRows = Array.from({ length: 8 }).map((_, idx) => ({ id: idx + 1 }))
</script>

<style scoped lang="scss">
[data-test='partner-agency-adset-streamers-skeleton'] :deep(.el-table .cell) {
  text-overflow: clip;
}
</style>
