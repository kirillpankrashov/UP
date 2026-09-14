<template>
  <div
    data-name="campaigns-adset-card-skeleton"
    data-test="campaigns-adset-card-skeleton"
    class="relative -mx-4 w-[calc(100%+32px)] rounded border-b border-lightest-gray px-4 last-of-type:border-b-0"
  >
    <ElSkeleton
      animated
      :loading="true"
    >
      <template #template>
        <div class="py-5 sm:flex">
          <div class="mb-1.5 sm:mb-0 sm:mr-4 sm:shrink-0">
            <ElSkeletonItem
              variant="circle"
              class="!h-12 !w-12 sm:!h-16 sm:!w-16"
            />
          </div>

          <div class="min-w-0 flex-1 sm:w-[calc(100%-80px)]">
            <ElSkeletonItem
              variant="text"
              class="mb-1.5 !h-3.5 max-w-[420px]"
              style="width: 72%;"
            />

            <div class="mb-3 flex flex-wrap items-center gap-1 sm:mb-2">
              <ElSkeletonItem
                variant="text"
                class="!h-4 rounded-full"
                style="width: 88px;"
              />
              <ElSkeletonItem
                variant="text"
                class="!h-3 sm:ml-auto"
                style="width: 96px;"
              />
            </div>

            <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-3">
              <div
                v-for="n in 4"
                :key="n"
                class="w-28 space-y-0.5"
              >
                <ElSkeletonItem
                  variant="text"
                  class="!h-2.5"
                  style="width: 72px;"
                />
                <ElSkeletonItem
                  variant="text"
                  class="!h-3"
                  style="width: 56px;"
                />
              </div>
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
