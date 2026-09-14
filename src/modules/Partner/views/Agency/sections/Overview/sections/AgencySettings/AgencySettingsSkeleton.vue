<template>
  <div
    data-name="partner-agency-overview-agency-settings-skeleton"
    data-test="partner-agency-overview-agency-settings-skeleton"
    class="pt-1"
  >
    <ElSkeleton
      animated
      :loading="true"
    >
      <template #template>
        <DashboardSection :title="t('creators.creatorsPayout.title')">
          <div class="mb-8">
            <ElSkeletonItem
              variant="h3"
              class="!h-6"
              style="width: 220px;"
            />
            <ElSkeletonItem
              variant="text"
              class="mt-3 !h-4"
              style="width: 92%;"
            />
          </div>

          <div class="mb-6">
            <ElSkeletonItem
              variant="text"
              class="!h-4"
              style="width: 360px;"
            />
          </div>

          <div class="mb-6 grid grid-cols-2 gap-5">
            <div class="space-y-2">
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 140px;"
              />
              <ElSkeletonItem
                variant="text"
                class="!h-10"
                style="width: 100%;"
              />
            </div>
          </div>

          <ElSkeletonItem
            variant="text"
            class="mb-6 !h-4"
            style="width: 220px;"
          />

          <div class="mb-6 grid grid-cols-2 items-start gap-5">
            <div
              v-for="col in 2"
              :key="`payout-${col}`"
              class="space-y-2"
            >
              <ElSkeletonItem
                variant="h3"
                class="!h-6"
                style="width: 190px;"
              />
              <CostInputsSkeleton />
            </div>
          </div>

          <ElSkeletonItem
            variant="text"
            class="mb-6 !h-4"
            style="width: 360px;"
          />

          <div class="mb-6 grid grid-cols-2 items-start gap-5">
            <div
              v-for="col in 2"
              :key="`dark-${col}`"
              class="space-y-2"
            >
              <ElSkeletonItem
                variant="h3"
                class="!h-6"
                style="width: 190px;"
              />
              <CostInputsSkeleton />
            </div>
          </div>
        </DashboardSection>

        <DashboardSection
          :title="t('creators.categoriesStopList.title')"
          :no-border="true"
        >
          <div class="mb-8">
            <ElSkeletonItem
              variant="h3"
              class="mb-3 !h-6"
              style="width: 220px;"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-4"
              style="width: 92%;"
            />
            <ElSkeletonItem
              variant="text"
              class="mt-4 !h-10"
              style="width: 100%;"
            />
          </div>
        </DashboardSection>

        <DashboardSection :no-border="true">
          <ElSkeletonItem
            variant="button"
            class="!h-10"
            style="width: 220px;"
          />
        </DashboardSection>
      </template>
    </ElSkeleton>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElSkeleton, ElSkeletonItem } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { CostInputsSkeleton } from '@/modules/Partner/views/Agency/components'
import { messages } from '@/modules/Partner/views/Agency/locales'

const { t } = useLocale<typeof messages>(messages)
</script>
