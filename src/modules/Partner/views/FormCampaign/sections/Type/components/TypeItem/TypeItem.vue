<template>
  <div
    data-name="type-selector-item"
    class="cursor-pointer rounded border border-gray bg-transparent p-4 transition-all hover:border-primary"
    :class="{
      'pointer-events-none cursor-not-allowed border-gray !bg-lightest-gray': !item.visible || disabled,
      'border-primary !bg-primary-50': item.id === value,
    }"
    @click="onClick"
  >
    <div class="flex items-center">
      <div class="mr-4 h-10 w-10 shrink-0">
        <div
          class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary transition-all"
          :class="{
            '!bg-lightest-gray': !item.visible || disabled,
            'bg-primary': item.id === value,
          }"
        >
          <img
            v-if="item.icon"
            :src="item.icon"
            class="h-10 w-10 object-cover"
          >
        </div>
      </div>
      <div>
        <div
          class="_text-m-bold mb-1"
          :class="{
            'text-dark-gray': !item.visible || disabled,
            'text-primary': item.id === value,
          }"
        >
          {{ item.title }}
        </div>
        <div class="_text-s-regular">
          {{ item.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICampaignsDictionary } from '@/core/api'

const props = withDefaults(defineProps<{
  value?: string | null
  item: ICampaignsDictionary['types'][number]
  disabled?: boolean
}>(), {
	value: null,
})

const emit = defineEmits(['update:value'])

const onClick = () => {
	if (!props.item.visible) return

	emit('update:value', props.item.id)
}
</script>
