<template>
  <div
    data-name="partner-agency-streamer-settings-skeleton"
    data-test="partner-agency-streamer-settings-skeleton"
    class="pt-1"
  >
    <ElSkeleton
      animated
      :loading="true"
    >
      <template #template>
        <div class="mb-6">
          <ElSkeletonItem
            variant="h3"
            class="!h-6"
            style="width: 200px;"
          />
          <ElSkeletonItem
            variant="text"
            class="mt-3 !h-4"
            style="width: 92%;"
          />
          <ElSkeletonItem
            variant="text"
            class="mt-2 !h-4"
            style="width: 70%;"
          />
        </div>

        <div class="grid grid-cols-2 items-start gap-4 mb-4">
          <ElSkeletonItem
            variant="h3"
            class="!h-6"
            style="width: 190px;"
          />
          <ElSkeletonItem
            variant="h3"
            class="!h-6"
            style="width: 190px;"
          />
        </div>

        <div class="mb-8 grid grid-cols-2 items-end gap-4">
          <CostInputsSkeleton />
          <CostInputsSkeleton />
        </div>

        <div class="grid grid-cols-2 items-start gap-4 mb-4">
          <ElSkeletonItem
            variant="h3"
            class="!h-6"
            style="width: 190px;"
          />
          <ElSkeletonItem
            variant="h3"
            class="!h-6"
            style="width: 190px;"
          />
        </div>


        <div class="mb-8 grid grid-cols-2 items-end gap-4">
          <CostInputsSkeleton />
          <CostInputsSkeleton />
        </div>

        <ElSkeletonItem
          variant="button"
          class="mt-8 !h-12"
          style="width: 220px;"
        />
      </template>
    </ElSkeleton>
  </div>
</template>

<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem } from '@/components/element-plus'
import { CostInputsSkeleton } from '@/modules/Partner/views/Agency/components'
</script>
