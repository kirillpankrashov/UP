<template>
  <ElSelect
    data-testid="adset-form-platform-select"
    :popper-class="`adset-platform-select`"
    v-model="model.platform"
    :size="'large'"
  >
    <template #prefix>
      <SocialIcon
        :platform="model.platform"
        classes="mr-2 h-[26px] w-[26px] fill-[var(--color-twitch)]"
      />
    </template>

    <ElOption
      v-for="platform in platforms"
      :key="platform.id"
      :label="platform.label"
      :value="platform.id"
    >
      <SocialIcon
        :platform="platform.id"
        classes="mr-2 h-[26px] w-[26px] fill-[var(--color-twitch)]"
      />
      {{ platform.label }}
    </ElOption>
  </ElSelect>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Platform } from '@/core/types'
import { useDictStore } from '@/core/store'
import { SocialIcon } from '@/components'
import { ElOption, ElSelect } from '@/components/element-plus'

const model = defineModel<{
  platform: Platform
}>({ required: true })

const dictStore = useDictStore()

const platforms = computed(() => Object.entries(dictStore.campaigns?.platforms ?? {}).map(([key, value]) => ({
	id: key as Platform,
	label: value,
})))
</script>

<style lang="scss">
.adset-platform-select {
  .el-select-dropdown__item {
		@apply flex items-center pl-3
  }
}
</style>
