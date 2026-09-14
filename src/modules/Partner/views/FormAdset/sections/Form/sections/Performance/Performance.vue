<template>
  <PerformanceSkeleton v-if="showSkeleton" />

  <ElForm
    v-else-if="model"
    ref="formRef"
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
      data-test="performance-status-section"
      :title="t('adset.settings.form.status.label')"
    >
      <FormStatus v-model="modelVisibleStatus" />
    </DashboardSection>

    <DashboardSection
      data-test="performance-settings-section"
      :title="t('adset.settings.title')"
      :no-border="route.name === RouteName.ADSET_EDIT"
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

      <FormExternalId
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
          class="!mb-6"
        />

        <FormTimezone
          v-model="model"
          :disabled="true"
        />
      </DashboardSubsection>

      <DashboardSubsection
        :title="t('adset.settings.form.budget.title')"
        class="mb-6"
      >
        <FormBudget v-model="model" />
      </DashboardSubsection>

      <DashboardSubsection
        :title="t('adset.settings.form.targets.title')"
      >
        <FormTargets
          v-model="model"
        />
      </DashboardSubsection>
    </DashboardSection>

    <DashboardSection
      data-test="performance-targeting-section"
      :title="t('adset.targeting.title')"
    >
      <FormTargetingStreamers
        v-model="model"
        :disabled="false"
        :platform="model.platform"
        :streamers="adset?.targeting.streamers.list ?? []"
        :campaign-category="adset?.campaign.category.title ?? ''"
        class="!mb-6"
      />

      <FormTargetingLanguages
        v-model="model"
        :disabled="!!model.targeting.streamers.list.length && !model.targeting.streamers.exclude"
        class="!mb-6"
      />

      <FormTargetingCountries
        v-model="model"
        :disabled="!!model.targeting.streamers.list.length && !model.targeting.streamers.exclude"
        class="!mb-6"
      />

      <FormTargetingTags
        v-model="model"
        :disabled="!!model.targeting.streamers.list.length && !model.targeting.streamers.exclude"
      />
    </DashboardSection>

    <DashboardSection
      data-test="performance-audience-section"
      :title="t('adset.targetingAudience.title')"
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

    <DashboardSection
      data-test="performance-chatbot-section"
      :title="t('adset.chatBot.title')"
    >
      <FormProductUrl
        v-model="model"
        class="!mb-6"
      />

      <FormProductUrlShort
        v-model="model"
        class="!mb-6"
      />

      <FormChatbotText
        v-model="model"
      />
    </DashboardSection>

    <DashboardSection
      data-test="performance-analytics-section"
      :title="t('adset.analytics.title')"
    >
      <DashboardSubsection
        :title="t('adset.analytics.pixelClicks.label')"
        class="mb-6"
      >
        <FormPixel
          v-model="model"
        />
      </DashboardSubsection>

      <DashboardSubsection :title="t('adset.analytics.pixelClicksScripts.label')">
        <FormPixelScript
          v-model="model"
        />
      </DashboardSubsection>
    </DashboardSection>

    <DashboardSection
      data-test="performance-preview-section"
      :title="t('adset.preview.title')"
    >
      <FormCreative
        v-model="model"
        :file="adset?.attachments.unit ?? null"
        :options="{maxSizeMb: MAX_SIZE_MB, accept: 'unit'}"
        :disabled="false"
        :format="AdFormat.INTERACTIVE"
        @file-delete="onFileDelete"
      />

      <Advice
        :title="t('adset.preview.advice.title')"
        class="sm:absolute sm:left-[calc(100%+24px)] sm:top-3"
        type="hint"
      >
        <p
          class="_text-m-regular"
          v-html="t('adset.preview.advice.requirements', { size: MAX_SIZE_MB })"
        />
      </Advice>
    </DashboardSection>

    <DashboardSection
      v-if="sectionVisible"
      data-test="performance-legals-section"
      :title="t('adset.labels.title')"
    >
      <FormLegals
        v-if="adset?.legalCompliance"
        :legal-compliance="adset.legalCompliance"
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
	PayoutType,
	Platform,
} from '@/core/types'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { router } from '@/core/router'
import { isUrl, required } from '@/core/validators'
import { Advice } from '@/components'
import { ElForm } from '@/components/element-plus'
import { DashboardSection, DashboardSubsection } from '@/components/layouts'
import { RouteName } from '@/modules/Partner/router'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'
import type { ICreatePerformanceAdsetData, IPerformanceAdset } from '@/modules/Partner/views/FormAdset/api'
import {
	FormBudget,
	FormCreative,
	FormDescription,
	FormFormat,
	FormLegals,
	FormPixel,
	FormPixelScript,
	FormPlatform,
	FormProductUrl,
	FormSchedule,
	FormStatus,
	FormTargetingCountries,
	FormTargetingCountriesAuditory,
	FormTargetingDevicesAuditory,
	FormTargetingLanguages,
	FormTargetingStreamers,
	FormTargetingTags,
	FormTargets,
	FormTimezone,
	FormTitle,
} from '@/modules/Partner/views/FormAdset/components/form'
import {
	FormChatbotText,
	FormExternalId,
	FormProductUrlShort,
} from '@/modules/Partner/views/FormAdset/components/form/type/Performance'
import { messages } from '@/modules/Partner/views/FormAdset/locales'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

import PerformanceSkeleton from './PerformanceSkeleton.vue'

const route = useRoute()

