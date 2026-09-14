<template>
  <div
    data-name="partner-agency-overview-streamers-list-skeleton"
    data-test="partner-agency-overview-streamers-list-skeleton"
  >
    <div class="_text-m-regular mb-8">
      <ElSkeleton
        animated
        :loading="true"
      >
        <template #template>
          <ElSkeletonItem
            variant="text"
            class="!h-4"
            style="width: 360px;"
          />
        </template>
      </ElSkeleton>
    </div>

    <ElSkeleton
      animated
      :loading="true"
    >
      <template #template>
        <ElTable
          :data="skeletonRows"
          style="width: 100%"
        >
          <ElTableColumn
            :label="t('creators.list.columns.creator')"
            width="240"
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
            :label="t('creators.list.columns.lastActivity')"
            width="240"
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 140px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            :label="t('creators.list.columns.earnings')"
            width="120"
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 70px;"
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
