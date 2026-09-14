<template>
  <div
    data-name="campaigns-preroll-adsets-skeleton"
    data-test="campaigns-preroll-adsets-skeleton"
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
            :label="t('campaigns.tables.columns.id')"
            width="200"
            show-overflow-tooltip
            fixed
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4 align-middle"
                style="width: 160px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            :label="t('campaigns.tables.columns.name')"
            width="250"
            show-overflow-tooltip
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4 align-middle"
                style="width: 200px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            v-if="columns.state"
            :label="t('campaigns.tables.columns.state')"
            width="100"
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4 align-middle"
                style="width: 60px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            v-if="columns.moderation"
            :label="t('campaigns.tables.columns.moderation')"
            width="120"
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4 align-middle"
                style="width: 100px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            v-if="columns.platform"
            :label="t('campaigns.tables.columns.platform')"
            width="120"
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4 align-middle"
                style="width: 80px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            v-if="columns.channels"
            :label="t('campaigns.tables.columns.channels')"
            width="100"
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4 align-middle"
                style="width: 80px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            v-if="columns.budget"
            :label="t('campaigns.tables.columns.budget')"
            width="180"
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4 align-middle"
                style="width: 140px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            v-if="columns.impressions"
            :label="t('campaigns.tables.columns.impressions')"
            width="180"
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4 align-middle"
                style="width: 140px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            v-if="columns.ctr"
            :label="t('campaigns.tables.columns.ctr')"
            width="100"
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4 align-middle"
                style="width: 80px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            v-if="columns.daysRemaining"
            :label="t('campaigns.tables.columns.daysRemaining')"
            width="120"
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4 align-middle"
                style="width: 90px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            v-if="columns.clicks"
            :label="t('campaigns.tables.columns.clicks')"
            width="100"
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4 align-middle"
                style="width: 80px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            v-if="columns.format"
            :label="t('campaigns.tables.columns.format')"
            width="120"
            show-overflow-tooltip
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4 align-middle"
                style="width: 100px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            v-if="columns.relatedCampaign"
            :label="t('campaigns.tables.columns.relatedCampaign')"
            width="250"
            show-overflow-tooltip
          >
            <template #default>
              <ElSkeletonItem
                variant="text"
                class="!h-4 align-middle"
                style="width: 200px;"
              />
            </template>
          </ElTableColumn>

          <ElTableColumn
            fixed="right"
            width="60"
            align="center"
          >
            <template #default>
              <div class="flex justify-center">
                <ElSkeletonItem
                  variant="text"
                  class="!h-4 align-middle"
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
import { messages } from '@/modules/Partner/views/Campaigns/locales'

defineProps<{
  columns: Partial<Record<string, boolean>>
}>()

const { t } = useLocale<typeof messages>(messages)

const skeletonRows = Array.from({ length: 10 }).map((_, idx) => ({ id: idx + 1 }))
</script>

<style scoped lang="scss">
[data-test='campaigns-preroll-adsets-skeleton'] :deep(.el-table .cell) {
  text-overflow: clip;
}
[data-test='campaigns-preroll-adsets-skeleton'] :deep(.el-table__cell) {
  height: 48px;
}
</style>

