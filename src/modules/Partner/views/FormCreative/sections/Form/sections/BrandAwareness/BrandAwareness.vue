<template>
  <BrandAwarenessSkeleton v-if="showSkeleton" />

  <ElForm
    v-else-if="model"
    ref="formRef"
    data-test="brand-awareness-form"
    :label-position="'top'"
    :model="model"
    :rules="rules"
    :validate-on-rule-change="false"
    scroll-to-error
    :scroll-into-view-options="{ behavior: 'smooth', block: 'center' }"
    @submit.prevent="onSubmit"
  >
    <DashboardSection
      v-if="route.name === RouteName.CREATIVE_EDIT"
      :title="t('creative.form.status.label')"
      data-test="brand-awareness-status-section"
    >
      <FormStatus
        v-model="modelVisibleStatus"
        data-test="form-status"
      />
    </DashboardSection>

    <DashboardSection
      :title="t('creative.form.name.title')"
      :no-border="route.name === RouteName.CREATIVE_EDIT"
      data-test="brand-awareness-name-section"
    >
      <FormTitle
        v-model="model"
        data-test="form-title"
      />
    </DashboardSection>

    <DashboardSection
      v-if="[AdFormat.FULLSCREEN, AdFormat.PIP, AdFormat.CUSTOM].includes(formAdsetStore.adset?.format.id ?? AdFormat.FULLSCREEN)"
      :title="t('creative.form.files.title')"
      data-test="brand-awareness-files-section"
    >
      <FormCreative
        v-model="model"
        :format="formAdsetStore.adset?.format.id ?? AdFormat.FULLSCREEN"
        :file="creativeFile"
        :field="creativeField"
        :options="{maxSizeMb: maxFileSize, accept: creativeField}"
        :disabled="false"
        :validate="false"
        data-test="form-creative"
        @file-delete="onFileDelete"
      />

      <Advice
        v-if="!creativeFile"
        class="sm:absolute sm:left-[calc(100%+24px)] sm:top-6"
        type="hint"
        :title="t('creative.form.files.requirements.title')"
        data-test="creative-requirements-advice"
      >
        <p
          class="_text-m-regular"
          v-html="creativeRequirements"
        />
      </Advice>

      <template v-else>
        <Advice
          class="sm:absolute sm:left-[calc(100%+24px)] sm:top-6"
          :label="t('creative.form.advice.title')"
          data-test="creative-preview-advice"
        >
          <p class="_text-m-regular mb-3">
            {{ t('creative.form.advice.description') }}
          </p>

          <ElButton
            type="primary"
            @click="previewVisible = true"
            size="large"
            class="w-full"
            data-test="preview-button"
          >
            <span class="_text-m-bold">{{ t('creative.form.advice.button') }}</span>
          </ElButton>
        </Advice>

        <ElDialog
          v-model="previewVisible"
          data-test="preview-dialog"
        >
          <div class="relative">
            <Preview
              v-if="creative?.slug"
              :slug="creative.slug"
              data-test="preview-component"
            />
          </div>
        </ElDialog>
      </template>
    </DashboardSection>

    <DashboardSection
      data-test="brand-awareness-data-section"
      :title="t('creative.form.data.title')"
    >
      <FormProductUrl
        v-model="model"
        class="!mb-6"
        data-test="form-product-url"
      />

      <FormChatbotText
        v-model="model"
        class="!mb-6"
        data-test="form-chatbot-text"
      />

      <FormQrCode
        v-model="model"
        data-test="form-qr-code"
      />
    </DashboardSection>

    <DashboardSection
      v-if="formAdsetStore.adset?.format.id === AdFormat.ADMNG"
      :title="t('creative.form.adtag.title')"
      data-test="brand-awareness-adtag-section"
    >
      <FormAdTag
        v-model="model"
        data-test="form-ad-tag"
      />
    </DashboardSection>

    <DashboardSection
      data-test="brand-awareness-analytics-section"
      :title="t('creative.form.pixels.title')"
    >
      <DashboardSubsection
        :title="t('creative.form.data.fields.pixelClicks.label')"
        class="mb-6"
        data-test="pixel-clicks-subsection"
      >
        <FormPixel
          v-model="model"
          data-test="form-pixel"
        />
      </DashboardSubsection>

      <DashboardSubsection
        :title="t('creative.form.data.fields.pixelClicksScripts.label')"
        class="mb-6"
        data-test="pixel-scripts-subsection"
      >
        <FormPixelScript
          v-model="model"
          data-test="form-pixel-script"
        />
      </DashboardSubsection>

      <DashboardSubsection
        :title="t('creative.form.data.fields.pixelImpressions.label')"
        data-test="pixel-impressions-subsection"
      >
        <FormImpression
          v-model="model"
          data-test="form-impression"
        />
      </DashboardSubsection>
    </DashboardSection>

    <DashboardSection
      v-if="route.name === RouteName.CREATIVE_EDIT && (creative?.legalCompliance.erid.media || creative?.legalCompliance.marker.text)"
    >
      <template #title>
        <div
          class="_text-m-regular"
          v-html="t('creative.form.labels.title')"
        />
      </template>
      <FormLegals
        :creative="creative"
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
} from '@/core/types'
import { BA_CUSTOM_MAX_SIZE_MB,BA_FULLSCREEN_MAX_SIZE_MB } from '@/core/consts'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { router } from '@/core/router'
import { isArrayOfUrls, isUrl, required } from '@/core/validators'
import { Advice, Preview } from '@/components'
import { ElButton, ElDialog, ElForm } from '@/components/element-plus'
import { DashboardSection, DashboardSubsection } from '@/components/layouts'
import { RouteName } from '@/modules/Partner/router'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'
import type { IBrandAwarenessCreative, ICreateBrandAwarenessCreativeData } from '@/modules/Partner/views/FormCreative/api'
import {
	FormAdTag,
	FormChatbotText,
	FormCreative,
	FormImpression,
	FormLegals,
	FormPixel,
	FormPixelScript,
	FormProductUrl,
	FormQrCode,
	FormStatus,
	FormTitle,
} from '@/modules/Partner/views/FormCreative/components/form'
import { messages } from '@/modules/Partner/views/FormCreative/locales'
import { useFormCreativeStore } from '@/modules/Partner/views/FormCreative/store'

