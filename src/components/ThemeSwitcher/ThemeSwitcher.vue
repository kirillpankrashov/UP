<template>
  <ElRadioGroup
    v-model="mode"
    size="small"
  >
    <ElRadioButton value="light">
      <ElIcon>
        <Sunny />
      </ElIcon>
    </ElRadioButton>

    <ElRadioButton value="dark">
      <ElIcon>
        <Moon />
      </ElIcon>
    </ElRadioButton>

    <ElRadioButton value="auto">
      <ElIcon>
        <Monitor />
      </ElIcon>
    </ElRadioButton>
  </ElRadioGroup>
</template>

<script setup lang="ts">
import { Monitor, Moon, Sunny } from '@element-plus/icons-vue'
import { useColorMode } from '@vueuse/core'

import { ElIcon, ElRadioButton, ElRadioGroup } from '@/components/element-plus'

const { store: mode } = useColorMode({
	attribute: 'class',
	modes: {
		dark: 'dark',
		light: '',
	},
	storageKey: 'theme',
})
</script>
