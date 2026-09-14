<template>
  <SpecialProjectSkeleton v-if="showSkeleton" />

  <ElForm
    v-else-if="model"
    ref="formRef"
    data-test="special-project-form"
    :label-position="'top'"
    :model="model"
    :rules="rules"
    :validate-on-rule-change="false"
    scroll-to-error
    :scroll-into-view-options="{ behavior: 'smooth', block: 'center' }"
    @submit.prevent="onSubmit"
  >
    <DashboardSection
      v-if="route.name === RouteName.ADSET_EDIT"
      :title="t('adset.settings.form.status.label')"
      data-test="special-project-status-section"
    >
      <FormStatus v-model="modelVisibleStatus" />
    </DashboardSection>

    <DashboardSection
      :title="t('adset.settings.title')"
      :no-border="route.name === RouteName.ADSET_EDIT"
      data-test="special-project-settings-section"
    >
      <p class="_text-m-regular mb-6">
        {{ t('adset.settings.description') }}
      </p>

      <DashboardSubsection
        :title="t('adset.settings.form.name.title')"
        class="mb-6"
      >
        <FormTitle
          v-model="model"
          class="!mb-6"
        />
      </DashboardSubsection>

      <FormDescription
        v-model="model"
        class="!mb-6"
      />

      <DashboardSubsection
        :title="t('adset.settings.form.platform.title')"
        class="mb-6"
      >
        <FormPlatform v-model="model" />
      </DashboardSubsection>

      <DashboardSubsection
        :title="t('adset.settings.form.format.title')"
        class="mb-6"
      >
        <FormFormat v-model="model" />

        <FormFormatSettings
          v-model="model"
          class="mt-6"
        />
      </DashboardSubsection>

      <DashboardSubsection
        :title="t('adset.settings.form.schedule.title')"
        class="mb-6"
      >
        <FormSchedule
          v-model="model"
          class="!mb-6"
        />

        <FormTimezone
          v-model="model"
          class="!mb-6"
        />
      </DashboardSubsection>

      <DashboardSubsection
        :title="t('adset.settings.form.budget.title')"
        class="mb-6"
      >
        <FormBudget
          v-model="model"
          class="!mb-6"
        />
      </DashboardSubsection>
    </DashboardSection>

    <DashboardSection
      :title="t('adset.targeting.title')"
      data-test="special-project-targeting-section"
    >
      <FormTargetingStreamers
        v-model="model"
        :disabled="false"
        :platform="model.platform"
        :streamers="adset?.targeting.streamers ?? []"
        :currency="currency"
        class="!mb-6"
      />
    </DashboardSection>

    <DashboardSection
      :title="t('adset.targetingAudience.title')"
      data-test="special-project-audience-section"
    >
      <FormTargetingCountriesAuditory
        v-model="model"
        :disabled="false"
        class="!mb-6"
      />

      <FormTargetingDevicesAuditory
        v-model="model"
        :disabled="false"
      />
    </DashboardSection>
  </ElForm>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { isEqual } from 'lodash'

import {
	AdEntityType,
	AdFormat,
	CampaignType,
	CurrencyName,
	Platform,
	StrategyPayment,
} from '@/core/types'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { router } from '@/core/router'
import { required } from '@/core/validators'
import { ElForm } from '@/components/element-plus'
import { DashboardSection, DashboardSubsection } from '@/components/layouts'
import { RouteName } from '@/modules/Partner/router'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'
import type { ICreateSpecialProjectAdsetData, ISpecialProjectAdset } from '@/modules/Partner/views/FormAdset/api'
import {
	FormDescription,
	FormFormat,
	FormPlatform,
	FormSchedule,
	FormStatus,
	FormTargetingCountriesAuditory,
	FormTargetingDevicesAuditory,
	FormTimezone,
	FormTitle,
} from '@/modules/Partner/views/FormAdset/components/form'
import { FormBudget, FormFormatSettings, FormTargetingStreamers } from '@/modules/Partner/views/FormAdset/components/form/type/SpecialProject'
import { messages } from '@/modules/Partner/views/FormAdset/locales'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

import SpecialProjectSkeleton from './SpecialProjectSkeleton.vue'

const route = useRoute()

const { t } = useLocale<typeof messages>(messages)

const campaignsStore = useCampaignsStore()
const formCampaignStore = useFormCampaignStore()
const formAdsetStore = useFormAdsetStore()

const currency = computed(() => formCampaignStore.campaignStructure?.advertiser?.wallet?.currency)

const adset = computed(() => formAdsetStore.adset as ISpecialProjectAdset | null)

const formRef = ref<FormInstance>()

let modelVisibleStatus = ref(true)

const sending = ref(false)
const success = ref(false)

const rules = computed<FormRules<ICreateSpecialProjectAdsetData>>(() => ({
	title: [required],
	platform: [required],
	format: [required],
	strategyPayment: [required],
	'dates.start': [required],
	timeZone: [required],
	bidCap: [required],
	'targeting.streamers': [required],
}))

