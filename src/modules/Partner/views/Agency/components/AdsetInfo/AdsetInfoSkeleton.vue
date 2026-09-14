<template>
  <div
    data-name="partner-agency-adset-info-skeleton"
    data-test="partner-agency-adset-info-skeleton"
  >
    <ElSkeleton
      animated
      :loading="true"
    >
      <template #template>
        <!-- mirrors Info.vue: grid + mb-4 from parent -->
        <div class="mb-4 grid gap-6 sm:grid-cols-2">
          <div
            v-for="n in 6"
            :key="`info-${n}`"
          >
            <ElSkeletonItem
              variant="text"
              class="mb-1 !h-3"
              style="width: 120px;"
            />
            <ElSkeletonItem
              variant="text"
              class="!h-4"
              style="width: min(92%, 220px);"
            />
          </div>
        </div>

        <!-- mirrors report TextLink wrapper mb-8 -->
        <div class="mb-8">
          <ElSkeletonItem
            variant="text"
            class="!h-4"
            style="width: 160px;"
          />
        </div>

        <!-- mirrors Description.vue: label mb-1 + prose (often one line) -->
        <div class="mb-4">
          <ElSkeletonItem
            variant="text"
            class="mb-1 !h-3"
            style="width: 140px;"
          />
          <ElSkeletonItem
            variant="text"
            class="!h-4"
            style="width: 100%;"
          />
          <ElSkeletonItem
            variant="text"
            class="mt-2 !h-4"
            style="width: 72%;"
          />
        </div>

        <!-- mirrors BrandAwareness: border-t pt-8, preview, then mb-6 mt-4 / mb-3 / chat label mb-2 -->
        <div class="border-t border-light-gray pt-8">
          <ElSkeletonItem
            variant="text"
            class="mb-2 !h-3"
            style="width: 160px;"
          />
          <div class="aspect-video w-full overflow-hidden rounded-base">
            <ElSkeletonItem
              variant="text"
              class="!block !h-full w-full"
            />
          </div>
          <div class="mb-6 mt-4">
            <div class="mb-3">
              <ElSkeletonItem
                variant="text"
                class="mb-2 !h-3"
                style="width: 150px;"
              />
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 100%;"
              />
            </div>
          </div>
        </div>
      </template>
    </ElSkeleton>
  </div>
</template>

<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem } from '@/components/element-plus'
</script>
