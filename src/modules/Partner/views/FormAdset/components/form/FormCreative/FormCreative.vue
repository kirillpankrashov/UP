<template>
  <div data-name="partner-form-adset-alert-animation">
    <FileUploader
      :options="options"
      :existing-file="attachment"
      :upload-url="fileUploadUrl"
      @file-error="setIsFileError(true)"
      @file-delete="onFileDelete"
      @file-upload="onFileUploadComplete"
      @uploading-start="onFileUploadStart"
      @validate="onValidate"
      :with-extension="true"
      :no-validate="false"
    >
      <template #drag-n-drop>
        <CreativeVideoIcon class="mx-auto mb-3 h-12 w-12 fill-primary-500" />
        <p class="_text-l-bold">
          {{ t('files.instructions.dragVideo') }}
        </p>
      </template>
    </FileUploader>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { onMounted } from 'vue'

import { AdFormat, CampaignType, type IFileAttachment, type INewlyUploadedAttachment, type IUnitAttachment } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { FileUploader } from '@/components'
import type { IAcceptValues } from '@/components/DragNDrop/types'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'

import CreativeVideoIcon from '@/assets/img/icons/creative-video.svg'

const model = defineModel<{
	unit: string | null
}>({ required: true })

const props = defineProps<{
	file: IUnitAttachment | null
	options: {
    maxSizeMb: number
    accept: keyof IAcceptValues
  }
	format: AdFormat
}>()

const emit = defineEmits<{
  (e: 'file-delete'): void
}>()

const { t } = useLocale({})

const formAdsetStore = useFormAdsetStore()

const attachment = ref<INewlyUploadedAttachment | null>(null)

const fileUploadUrl = computed(() => `${import.meta.env.VITE_APP_API_URL}gcp/upload/config`)
const isFileError = ref(false)
const isFileUploading = ref(false)

const setIsFileError = (isError: boolean) => {
	isFileError.value = isError
	isFileUploading.value = false
}

const onFileDelete = async () => {
	attachment.value = null
	setIsFileError(false)
	emit('file-delete')
}

const onFileUploadStart = () => {
	setIsFileError(false)
	isFileUploading.value = true
}

const onFileUploadComplete = (params: { attachment: IFileAttachment }) => {
	setIsFileError(false)
	isFileUploading.value = false
	attachment.value = params.attachment.file
	model.value.unit = params.attachment.file.key
}

const attachmentFormat = computed(() => {
	if (formAdsetStore.currentCampaignType === CampaignType.PERFORMANCE) {
		return AdFormat.INTERACTIVE
	}

	if (formAdsetStore.currentCampaignType === CampaignType.PREROLL) {
		return AdFormat.PREROLL
	}

	return props.format
})

const onValidate = (key: string) => {
	formAdsetStore.verifyAttachment({
		format: attachmentFormat.value,
		'unit': key,
	})
}

const setInitialModel = (value: IUnitAttachment | null) => {
	if (!value) {
		attachment.value = null
		return
	}

	attachment.value = { basename: value.basename } as INewlyUploadedAttachment
	model.value.unit = value.basename
}

watch(() => props.file, (value) => {
	setInitialModel(value)
})

onMounted(() => {
	setInitialModel(props.file)
})
</script>
