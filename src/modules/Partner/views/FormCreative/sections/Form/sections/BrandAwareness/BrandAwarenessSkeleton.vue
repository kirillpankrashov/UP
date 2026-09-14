<template>
  <div
    data-name="partner-form-creative-brand-awareness-skeleton"
    data-test="partner-form-creative-brand-awareness-skeleton"
  >
    <ElSkeleton
      animated
      :loading="true"
    >
      <template #template>
        <!-- Status (edit only) -->
        <DashboardSection
          v-if="route.name === RouteName.CREATIVE_EDIT"
          :title="t('creative.form.status.label')"
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

        <!-- Name: single field (FormTitle default) -->
        <DashboardSection
          :title="t('creative.form.name.title')"
          :no-border="route.name === RouteName.CREATIVE_EDIT"
        >
          <ElSkeletonItem
            variant="text"
            class="mb-2 !h-[14px]"
            style="width: min(100%, 200px);"
          />
          <ElSkeletonItem
            variant="text"
            class="!h-10"
            style="width: 100%;"
          />
        </DashboardSection>

        <!-- Files: same shell as FilePreview (flex rounded bg-primary-50 p-5, ~76px total) -->
        <DashboardSection :title="t('creative.form.files.title')">
          <div class="file-uploader w-full">
            <div class="flex w-full items-center rounded bg-primary-50 p-5">
              <ElSkeletonItem
                variant="text"
                class="mr-4 !h-9 !w-9 shrink-0 rounded"
              />
              <div class="flex min-w-0 flex-1 flex-col gap-2">
                <ElSkeletonItem
                  variant="text"
                  class="!h-[14px] max-w-full"
                  style="width: min(100%, 240px);"
                />
                <ElSkeletonItem
                  variant="text"
                  class="!h-[14px]"
                  style="width: 88px;"
                />
              </div>
            </div>
          </div>
        </DashboardSection>

        <!-- Data: stacked like FormProductUrl → FormChatbotText → FormQrCode -->
        <DashboardSection :title="t('creative.form.data.title')">
          <div class="mb-6">
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: min(100%, 160px);"
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
              style="width: min(100%, 220px);"
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
              style="width: min(100%, 180px);"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-[100px]"
              style="width: 100%;"
            />
          </div>

          <div class="flex items-center gap-3">
            <ElSkeletonItem
              variant="text"
              class="!h-4 !w-4 shrink-0 rounded"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-4"
              style="width: min(100%, 280px);"
            />
          </div>
        </DashboardSection>

        <!-- Ad tag -->
        <DashboardSection :title="t('creative.form.adtag.title')">
          <ElSkeletonItem
            variant="text"
            class="mb-2 !h-[14px]"
            style="width: min(100%, 160px);"
          />
          <ElSkeletonItem
            variant="text"
            class="!h-10"
            style="width: 100%;"
          />
        </DashboardSection>

        <!-- Pixels: subsection titles as skeleton lines (no real copy) -->
        <DashboardSection :title="t('creative.form.pixels.title')">
          <div class="mb-6">
            <ElSkeletonItem
              variant="text"
              class="mb-3 !h-4"
              style="width: min(100%, 200px);"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-10"
              style="width: 100%;"
            />
            <ElSkeletonItem
              variant="text"
              class="mt-4 !h-4"
              style="width: min(100%, 160px);"
            />
          </div>

          <div class="mb-6">
            <ElSkeletonItem
              variant="text"
              class="mb-3 !h-4"
              style="width: min(100%, 220px);"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-24"
              style="width: 100%;"
            />
          </div>

          <div>
            <ElSkeletonItem
              variant="text"
              class="mb-3 !h-4"
              style="width: min(100%, 180px);"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-10"
              style="width: 100%;"
            />
          </div>
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
import { messages } from '@/modules/Partner/views/FormCreative/locales'

const route = useRoute()

const { t } = useLocale<typeof messages>(messages)
</script>
