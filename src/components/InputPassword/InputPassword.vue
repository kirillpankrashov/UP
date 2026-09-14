<template>
  <ElInput
    class="input-password"
    :size="size"
    :placeholder="placeholder"
    :disabled="disabled"
    :type="showPass ? 'text' : 'password'"
    v-model="modelValue"
  >
    <template #suffix>
      <EyeCloseIcon
        v-if="showPass"
        class="h-4 w-4 cursor-pointer select-none"
        @click="showPass=!showPass"
      />

      <EyeIcon
        v-else
        class="h-4 w-4 cursor-pointer select-none"
        @click="showPass=!showPass"
      />
    </template>
  </ElInput>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { ElInput } from '@/components/element-plus'

import EyeIcon from '@/assets/img/icons/eye.svg'
import EyeCloseIcon from '@/assets/img/icons/eye-close.svg'

const modelValue = defineModel<string>({ required: true })

defineProps<{
	size: 'default' | 'small' | 'large'
  placeholder: string
  disabled: boolean
}>()

const showPass = ref(false)
</script>

<style lang="scss" scoped>
.input-password {
  :deep(.el-input__suffix) {
    display: flex;
    align-items: center;
    right: 20px;
  }
}
</style>
