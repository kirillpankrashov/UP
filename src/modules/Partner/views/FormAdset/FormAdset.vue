<template>
  <CampaignLayout
    data-name="partner-form-adset"
    data-test="form-adset-layout"
    :class="{'h-screen overflow-hidden': !isBootstraped}"
    :ad-entity-structure="campaignStructure"
    :show-close-dialog="showCloseDialog"
    @close-and-return="onCloseAndReturn"
  >
    <DashboardTitle
      data-test="form-adset-title"
      :title="title"
    />

    <template v-if="hasFetchError">
      <DashboardSection>
        <div
          class="flex flex-col items-center justify-center py-16 text-center"
          data-test="form-adset-fetch-error"
        >
          <p class="_headline-2 mb-2">
            {{ t('adset.fetchError.title') }}
          </p>
          <p class="_text-m-regular mb-6 text-gray">
            {{ t('adset.fetchError.description') }}
          </p>
          <ElButton
            type="primary"
            data-test="form-adset-fetch-retry"
            @click="retryFetch"
          >
            <span class="_text-m-bold">{{ t('adset.fetchError.retry') }}</span>
          </ElButton>
        </div>
      </DashboardSection>
    </template>

    <template v-else>
      <Form
        ref="formRef"
        data-test="form-adset-form"
      />

      <Actions
        data-test="form-adset-actions"
        :sending="sending || formAdsetStore.isFetchingAdset"
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
import { messages } from '@/modules/Partner/views/FormAdset/locales'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

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

const campaignStructure = computed(() => formCampaignStore.campaignStructure)
const adset = computed(() => formAdsetStore.adset)

const hasFetchError = computed(
	() => formCampaignStore.fetchError || formAdsetStore.fetchError,
)

const isBootstraped = ref(false)
const isEdit = computed(() => route.name === RouteName.ADSET_EDIT)

const title = computed(() => {
	return adset.value?.title || (isEdit.value ? t('adset.defaultName') : t('adset.defaultNameNew'))
})

useTitle(title)

const onSubmit = () => {
	formRef.value?.form?.onSubmit()
}

const retryFetch = async () => {
	formCampaignStore.fetchError = false
	formAdsetStore.fetchError = false

	const slug = route.params.campaignSlug as string
	const promises = [formCampaignStore.fetchCampaignStructure(slug)]

	if (isEdit.value) {
		promises.push(formAdsetStore.fetchAdset(route.params.adsetSlug as string))
	}

	await Promise.all(promises)
}

const sending = computed(() => formRef.value?.form?.sending || false)
const success = computed(() => formRef.value?.form?.success || false)

const showCloseDialog = computed(() => formRef.value?.form?.showCloseDialog)

const returnRoute = computed(() => {
	if (isEdit.value) {
		return formRef.value?.form?.closeAndReturnRoute || RouteName.BRAND_AWARENESS_ADSETS
	}

	switch (formAdsetStore.currentCampaignType) {
		case CampaignType.BRAND_AWARENESS:
			return RouteName.BRAND_AWARENESS_ADSETS
		case CampaignType.PERFORMANCE:
			return RouteName.PERFORMANCE_ADSETS
		case CampaignType.PREROLL:
			return RouteName.PREROLL_ADSETS
		case CampaignType.EXTENSION:
			return RouteName.EXTENSION_ADSETS
		case CampaignType.SPECIAL_PROJECT:
			return RouteName.SPECIAL_PROJECT_ADSETS
		default:
			return RouteName.BRAND_AWARENESS_ADSETS
	}
})

const onCloseAndReturn = () => {
	router.push({ name: returnRoute.value })
}

onMounted(async () => {
	const { campaignType } = parseSlug(route.params.campaignSlug as string)
	formAdsetStore.currentCampaignType = campaignType

	const promises = [
		dictStore.getCampaignDictionary(appStore.appLocale, campaignType),
		advertiserStore.fetchAdvertisers(),
		formCampaignStore.fetchCampaignStructure(route.params.campaignSlug as string),
	]

	if (isEdit.value) {
		promises.push(formAdsetStore.fetchAdset(route.params.adsetSlug as string))
	}

	await Promise.all(promises)

	isBootstraped.value = true
})

watch(() => route.params, () => {
	formCampaignStore.fetchError = false
	formAdsetStore.fetchError = false
	formAdsetStore.adset = null

	if (isEdit.value) {
		formAdsetStore.fetchAdset(route.params.adsetSlug as string)
	}
})

onUnmounted(() => {
	formCampaignStore.campaignStructure = null
	formAdsetStore.adset = null

	formCampaignStore.fetchError = false
	formAdsetStore.fetchError = false
})
</script>