import BrandAwarenessSkeleton from './BrandAwarenessSkeleton.vue'

const route = useRoute()

const { t } = useLocale<typeof messages>(messages)

const campaignsStore = useCampaignsStore()
const formCampaignStore = useFormCampaignStore()
const formAdsetStore = useFormAdsetStore()
const formCreativeStore = useFormCreativeStore()

const creative = computed(() => formCreativeStore.creative as IBrandAwarenessCreative | null)

const formRef = ref<FormInstance>()

const previewVisible = ref(false)

let modelVisibleStatus = ref(true)

const sending = ref(false)
const success = ref(false)

const rules = computed<FormRules<ICreateBrandAwarenessCreativeData>>(() => ({
	title: [required],
	'productUrl.general': [required, isUrl],
	'productUrl.mobile': [isUrl],
	pixelClicks: [isArrayOfUrls],
	chatbotText: [required],
}))

const defaultModel: ICreateBrandAwarenessCreativeData = {
	adsetSlug: route.params.adsetSlug as string,
	chatbotText: '',
	title: {
		default: '',
	},
	companion: {
		heading: '',
		text: '',
		cta: '',
	},
	productUrl: {
		general: '',
		mobile: '',
	},
	qrCode: false,
	pixelClicks: [],
	pixelImpressions: [],
	pixelInspections: [],
	pixelClicksScripts: '',
	scriptCode: '',
	video: '',
	unit: '',
	zip: '',
}

let model = reactive<ICreateBrandAwarenessCreativeData>({
	...defaultModel,
})

const creativeToModel = (creativeData: IBrandAwarenessCreative): ICreateBrandAwarenessCreativeData => {
	if (!creativeData) return { ...defaultModel }

	return {
		adsetSlug: creativeData.adset.slug,
		chatbotText: creativeData.chatbotText,
		title: {
			default: creativeData.title,
		},
		companion: {
			heading: creativeData.companion.heading,
			text: creativeData.companion.text,
			cta: creativeData.companion.cta,
		},
		productUrl: {
			general: creativeData.productUrl.general,
			mobile: creativeData.productUrl.mobile,
		},
		qrCode: creativeData.qrCode,
		pixelClicks: creativeData.pixelClicks.length > 0 ? creativeData.pixelClicks : [''],
		pixelImpressions: creativeData.pixelImpressions.length > 0 ? creativeData.pixelImpressions : [''],
		pixelInspections: creativeData.pixelInspections,
		pixelClicksScripts: creativeData.pixelClicksScripts,
		scriptCode: creativeData.scriptCode,
		video: creativeData.attachments.video?.basename ?? '',
		unit: creativeData.attachments.unit?.basename ?? '',
		zip: creativeData.attachments.zip?.basename ?? '',
	}
}

