<template>
  <ElFormItem
    data-name="partner-form-adset-targeting-streamers"
    data-test="adset-form-targeting-streamers-item"
    :label="label"
    prop="targeting.streamers.list"
  >
    <ElSelect
      data-test="adset-form-targeting-streamers-select"
      v-model="model.targeting.streamers.list"
      :placeholder="t('adset.targeting.form.streamers.placeholder')"
      :disabled="disabled"
      :loading="loading"
      :remote-method="onSearch"
      :tag-type="model.targeting.streamers.exclude ? 'danger' : 'success'"
      size="large"
      remote
      filterable
      multiple
      @change="$emit('onInput', $event)"
    >
      <div class="px-5">
        <ElCheckbox
          data-test="adset-form-targeting-streamers-exclude-checkbox"
          v-model="model.targeting.streamers.exclude"
        >
          {{ t('placeholder.excludeSelected') }}
        </ElCheckbox>
      </div>

      <div class="mb-4 mt-2 h-[1px] bg-gray" />

      <ElOption
        v-for="item in list"
        :key="item.id"
        :value="item.id"
        :label="item.name"
        :data-test="`adset-form-targeting-streamers-option-${item.id}`"
      >
        <div class="flex items-center">
          <div
            v-if="item.platform?.avatar"
            class="mr-2 h-6 w-6 rounded-full bg-cover bg-center"
            :style="{backgroundImage: `url(${item.platform?.avatar})`}"
          />
          {{ item.name }}
          <SocialIcon
            v-if="item.platform"
            :platform="item.platform.name"
            class="ml-2 h-4 w-4"
          />
        </div>
      </ElOption>
    </ElSelect>
  </ElFormItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ref } from 'vue'
import { debounce, uniqBy } from 'lodash'

import { type AdFormat,Platform, StrategyPayment, type TCPM } from '@/core/types'
import { Logger } from '@/core/helpers'
import { useCurrency, useLocale } from '@/core/hooks'
import { useDictStore } from '@/core/store'
import { SocialIcon } from '@/components'
import { ElCheckbox, ElFormItem, ElOption, ElSelect } from '@/components/element-plus'
import { type ITargetingStreamerSearch, searchStreamers } from '@/modules/Partner/views/FormAdset/api'
import { messages } from '@/modules/Partner/views/FormAdset/locales'
import type { ITargetingStreamer } from '@/modules/Partner/views/FormAdset/types'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'
import { usePartnerStore } from '@/modules/Partner/views/Profile/store'

const { t } = useLocale<typeof messages>(messages)

const { convertCurrency, formatCurrency } = useCurrency()

const model = defineModel<{
	targeting: {
		streamers: {
			list: number[]
			exclude: boolean
		}
		agencies: number[]
	}
	format: AdFormat
	strategyPayment?: StrategyPayment
}>({ required: true })

const props = defineProps<{
	campaignCategory: string
	streamers: ITargetingStreamer[]
	platform: Platform
	disabled: boolean
}>()

defineEmits(['onInput'])

const dictStore = useDictStore()
const partnerStore = usePartnerStore()
const formCampaignStore = useFormCampaignStore()

const label = computed(() => {
	if (!model.value.targeting.streamers.list.length) return t('adset.targeting.form.streamers.label')
	if (model.value.targeting.streamers.exclude) {
		return `${t('adset.targeting.form.streamers.label')} (${t('adset.targeting.addition.exceptSelected')})`
	}
	return `${t('adset.targeting.form.streamers.label')} (${t('adset.targeting.addition.onlySelected')})`
})

const streamers = ref<ITargetingStreamer[] | ITargetingStreamerSearch[]>(props.streamers)
const loading = ref(false)

const partner = computed(() => partnerStore.profile)
const agenciesDict = computed(() => dictStore.campaigns?.agencies || [])
const partnerAgency = computed(() => agenciesDict.value.find(agency => agency.id === partner.value?.agency.id))
const category = computed(() => dictStore.all?.campaignsCategories.find(category => category.title === props.campaignCategory))

const campaignStructure = computed(() => formCampaignStore.campaignStructure)
const advertiserCurrency = computed(() => campaignStructure.value?.advertiser?.wallet?.currency?.code)

const isCampaignCategoryDarkMarket = computed(() => {
	const category = dictStore.all?.campaignsCategories.find(category => category.title === props.campaignCategory)

	return category?.darkMarket
})

