<template>
  <div data-name="partner-form-campaign-url-params">
    <div class="_text-m-regular mb-6">
      {{ t('campaign.urlParams.description') }}
    </div>

    <UrlParamBlock
      v-for="(item, idx) in model.productUrlParams"
      :key="item.key"
      :index="idx + 1"
      :blocks="model.productUrlParams"
      :model-value="item"
      :show-delete-block-button="showDeleteBlockButton(item, idx)"
      :advertiser-currency="selectedAdvertiserCurrency"
      @delete-block="deleteBlock(idx)"
    />

    <button
      v-if="showAddBlockButton"
      @click="addBlock"
      class="_text-s-regular group flex gap-2 border-none bg-transparent text-gray hover:text-primary"
      type="button"
    >
      <PlusIcon class="h-3 w-3 fill-gray group-hover:fill-primary" />
      {{ t('campaign.urlParams.field.addParam') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'

import { CurrencyName } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { useAdvertisersStore } from '@/modules/Partner/views/Advertisers/store'
import { messages } from '@/modules/Partner/views/FormCampaign/locales'
import { CampaignUrlParams, type IFormUrlParamItem } from '@/modules/Partner/views/FormCampaign/types'

import { UrlParamBlock } from './components'

import PlusIcon from '@/assets/img/icons/plus.svg'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
  productUrlParams: IFormUrlParamItem[]
	advertiser: number | undefined
}>({ required: true })

const advertiserStore = useAdvertisersStore()
const selectedAdvertiserCurrency = computed(() => advertiserStore.advertisers?.find(item => item.id === model.value.advertiser)?.wallet.currency.code || CurrencyName.USD)

// const showAddBlockButton = computed(() => model.value.length < Object.keys(CampaignUrlParams).length)
const showAddBlockButton = computed(() => true)

const showDeleteBlockButton = (item: IFormUrlParamItem, index: number) => {
	if (item.param === CampaignUrlParams.ERID_TOKEN && item.name === 'erid' && index === 0) {
		return false
	}
	if (model.value.productUrlParams.length > 1) {
		return true
	}
	if (model.value.productUrlParams[0].name && model.value.productUrlParams[0].param) {
		return true
	}
	return false
}

const addBlock = () => {
	model.value.productUrlParams.push({
		key: new Date().getTime().toString(),
		param: undefined,
		name: null,
	})
}

const deleteBlock = (idx: number) => {
	model.value.productUrlParams.splice(idx, 1)

	if (!model.value.productUrlParams.length) {
		addBlock()
	}
}

onMounted(() => {
	if (!Object.keys(model.value.productUrlParams).length) {
		addBlock()
		return
	}

	model.value.productUrlParams = model.value.productUrlParams.map((item, i) => {
		return {
			...item,
			key: i.toString(),
		}
	})
})

watch(model.value, () => {
	if (selectedAdvertiserCurrency.value === CurrencyName.RUB && !model.value.productUrlParams.find(item => item.param === CampaignUrlParams.ERID_TOKEN && item.name === 'erid')) {
		model.value.productUrlParams.unshift({
			key: new Date().getTime().toString(),
			param: CampaignUrlParams.ERID_TOKEN,
			name: 'erid',
		})
		return
	}
})
</script>
