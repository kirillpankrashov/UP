<template>
  <CampaignLayout
    data-name="partner-form-creative"
    data-test="form-creative-layout"
    :class="{'h-screen overflow-hidden': !isBootstraped}"
    :ad-entity-structure="campaignStructure"
    :show-close-dialog="showCloseDialog"
    @close-and-return="onCloseAndReturn"
  >
    <DashboardTitle
      data-test="form-creative-title"
      :title="title"
    />

    <template v-if="hasFetchError">
      <DashboardSection>
        <div
          class="flex flex-col items-center justify-center py-16 text-center"
          data-test="form-creative-fetch-error"
        >
          <p class="_headline-2 mb-2">
            {{ t('creative.fetchError.title') }}
          </p>
          <p class="_text-m-regular mb-6 text-gray">
            {{ t('creative.fetchError.description') }}
          </p>
          <ElButton
            type="primary"
            data-test="form-creative-fetch-retry"
            @click="retryFetch"
          >
            <span class="_text-m-bold">{{ t('creative.fetchError.retry') }}</span>
          </ElButton>
        </div>
      </DashboardSection>
    </template>

    <template v-else>
      <Form
        ref="formRef"
        data-test="form-creative-form"
      />

      <Actions
        data-test="form-creative-actions"
        :sending="sending || formCreativeStore.isFetchingCreative"
        :success="success"
        @on-return="onCloseAndReturn"
        @on-submit="onSubmit"
      />
    </template>
  </CampaignLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { watch } from 'vue'
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
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'
import { messages } from '@/modules/Partner/views/FormCreative/locales'
import { useFormCreativeStore } from '@/modules/Partner/views/FormCreative/store'

import { Actions, Form } from './sections'

const { t } = useLocale<typeof messages>(messages)

const formRef = ref<InstanceType<typeof Form> | null>(null)

const route = useRoute()
const router = useRouter()

const appStore = useAppStore()
const dictStore = useDictStore()
const advertiserStore = useAdvertisersStore()
const formCampaignStore = useFormCampaignStore()
const formAdsetStore = useFormAdsetStore()
const formCreativeStore = useFormCreativeStore()

const campaignStructure = computed(() => formCampaignStore.campaignStructure)
const creative = computed(() => formCreativeStore.creative)

const hasFetchError = computed(
	() => formCampaignStore.fetchError || formAdsetStore.fetchError || formCreativeStore.fetchError,
)

const isBootstraped = ref(false)
const isEdit = computed(() => route.name === RouteName.CREATIVE_EDIT)

const title = computed(() => {
	return creative.value?.title || (isEdit.value ? t('creative.defaultName') : t('creative.defaultNameNew'))
})

useTitle(title)

const onSubmit = () => {
	formRef.value?.form?.onSubmit()
}

const retryFetch = async () => {
	formCampaignStore.fetchError = false
	formAdsetStore.fetchError = false
	formCreativeStore.fetchError = false

	const campaignSlug = route.params.campaignSlug as string
	const adsetSlug = route.params.adsetSlug as string
	const promises = [
		formCampaignStore.fetchCampaignStructure(campaignSlug),
		formAdsetStore.fetchAdset(adsetSlug),
	]

	if (isEdit.value) {
		promises.push(formCreativeStore.fetchCreative(route.params.creativeSlug as string))
	}

	await Promise.all(promises)
}

const sending = computed(() => formRef.value?.form?.sending || false)
const success = computed(() => formRef.value?.form?.success || false)

const showCloseDialog = computed(() => formRef.value?.form?.showCloseDialog)

const returnRoute = computed(() => {
	if (isEdit.value) {
		return formRef.value?.form?.closeAndReturnRoute || RouteName.BRAND_AWARENESS_CREATIVES
	}

	switch (formCreativeStore.currentCampaignType) {
		case CampaignType.BRAND_AWARENESS:
			return RouteName.BRAND_AWARENESS_CREATIVES
		case CampaignType.EXTENSION:
			return RouteName.EXTENSION_CREATIVES
		case CampaignType.SPECIAL_PROJECT:
			return RouteName.SPECIAL_PROJECT_CREATIVES
		default:
			return RouteName.BRAND_AWARENESS_CREATIVES
	}
})

const onCloseAndReturn = () => {
	router.push({ name: returnRoute.value })
}

onMounted(async () => {
	const { campaignType } = parseSlug(route.params.campaignSlug as string)
	formCreativeStore.currentCampaignType = campaignType

	const promises = [
		dictStore.getCampaignDictionary(appStore.appLocale, campaignType),
		advertiserStore.fetchAdvertisers(),
		formCampaignStore.fetchCampaignStructure(route.params.campaignSlug as string),
		formAdsetStore.fetchAdset(route.params.adsetSlug as string),
	]

	if (isEdit.value) {
		promises.push(formCreativeStore.fetchCreative(route.params.creativeSlug as string))
	}

	await Promise.all(promises)

	isBootstraped.value = true
})

watch(() => route.params, () => {
	formCampaignStore.fetchError = false
	formAdsetStore.fetchError = false
	formCreativeStore.fetchError = false
	formAdsetStore.adset = null
	formCreativeStore.creative = null

	formAdsetStore.fetchAdset(route.params.adsetSlug as string)
	if (isEdit.value) {
		formCreativeStore.fetchCreative(route.params.creativeSlug as string)
	}
})

onUnmounted(() => {
	formCreativeStore.creative = null
	formCampaignStore.fetchError = false
	formAdsetStore.fetchError = false
	formCreativeStore.fetchError = false
})
</script>
