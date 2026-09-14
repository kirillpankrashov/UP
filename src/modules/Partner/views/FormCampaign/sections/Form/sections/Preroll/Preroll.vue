<template>
  <PrerollSkeleton v-if="showSkeleton" />

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
      v-if="route.name === RouteName.CAMPAIGN_EDIT"
      :title="t('campaign.settings.form.status.label')"
    >
      <FormStatus v-model="modelVisibleStatus" />
    </DashboardSection>

    <DashboardSection
      class="relative"
      :title="t('campaign.settings.title')"
      :no-border="route.name === RouteName.CAMPAIGN_EDIT"
    >
      <FormTitle
        v-model="model"
        class="!mb-6"
      />
      <FormDescription
        v-model="model"
        class="!mb-6"
      />
      <FormCategory
        v-model="model"
        class="!mb-6"
      />
      <FormSchedule
        v-model="model"
        class="!mb-6"
      />
      <FormHolding
        v-model="model"
        class="!mb-6"
      />
      <FormAdvertiser
        v-model="model"
        class="!mb-6"
      />
      <FormMediaAgency
        v-model="model"
        class="!mb-6"
      />
      <FormOrdMarkup v-model="model" />

      <SettingsAdvice />
    </DashboardSection>

    <DashboardSection :title="t('campaign.urlParams.title')">
      <FormUrlParams v-model="model" />
    </DashboardSection>

    <DashboardSection :title="t('campaign.pixel.title')">
      <UplifyPixel />
    </DashboardSection>
  </ElForm>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { isEqual } from 'lodash'

import { AdEntityType, CampaignType } from '@/core/types'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { router } from '@/core/router'
import { required } from '@/core/validators'
import { ElForm } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { RouteName } from '@/modules/Partner/router'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'
import type { ICreatePrerollCampaignData, IPrerollCampaign } from '@/modules/Partner/views/FormCampaign/api'
import { SettingsAdvice, UplifyPixel } from '@/modules/Partner/views/FormCampaign/components'
import {
	FormAdvertiser,
	FormCategory,
	FormDescription,
	FormHolding,
	FormMediaAgency,
	FormOrdMarkup,
	FormSchedule,
	FormStatus,
	FormTitle,
	FormUrlParams,
} from '@/modules/Partner/views/FormCampaign/components/form'
import { messages } from '@/modules/Partner/views/FormCampaign/locales'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

import PrerollSkeleton from './PrerollSkeleton.vue'

const route = useRoute()

const { t } = useLocale<typeof messages>(messages)

const campaignsStore = useCampaignsStore()
const formCampaignStore = useFormCampaignStore()

const campaign = computed(() => formCampaignStore.campaign)

const formRef = ref<FormInstance>() 

const defaultModel: ICreatePrerollCampaignData = {
	title: '',
	description: '',
	category: undefined,
	affiliateNetwork: -1,
	holding: undefined,
	advertiser: undefined,
	end: undefined,
	start: undefined,
	productUrlParams: [],
	mediaAgency: undefined,
	ordMarkup: '',
}

let model = reactive<ICreatePrerollCampaignData>({
	...defaultModel,
})

let modelVisibleStatus = ref(true)

const sending = ref(false)
const success = ref(false)

const rules = computed<FormRules<ICreatePrerollCampaignData>>(() => ({
	title: [required],
	externalId: [required],
	description: [required],
	category: [required],
	advertiser: [required],
	holding: [required],
	timezone: [required],
	start: [required],
	end: [required],
}))

const campaignToModel = (campaignData: IPrerollCampaign) => {
	if (!campaignData) return { ...defaultModel }

	return {
		title: campaignData.title.default,
		description: campaignData.description,
		category: campaignData.category.id,
		holding: campaignData.holding.id,
		advertiser: campaignData.advertiser.id,
		end: campaignData.dates.end || undefined,
		start: campaignData.dates.start || undefined,
		productUrlParams: campaignData.productUrlParams || [],
		mediaAgency: campaignData.mediaAgency?.id || undefined,
		ordMarkup: campaignData.ordMarkup,
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

		if (route.name === RouteName.CAMPAIGN_CREATE) {
			formCampaignStore.createCampaign(model)
		}

		if (route.name === RouteName.CAMPAIGN_EDIT) {
			if (campaign.value && campaign.value.visible !== modelVisibleStatus.value) {
				await campaignsStore.changeStatus(campaign.value.slug, CampaignType.PREROLL, AdEntityType.CAMPAIGNS)
			}
			formCampaignStore.updateCampaign({
				...model,
				slug: campaign.value!.slug,
			})
		}

		success.value = true
		setTimeout(() => {
			success.value = false
			if (route.name === RouteName.CAMPAIGN_CREATE) {
				router.push({
					name: RouteName.CAMPAIGN_EDIT,
					params: {
						campaignSlug: campaign.value?.slug,
					},
				})
			}
		}, 3000)
	}
	catch(err) {
		Logger.error('Error saving Preroll campaign', true, err)
	}
	finally {
		sending.value = false
	}
}

const showCloseDialog = computed(() => {
	if (route.name === RouteName.CAMPAIGN_EDIT) {
		return !isEqual(model, campaignToModel(formCampaignStore.campaign as IPrerollCampaign))
	}
	if (route.name === RouteName.CAMPAIGN_CREATE) {
		return !isEqual(model, defaultModel)
	}

	return true
})

const showSkeleton = computed(() => route.name === RouteName.CAMPAIGN_EDIT && formCampaignStore.isFetchingCampaign)

const closeAndReturnRoute = computed(() => RouteName.PREROLL_CAMPAIGNS)

const setFormData = (campaignData: IPrerollCampaign | null) => {
	if (!campaignData) return

	const data = campaignToModel(campaignData)
	Object.assign(model, data)
	modelVisibleStatus.value = campaignData.visible
}

onMounted(() => {
	setFormData(formCampaignStore.campaign as IPrerollCampaign)
})

watch(campaign, (campaignData) => {
	setFormData(campaignData as IPrerollCampaign)
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