const defaultModel: ICreateSpecialProjectAdsetData = {
	campaignSlug: route.params.campaignSlug as string,
	title: {
		default: '',
		alternative: '',
	},
	description: '',
	platform: Platform.TWITCH,
	format: AdFormat.FULLSCREEN,
	formatEdit: true,
	duration: undefined,
	frequency: undefined,
	strategyPayment: StrategyPayment.PPP,
	bidCap: undefined,
	timeZone: undefined,
	dates: {
		start: undefined,
		end: undefined,
	},
	targeting: {
		countriesAuditory: {
			list: [],
			exclude: false,
		},
		devicesAuditory: {
			list: [],
			exclude: false,
		},
		streamers: [],
	},
}

let model = reactive<ICreateSpecialProjectAdsetData>({
	...defaultModel,
})

const adsetToModel = (adsetData: ISpecialProjectAdset): ICreateSpecialProjectAdsetData => {
	if (!adsetData) return { ...defaultModel }

	return {
		campaignSlug: route.params.campaignSlug as string,
		title: {
			default: adsetData.title,
			alternative: adsetData.titleAlternative ?? '',
		},
		description: adsetData.description,
		platform: adsetData.platform,
		format: adsetData.format.id,
		formatEdit: adsetData.formatEdit,
		duration: adsetData.duration ?? undefined,
		frequency: adsetData.frequency ?? undefined,
		strategyPayment: adsetData.strategyPayment,
		bidCap: adsetData.bidCap ?? undefined,
		timeZone: adsetData.timeZone ?? undefined,
		dates: {
			start: adsetData.start,
			end: adsetData.end,
		},
		targeting: {
			countriesAuditory: {
				list: adsetData.targeting.countriesAuditory.list,
				exclude: adsetData.targeting.countriesAuditory.exclude,
			},
			devicesAuditory: {
				list: adsetData.targeting.devicesAuditory.list,
				exclude: adsetData.targeting.devicesAuditory.exclude,
			},
			streamers: adsetData.targeting.streamers,
		},
	}
}

const onSubmit = async () => {
	if (!formRef.value) return

	sending.value = true

	try {
		const isValid = await formRef.value.validate()

		if (!isValid) {
			Logger.error('Validation error')
			return
		}

		if (route.name === RouteName.ADSET_CREATE) {
			await formAdsetStore.createAdset(model)
		}

		if (route.name === RouteName.ADSET_EDIT) {
			if (adset.value && adset.value.visible !== modelVisibleStatus.value) {
				await campaignsStore.changeStatus(adset.value.slug, CampaignType.SPECIAL_PROJECT, AdEntityType.ADSETS)
			}
			await formAdsetStore.updateAdset({
				...model,
				slug: adset.value!.slug,
			})
		}

		success.value = true
		setTimeout(() => {
			success.value = false
			if (route.name === RouteName.ADSET_CREATE) {
				router.push({
					name: RouteName.ADSET_EDIT,
					params: {
						campaignSlug: adset.value?.campaign.slug,
						adsetSlug: adset.value?.slug,
					},
				})
				formCampaignStore.fetchCampaignStructure(route.params.campaignSlug as string)
			}
		}, 3000)
	}
	catch(err) {
		Logger.error('Error saving Special Project campaign', true, err)
	}
	finally {
		sending.value = false
	}
}

const showCloseDialog = computed(() => {
	if (route.name === RouteName.CAMPAIGN_EDIT) {
		return !isEqual(model, adsetToModel(formAdsetStore.adset as ISpecialProjectAdset))
	}
	if (route.name === RouteName.CAMPAIGN_CREATE) {
		return !isEqual(model, defaultModel)
	}

	return true
})

const closeAndReturnRoute = computed(() => RouteName.SPECIAL_PROJECT_ADSETS)

const showSkeleton = computed(() => route.name === RouteName.ADSET_EDIT && formAdsetStore.isFetchingAdset)

const setFormData = (adsetData: ISpecialProjectAdset | null) => {
	if (!adsetData) {
		Object.assign(model, defaultModel)
		return
	}

	const data = adsetToModel(adsetData)
	Object.assign(model, data)
	modelVisibleStatus.value = adsetData.visible
}

onMounted(() => {
	setFormData(formAdsetStore.adset as ISpecialProjectAdset)
})

watch(adset, (adsetData) => {
	setFormData(adsetData as ISpecialProjectAdset)
})

watch(() => route.params, () => {
	defaultModel.campaignSlug = route.params.campaignSlug as string
	if (route.name === RouteName.ADSET_CREATE) {
		setFormData(null)
	}
})

defineExpose({
	onSubmit,
	closeAndReturnRoute,
	showCloseDialog,
	sending,
	success,
})
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>
