<template>
  <div
    data-name="extension-form-banner"
    data-test="extension-form-banner"
  >
    <ElFormItem
      :label="t('creative.form.panel.banner1.label')"
      prop="panel.banner1"
    >
      <div
        class="w-full max-w-[460px]"
        :class="{'_uploaded-image': model.panel?.banner1, '_uploading': isUploading}"
      >
        <ElUpload
          v-model:file-list="banner1"
          :auto-upload="false"
          :show-file-list="true"
          :limit="1"
          :on-change="(file: UploadFile) => handleFileChange(file, 'banner1')"
          :on-error="handleUploadError"
          :before-upload="beforeUpload"
          :on-remove="() => handleRemove('banner1')"
          list-type="picture"
          accept=".png, .jpg, .jpeg, .gif, .mp4, .webm"
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

    <ElFormItem
      :label="t('creative.form.panel.banner2.label')"
      prop="panel.banner2"
    >
      <div
        class="w-full max-w-[460px]"
        :class="{'_uploaded-image': model.panel?.banner2}"
      >
        <ElUpload
          v-model:file-list="banner2"
          :auto-upload="false"
          :show-file-list="true"
          :limit="1"
          :on-change="(file: UploadFile) => handleFileChange(file, 'banner2')"
          :on-error="handleUploadError"
          :before-upload="beforeUpload"
          :on-remove="() => handleRemove('banner2')"
          list-type="picture"
          accept=".png, .jpg, .jpeg, .gif, .mp4, .webm"
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

import type { IPanel, IUnitAttachment } from '@/core/types'
import {
	getFileMeta,
	getSignedUrl,
	uploadFile,
} from '@/core/api'
import type { IFileMeta } from '@/core/api/uploadFile/types'
import { EXTENSION_PANEL_BANNER1_MAX_SIZE_MB, EXTENSION_PANEL_BANNER2_MAX_SIZE_MB } from '@/core/consts'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { ElButton, ElFormItem, ElUpload } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormCreative/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
	panel: IPanel | undefined
}>({ required: true })

const banner1 = ref<UploadFile[]>([])
const banner2 = ref<UploadFile[]>([])
const isUploading = ref(false)

function handleRemove(field: string): void {
	if (!model.value.panel) return

	if (field === 'banner1') {
		banner1.value = []
		model.value.panel.banner1 = null
	}
	else if (field === 'banner2') {
		banner2.value = []
		model.value.panel.banner2 = null
	}
}

function beforeUpload(file: File): boolean | Promise<boolean> {
	// if (!file.type.startsWith('image/')) {
	// 	Logger.error('Only images can be uploaded')
	// 	return false
	// }

	const maxSize = 2 * 1024 * 1024
	if (file.size > maxSize) {
		Logger.error('File size must be less than 2MB')
		return false
	}

	return true
}

async function handleFileUpload(file: File, field: string): Promise<void> {
	if (!model.value.panel) return

	isUploading.value = true

	try {
		const res = await getSignedUrl({
			contentType: file.type,
			key: `extension/panel/${file.name}`,
			bucket: '',
			expires: '',
			visibility: '',
		}, `${import.meta.env.VITE_APP_API_URL}gcp/upload/extension/panel/config`)

		await uploadFile({
			signedUrl: res.url,
			file,
			contentType: file.type,
		})

		const uploadedFile = res.url.split('?')[0] as string

		let fileMeta: IFileMeta = {
			size: 0,
			codec: '',
			duration: 0,
			frames: 0,
			width: 0,
			height: 0,
			audio: null,
		}

		try {
			fileMeta = await getFileMeta(uploadedFile)
		}
		catch (err) {
			Logger.error('Failed to get file meta:', false, err)
		}

		const modelValue: IUnitAttachment = {
			basedir: '',
			basename: file.name,
			path: uploadedFile,
			size: fileMeta.size,
			properties: {
				duration: fileMeta.duration,
				frames: fileMeta.frames,
				width: fileMeta.width,
				height: fileMeta.height,
				audio: fileMeta.audio,
			},
		}

		const fileListValue: UploadFile[] = [{
			name: file.name,
			url: uploadedFile,
			status: 'success',
			uid: Date.now(),
		}]


		if (field === 'banner1') {
			model.value.panel.banner1 = modelValue
			banner1.value = fileListValue
		}
		else if (field === 'banner2') {
			model.value.panel.banner2 = modelValue
			banner2.value = fileListValue
		}

		Logger.info('Image uploaded successfully!')
	}
	catch (err) {
		Logger.error('Upload error:', false, err)
	}
	finally {
		isUploading.value = false
	}
}

async function handleFileChange(uploadFile: UploadFile, field: string): Promise<void> {
	if (uploadFile.raw && uploadFile.status === 'ready') {
		const maxSize = field === 'banner1' ? EXTENSION_PANEL_BANNER1_MAX_SIZE_MB : EXTENSION_PANEL_BANNER2_MAX_SIZE_MB

		if (uploadFile.raw.size > maxSize * 1024 * 1024) {
			Logger.error('File size must be less than 2MB')

			if (field === 'banner1') {
				banner1.value = []
			}
			else if (field === 'banner2') {
				banner2.value = []
			}

			return
		}

		await handleFileUpload(uploadFile.raw, field)
	}
}

function handleUploadError(error: Error): void {
	Logger.error('Upload error:', false, error)
	Logger.error('Image upload error')
}

async function restoreFileLists(panel: IPanel): Promise<void> {
	try {
		if (panel.banner1) {
			banner1.value = [{
				name: panel.banner1.basename,
				url: panel.banner1.path,
				status: 'success',
				uid: Date.now(),
			}]
		}
		if (panel.banner2) {
			banner2.value = [{
				name: panel.banner2.basename,
				url: panel.banner2.path,
				status: 'success',
				uid: Date.now(),
			}]
		}
	}
	catch (err) {
		Logger.error('Failed to restore file lists:', false, err)
	}
}

onMounted(() => {
	if (model.value.panel) {
		restoreFileLists(model.value.panel)
	}
})

watch(() => model.value.panel, (newVal) => {
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
