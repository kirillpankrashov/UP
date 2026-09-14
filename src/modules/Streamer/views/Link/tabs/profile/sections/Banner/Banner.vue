<template>
  <DashboardSection
    data-name="streamer-link-profile-banner"
    :title="t('link.profile.banner.title')"
  >
    <div
      class="_text-m-regular mb-3"
      v-html="t('link.profile.banner.description')"
    />

    <div class="_text-s-regular mb-6">
      {{ t('link.profile.banner.label') }}
    </div>

    <ElUpload
      :file-list="bannerFileList"
      :auto-upload="false"
      :show-file-list="true"
      :limit="1"
      :on-change="handleFileChange"
      :on-error="handleUploadError"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      list-type="picture-card"
      accept="image/*"
    >
      <ElIcon>
        <PlusIcon />
      </ElIcon>
    </ElUpload>

    <ElButton
      date-test="banner-submit-btn"
      native-type="button"
      class="mt-8 w-full sm:max-w-[220px]"
      size="large"
      :type="success ? 'success' : 'primary'"
      :loading="sending"
      :disabled="sending || success || isFileUploading"
      @click="onSubmit"
    >
      <span class="_text-m-bold">{{ success ? $t('button.saveChanges.success') : $t('button.saveChanges.static') }}</span>
    </ElButton>
  </DashboardSection>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { onMounted } from 'vue'
import { Plus as PlusIcon } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'

import type { INewlyUploadedAttachment } from '@/core/types'
import type { ILinkProfile } from '@/core/types/link'
import { getSignedUrl, uploadFile } from '@/core/api'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { ElButton, ElIcon, ElUpload } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Link/locales'
import { useLinkProfileStore } from '@/modules/Streamer/views/Link/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

const { t } = useLocale<typeof messages>(messages)

const streamerStore = useStreamerStore()
const linkProfileStore = useLinkProfileStore()

const model = ref<INewlyUploadedAttachment | null>(null)
const bannerFileList = ref<UploadFile[]>([])

const sending = ref(false)
const success = ref(false)
const isFileError = ref(false)
const isFileUploading = ref(false)

const onSubmit = async () => {
	sending.value = true

	try {
		await linkProfileStore.updateProfile({
			banner: model.value?.key || null,
		})

		success.value = true
		setTimeout(() => {
			success.value = false
		}, 1500)
	}
	finally {
		sending.value = false
	}
}

function beforeUpload(file: File): boolean | Promise<boolean> {
	if (!file.type.startsWith('image/')) {
		Logger.error('Only images can be uploaded')
		return false
	}

	const maxSize = 5 * 1024 * 1024 // 5MB
	if (file.size > maxSize) {
		Logger.error('File size must be less than 5MB')
		return false
	}

	return true
}

async function handleFileUpload(file: File): Promise<void> {
	try {
		isFileUploading.value = true

		const keyWithExt = `link/${streamerStore.streamerId}/banner/${file.name}`

		const headers = {
			'Authorization': `ApiKey ${import.meta.env.VITE_APP_FREEMIUM_API_KEY}`,
			'x-streamer-id': streamerStore.streamerId?.toString() || '',
			'x-user-role': 'streamer',
		}

		const res = await getSignedUrl({
			contentType: file.type,
			key: keyWithExt,
			bucket: '',
			expires: '',
			visibility: '',
		}, `${import.meta.env.VITE_APP_FREEMIUM_API_URL}platform/streamer/gcs-upload-url`, headers)

		await uploadFile({
			signedUrl: res.data.url,
			file,
			contentType: file.type,
		})

		const uploadedFile = res.data.url.split('?')[0]

		model.value = { key: uploadedFile, basename: file.name } as INewlyUploadedAttachment

		bannerFileList.value = [{
			name: file.name,
			url: uploadedFile,
			status: 'success',
			uid: Date.now(),
		}]

		Logger.info('Banner uploaded successfully!')
	}
	catch (err) {
		Logger.error('Upload error:', false, err)
		Logger.error('Banner upload error')
	}
	finally {
		isFileUploading.value = false
	}
}

async function handleFileChange(uploadFile: UploadFile): Promise<void> {
	if (uploadFile.raw && uploadFile.status === 'ready') {
		const maxSize = 5 * 1024 * 1024 // 5MB
		if (uploadFile.raw.size > maxSize) {
			Logger.error('File size must be less than 5MB')
			bannerFileList.value = []
			return
		}

		await handleFileUpload(uploadFile.raw)
	}
}

function handleUploadError(error: Error): void {
	Logger.error('Upload error:', false, error)
	Logger.error('Banner upload error')
}

function handleRemove(): void {
	bannerFileList.value = []
	model.value = null
	setIsFileError(false)
}

const setIsFileError = (isError: boolean) => {
	isFileError.value = isError
	isFileUploading.value = false
}

const setInitialModel = (value: ILinkProfile | null) => {
	if (!value?.banner) {
		model.value = null
		bannerFileList.value = []
		return
	}

	const bannerDir = value.banner.split('/')
	const basename = bannerDir[bannerDir.length - 1]

	model.value = { key: value.banner, basename } as INewlyUploadedAttachment

	bannerFileList.value = [{
		name: basename,
		url: value.banner,
		status: 'success',
		uid: Date.now(),
	}]
}

watch(linkProfileStore, (value) => {
	setInitialModel(value.profile)
})

onMounted(() => {
	setInitialModel(linkProfileStore.profile)
})
</script>

<style scoped>
:deep(.el-upload-list__item ~ .el-upload--picture-card) {
	display: none;
}

:deep(.el-upload-list__item-preview) {
	display: none !important;
}

:deep(.el-upload-list__item-delete) {
	margin: 0 !important;
}
</style>
