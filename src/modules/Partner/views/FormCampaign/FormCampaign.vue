<template>
  <CampaignLayout
    data-name="partner-form-campaign"
    :class="{'h-screen overflow-hidden': !isBootstraped}"
    :ad-entity-structure="campaignStructure"
    :show-close-dialog="showCloseDialog"
    @close-and-return="onCloseAndReturn"
  >
    <DashboardTitle :title="title" />

    <template v-if="formCampaignStore.fetchError">
      <DashboardSection>
        <div class="flex flex-col items-center justify-center py-16 text-center">
          <p class="_headline-2 mb-2">
            {{ t('campaign.fetchError.title') }}
          </p>
          <p class="_text-m-regular mb-6 text-gray">
            {{ t('campaign.fetchError.description') }}
          </p>
          <ElButton
            type="primary"
            @click="retryFetch"
          >
            <span class="_text-m-bold">{{ t('campaign.fetchError.retry') }}</span>
          </ElButton>
        </div>
      </DashboardSection>
    </template>

    <template v-else-if="!isEdit">
      <template v-if="formCampaignStore.section === FormSection.TYPE">
        <DashboardSection :title="t('campaign.type.title')">
          <p class="_text-m-regular mb-6">
            {{ t('campaign.type.description') }}
          </p>

          <Type v-model="formCampaignStore.currentCampaignType" />
        </DashboardSection>
      </template>

      <template v-else-if="formCampaignStore.section === FormSection.SETTINGS">
        <Form ref="formRef" />
      </template>
    </template>

    <Form
      v-else
      ref="formRef"
    />

    <Actions
      v-if="!formCampaignStore.fetchError"
      :sending="sending"
      :success="success"
      @on-return="onCloseAndReturn"
      @on-submit="onSubmit"
    />
  </CampaignLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTitle } from '@vueuse/core'

import { CampaignType } from '@/core/types'
import { parseSlug } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { useAppStore, useDictStore } from '@/core/store'
import { ElButton } from '@/components/element-plus'
import { DashboardSection, DashboardTitle } from '@/components/layouts'
import { CampaignLayout } from '@/modules/Partner/components'
import { RouteName } from '@/modules/Partner/router'
import { useAdvertisersStore } from '@/modules/Partner/views/Advertisers/store'
import { messages } from '@/modules/Partner/views/FormCampaign/locales'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

import { Actions, Form, Type } from './sections'
import { FormSection } from './types'

const { t } = useLocale<typeof messages>(messages)

const formRef = ref<InstanceType<typeof Form> | null>(null)

const route = useRoute()
const router = useRouter()

const appStore = useAppStore()
const dictStore = useDictStore()
const advertiserStore = useAdvertisersStore()
const formCampaignStore = useFormCampaignStore()

const campaignStructure = computed(() => formCampaignStore.campaignStructure)
const campaign = computed(() => formCampaignStore.campaign)

const isBootstraped = ref(false)
const isEdit = computed(() => route.name === RouteName.CAMPAIGN_EDIT)

const title = computed(() => {
	return campaign.value?.title?.default || t('campaign.defaultName')
})

useTitle(title)

const onSubmit = () => {
	formRef.value?.form?.onSubmit()
}

const retryFetch = async () => {
	formCampaignStore.fetchError = false
	await Promise.all([
		formCampaignStore.fetchCampaignStructure(route.params.campaignSlug as string),
		formCampaignStore.fetchCampaign(route.params.campaignSlug as string),
	])
}

const sending = computed(() => formRef.value?.form?.sending || false)
const success = computed(() => formRef.value?.form?.success || false)

const showCloseDialog = computed(() => formRef.value?.form?.showCloseDialog)

const returnRoute = computed(() => {
	if (isEdit.value) {
		return formRef.value?.form?.closeAndReturnRoute || RouteName.BRAND_AWARENESS_CAMPAIGNS
	}

	switch (formCampaignStore.currentCampaignType) {
		case CampaignType.BRAND_AWARENESS:
			return RouteName.BRAND_AWARENESS_CAMPAIGNS
		case CampaignType.PERFORMANCE:
			return RouteName.PERFORMANCE_CAMPAIGNS
		case CampaignType.PREROLL:
			return RouteName.PREROLL_CAMPAIGNS
		case CampaignType.EXTENSION:
			return RouteName.EXTENSION_CAMPAIGNS
		case CampaignType.SPECIAL_PROJECT:
			return RouteName.SPECIAL_PROJECT_CAMPAIGNS
		default:
			return RouteName.BRAND_AWARENESS_CAMPAIGNS
	}
})

const onCloseAndReturn = () => {
	router.push({ name: returnRoute.value })
}

onMounted(async () => {
	if (!isEdit.value) {
		formCampaignStore.currentCampaignType = route.params.campaignType as CampaignType || CampaignType.BRAND_AWARENESS
	}
	else {
		const { campaignType } = parseSlug(route.params.campaignSlug as string)

		formCampaignStore.currentCampaignType = campaignType || CampaignType.BRAND_AWARENESS
	}

	const promises = [
		dictStore.getCampaignDictionary(appStore.appLocale, formCampaignStore.currentCampaignType),
		advertiserStore.fetchAdvertisers(),
	]

	if (isEdit.value) {
		promises.push(formCampaignStore.fetchCampaignStructure(route.params.campaignSlug as string))
		promises.push(formCampaignStore.fetchCampaign(route.params.campaignSlug as string))

		formCampaignStore.section = FormSection.SETTINGS
	}

	await Promise.all(promises)

	isBootstraped.value = true
})

onUnmounted(() => {
	formCampaignStore.campaignStructure = null
	formCampaignStore.campaign = null
	formCampaignStore.section = FormSection.TYPE

	formCampaignStore.fetchError = false
})
</script>
