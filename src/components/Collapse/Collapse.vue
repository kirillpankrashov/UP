<template>
  <div>
    <button
      class="flex items-center bg-transparent text-sm font-bold leading-none"
      @click="visible = !visible"
    >
      <ArrowIcon
        class="mr-2 h-4 w-4 fill-black transition-transform"
        :class="{'-rotate-90': visible}"
      />
      {{ label }}
    </button>

    <div
      class="max-h-[1000px] overflow-hidden"
      :class="{'!max-h-0 transition-all': visible}"
    >
      <div class="pt-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import ArrowIcon from '@/assets/img/icons/chevron-down.svg'

const props = withDefaults(defineProps<{
  label: string
  collapsed?: boolean
}>(), {
	collapsed: true,
})

const visible = ref(props.collapsed)
</script>
