<template>
  <div
    data-name="partner-form-adset-preroll-skeleton"
    data-test="partner-form-adset-preroll-skeleton"
  >
    <ElSkeleton
      animated
      :loading="true"
    >
      <template #template>
        <DashboardSection
          v-if="route.name === RouteName.ADSET_EDIT"
          :title="t('adset.settings.form.status.label')"
        >
          <div class="flex items-center gap-2">
            <ElSkeletonItem
              variant="button"
              class="!h-5 !w-10 !rounded-full"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-4"
              style="width: 90px;"
            />
          </div>
        </DashboardSection>

        <DashboardSection
          :title="t('adset.settings.title')"
          :no-border="route.name === RouteName.ADSET_EDIT"
        >
          <ElSkeletonItem
            variant="text"
            class="mb-6 !h-4"
            style="width: min(100%, 540px);"
          />

          <!-- FormTitle: default + alternative name -->
          <div class="mb-6">
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: 140px;"
            />
            <ElSkeletonItem
              variant="text"
              class="mb-6 !h-10"
              style="width: 100%;"
            />
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: 160px;"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-10"
              style="width: 100%;"
            />
          </div>

          <div class="mb-6">
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

          <div class="mb-6">
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

          <div class="mb-6">
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: 100px;"
            />
            <div class="flex items-center rounded border border-gray p-4">
              <ElSkeletonItem
                variant="circle"
                class="mr-4 !h-10 !w-10 shrink-0"
              />
              <div class="min-w-0 flex-1">
                <ElSkeletonItem
                  variant="text"
                  class="mb-1 !h-4"
                  style="width: min(60%, 200px);"
                />
                <ElSkeletonItem
                  variant="text"
                  class="!h-3"
                  style="width: min(92%, 360px);"
                />
              </div>
            </div>
          </div>

          <div class="mb-6">
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: 170px;"
            />
            <div class="grid grid-cols-2 gap-4">
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
                  style="width: 120px;"
                />
                <ElSkeletonItem
                  variant="text"
                  class="!h-10"
                  style="width: 100%;"
                />
              </div>
            </div>
          </div>

          <!-- FormBudget: payable type radios + 2 inputs + total box -->
          <div class="mb-6">
            <div class="mb-4 flex flex-wrap gap-3">
              <ElSkeletonItem
                variant="button"
                class="!h-10"
                style="width: min(48%, 200px);"
              />
              <ElSkeletonItem
                variant="button"
                class="!h-10"
                style="width: min(48%, 200px);"
              />
            </div>
            <div class="mb-4 grid grid-cols-2 gap-4">
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
              <div>
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
            </div>
            <div class="rounded bg-primary-50 p-4">
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: min(100%, 320px);"
              />
            </div>
          </div>

          <!-- FormTargets: grid 2 cols (CTR + CPA) -->
          <div>
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: 150px;"
            />
            <div class="grid grid-cols-2 gap-4">
              <div>
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
              <div>
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
            </div>
          </div>
        </DashboardSection>

        <DashboardSection :title="t('adset.targeting.title')">
          <div
            v-for="idx in 4"
            :key="`preroll-targeting-${idx}`"
            class="mb-6"
          >
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: 180px;"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-10"
              style="width: 100%;"
            />
          </div>
        </DashboardSection>

        <DashboardSection :title="t('adset.targetingAudience.title')">
          <div class="mb-6">
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: 180px;"
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
              style="width: 170px;"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-10"
              style="width: 100%;"
            />
          </div>
        </DashboardSection>

        <DashboardSection :title="t('adset.chatBot.title')">
          <!-- FormProductUrl: general + mobile -->
          <div class="mb-6">
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: 200px;"
            />
            <ElSkeletonItem
              variant="text"
              class="mb-4 !h-10"
              style="width: 100%;"
            />
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: 210px;"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-10"
              style="width: 100%;"
            />
          </div>

          <!-- FormVideoText: textarea (~4 rows) -->
          <div>
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: min(88%, 280px);"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-[104px]"
              style="width: 100%;"
            />
          </div>
        </DashboardSection>

        <DashboardSection :title="t('adset.analytics.title')">
          <div class="mb-6">
            <ElSkeletonItem
              variant="text"
              class="mb-4 !h-4"
              style="width: 200px;"
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
              class="mb-4 !h-4"
              style="width: 220px;"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-24"
              style="width: 100%;"
            />
          </div>
        </DashboardSection>

        <DashboardSection :title="t('adset.preview.title')">
          <ElSkeletonItem
            variant="image"
            class="!h-48"
            style="width: 100%;"
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
import { messages } from '@/modules/Partner/views/FormAdset/locales'

const route = useRoute()

const { t } = useLocale<typeof messages>(messages)
</script>
