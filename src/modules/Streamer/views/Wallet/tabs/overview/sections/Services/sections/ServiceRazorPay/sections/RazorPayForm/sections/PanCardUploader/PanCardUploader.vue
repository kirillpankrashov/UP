<template>
  <div class="w-full">
    <div class="_text-s-regular mb-2 text-gray">
      {{ t('placeholder.panCard') }}
    </div>
    <div class="_text-s-regular mb-2 text-gray">
      {{ t('placeholder.panCardIfUpload') }}
    </div>
    <FileUploader
      :options="{maxSizeMb: 1, accept: 'image'}"
      :existing-file="existingPanCard"
      :upload-url="uploadUrl"
      @file-error="setIsFileError(true)"
      @file-delete="onPanCardFileDelete"
      @file-upload="onPanCardUploadComplete"
      @uploading-start="onPancardUploadStart"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import type { INewlyUploadedAttachment, IStreamerWalletRazorPayPayoutMethod } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { FileUploader } from '@/components'
import { messages } from '@/modules/Streamer/views/Wallet/locales'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

const { t } = useLocale<typeof messages>(messages)

const walletStore = useWalletStore()
const payoutMethod = computed(() => walletStore.payoutMethod as IStreamerWalletRazorPayPayoutMethod)

const uploadUrl = `${import.meta.env.VITE_APP_API_URL}gcp/upload/config/razorpay/pan_card`

const isFileError = ref(false)
const isFileUploading = ref(false)

const existingPanCard = computed(() => {
	if (payoutMethod.value.payload.panCardDoc) {
		return { basename: t('placeholder.panCard') } as INewlyUploadedAttachment
	}

	return null
})

const setIsFileError = (isError: boolean) => {
	isFileError.value = isError
	isFileUploading.value = false
}

const onPanCardFileDelete = () => {
	payoutMethod.value.payload.panCardDoc = ''
	setIsFileError(false)
}

const onPancardUploadStart = () => {
	setIsFileError(false)
	isFileUploading.value = true
}

const onPanCardUploadComplete = (params: any) => {
	setIsFileError(false)
	isFileUploading.value = false
	payoutMethod.value.payload.panCardDoc = params.attachment?.file?.key
}
</script>