const formatStreamerName = (streamers: ITargetingStreamer[] | ITargetingStreamerSearch[]) => {
	if (!advertiserCurrency.value) {
		return streamers
	}

	return streamers.map(streamer => {
		if (!partnerAgency.value || !streamer?.cpm || !streamer?.agency?.cpm) {
			return streamer
		}

		let userAgencyCostType: keyof TCPM
		let agencyCostType: keyof TCPM
		let userAgencyCost = null
		let agencyCost = null

		if (model.value.strategyPayment) {
			switch (model.value.strategyPayment) {
				case StrategyPayment.PPV:
				case StrategyPayment.PPVA:
					userAgencyCostType = isCampaignCategoryDarkMarket.value ? 'darkMarketInternalCpm' : 'internalCpm'
					agencyCostType = isCampaignCategoryDarkMarket.value ? 'darkMarketExternalCpm' : 'externalCpm'
					userAgencyCost = streamer.cpm?.[userAgencyCostType]?.[model.value.format] ?? streamer.agency.cpm?.[userAgencyCostType]?.[model.value.format]
					agencyCost = streamer.cpm?.[agencyCostType]?.[model.value.format] ?? streamer.agency.cpm?.[agencyCostType]?.[model.value.format]
					break
				case StrategyPayment.CPA:
					userAgencyCostType = isCampaignCategoryDarkMarket.value ? 'darkMarketInternalCpa' : 'internalCpa'
					agencyCostType = isCampaignCategoryDarkMarket.value ? 'darkMarketExternalCpa' : 'externalCpa'
					userAgencyCost = streamer.cpm?.[userAgencyCostType] ?? streamer.agency.cpm?.[userAgencyCostType]
					agencyCost = streamer.cpm?.[agencyCostType] ?? streamer.agency.cpm?.[agencyCostType]
					break
				case StrategyPayment.CPC:
					userAgencyCostType = isCampaignCategoryDarkMarket.value ? 'darkMarketInternalCpc' : 'internalCpc'
					agencyCostType = isCampaignCategoryDarkMarket.value ? 'darkMarketExternalCpc' : 'externalCpc'
					userAgencyCost = streamer.cpm?.[userAgencyCostType] ?? streamer.agency.cpm?.[userAgencyCostType]
					agencyCost = streamer.cpm?.[agencyCostType] ?? streamer.agency.cpm?.[agencyCostType]
					break
			}
		}

		const cost = partnerAgency.value.id === streamer.agency.id ? userAgencyCost : agencyCost

		let price = ''

		if (cost) {
			price = ` (${formatCurrency(convertCurrency(+cost, partnerAgency.value.currency, advertiserCurrency.value))})`
		}

		if (streamer.name.includes(price)) {
			return streamer
		}

		return {
			...streamer,
			name: streamer.name + price,
		}
	})
}

const list = computed(() => {
	return uniqBy([
		...formatStreamerName(streamers.value),
		...formatStreamerName(props.streamers),
	], 'id')
})

const searchInPlatform = async (
	platform: Platform,
	value: string,
) => {
	try {
		return searchStreamers(platform,{
			query: value,
			agencies: model.value.targeting.agencies || [],
			format: model.value.format,
			// minCpm: model.value.targeting.minCpm,
			// maxCpm: model.value.targeting.maxCpm,
			darkMarket: isCampaignCategoryDarkMarket.value,
			category: category.value?.id ?? null,
		})
	}
	catch (err) {
		Logger.error('Error searching streamers', true, err)
		return []
	}
}

const onSearch = (value: string) => {
	if (props.disabled || value.length < 3) return []

	loading.value = true

	debounce(async () => {
		try {
			const selected = list.value.filter(item =>
				model.value.targeting.streamers.list.includes(item.id),
			)

			// let newStreamers: ITargetingStreamerSearch[] = []
			// await Promise.all(Object.values(Platform).map(async platform => {
			// 	const res = await searchInPlatform(platform, value)
			// 	if (res) newStreamers.push(...res)
			// }))

			const newStreamers = await searchInPlatform(props.platform, value)

			streamers.value = uniqBy(
				[...selected, ...newStreamers],
				'id',
			) as ITargetingStreamerSearch[]
		}
		finally {
			loading.value = false
		}
	}, 500)()
}
</script>
