<template>
  <div>
    <ElFormItem
      :label="t('creative.form.preview.label')"
      prop="preview"
    >
      <div
        class="w-full max-w-[460px]"
        :class="{
          '_uploaded-image': model.preview,
          '_uploading': isUploading
        }"
      >
        <ElUpload
          v-model:file-list="preview"
          :auto-upload="false"
          :show-file-list="true"
          :limit="1"
          :on-change="handleFileChange"
          :on-error="handleUploadError"
          :before-upload="beforeUpload"
          :on-remove="handleRemove"
          list-type="picture"
          accept=".mp4, .webm"
        >
          <ElButton
            type="primary"
            native-type="button"
          >
            <span class="_text-m-bold">{{ t('creative.form.files.uploadBtn') }}</span>
          </ElButton>
        </ElUpload>
      </div>
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { UploadFile } from 'element-plus'

import {
	getSignedUrl,
	uploadFile,
} from '@/core/api'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { ElButton, ElFormItem, ElUpload } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormCreative/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
	preview: string | null
}>({ required: true })

const preview = ref<UploadFile[]>([])
const isUploading = ref(false)

function handleRemove(): void {
	if (!model.value.preview) return

	preview.value = []
	model.value.preview = null
}

function beforeUpload(file: File): boolean | Promise<boolean> {
	if (!file.type.startsWith('image/')) {
		Logger.error('Only images can be uploaded')
		return false
	}

	const maxSize = 2 * 1024 * 1024
	if (file.size > maxSize) {
		Logger.error('File size must be less than 2MB')
		return false
	}

	return true
}

async function handleFileUpload(file: File): Promise<void> {
	if (model.value.preview !== '') return

	isUploading.value = true

	try {
		const keyWithExt = `${file.name}`

		const res = await getSignedUrl({
			contentType: file.type,
			key: keyWithExt,
			bucket: '',
			expires: '',
			visibility: '',
		}, `${import.meta.env.VITE_APP_API_URL}gcp/upload/config`)

		await uploadFile({
			signedUrl: res.url,
			file,
			contentType: file.type,
		})

		const uploadedFile = res.url.split('?')[0] as string

		const fileListValue: UploadFile[] = [{
			name: file.name,
			url: uploadedFile,
			status: 'success',
			uid: Date.now(),
		}]


		model.value.preview = res.key
		preview.value = fileListValue

		Logger.info('Image uploaded successfully!')
	}
	catch (err) {
		Logger.error('Upload error:', false, err)
	}
	finally {
		isUploading.value = false
	}
}

async function handleFileChange(uploadFile: UploadFile): Promise<void> {
	if (uploadFile.raw && uploadFile.status === 'ready') {
		const maxSize = 2 * 1024 * 1024
		if (uploadFile.raw.size > maxSize) {
			Logger.error('File size must be less than 2MB')

			preview.value = []

			return
		}

		await handleFileUpload(uploadFile.raw)
	}
}

function handleUploadError(error: Error): void {
	Logger.error('Upload error:', false, error)
	Logger.error('Image upload error')
}

async function restoreFileLists(attachment: string): Promise<void> {
	try {
		preview.value = [{
			name: attachment,
			url: attachment,
			status: 'success',
			uid: Date.now(),
		}]
	}
	catch (err) {
		Logger.error('Failed to restore file lists:', false, err)
	}
}

onMounted(() => {
	if (model.value.preview) {
		restoreFileLists(model.value.preview)
	}
})

watch(() => model.value.preview, (newVal) => {
	if (newVal) {
		restoreFileLists(newVal)
	}
})
</script>

<style scoped>
:deep(.el-form-item--label-top .el-form-item__label) {
  line-height: 1.2;

  font-size: 12px;
  color: #909399;
}

:deep(.el-upload-list__item ~ .el-upload--picture-card) {
	display: none;
}

:deep(.el-upload-list__item-preview) {
	display: none !important;
}

:deep(.el-upload-list__item-delete) {
	margin: 0 !important;
}

._uploaded-image :deep(.el-upload) {
	display: none;
}

._uploading :deep(.el-upload) {
	display: none;
}

:deep(.el-upload-list) {
	margin: 0;
}

:deep(.el-upload-list__item) {
	margin: 0;
}

._uploaded-image :deep(.el-upload-list__item-info) {
	width: calc(100% - 70px);
}
</style>
