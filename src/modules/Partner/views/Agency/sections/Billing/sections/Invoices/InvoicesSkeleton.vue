<template>
  <div
    data-name="partner-agency-invoices-skeleton"
    data-test="partner-agency-invoices-skeleton"
  >
    <ElSkeleton
      animated
      :loading="true"
    >
      <template #template>
        <ElTable
          :data="skeletonRows"
          class="w-full"
        >
          <ElTableColumn
            :label="t('creators.billing.invoices.date')"
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 180px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            :label="t('creators.billing.invoices.amount')"
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 100px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            align="right"
            :label="t('creators.billing.invoices.invoice')"
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

const skeletonRows = Array.from({ length: 10 }).map((_, idx) => ({ id: idx + 1 }))
</script>

<style scoped lang="scss">
[data-test='partner-agency-invoices-skeleton'] :deep(.el-table .cell) {
  text-overflow: clip;
}
</style>
