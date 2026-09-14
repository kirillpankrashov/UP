<template>
  <ElButton
    class="ml-0 p-0"
    type="primary"
    @click="$emit('click')"
    link
  >
    <RefreshIcon
      class="mr-[10px] h-3 w-3 fill-primary"
      :class="{'animate-spin': loading}"
    />
    <slot />
  </ElButton>
</template>

<script setup lang="ts">
import { ElButton } from '@/components/element-plus'

import RefreshIcon from '@/assets/img/icons/refresh.svg'

defineEmits(['click'])

defineProps<{
  loading: boolean
}>()
</script>
