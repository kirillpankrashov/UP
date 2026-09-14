<template>
  <ExtensionSkeleton v-if="showSkeleton" />

  <ElForm
    v-else-if="model"
    ref="formRef"
    data-test="extension-form"
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
      data-test="extension-status-section"
    >
      <FormStatus v-model="modelVisibleStatus" />
    </DashboardSection>

    <DashboardSection
      :title="t('adset.settings.title')"
      :no-border="route.name === RouteName.ADSET_EDIT"
      data-test="extension-settings-section"
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
      </DashboardSubsection>

      <DashboardSubsection
        :title="t('adset.settings.form.schedule.title')"
        class="mb-6"
      >
        <FormSchedule
          v-model="model"
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

      <DashboardSubsection
        v-if="[StrategyPayment.PPV, StrategyPayment.PPVA, StrategyPayment.CPA].includes(model.strategyPayment)"
        :title="t('adset.settings.form.targets.title')"
      >
        <FormTargets v-model="model" />
      </DashboardSubsection>
    </DashboardSection>

    <DashboardSection
      :title="t('adset.targeting.title')"
      data-test="extension-targeting-section"
    >
      <FormTargetingAgencies
        v-model="model"
        :disabled="!!model.targeting.streamers.list.length && !model.targeting.streamers.exclude"
        class="!mb-6"
        @on-input="formAdsetStore.calculateAudience(model)"
      />

      <div class="my-4 h-[1px] bg-gray" />

      <FormTargetingStreamers
        v-model="model"
        :disabled="false"
        :platform="model.platform"
        :streamers="adset?.targeting.streamers.list ?? []"
        :campaign-category="adset?.campaign.category ?? ''"
        class="!mb-6"
        @on-input="formAdsetStore.calculateAudience(model)"
      />

      <div class="my-4 h-[1px] bg-gray" />

      <FormTargetingLanguages
        v-model="model"
        :disabled="!!model.targeting.streamers.list.length && !model.targeting.streamers.exclude"
        class="!mb-6"
        @on-input="formAdsetStore.calculateAudience(model)"
      />

      <FormTargetingCountries
        v-model="model"
        :disabled="!!model.targeting.streamers.list.length && !model.targeting.streamers.exclude"
        class="!mb-6"
        @on-input="formAdsetStore.calculateAudience(model)"
      />

      <FormTargetingGender
        v-model="model"
        :disabled="!!model.targeting.streamers.list.length && !model.targeting.streamers.exclude"
        class="!mb-6"
        @on-input="formAdsetStore.calculateAudience(model)"
      />

      <FormTargetingAge
        v-model="model"
        :disabled="!!model.targeting.streamers.list.length && !model.targeting.streamers.exclude"
        class="!mb-6"
        @on-input="formAdsetStore.calculateAudience(model)"
      />

      <FormTargetingAgeRestriction
        v-model="model"
        :disabled="!!model.targeting.streamers.list.length && !model.targeting.streamers.exclude"
        class="!mb-6"
        @on-input="formAdsetStore.calculateAudience(model)"
      />

      <FormTargetingTags
        v-model="model"
        :disabled="!!model.targeting.streamers.list.length && !model.targeting.streamers.exclude"
        @on-input="formAdsetStore.calculateAudience(model)"
      />

      <Audience />
    </DashboardSection>

    <DashboardSection
      :title="t('adset.targetingAudience.title')"
      data-test="extension-audience-section"
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
import type { ICreateExtensionAdsetData, IExtensionAdset } from '@/modules/Partner/views/FormAdset/api'
import { Audience } from '@/modules/Partner/views/FormAdset/components'
import {
	FormDescription,
	FormFormat,
	FormPlatform,
	FormSchedule,
	FormStatus,
	FormTargetingAge,
	FormTargetingAgencies,
	FormTargetingAgeRestriction,
	FormTargetingCountries,
	FormTargetingCountriesAuditory,
	FormTargetingDevicesAuditory,
	FormTargetingGender,
	FormTargetingLanguages,
	FormTargetingStreamers,
	FormTargetingTags,
	FormTitle,
} from '@/modules/Partner/views/FormAdset/components/form'
import {
	FormTargets,
} from '@/modules/Partner/views/FormAdset/components/form/type/BrandAwareness'
import { FormBudget } from '@/modules/Partner/views/FormAdset/components/form/type/Extension'
import { messages } from '@/modules/Partner/views/FormAdset/locales'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

import ExtensionSkeleton from './ExtensionSkeleton.vue'

const route = useRoute()

const { t } = useLocale<typeof messages>(messages)

const campaignsStore = useCampaignsStore()
const formCampaignStore = useFormCampaignStore()
const formAdsetStore = useFormAdsetStore()

const adset = computed(() => formAdsetStore.adset as IExtensionAdset | null)

const formRef = ref<FormInstance>()