const { t } = useLocale<typeof messages>(messages)

const campaignsStore = useCampaignsStore()
const formCampaignStore = useFormCampaignStore()
const formAdsetStore = useFormAdsetStore()

const adset = computed(() => formAdsetStore.adset as IPerformanceAdset | null)

const MAX_SIZE_MB = 50

const formRef = ref<FormInstance>()

let modelVisibleStatus = ref(true)

const sending = ref(false)
const success = ref(false)

const rules = computed<FormRules<ICreatePerformanceAdsetData>>(() => ({
	'title.default': [required],
	'dates.start': [required],
	'dates.end': [required],
	externalId: [required],
	payableType: [required],
	'productUrl.general': [required, isUrl],
	'productUrl.mobile': [isUrl],
	chatbotText: [required],
	timeZone: [required],
	unit: [required],
	'targeting.agencies': [required],
}))

const defaultModel: ICreatePerformanceAdsetData = {
	campaignSlug: route.params.campaignSlug as string,
	title: {
		default: '',
	},
	description: '',
	format: AdFormat.INTERACTIVE,
	formatEdit: false,
	platform: Platform.TWITCH,
	dates: {
		start: undefined,
		end: undefined,
	},
	externalId: '',
	payableType: PayoutType.IMPRESSIONS,
	bidCap: undefined,
	bidCpa: undefined,
	impressions: undefined,
	budget: undefined,
	productUrl: {
		general: '',
		mobile: '',
	},
	chatbotText: '',
	visible: false,
	timeZone: 0,
	targetCtr: undefined,
	targetCpa: undefined,
	productUrlShort: '',
	pixelClicks: [],
	pixelClicksScripts: '',
	targeting: {
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
		streamers: {
			list: [],
			exclude: false,
		},
		agencies: [],
	},
	unit: '',
}

let model = reactive<ICreatePerformanceAdsetData>({
	...defaultModel,
})

const adsetToModel = (adsetData: IPerformanceAdset): ICreatePerformanceAdsetData => {
	if (!adsetData) return { ...defaultModel }

	return {
		campaignSlug: route.params.campaignSlug as string,
		title: {
			default: adsetData.title,
		},
		description: adsetData.description,
		format: adsetData.format.id,
		formatEdit: adsetData.formatEdit,
		platform: adsetData.platform,
		dates: {
			start: adsetData.start,
			end: adsetData.end,
		},
		externalId: adsetData.externalId,
		payableType: adsetData.payableType,
		bidCap: adsetData.bidCap ?? undefined,
		bidCpa: adsetData.bidCpa ?? undefined,
		impressions: adsetData.impressions ?? undefined,
		budget: adsetData.budget ?? undefined,
		productUrl: {
			general: adsetData.productUrl,
			mobile: adsetData.mobileProductUrl,
		},
		chatbotText: adsetData.chatbotText ?? '',
		visible: adsetData.visible,
		timeZone: adsetData.timeZone,
		targetCtr: adsetData.targetCtr ?? undefined,
		targetCpa: adsetData.targetCpa ?? undefined,
		productUrlShort: adsetData.productUrlShort,
		pixelClicks: adsetData.pixelClicks.length > 0 ? adsetData.pixelClicks : [''],
		pixelClicksScripts: adsetData.pixelClicksScripts ?? '',
		targeting: {
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
			streamers: {
				list: adsetData.targeting.streamers.list.map((streamer) => streamer.id),
				exclude: adsetData.targeting.streamers.exclude,
			},
			agencies: [],
		},
		unit: adsetData.attachments.unit?.basename ?? '',
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
				await campaignsStore.changeStatus(adset.value.slug, CampaignType.PERFORMANCE, AdEntityType.ADSETS)
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
		Logger.error('Error saving Performance campaign', true, err)
	}
	finally {
		sending.value = false
	}
}

const sectionVisible = computed(() => {
	if (route.name !== RouteName.ADSET_EDIT || !adset.value?.legalCompliance) {
		return false
	}
	if (adset.value?.legalCompliance?.erid.media || adset.value?.legalCompliance?.erid.text) {
		return true
	}
	return false
})

const showCloseDialog = computed(() => {
	if (route.name === RouteName.CAMPAIGN_EDIT) {
		return !isEqual(model, adsetToModel(formAdsetStore.adset as IPerformanceAdset))
	}
	if (route.name === RouteName.CAMPAIGN_CREATE) {
		return !isEqual(model, defaultModel)
	}

	return true
})

const closeAndReturnRoute = computed(() => RouteName.PERFORMANCE_ADSETS)

const showSkeleton = computed(() => route.name === RouteName.ADSET_EDIT && formAdsetStore.isFetchingAdset)

const setFormData = (adsetData: IPerformanceAdset | null) => {
	if (!adsetData) {
		Object.assign(model, defaultModel)
		return
	}

	const data = adsetToModel(adsetData)
	Object.assign(model, data)
	modelVisibleStatus.value = adsetData.visible
}

const onFileDelete = () => {
	if (route.name === RouteName.ADSET_EDIT && adset.value) {
		formAdsetStore.deleteAttachment({
			field: 'unit',
			slug: adset.value?.slug ?? '',
		})
	}
}

onMounted(() => {
	setFormData(formAdsetStore.adset as IPerformanceAdset)
})

watch(adset, (adsetData) => {
	setFormData(adsetData as IPerformanceAdset)
})

watch(() => route.params, () => {
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
