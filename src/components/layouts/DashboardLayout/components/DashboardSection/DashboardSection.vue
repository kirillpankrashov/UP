<template>
  <div
    class="relative flex flex-col border-t border-light-gray py-8 sm:flex-row"
    :class="{
      'border-t-0 pt-0': noBorder,
      '!block': noLeft,
    }"
  >
    <div
      class="w-[240px] shrink-0"
      :class="{'mb-6 !w-auto': noLeft}"
    >
      <div
        v-if="title"
        class="_text-m-bold"
      >
        {{ title }}
      </div>
      <div
        v-else-if="$slots.title"
        class="_text-m-bold"
      >
        <slot name="title" />
      </div>
      <slot name="left" />
    </div>

    <div
      class="w-full sm:w-[calc(100%-240px)]"
      :class="{
        'max-h-0 overflow-hidden': collapsed && appStore.isMobile,
        '!w-full': noLeft
      }"
    >
      <div
        class="mt-6 sm:mt-0"
        :class="{'mt-6': noLeft}"
      >
        <slot />
      </div>
    </div>

    <button
      v-if="collapsable"
      v-show="appStore.isMobile"
      class="absolute right-0 top-7 z-10 border-none bg-transparent"
      :class="{'!-top-1': noBorder}"
      @click="collapsed = !collapsed"
    >
      <PlusIcon
        v-if="collapsed"
        class="h-6 w-6"
      />
      <MinusIcon
        v-else
        class="h-6 w-6"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useAppStore } from '@/core/store'

import MinusIcon from '@/assets/img/icons/collapse-minus.svg'
import PlusIcon from '@/assets/img/icons/collapse-plus.svg'

withDefaults(defineProps<{
	title?: null| string
	noBorder?: boolean
	noLeft?: boolean
	collapsable?: boolean
}>(), {
	title: null,
	noBorder: false,
	noLeft: false,
	collapsable: true,
})

const appStore = useAppStore()

const collapsed = ref(false)
</script>
