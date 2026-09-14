<template>
  <div
    data-name="partner-form-campaign-url-params-block"
    class="mb-8"
  >
    <div class="mb-3 flex justify-between">
      <div class="_text-m-bold">
        {{ t('campaign.urlParams.field.paramBlock') }} {{ index }}
      </div>

      <MiniXButton
        v-if="showDeleteBlockButton"
        @click="$emit('delete-block')"
      >
        {{ t('campaign.urlParams.field.deleteParam') }}
      </MiniXButton>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <ElFormItem :label="t('campaign.urlParams.field.param')">
        <ElInput
          :placeholder="'utm_creator'"
          v-model="model.name"
          @input="formatInput"
          :disabled="disabled"
          size="large"
        />
      </ElFormItem>

      <ElFormItem :label="t('campaign.urlParams.field.name')">
        <ElSelect
          :placeholder="'user_id'"
          v-model="model.param"
          :disabled="disabled"
          size="large"
          filterable
        >
          <ElOption
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </ElFormItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { CurrencyName } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { MiniXButton } from '@/components'
import { ElFormItem, ElInput, ElOption, ElSelect } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormCampaign/locales'
import { CampaignUrlParams, type IFormUrlParamItem } from '@/modules/Partner/views/FormCampaign/types'

const { t } = useLocale<typeof messages>(messages)

const props = defineProps<{
  index: number
  blocks: IFormUrlParamItem[]
  showDeleteBlockButton?: boolean
  advertiserCurrency: CurrencyName
}>()

const model = defineModel<IFormUrlParamItem>({ required: true })

defineEmits(['delete-block'])

const disabled = computed(() => {
	if (
		props.advertiserCurrency === CurrencyName.RUB &&
    model.value.param === CampaignUrlParams.ERID_TOKEN &&
    model.value.name === 'erid' &&
    props.index === 1
	) {
		return true
	}
	return false
})

// const locale = computed<any>(() => useLocaleObj('urlParams.field'))
const options = computed(() => {
	return Object.values(CampaignUrlParams)
	// .filter(option => (
	//   props.model.find(item => item.param === option)?.param !== option
	// ))
		.filter(option => {
			if (props.advertiserCurrency !== CurrencyName.RUB && option === CampaignUrlParams.ERID_TOKEN) {
				return
			}
			// const hasEridBlock = props.blocks.find(block => block.param === CampaignUrlParams.ERID_TOKEN)
			// if (hasEridBlock && option === CampaignUrlParams.ERID_TOKEN) {
			// 	return
			// }
			return option
		})
		.map(option => ({
			value: option,
			label: option,
		}))
})

const formatInput = (value: string) => {
	model.value.name = value.replace(/[^A-Za-z0-9-=_.~]/g, '')
}

defineExpose({
	model,
	formatInput,
})
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>
