<template>
  <span class="ml-1 inline-block align-middle">
    <ElPopover
      :placement="placement"
      popper-class="field-label-popper"
      trigger="hover"
      :offset="10"
      width="220px"
    >
      <template #reference>
        <HelpIcon
          class="cursor-pointer fill-dark-gray hover:fill-primary"
          :width="size"
          :height="size"
        />
      </template>

      <slot />
    </ElPopover>
  </span>
</template>

<script setup lang="ts">
import { ElPopover } from '@/components/element-plus'

import HelpIcon from '@/assets/img/icons/help-icon.svg'

withDefaults(defineProps<{
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
  size?: number
}>(), {
	placement: 'bottom',
	size: 16,
})
</script>

<style>
.field-label-popper {
  max-width: 220px;
  padding: 12px;
  text-align: left;
  word-break: normal;
  font-size: 12px;
  line-height: 14px;
}
</style>
