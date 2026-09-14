<template>
  <li
    data-name="partner-campaign-layout-sidebar-item"
    class="mb-1"
  >
    <router-link
      v-if="to"
      :to="to"
      class="group flex cursor-pointer items-center justify-between px-[6px] py-[5px] text-primary no-underline hover:bg-primary-50"
      active-class="bg-primary-50 _is-active"
      exact
    >
      <ElPopover
        v-if="!isNew"
        placement="right"
        popper-class="sidebar-item-label-popper"
        trigger="hover"
      >
        <template #reference>
          <span
            class="_text-m-regular max-w-full truncate text-dark-gray group-[._is-active]:text-primary"
            v-html="title"
          />
        </template>
        <span class="_text-s-regular text-left">{{ title }}</span>
      </ElPopover>

      <span
        v-else
        class="_text-m-regular max-w-full truncate text-dark-gray group-[._is-active]:text-primary"
        v-html="title"
      />

      <PlusIcon
        v-if="isNew"
        class="h-3 w-3 fill-[var(--el-text-color-regular)] group-hover:fill-primary group-[._is-active]:fill-primary"
      />
    </router-link>

    <div
      v-else
      class="group flex cursor-pointer items-center justify-between px-[6px] py-[5px] text-primary hover:bg-primary-50"
      @click="$emit('click')"
    >
      <span
        class="_text-m-regular max-w-full truncate text-dark-gray"
        v-html="title"
      />
      <PlusIcon
        v-if="isNew"
        class="h-3 w-3 fill-[var(--el-text-color-regular)] group-hover:fill-primary"
      />
    </div>

    <slot />
  </li>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

import { ElPopover } from '@/components/element-plus'

import PlusIcon from '@/assets/img/icons/plus.svg'

defineEmits(['click'])

withDefaults(defineProps<{
  to: RouteLocationRaw | null
  isNew?: boolean
  title: string
}>(), {
	to: null,
})
</script>
