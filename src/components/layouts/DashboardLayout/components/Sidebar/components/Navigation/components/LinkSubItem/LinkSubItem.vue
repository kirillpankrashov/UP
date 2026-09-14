<template>
  <li
    class="mb-1 pl-3"
    @click="$emit('toggleMenu')"
  >
    <router-link
      :to="route"
      class="flex h-9 cursor-pointer items-center rounded-[4px] pl-3 no-underline transition-all hover:bg-primary-50"
      :class="{'link-active group bg-primary-50 text-primary': isActive}"
      exact-active-class="bg-primary-50 text-primary link-active group"
    >
      <div class="text-[14px] text-black transition-all group-[.link-active]:text-primary">
        {{ label }}
      </div>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'


defineProps<{
	route: RouteLocationRaw
	label: string
	isActive?: boolean
}>()

defineEmits(['toggleMenu'])
</script>
