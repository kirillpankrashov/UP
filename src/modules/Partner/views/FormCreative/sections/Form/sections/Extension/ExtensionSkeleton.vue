<template>
  <div
    data-name="partner-form-creative-extension-skeleton"
    data-test="partner-form-creative-extension-skeleton"
  >
    <ElSkeleton
      animated
      :loading="true"
    >
      <template #template>
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

        <!-- EXT_BANNER: two upload rows (FormBanner) -->
        <DashboardSection
          v-if="formatId === AdFormat.EXT_BANNER"
          :title="t('creative.form.files.title')"
        >
          <div class="mb-8">
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: min(100%, 200px);"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-10 max-w-[460px]"
              style="width: 100%;"
            />
          </div>
          <div>
            <ElSkeletonItem
              variant="text"
              class="mb-2 !h-[14px]"
              style="width: min(100%, 200px);"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-10 max-w-[460px]"
              style="width: 100%;"
            />
          </div>
        </DashboardSection>

        <!-- EXT_GALLERY: single upload list (FormGallery) -->
        <DashboardSection
          v-else-if="formatId === AdFormat.EXT_GALLERY"
          :title="t('creative.form.files.title')"
        >
          <ElSkeletonItem
            variant="text"
            class="mb-2 !h-[14px]"
            style="width: min(100%, 220px);"
          />
          <ElSkeletonItem
            variant="text"
            class="!h-32 max-w-[460px] w-full"
          />
        </DashboardSection>

        <!-- EXT_QUIZ: main settings + sticky preview column -->
        <div
          v-else-if="formatId === AdFormat.EXT_QUIZ"
          class="relative flex flex-col gap-6 lg:flex-row lg:gap-8"
        >
          <div class="min-w-0 flex-1 space-y-8">
            <div
              v-for="block in 3"
              :key="block"
              class="space-y-4"
            >
              <ElSkeletonItem
                variant="text"
                class="!h-5"
                style="width: min(100%, 280px);"
              />
              <div class="space-y-3">
                <div
                  v-for="row in 3"
                  :key="row"
                  class="flex flex-wrap items-center gap-4"
                >
                  <ElSkeletonItem
                    variant="text"
                    class="!h-4"
                    style="width: min(100%, 160px);"
                  />
                  <ElSkeletonItem
                    variant="button"
                    class="!h-6 !w-14 !rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="w-full shrink-0 lg:w-[308px]">
            <ElSkeletonItem
              variant="text"
              class="!min-h-[200px] w-full rounded-lg"
            />
            <ElSkeletonItem
              variant="text"
              class="mt-3 !h-11 w-full"
            />
          </div>
        </div>

        <!-- Data: FormProductUrl (2 inputs) + FormPreview (upload, max-w-[460px]) -->
        <DashboardSection :title="t('creative.form.data.title')">
          <div class="space-y-3">
            <div>
              <ElSkeletonItem
                variant="text"
                class="mb-2 !h-[14px]"
                style="width: min(100%, 240px);"
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
                style="width: min(100%, 280px);"
              />
              <ElSkeletonItem
                variant="text"
                class="!h-10"
                style="width: 100%;"
              />
            </div>
            <div class="w-full max-w-[460px]">
              <div>
                <ElSkeletonItem
                  variant="text"
                  class="mb-2 !h-[14px]"
                  style="width: min(100%, 220px);"
                />
              </div>
              <ElSkeletonItem
                variant="button"
                class="!h-11"
                style="width: 180px;"
              />
            </div>
          </div>
        </DashboardSection>

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
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { AdFormat } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { ElSkeleton, ElSkeletonItem } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { RouteName } from '@/modules/Partner/router'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'
import { messages } from '@/modules/Partner/views/FormCreative/locales'

const route = useRoute()
const formAdsetStore = useFormAdsetStore()

const { t } = useLocale<typeof messages>(messages)

const formatId = computed(() => formAdsetStore.adset?.format.id)
</script>
