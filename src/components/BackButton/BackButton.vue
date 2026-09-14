<template>
  <div
    class="group flex cursor-pointer items-center"
    :class="{'pointer-events-none opacity-50': disabled}"
    @click="onClick"
  >
    <div class="back-button__icon">
      <ArrowLeftIcon
        class="fill-dark-gray group-hover:fill-primary"
        width="7px"
        height="12px"
      />
    </div>
    <div
      v-if="label || $slots.default"
      class="ml-[10px] text-dark-gray group-hover:text-primary"
    >
      <slot>
        {{ label }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowLeftIcon from '@/assets/img/icons/arrow-left.svg'

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
