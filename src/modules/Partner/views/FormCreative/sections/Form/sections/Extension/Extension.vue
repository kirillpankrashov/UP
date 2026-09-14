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
      v-if="route.name === RouteName.CREATIVE_EDIT"
      :title="t('creative.form.status.label')"
      data-test="extension-status-section"
    >
      <FormStatus
        v-model="modelVisibleStatus"
        data-test="form-status"
      />
    </DashboardSection>

    <DashboardSection
      :title="t('creative.form.name.title')"
      :no-border="route.name === RouteName.CREATIVE_EDIT"
      data-test="extension-name-section"
    >
      <FormTitle
        v-model="model"
        data-test="form-title"
      />
    </DashboardSection>

    <DashboardSection
      v-if="formAdsetStore.adset?.format.id === AdFormat.EXT_BANNER"
      :title="t('creative.form.files.title')"
      data-test="extension-files-section"
    >
      <FormBanner v-model="model" />

      <Advice
        v-if="!model.panel?.banner1"
        class="sm:absolute sm:left-[calc(100%+24px)] sm:top-6"
        type="hint"
        :title="t('creative.form.files.requirements.title')"
        data-test="creative-requirements-advice"
      >
        <p
          class="_text-m-regular"
          v-html="t('creative.form.files.requirements.extension', { bannerSize: EXTENSION_PANEL_BANNER1_MAX_SIZE_MB, unitSize: EXTENSION_PANEL_BANNER2_MAX_SIZE_MB })"
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

          <ElButton
            type="primary"
            native-type="button"
            class="mt-2 w-full"
            size="large"
            @click="isBannerStyleEditorOpen = true"
          >
            <span class="_text-m-bold">{{ t('creative.form.stylesEditor.button') }}</span>
          </ElButton>
        </Advice>

        <ElDialog
          v-model="previewVisible"
          data-test="preview-dialog"
          destroy-on-close
        >
          <div class="relative">
            <PreviewExtensionBanner
              :panel="model.panel"
              data-test="preview-banner-component"
            />
          </div>
        </ElDialog>

        <ElDialog
          v-model="isBannerStyleEditorOpen"
          fullscreen
        >
          <EditorBanner v-model="model" />
        </ElDialog>
      </template>
    </DashboardSection>

    <template v-if="formAdsetStore.adset?.format.id === AdFormat.EXT_QUIZ && model.quiz">
      <div class="relative">
        <FormQuiz v-model="model" />

        <div class="absolute left-[calc(100%+24px)] top-0 h-full w-[360px]">
          <div class="sticky top-4 origin-top-left scale-[.85] rounded-lg bg-white p-6 text-black shadow-lg">
            <QuizInstance :quiz="model.quiz" />
            <ElButton
              type="primary"
              native-type="button"
              class="mt-2 w-full"
              size="large"
              @click="isQuizStyleEditorOpen = true"
            >
              <span class="_text-m-bold">{{ t('creative.form.stylesEditor.button') }}</span>
            </ElButton>
          </div>
        </div>
      </div>

      <ElDialog
        v-model="isQuizStyleEditorOpen"
        fullscreen
      >
        <EditorQuiz v-model="model" />
      </ElDialog>
    </template>

    <DashboardSection
      v-if="formAdsetStore.adset?.format.id === AdFormat.EXT_GALLERY"
      :title="t('creative.form.files.title')"
      data-test="extension-gallery-section"
    >
      <FormGallery v-model="model" />

      <Advice
        v-if="!model.gallery"
        class="sm:absolute sm:left-[calc(100%+24px)] sm:top-6"
        type="hint"
        :title="t('creative.form.files.requirements.title')"
        data-test="creative-requirements-advice"
      >
        <p
          class="_text-m-regular"
          v-html="t('creative.form.files.requirements.gallery', { imageSize: EXTENSION_GALLERY_SLIDE_MAX_SIZE_MB })"
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

          <ElButton
            type="primary"
            @click="isGalleryStyleEditorOpen = true"
            size="large"
            class="mt-2 w-full"
            data-test="styles-editor-button"
          >
            <span class="_text-m-bold">{{ t('creative.form.stylesEditor.button') }}</span>
          </ElButton>
        </Advice>

        <ElDialog
          v-model="previewVisible"
          data-test="preview-dialog"
          destroy-on-close
        >
          <div class="relative">
            <PreviewExtensionGallery
              :gallery="model.gallery"
              data-test="preview-gallery-component"
            />
          </div>
        </ElDialog>

        <ElDialog
          v-model="isGalleryStyleEditorOpen"
          fullscreen
        >
          <EditorGallery v-model="model" />
        </ElDialog>
      </template>
    </DashboardSection>

    <DashboardSection
      data-test="extension-data-section"
      :title="t('creative.form.data.title')"
    >
      <FormProductUrl
        v-model="model"
        data-test="form-product-url"
      />

      <FormPreview
        v-model="model"
        data-test="form-preview"
      />
    </DashboardSection>

    <DashboardSection
      data-test="extension-analytics-section"
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
import { EXTENSION_GALLERY_SLIDE_MAX_SIZE_MB, EXTENSION_PANEL_BANNER1_MAX_SIZE_MB, EXTENSION_PANEL_BANNER2_MAX_SIZE_MB } from '@/core/consts'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { router } from '@/core/router'
import { isArrayOfUrls, isUrl, required } from '@/core/validators'
import { Advice, PreviewExtensionBanner, PreviewExtensionGallery, QuizInstance } from '@/components'
import { ElButton, ElDialog, ElForm } from '@/components/element-plus'
import { DashboardSection, DashboardSubsection } from '@/components/layouts'
import { RouteName } from '@/modules/Partner/router'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'
import type { ICreateExtensionCreativeData,IExtensionCreative } from '@/modules/Partner/views/FormCreative/api'
import {
	FormImpression,
	FormLegals,
	FormPixel,
	FormPixelScript,
	FormPreview,
	FormProductUrl,
	FormStatus,
	FormTitle,
} from '@/modules/Partner/views/FormCreative/components/form'
import { FormBanner, FormGallery, FormQuiz } from '@/modules/Partner/views/FormCreative/components/form/type/Extension'
import { messages } from '@/modules/Partner/views/FormCreative/locales'
import { useFormCreativeStore } from '@/modules/Partner/views/FormCreative/store'

