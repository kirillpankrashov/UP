<template>
  <div
    data-name="partner-form-campaign-preroll-skeleton"
    data-test="partner-form-campaign-preroll-skeleton"
  >
    <ElSkeleton
      animated
      :loading="true"
    >
      <template #template>
        <!-- Status (edit only) -->
        <DashboardSection
          v-if="route.name === RouteName.CAMPAIGN_EDIT"
          :title="t('campaign.settings.form.status.label')"
        >
          <div class="flex items-center gap-2">
            <ElSkeletonItem
              variant="button"
              class="!h-5 !w-10 !rounded-full"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-4"
              style="width: 80px;"
            />
          </div>
        </DashboardSection>

        <!-- Settings -->
        <DashboardSection
          class="relative"
          :title="t('campaign.settings.title')"
          :no-border="route.name === RouteName.CAMPAIGN_EDIT"
        >
          <!-- 1. FormTitle -->
          <div class="!mb-6">
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: 100px;"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-10"
              style="width: 100%;"
            />
          </div>

          <!-- 2. FormDescription (markdown editor) -->
          <div class="!mb-6">
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: 160px;"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-[400px]"
              style="width: 100%;"
            />
          </div>

          <!-- 3. FormCategory -->
          <div class="!mb-6">
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: 110px;"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-10"
              style="width: 100%;"
            />
          </div>

          <!-- 4. FormSchedule (2 cols) -->
          <div class="!mb-6 grid grid-cols-2 gap-4">
            <div>
              <ElSkeletonItem
                variant="text"
                class="mb-2 !h-[14px]"
                style="width: 120px;"
              />
              <ElSkeletonItem
                variant="text"
                class="!h-10"
                style="width: 100%;"
              />
            </div>
            <div>
              <ElSkeletonItem
                variant="text"
                class="mb-2 !h-[14px]"
                style="width: 130px;"
              />
              <ElSkeletonItem
                variant="text"
                class="!h-10"
                style="width: 100%;"
              />
            </div>
          </div>

          <!-- 5. FormHolding -->
          <div class="!mb-6">
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: 170px;"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-10"
              style="width: 100%;"
            />
          </div>

          <!-- 6. FormAdvertiser -->
          <div class="!mb-6">
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: 140px;"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-10"
              style="width: 100%;"
            />
          </div>

          <!-- 7. FormMediaAgency -->
          <div class="!mb-6">
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: 145px;"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-10"
              style="width: 100%;"
            />
          </div>

          <!-- 8. FormOrdMarkup -->
          <div>
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: 135px;"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-10"
              style="width: 100%;"
            />
          </div>
        </DashboardSection>

        <!-- URL Params -->
        <DashboardSection :title="t('campaign.urlParams.title')">
          <ElSkeletonItem
            variant="text"
            class="mb-6 !h-4"
            style="width: min(100%, 420px);"
          />

          <div
            v-for="idx in 2"
            :key="`param-${idx}`"
            class="mb-4"
          >
            <ElSkeletonItem
              variant="text"
              class="mb-3 !h-4"
              style="width: 120px;"
            />
            <div class="grid grid-cols-2 gap-4">
              <div>
                <ElSkeletonItem
                  variant="text"
                  class="mb-2 !h-[14px]"
                  style="width: 90px;"
                />
                <ElSkeletonItem
                  variant="text"
                  class="!h-10"
                  style="width: 100%;"
                />
              </div>
              <div>
                <ElSkeletonItem
                  variant="text"
                  class="mb-2 !h-[14px]"
                  style="width: 80px;"
                />
                <ElSkeletonItem
                  variant="text"
                  class="!h-10"
                  style="width: 100%;"
                />
              </div>
            </div>
          </div>

          <ElSkeletonItem
            variant="text"
            class="!h-4"
            style="width: 210px;"
          />
        </DashboardSection>

        <!-- Pixel -->
        <DashboardSection :title="t('campaign.pixel.title')">
          <ElSkeletonItem
            variant="text"
            class="mb-6 !h-4"
            style="width: min(100%, 440px);"
          />
          <ElSkeletonItem
            variant="text"
            class="mb-2 !h-[14px]"
            style="width: 100px;"
          />
          <ElSkeletonItem
            variant="text"
            class="mb-3 !h-10"
            style="width: 100%;"
          />
          <ElSkeletonItem
            variant="text"
            class="!h-4"
            style="width: 190px;"
          />
        </DashboardSection>
      </template>
    </ElSkeleton>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

import { useLocale } from '@/core/hooks'
import { ElSkeleton, ElSkeletonItem } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { RouteName } from '@/modules/Partner/router'
import { messages } from '@/modules/Partner/views/FormCampaign/locales'

const route = useRoute()

const { t } = useLocale<typeof messages>(messages)
</script>
