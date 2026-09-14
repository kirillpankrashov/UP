<template>
  <ElButton
    circle
    class="h-10 w-10"
    @click="$emit('close')"
  >
    <CloseIcon class="h-3 w-3 fill-[var(--el-text-color-regular)]" />
  </ElButton>
</template>

<script setup lang="ts">
import { ElButton } from '@/components/element-plus'

import CloseIcon from '@/assets/img/icons/x.svg'

defineEmits(['close'])
</script>