import ExtensionSkeleton from './ExtensionSkeleton.vue'
import { generateDefaultStyles, getDefaultQuiz } from './helpers'
import { EditorBanner, EditorGallery, EditorQuiz } from './sections'

const route = useRoute()

const { t } = useLocale<typeof messages>(messages)

const uploadUrl = computed(() => {
	return `${import.meta.env.VITE_APP_API_URL}gcp/upload/config`
})

const bucketUrl = computed(() => {
	if (process.env.NODE_ENV === 'production') {
		return 'https://uplify-storage.s3.eu-central-1.amazonaws.com'
	}

	return 'https://uplify-storage-staging.s3.eu-central-1.amazonaws.com'
})

const campaignsStore = useCampaignsStore()
const formCampaignStore = useFormCampaignStore()
const formAdsetStore = useFormAdsetStore()
const formCreativeStore = useFormCreativeStore()

const showSkeleton = computed(() => route.name === RouteName.CREATIVE_EDIT && formCreativeStore.isFetchingCreative)

const creative = computed(() => formCreativeStore.creative as IExtensionCreative | null)

const formRef = ref<FormInstance>()

const previewVisible = ref(false)
const isQuizStyleEditorOpen = ref(false)
const isBannerStyleEditorOpen = ref(false)
const isGalleryStyleEditorOpen = ref(false)

let modelVisibleStatus = ref(true)

const sending = ref(false)
const success = ref(false)

const rules = computed<FormRules<ICreateExtensionCreativeData>>(() => ({
	title: [required],
	'productUrl.general': [required, isUrl],
	'productUrl.mobile': [isUrl],
	pixelClicks: [isArrayOfUrls],
	preview: [required],
}))

const defaultModel: ICreateExtensionCreativeData = {
	adsetSlug: route.params.adsetSlug as string,
	title: {
		default: '',
	},
	productUrl: {
		general: '',
		mobile: '',
	},
	pixelClicks: [],
	pixelImpressions: [],
	pixelInspections: [],
	pixelClicksScripts: '',
	scriptCode: '',
	panel: {
		banner1: null,
		banner2: null,
		styles: '',
	},
	preview: '',
	quiz: formAdsetStore.adset?.format.id === AdFormat.EXT_QUIZ ? getDefaultQuiz() : undefined,
	gallery: formAdsetStore.adset?.format.id === AdFormat.EXT_GALLERY ? { list: [], styles: '' } : undefined,
}

let model = reactive<ICreateExtensionCreativeData>({
	...defaultModel,
})

const creativeToModel = (creativeData: IExtensionCreative): ICreateExtensionCreativeData => {
	if (!creativeData) return { ...defaultModel }

	if (creativeData.attachments.quiz?.styles === '') {
		creativeData.attachments.quiz.styles = generateDefaultStyles()
	}

	return {
		adsetSlug: creativeData.adset.slug,
		title: {
			default: creativeData.title,
		},
		productUrl: {
			general: creativeData.productUrl.general,
			mobile: creativeData.productUrl.mobile,
		},
		pixelClicks: creativeData.pixelClicks.length > 0 ? creativeData.pixelClicks : [''],
		pixelImpressions: creativeData.pixelImpressions.length > 0 ? creativeData.pixelImpressions : [''],
		pixelInspections: creativeData.pixelInspections,
		pixelClicksScripts: creativeData.pixelClicksScripts,
		preview: creativeData.preview?.basename ?? '',
		scriptCode: creativeData.scriptCode,
		quiz: formAdsetStore.adset?.format.id === AdFormat.EXT_QUIZ ? creativeData.attachments.quiz ?? getDefaultQuiz() : undefined,
		panel: creativeData.attachments.panel,
		gallery: creativeData.attachments.gallery,
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
				await campaignsStore.changeStatus(creative.value.slug, CampaignType.EXTENSION, AdEntityType.CREATIVES)
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
		return !isEqual(model, creativeToModel(formCreativeStore.creative as IExtensionCreative))
	}
	if (route.name === RouteName.CAMPAIGN_CREATE) {
		return !isEqual(model, defaultModel)
	}

	return true
})

const closeAndReturnRoute = computed(() => RouteName.EXTENSION_CREATIVES)

const setFormData = (creativeData: IExtensionCreative | null) => {
	if (!creativeData) {
		Object.assign(model, defaultModel)
		return
	}

	const data = creativeToModel(creativeData)
	Object.assign(model, data)
	modelVisibleStatus.value = creativeData.visible
}

onMounted(() => {
	setFormData(formCreativeStore.creative as IExtensionCreative)
})

watch(creative, (creativeData) => {
	setFormData(creativeData as IExtensionCreative)
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
