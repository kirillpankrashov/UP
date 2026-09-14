<template>
  <div
    data-name="partner-agency-streamer-adsets-skeleton"
    data-test="partner-agency-streamer-adsets-skeleton"
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
            :label="t('creators.stats.columns.campaign')"
            width="240"
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 220px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn :label="t('creators.stats.columns.income')">
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 120px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            :label="t('creators.stats.columns.views')"
            width="100"
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 70px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn :label="t('creators.stats.columns.avgCtr')">
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 60px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn :label="t('creators.stats.columns.ctr')">
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 60px;"
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

          <ElTableColumn>
            <template #default>
              <div class="flex justify-center">
                <ElSkeletonItem
                  variant="circle"
                  class="!h-8 !w-8"
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