let modelVisibleStatus = ref(true)

const sending = ref(false)
const success = ref(false)

const rules = computed<FormRules<ICreateExtensionAdsetData>>(() => ({
	title: [required],
	platform: [required],
	format: [required],
	strategyPayment: [required],
	'dates.start': [required],
	'targeting.agencies': [required],
	bidCap: [StrategyPayment.PPV, StrategyPayment.PPVA].includes(model.strategyPayment) ? [required] : [],
	impressions: [StrategyPayment.PPV, StrategyPayment.PPVA].includes(model.strategyPayment) ? [required] : [],
	targetCtr: [StrategyPayment.PPV, StrategyPayment.PPVA].includes(model.strategyPayment) ? [required] : [],
}))

const defaultModel: ICreateExtensionAdsetData = {
	campaignSlug: route.params.campaignSlug as string,
	title: {
		default: '',
		alternative: '',
	},
	description: '',
	platform: Platform.TWITCH,
	format: AdFormat.FULLSCREEN,
	formatEdit: true,
	strategyPayment: StrategyPayment.PPV,
	bidCap: undefined,
	impressions: undefined,
	targetCtr: undefined,
	dates: {
		start: undefined,
		end: undefined,
	},
	targeting: {
		gender: 'all',
		mature: false,
		age: {
			from: undefined,
			to: undefined,
		},
		tags: {
			list: [],
			exclude: false,
		},
		countries: {
			list: [],
			exclude: false,
		},
		countriesAuditory: {
			list: [],
			exclude: false,
		},
		devicesAuditory: {
			list: [],
			exclude: false,
		},
		broadcasterLanguages: {
			list: [],
			exclude: false,
		},
		agencies: [],
		streamers: {
			list: [],
			exclude: false,
		},
	},
}

let model = reactive<ICreateExtensionAdsetData>({
	...defaultModel,
})

const adsetToModel = (adsetData: IExtensionAdset): ICreateExtensionAdsetData => {
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
		strategyPayment: adsetData.strategyPayment,
		bidCap: adsetData.bidCap ?? undefined,
		impressions: adsetData.impressions ?? undefined,
		targetCtr: adsetData.targetCtr ?? undefined,
		dates: {
			start: adsetData.start,
			end: adsetData.end,
		},
		targeting: {
			gender: adsetData.targeting.gender ?? 'all',
			mature: adsetData.targeting.mature,
			age: {
				from: adsetData.targeting.age.from ?? undefined,
				to: adsetData.targeting.age.to ?? undefined,
			},
			tags: {
				list: adsetData.targeting.tags.list,
				exclude: adsetData.targeting.tags.exclude,
			},
			countries: {
				list: adsetData.targeting.countries.list,
				exclude: adsetData.targeting.countries.exclude,
			},
			countriesAuditory: {
				list: adsetData.targeting.countriesAuditory.list,
				exclude: adsetData.targeting.countriesAuditory.exclude,
			},
			devicesAuditory: {
				list: adsetData.targeting.devicesAuditory.list,
				exclude: adsetData.targeting.devicesAuditory.exclude,
			},
			broadcasterLanguages: {
				list: adsetData.targeting.broadcasterLanguages.list,
				exclude: adsetData.targeting.broadcasterLanguages.exclude,
			},
			agencies: adsetData.targeting.agencies.map((agency) => agency.id),
			streamers: {
				list: adsetData.targeting.streamers.list.map((streamer) => streamer.id),
				exclude: adsetData.targeting.streamers.exclude,
			},
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
				await campaignsStore.changeStatus(adset.value.slug, CampaignType.EXTENSION, AdEntityType.ADSETS)
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
		Logger.error('Error saving Extension campaign', true, err)
	}
	finally {
		sending.value = false
	}
}

const showCloseDialog = computed(() => {
	if (route.name === RouteName.CAMPAIGN_EDIT) {
		return !isEqual(model, adsetToModel(formAdsetStore.adset as IExtensionAdset))
	}
	if (route.name === RouteName.CAMPAIGN_CREATE) {
		return !isEqual(model, defaultModel)
	}

	return true
})

const closeAndReturnRoute = computed(() => RouteName.EXTENSION_ADSETS)

const showSkeleton = computed(() => route.name === RouteName.ADSET_EDIT && formAdsetStore.isFetchingAdset)

const setFormData = (adsetData: IExtensionAdset | null) => {
	if (!adsetData) {
		Object.assign(model, defaultModel)
		return
	}

	const data = adsetToModel(adsetData)
	Object.assign(model, data)
	modelVisibleStatus.value = adsetData.visible
	formAdsetStore.calculateAudience(model)
}

onMounted(() => {
	setFormData(formAdsetStore.adset as IExtensionAdset)
})

watch(adset, (adsetData) => {
	setFormData(adsetData as IExtensionAdset)
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
