<template>
  <div
    data-name="app-preloader"
    :class="{'h-screen w-screen overflow-hidden': !loaded, 'bg-background': !isWidget}"
  >
    <div
      v-if="showPreloader"
      class="app-preloader fixed left-0 top-0 z-[999] flex h-full w-full items-center justify-center bg-background"
      :class="{'hidden': loaded}"
    >
      <AppLogo big />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { AppLogo } from '@/components'

defineProps<{
	loaded: boolean
}>()

const isWidget = computed(() => {
	return /^\/ads\/v1\/WGT-\d+\//.test(window.location.pathname)
})

const showPreloader = computed(() => {
	return !isWidget.value
})
</script>
