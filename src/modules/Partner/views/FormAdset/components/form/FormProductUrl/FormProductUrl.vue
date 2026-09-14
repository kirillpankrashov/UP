<template>
  <div data-name="partner-form-adset-product-url">
    <ElFormItem
      data-test="adset-form-product-url-general"
      :label="t('adset.chatBot.form.productUrl.label')"
      prop="productUrl.general"
    >
      <ElInput
        data-test="adset-form-product-url-general-input"
        :placeholder="t('adset.chatBot.form.productUrl.placeholder')"
        size="large"
        v-model="model.productUrl.general"
      />
    </ElFormItem>

    <ElFormItem
      data-test="adset-form-product-url-mobile"
      :label="t('adset.chatBot.form.mobileProductUrl.label')"
      prop="productUrl.mobile"
    >
      <ElInput
        data-test="adset-form-product-url-mobile-input"
        :placeholder="t('adset.chatBot.form.mobileProductUrl.placeholder')"
        size="large"
        v-model="model.productUrl.mobile"
      />
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
	productUrl: {
		general: string
		mobile: string
	}
}>({ required: true })
</script>