<template>
  <li
    class="mb-1"
    @click="$emit('toggleMenu')"
  >
    <router-link
      :to="route"
      class="flex h-9 cursor-pointer items-center rounded-[4px] pl-3 no-underline transition-all hover:bg-primary-50"
      :class="{'link-active group bg-primary-50 text-primary': isActive}"
      exact-active-class="bg-primary-50 text-primary link-active group"
    >
      <component
        :is="icon"
        class="mr-[10px] flex w-[18px] items-center justify-center fill-black transition-all group-[.link-active]:fill-primary"
        :class="iconClass"
      />
      <div class="text-[14px] font-bold text-black transition-all group-[.link-active]:text-primary">
        {{ label }}
      </div>
      <div
        v-if="beta"
        class="_text-caption-caps ml-[12px] mr-[6px] flex rounded-[10px] bg-success-50 px-2 py-1 !text-success"
      >
        BETA
      </div>
    </router-link>
    <slot />
  </li>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
	route: RouteLocationRaw
	icon: any
	iconClass?: string
	label: string
	isActive?: boolean
	beta?: boolean
}>()

defineEmits(['toggleMenu'])
</script>
