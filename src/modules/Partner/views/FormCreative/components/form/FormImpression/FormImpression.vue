<template>
  <div data-name="partner-form-creative-impression">
    <ElAlert
      type="success"
      :closable="false"
      show-icon
      class="!mb-3"
      data-test="impression-alert"
    >
      <p
        class="_text-m-regular"
        v-html="tm('creative.form.data.fields.pixelImpressions.alert')"
      />
    </ElAlert>

    <ElFormItem
      prop="pixelImpressions"
      data-test="impression-form-item"
    >
      <div class="grid w-full gap-4">
        <ElInput
          v-for="(pixel, index) in model.pixelImpressions"
          :key="index"
          :placeholder="t('creative.form.data.fields.pixelImpressions.placeholder')"
          size="large"
          v-model="model.pixelImpressions[index]"
          :data-test="`impression-input-${index}`"
        />
      </div>
    </ElFormItem>

    <button
      @click="addItem"
      :disabled="disabledAddButton"
      class="_text-m-regular group mt-4 flex cursor-pointer items-center gap-1 border-none bg-transparent text-dark-gray hover:text-primary"
      data-test="impression-add-button"
    >
      <PlusIcon class="h-3 w-3 fill-dark-gray group-hover:fill-primary" />
      {{ t('creative.form.data.fields.pixelImpressions.addLabel') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElAlert, ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormCreative/locales'

import PlusIcon from '@/assets/img/icons/plus.svg'

const { t, tm } = useLocale<typeof messages>(messages)

const model = defineModel<{
	pixelImpressions: string[]
}>({ required: true })

const disabledAddButton = computed(() => model.value.pixelImpressions.some(item => item === ''))

const addItem = () => {
	model.value.pixelImpressions.push('')
}

onMounted(() => {
	if (model.value.pixelImpressions.length === 0) {
		addItem()
	}
})
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>