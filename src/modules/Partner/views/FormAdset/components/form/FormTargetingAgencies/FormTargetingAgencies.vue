<template>
  <ElFormItem
    data-name="partner-form-adset-targeting-agencies"
    data-test="adset-form-targeting-agencies-item"
    :label="t('adset.targeting.form.agencies.label')"
    prop="targeting.agencies"
  >
    <ElSelect
      data-test="adset-form-targeting-agencies-select"
      :disabled="disabled"
      :placeholder="t('adset.targeting.form.agencies.placeholder')"
      size="large"
      tag-type="success"
      @change="$emit('onInput', $event)"
      v-model="model.targeting.agencies"
      multiple
      filterable
    >
      <ElOption
        v-for="item in agencies"
        :key="item.id"
        :value="item.id"
        :label="item.title"
        :data-test="`adset-form-targeting-agencies-option-${item.id}`"
      />
    </ElSelect>

    <ElAlert
      v-if="showWarning"
      data-test="adset-form-targeting-agencies-warning"
      :title="t('adset.targeting.form.agencies.warning.title')"
      class="!mt-4"
      type="warning"
      show-icon
      :closable="false"
    >
      <p
        class="_text-s-regular"
        v-html="t('adset.targeting.form.agencies.warning.text')"
      />
    </ElAlert>
  </ElFormItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { AdFormat } from '@/core/types'
import { useCurrency, useLocale } from '@/core/hooks'
import { useDictStore } from '@/core/store'
import { ElAlert,ElFormItem, ElOption, ElSelect } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'
import { usePartnerStore } from '@/modules/Partner/views/Profile/store'

const { t } = useLocale<typeof messages>(messages)

const { convertCurrency, formatCurrency } = useCurrency()

const model = defineModel<{
	targeting: {
		agencies: number[]
	}
	format: AdFormat
	bidCap: number | undefined
}>({ required: true })

defineProps<{
  disabled: boolean
}>()

defineEmits(['onInput'])

const dictStore = useDictStore()
const partnerStore = usePartnerStore()
const formCampaignStore = useFormCampaignStore()

const partner = computed(() => partnerStore.profile)
const agenciesDict = computed(() => dictStore.campaigns?.agencies || [])
const partnerAgency = computed(() => agenciesDict.value.find(agency => agency.id === partner.value?.agency.id))

const campaignStructure = computed(() => formCampaignStore.campaignStructure)
const advertiserCurrency = computed(() => campaignStructure.value?.advertiser?.wallet?.currency?.code)

const getAgencyCpm = (agency: typeof agenciesDict.value[number], value: 'min' | 'max') => {
	const userAgencyCPM = partnerAgency.value?.internalCpm[value][model.value.format]
	const agencyCPM = agency.externalCpm[value][model.value.format]

	const CPM = partnerAgency.value?.id === agency.id ? userAgencyCPM : agencyCPM

	if (!CPM) {
		return null
	}

	return parseFloat(convertCurrency(+CPM, agency.currency, advertiserCurrency.value).toString())
}

const agencies = computed(() => {
	return agenciesDict.value.map(agency => {
		let price = ''
		const minAgencyCPM = getAgencyCpm(agency, 'min')
		const maxAgencyCPM = getAgencyCpm(agency, 'max')

		if (agency.id !== 1) {
			if (minAgencyCPM && maxAgencyCPM) {
				const minPrice = formatCurrency(minAgencyCPM, true, advertiserCurrency.value)
				const maxPrice = formatCurrency(maxAgencyCPM, true, advertiserCurrency.value)

				price = ` (${minPrice} - ${maxPrice})`

				if (minAgencyCPM === maxAgencyCPM) {
					price = ` (${maxPrice})`
				}
			}

			if (minAgencyCPM && !maxAgencyCPM) {
				const minPrice = formatCurrency(minAgencyCPM, true, advertiserCurrency.value)

				price = ` (${minPrice})`
			}

			if (!minAgencyCPM && maxAgencyCPM) {
				const maxPrice = formatCurrency(maxAgencyCPM, true, advertiserCurrency.value)

				price = ` (${maxPrice})`
			}
		}

		return {
			...agency,
			title: agency.title + price,
		}
	})
})

const showWarning = computed<boolean>(() => {
	const bidCap = model.value.bidCap || 0

	return agencies.value
		.filter(agency => {
			const found = model.value.targeting.agencies.find(item => item === agency.id)
			if (found && getAgencyCpm(agency, 'min')) {
				return agency
			}
		})
		.some(agency => {
			const agencyCPM = getAgencyCpm(agency, 'min')
			if (!agencyCPM) {
				return false
			}
			return (agencyCPM / bidCap * 100) > 60
		})
})
</script>
