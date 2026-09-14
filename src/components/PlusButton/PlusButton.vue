<template>
  <div
    class="group flex cursor-pointer items-center"
    :class="{'pointer-events-none opacity-50': disabled}"
    @click="onClick"
  >
    <PlusIcon class="h-3 w-3 fill-gray group-hover:fill-primary" />

    <div
      v-if="label || $slots.default"
      class="ml-2 text-gray group-hover:text-primary"
    >
      <slot>
        {{ label }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlusIcon from '@/assets/img/icons/plus.svg'

const props = defineProps<{
  label?: string
  disabled?: boolean
}>()

const emit = defineEmits(['click'])

const onClick = () => {
	if (props.disabled) return

	emit('click')
}
</script>
