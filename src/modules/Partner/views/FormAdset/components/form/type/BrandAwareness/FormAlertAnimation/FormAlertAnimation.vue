<template>
  <div data-name="partner-form-adset-alert-animation">
    <!-- <FileUploader
      :options="{maxSizeMb: 5, accept: 'image'}"
      :existing-file="model"
      :upload-url="bannerUploadUrl"
      :bucket-key="bannerBucketKey"
      @file-error="setIsFileError(true)"
      @file-delete="onBannerFileDelete"
      @file-upload="onBannerUploadComplete"
      @uploading-start="onBannerUploadStart"
      :with-extension="true"
      :headers="headers"
    /> -->
    <FileUploader
      :options="{maxSizeMb: 10, accept: 'video'}"
      :existing-file="attachment"
      :upload-url="fileUploadUrl"
      @file-error="setIsFileError(true)"
      @file-delete="onFileDelete"
      @file-upload="onFileUploadComplete"
      @uploading-start="onFileUploadStart"
      :with-extension="false"
    />
  </div>
</template>

<script setup lang="ts">
// TODO: доработать компонент FileUploader, чтобы он передавал слот в зависимости от загружаемого содержимого
import { computed, ref, watch } from 'vue'

import type { IFileAttachment, INewlyUploadedAttachment, IUnitAttachment } from '@/core/types'
import { FileUploader } from '@/components'

const model = defineModel<{
	conversionAlert: {
		animation: string | null
	}
}>({ required: true })

const props = defineProps<{
	file: IUnitAttachment | null
}>()

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
}

const onFileUploadStart = () => {
	setIsFileError(false)
	isFileUploading.value = true
}

const onFileUploadComplete = (params: { attachment: IFileAttachment }) => {
	setIsFileError(false)
	isFileUploading.value = false
	attachment.value = params.attachment.file
	model.value.conversionAlert.animation = params.attachment.file.key
}

const setInitialModel = (value: IUnitAttachment | null) => {
	if (!value) {
		attachment.value = null
		return
	}

	attachment.value = { basename: value.basename } as INewlyUploadedAttachment
	model.value.conversionAlert.animation = value.basename
}

watch(() => props.file, (value) => {
	setInitialModel(value)
})
</script>
