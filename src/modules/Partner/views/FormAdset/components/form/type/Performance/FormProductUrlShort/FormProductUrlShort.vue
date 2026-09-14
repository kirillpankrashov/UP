<template>
  <div
    data-name="partner-form-adset-product-url-short"
    data-test="adset-product-url-short-root"
  >
    <ElFormItem
      :label="t('adset.chatBot.form.productUrlShort.label')"
      prop="productUrlShort"
    >
      <ElInput
        :placeholder="t('adset.chatBot.form.productUrlShort.placeholder')"
        size="large"
        v-model="model.productUrlShort"
        :disabled="true"
        data-test="adset-product-url-short-input"
      />
    </ElFormItem>

    <div class="mt-4 grid grid-cols-2 gap-4">
      <ElButton
        data-test="adset-product-url-short-copy-btn"
        size="large"
        :type="copiedStatus ? 'success' : 'primary'"
        @click="copyLink"
      >
        <span class="_text-m-bold">{{ copiedStatus ? t('button.copyLink.success') : t('button.copyLink.static') }}</span>
      </ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { ElButton, ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

const { t } = useLocale<typeof messages>(messages)

const {
	copy,
	copied: copiedStatus,
	isSupported,
} = useClipboard({
	copiedDuring: 2000,
})

const model = defineModel<{
	productUrlShort: string
}>({ required: true })

const copyLink = () => {
	if (!isSupported.value) {
		Logger.info('Clipboard is not supported', true)
		return
	}

	if (copiedStatus.value) return

	copy(model.value.productUrlShort)
}
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>
