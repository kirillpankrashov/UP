<template>
  <div
    data-name="partner-form-adset-format-selector"
    class="flex flex-col gap-4"
  >
    <FormatItem
      v-for="item in formats"
      :key="item.id"
      :item="item"
      :disabled="!model.formatEdit"
      :value="model.format"
      @update:value="onUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { AdFormat } from '@/core/types'
import { isExternalFormat } from '@/core/helpers'
import { useDictStore } from '@/core/store'

import { FormatItem } from './components'

const model = defineModel<{
  format: AdFormat
	formatEdit: boolean
}>({ required: true })

const dictStore = useDictStore()

const formats = computed(() => dictStore.campaigns?.formats.filter(format => !isExternalFormat(format.id)) || [])

const onUpdate = (value: AdFormat) => {
	if (!value) return

	model.value.format = value
}
</script>
