<template>
  <div
    data-name="creators-history-skeleton"
    data-test="creators-history-skeleton"
  >
    <ElSkeleton
      animated
      :loading="true"
    >
      <template #template>
        <ElTable
          :data="skeletonRows"
          style="width: 100%"
        >
          <ElTableColumn :label="t('creators.history.columns.date')">
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 180px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn :label="t('creators.history.columns.payment')">
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 100px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            width="80"
            align="right"
            :label="t('creators.history.columns.details')"
          >
            <template #default>
              <div class="flex justify-end">
                <ElSkeletonItem
                  variant="text"
                  class="!h-4"
                  style="width: 12px;"
                />
              </div>
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
[data-test='creators-history-skeleton'] :deep(.el-table .cell) {
  text-overflow: clip;
}
</style>
