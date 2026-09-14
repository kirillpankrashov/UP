<template>
  <div
    data-name="agency-billing-form-skeleton"
    data-test="agency-billing-form-skeleton"
  >
    <ElSkeleton
      animated
      :loading="true"
    >
      <template #template>
        <DashboardSection
          :title="t('creators.billing.companyInformation.title')"
          :no-border="true"
        >
          <div
            v-for="n in 4"
            :key="`company-${n}`"
            class="mb-6 last:mb-0"
          >
            <ElSkeletonItem
              variant="text"
              class="mb-1 !h-3"
              style="width: 140px;"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-10 w-full max-w-full rounded-base"
            />
          </div>
        </DashboardSection>

        <DashboardSection
          :title="t('creators.billing.paymentDetails.title')"
          :no-border="true"
        >
          <div
            v-for="n in 7"
            :key="`payment-${n}`"
            class="mb-6 last:mb-0"
          >
            <ElSkeletonItem
              variant="text"
              class="mb-1 !h-3"
              style="width: 160px;"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-10 w-full max-w-full rounded-base"
            />
          </div>
        </DashboardSection>

        <DashboardSection :no-border="true">
          <ElSkeletonItem
            variant="text"
            class="!h-11 w-full rounded-base sm:max-w-[220px]"
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
import { messages } from '@/modules/Partner/views/Agency/locales'

const { t } = useLocale<typeof messages>(messages)
</script>
