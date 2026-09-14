<template>
  <div
    class="closable-section relative mb-8 sm:mb-10"
    :class="{'closable-section-collapsed': collapsed}"
  >
    <button
      v-show="appStore.isMobile"
      type="button"
      class="absolute right-0 top-7  z-10 border-0 bg-transparent"
      :class="{'-top-1': noBorder}"
      @click="collapsed = !collapsed"
    >
      <CollapsePlusIcon
        v-if="collapsed"
        class="h-6 w-6 fill-black"
      />
      <CollapseMinusIcon
        v-else
        class="h-6 w-6 fill-black"
      />
    </button>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useAppStore } from '@/core/store'

import CollapseMinusIcon from '@/assets/img/icons/collapse-minus.svg'
import CollapsePlusIcon from '@/assets/img/icons/collapse-plus.svg'

withDefaults(defineProps<{
	noBorder: boolean
}>(), {
	noBorder: false,
})

const appStore = useAppStore()

const collapsed = ref(false)
</script>
