<template>
  <div data-name="partner-form-creative-title">
    <ElFormItem
      :label="t('creative.form.name.label')"
      prop="title.default"
    >
      <ElInput
        :placeholder="t('creative.form.name.placeholder')"
        size="large"
        v-model="model.title.default"
        :maxlength="120"
        show-word-limit
      />
    </ElFormItem>

    <button
      v-show="!showAlternativeName && !model.title.alternative && modelHasAlternatibeTitle"
      @click="showAlternativeName = true"
      class="_text-m-regular group mt-4 flex cursor-pointer items-center gap-1 border-none bg-transparent text-dark-gray hover:text-primary"
    >
      <PlusIcon class="h-3 w-3 fill-dark-gray group-hover:fill-primary" />
      {{ t('creative.form.altName.addBtn') }}
    </button>

    <div
      v-show="(showAlternativeName || model.title.alternative) && modelHasAlternatibeTitle"
      class="mt-6"
    >
      <ElFormItem
        :label="t('creative.form.altName.label')"
        prop="title.alternative"
      >
        <ElInput
          :placeholder="t('creative.form.name.placeholder')"
          size="large"
          v-model="model.title.alternative"
          :maxlength="120"
          show-word-limit
        />
      </ElFormItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed,ref } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormCreative/locales'

import PlusIcon from '@/assets/img/icons/plus.svg'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
  title: {
		default: string
		alternative?: string
	}
}>({ required: true })

const showAlternativeName = ref(false)
const modelHasAlternatibeTitle = computed(() => 'alternative' in model.value.title)
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>
