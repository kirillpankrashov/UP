<template>
  <div data-name="partner-form-creative-pixel">
    <ElFormItem
      prop="pixelClicks"
    >
      <div class="grid w-full gap-4">
        <ElInput
          v-for="(pixel, index) in model.pixelClicks"
          :key="index"
          :placeholder="t('creative.form.data.fields.pixelClicks.placeholder')"
          size="large"
          v-model="model.pixelClicks[index]"
        />
      </div>
    </ElFormItem>

    <button
      @click="addItem"
      :disabled="disabledAddButton"
      class="_text-m-regular group mt-4 flex cursor-pointer items-center gap-1 border-none bg-transparent text-dark-gray hover:text-primary"
    >
      <PlusIcon class="h-3 w-3 fill-dark-gray group-hover:fill-primary" />
      {{ t('creative.form.data.fields.pixelInspections.addLabel') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormCreative/locales'

import PlusIcon from '@/assets/img/icons/plus.svg'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
	pixelClicks: string[]
}>({ required: true })

const disabledAddButton = computed(() => model.value.pixelClicks.some(item => item === ''))

const addItem = () => {
	model.value.pixelClicks.push('')
}
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>