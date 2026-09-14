<template>
  <div
    data-name="partner-campaign-layout-sidebar-skeleton"
    data-test="partner-campaign-layout-sidebar-skeleton"
  >
    <ElSkeleton
      animated
      :loading="true"
    >
      <template #template>
        <ul class="mt-1">
          <!-- Campaign -->
          <li class="mb-6">
            <div class="flex items-center px-[6px] py-[5px]">
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                style="width: 120px;"
              />
            </div>
          </li>

          <li
            v-for="adset in adsets"
            :key="adset.width"
            class="mb-3"
          >
            <div class="flex items-center px-[6px] py-[5px]">
              <ElSkeletonItem
                variant="text"
                class="!h-4"
                :style="{ width: adset.width }"
              />
            </div>

            <ul class="pl-3">
              <li
                v-for="(cw, ci) in adset.creatives"
                :key="ci"
                class="mb-1"
              >
                <div class="flex items-center px-[6px] py-[5px]">
                  <ElSkeletonItem
                    variant="text"
                    class="!h-4"
                    :style="{ width: cw }"
                  />
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </template>
    </ElSkeleton>
  </div>
</template>

<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem } from '@/components/element-plus'

const adsets = [
	{ width: '105px', creatives: ['90px', '75px'] },
	{ width: '85px', creatives: ['100px', '65px'] },
	{ width: '95px', creatives: ['80px', '70px'] },
]
</script>
