<template>
  <div
    data-name="format-selector-item"
    data-test="format-item-root"
    class="cursor-pointer rounded border border-gray bg-transparent p-4 transition-all hover:border-primary"
    :class="{
      'pointer-events-none cursor-not-allowed border-gray !bg-lightest-gray': disabled,
      'border-primary !bg-primary-50': item.id === value,
    }"
    @click="onClick"
  >
    <div class="flex items-center">
      <div class="mr-4 h-10 w-10 shrink-0">
        <div
          class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary transition-all"
          :class="{
            '!bg-lightest-gray': disabled,
            '!bg-primary': item.id === value,
          }"
        >
          <img
            v-if="item.icon"
            :src="item.icon"
            data-test="format-item-icon"
            class="h-6 w-6 object-cover"
          >
        </div>
      </div>
      <div>
        <div
          class="_text-m-bold mb-1"
          data-test="format-item-title"
          :class="{
            'text-dark-gray': disabled,
            'text-primary': item.id === value,
          }"
        >
          {{ item.title }}
        </div>
        <div
          class="_text-s-regular"
          data-test="format-item-description"
        >
          {{ item.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AdFormat } from '@/core/types'
import type { ICampaignsDictionary } from '@/core/api'

const props = withDefaults(defineProps<{
  value?: AdFormat | null
  item: ICampaignsDictionary['formats'][number]
  disabled?: boolean
}>(), {
	value: null,
})

const emit = defineEmits(['update:value'])

const onClick = () => {
	emit('update:value', props.item.id)
}
</script>
