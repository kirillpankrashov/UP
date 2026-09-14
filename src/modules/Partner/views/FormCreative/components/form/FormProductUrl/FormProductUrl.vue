<template>
  <div data-name="partner-form-creative-product-url">
    <ElFormItem
      data-test="creative-form-product-url-general"
      :label="t('creative.form.data.fields.productUrl.label')"
      prop="productUrl.general"
    >
      <ElInput
        data-test="creative-form-product-url-general-input"
        :placeholder="t('creative.form.data.fields.productUrl.placeholder')"
        size="large"
        v-model="model.productUrl.general"
      />
    </ElFormItem>

    <ElFormItem
      data-test="creative-form-product-url-mobile"
      :label="t('creative.form.data.fields.mobileProductUrl.label')"
      prop="productUrl.mobile"
    >
      <ElInput
        data-test="creative-form-product-url-mobile-input"
        :placeholder="t('creative.form.data.fields.mobileProductUrl.placeholder')"
        size="large"
        v-model="model.productUrl.mobile"
      />
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormCreative/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
	productUrl: {
		general: string
		mobile: string
	}
}>({ required: true })
</script>