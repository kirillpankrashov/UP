<template>
  <div
    class="group rounded-l bg-primary-50 py-3 text-center last-of-type:rounded-r"
    :class="{'!text-light-gray': disabled}"
  >
    <div class="group-last:border-0 sm:border-r sm:border-gray">
      <div
        v-if="!loading"
        class="_headline-2"
      >
        {{ value }}
      </div>

      <div
        v-else
        class="_headline-2"
      >
        <ElSkeleton
          animated
          :rows="1"
        >
          <template #template>
            <ElSkeletonItem
              variant="text"
              class="!h-4"
              style="width: 60px;"
            />
          </template>
        </ElSkeleton>
      </div>

      <div
        v-if="label"
        class="_text-s-regular mt-2 text-gray"
        v-html="label"
      />
      <div
        v-else
        class="_text-s-regular mt-2 text-gray"
      >
        <slot name="label" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem } from '@/components/element-plus'

withDefaults(defineProps<{
  value: string | number
  label?: string | null
  disabled?: boolean
  loading?: boolean
}>(), {
	label: null,
	disabled: false,
	loading: false,
})
</script>
