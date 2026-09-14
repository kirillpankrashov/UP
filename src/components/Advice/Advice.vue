<template>
  <Content
    v-if="!appStore.isMobile"
    :type="type"
    :title="title"
    :label="label"
    :hide-label="hideLabel"
  >
    <slot />
  </Content>

  <ElDialog
    v-else
    v-model="mobileVisible"
    :append-to-body="true"
    :before-close="onDialogClose"
    :width="'calc(100% - 40px)'"
  >
    <Content
      :type="type"
      :title="title"
      :label="label"
      :hide-label="hideLabel"
    >
      <slot />
    </Content>
  </ElDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useAppStore } from '@/core/store'
import { ElDialog } from '@/components/element-plus'

import { Content } from './components'

withDefaults(defineProps<{
  type?: 'hint' | 'primary' | 'danger' | 'warning'
  title?: string | null
  label?: string | null
  hideLabel?: boolean
}>(), {
	type: 'hint',
	title: null,
	label: null,
	hideLabel: false,
})

const emit = defineEmits(['dialog-closed'])

const appStore = useAppStore()

const mobileVisible = ref(false)

const toggleModal = () => mobileVisible.value = !mobileVisible.value

defineExpose({
	toggleModal,
})

const onDialogClose = (cb: () => void) => {
	emit('dialog-closed')
	cb()
}
</script>
