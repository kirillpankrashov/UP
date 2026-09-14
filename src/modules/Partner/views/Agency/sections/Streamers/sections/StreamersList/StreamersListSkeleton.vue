<template>
  <div
    data-name="partner-agency-streamers-list-skeleton"
    data-test="partner-agency-streamers-list-skeleton"
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
          <ElTableColumn
            :label="t('creators.creatorsTable.columns.creators')"
            width="240"
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 200px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            width="160"
            :label="t('creators.creatorsTable.columns.lastActivity')"
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 120px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn :label="t('creators.creatorsTable.columns.balance')">
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 140px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            :label="t('creators.creatorsTable.columns.campaign')"
            width="85"
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 40px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn>
            <template #default>
              <div class="flex w-20 justify-end gap-4">
                <ElSkeletonItem
                  variant="circle"
                  class="!h-4 !w-4"
                />
                <ElSkeletonItem
                  variant="circle"
                  class="!h-4 !w-4"
                />
                <ElSkeletonItem
                  variant="circle"
                  class="!h-4 !w-4"
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
