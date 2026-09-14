<template>
  <div
    id="dashboard-layout"
    class="relative min-h-screen overflow-x-hidden"
  >
    <Sidebar />

    <div
      class="relative w-full p-5 pb-10 sm:ml-[200px] sm:w-[780px] sm:px-8 sm:py-10 2xl:mx-auto"
      :class="{
        'w-full sm:w-[calc(100%-200px)] 2xl:ml-[200px]': fullWidth,
        'mx-[calc(50%-365px)]': centered,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar/Sidebar.vue'

withDefaults(defineProps<{
  fullWidth?: boolean
  centered?: boolean
}>(), {
	fullWidth: false,
	centered: false,
})
</script>