const creativeField = computed(() => {
	switch (formAdsetStore.adset?.format.id) {
		case AdFormat.FULLSCREEN:
		case AdFormat.PIP:
			return 'video'
		case AdFormat.CUSTOM:
			return 'zip'
		default:
			return 'unit'
	}
})

const maxFileSize = computed(() => {
	switch (formAdsetStore.adset?.format.id) {
		case AdFormat.FULLSCREEN:
		case AdFormat.PIP:
			return BA_FULLSCREEN_MAX_SIZE_MB
		case AdFormat.CUSTOM:
			return BA_CUSTOM_MAX_SIZE_MB
		default:
			return BA_FULLSCREEN_MAX_SIZE_MB
	}
})

const creativeFile = computed(() => {
	if (!creative.value || !creativeField.value) return null

	return creative.value.attachments[creativeField.value] || null
})

const creativeRequirements = computed(() => {
	if (!formAdsetStore.adset) return null

	switch (formAdsetStore.adset?.format.id) {
		case AdFormat.FULLSCREEN:
			return t('creative.form.files.requirements.fullscreen', { size: maxFileSize.value })
		case AdFormat.PIP:
			return t('creative.form.files.requirements.pip_video', { size: maxFileSize.value })
		case AdFormat.CUSTOM:
			return t('creative.form.files.requirements.custom', { size: maxFileSize.value })
		default:
			return t('creative.form.files.requirements.custom', { size: maxFileSize.value })
	}
})

const onFileDelete = () => {
	if (route.name === RouteName.CREATIVE_EDIT && creative.value) {
		formCreativeStore.deleteAttachment({
			field: creativeField.value,
			slug: creative.value?.slug ?? '',
		})
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

		if (route.name === RouteName.CREATIVE_CREATE) {
			await formCreativeStore.createCreative(model)
		}

		if (route.name === RouteName.CREATIVE_EDIT) {
			if (creative.value && creative.value.visible !== modelVisibleStatus.value) {
				await campaignsStore.changeStatus(creative.value.slug, CampaignType.BRAND_AWARENESS, AdEntityType.CREATIVES)
			}
			await formCreativeStore.updateCreative({
				...model,
				slug: creative.value!.slug,
			})
		}

		success.value = true
		setTimeout(() => {
			success.value = false
			if (route.name === RouteName.CREATIVE_CREATE) {
				router.push({
					name: RouteName.CREATIVE_EDIT,
					params: {
						campaignSlug: creative.value?.adset.campaign.slug,
						adsetSlug: creative.value?.adset.slug,
						creativeSlug: creative.value?.slug,
					},
				})
				formCampaignStore.fetchCampaignStructure(route.params.campaignSlug as string)
			}
		}, 3000)
	}
	catch(err) {
		Logger.error('Error saving Brand Awareness creative', true, err)
	}
	finally {
		sending.value = false
	}
}

const showCloseDialog = computed(() => {
	if (route.name === RouteName.CAMPAIGN_EDIT) {
		return !isEqual(model, creativeToModel(formCreativeStore.creative as IBrandAwarenessCreative))
	}
	if (route.name === RouteName.CAMPAIGN_CREATE) {
		return !isEqual(model, defaultModel)
	}

	return true
})

const closeAndReturnRoute = computed(() => RouteName.BRAND_AWARENESS_CREATIVES)

const showSkeleton = computed(() => route.name === RouteName.CREATIVE_EDIT && formCreativeStore.isFetchingCreative)

const setFormData = (creativeData: IBrandAwarenessCreative | null) => {
	if (!creativeData) {
		Object.assign(model, defaultModel)
		return
	}

	const data = creativeToModel(creativeData)
	Object.assign(model, data)
	modelVisibleStatus.value = creativeData.visible
}

onMounted(() => {
	setFormData(formCreativeStore.creative as IBrandAwarenessCreative)
})

watch(creative, (creativeData) => {
	setFormData(creativeData as IBrandAwarenessCreative)
})

watch(() => route.params, () => {
	defaultModel.adsetSlug = route.params.adsetSlug as string
	if (route.name === RouteName.CREATIVE_CREATE) {
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
