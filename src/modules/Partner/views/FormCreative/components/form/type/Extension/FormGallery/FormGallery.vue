<!-- eslint-disable vue/no-v-model-argument -->
<template>
  <div v-if="model.gallery">
    <ElFormItem prop="gallery.list">
      <div class="w-full max-w-[460px]">
        <ElUpload
          v-model:file-list="galleryFileList"
          :auto-upload="false"
          :show-file-list="true"
          :on-change="handleFileChange"
          :on-error="handleUploadError"
          :before-upload="beforeUpload"
          :on-remove="handleRemove"
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
import { v4 as uuidv4 } from 'uuid'

import type { IGallery } from '@/core/types'
import { getFileMeta, getSignedUrl, uploadFile } from '@/core/api'
import type { IFileMeta } from '@/core/api/uploadFile/types'
import { EXTENSION_GALLERY_SLIDE_MAX_SIZE_MB } from '@/core/consts'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import {
	ElButton,
	ElFormItem,
	ElUpload,
} from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormCreative/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
	gallery: IGallery | undefined
}>({ required: true })

const galleryFileList = ref<UploadFile[]>([])
const isUploading = ref(false)

function handleRemove(file: UploadFile): void {
	if (!model.value.gallery) return

	const index = model.value.gallery.list.findIndex((f) => f.id.toString() === file.uid.toString())

	if (index !== -1) {
		model.value.gallery.list.splice(index, 1)
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

async function handleFileUpload(file: File): Promise<void> {
	if (!model.value.gallery) return

	isUploading.value = true

	try {
		const res = await getSignedUrl({
			contentType: file.type,
			key: `extension/gallery/${file.name}`,
			bucket: '',
			expires: '',
			visibility: '',
		}, `${import.meta.env.VITE_APP_API_URL}gcp/upload/extension/gallery/config`)

		await uploadFile({
			signedUrl: res.url,
			file,
			contentType: file.type,
		})

		const uploadedFile = res.url.split('?')[0]

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

		model.value.gallery.list.push({
			id: uuidv4(),
			path: uploadedFile,
			basename: file.name,
			properties: {
				duration: fileMeta.duration,
				frames: fileMeta.frames,
				width: fileMeta.width,
				height: fileMeta.height,
				audio: fileMeta.audio,
			},
		})

		restoreFileLists(model.value.gallery)

		Logger.info('Image uploaded successfully!')
	}
	catch (err) {
		Logger.error('Upload error:', false, err)
		Logger.error('Image upload error')
	}
	finally {
		isUploading.value = false
	}
}

async function handleFileChange(uploadFile: UploadFile): Promise<void> {
	if (uploadFile.raw && uploadFile.status === 'ready') {
		if (uploadFile.raw.size > EXTENSION_GALLERY_SLIDE_MAX_SIZE_MB * 1024 * 1024) {
			Logger.error('File size must be less than 2MB')

			galleryFileList.value = galleryFileList.value.filter((f) => f.uid !== uploadFile.uid)

			return
		}

		await handleFileUpload(uploadFile.raw)
	}
}

function handleUploadError(error: Error): void {
	Logger.error('Upload error:', false, error)
	Logger.error('Image upload error')
}

async function restoreFileLists(gallery: IGallery): Promise<void> {
	try {
		for (let i = 0; i < gallery.list.length; i++) {
			const image = gallery.list[i]
			if (image.path) {
				galleryFileList.value = gallery.list.map((image) => ({
					name: image.path,
					url: image.path,
					status: 'success',
					uid: image.id as unknown as number,
				}))
			}
		}
	}
	catch (err) {
		Logger.error('Failed to restore file lists:', false, err)
	}
}

onMounted(() => {
	if (model.value.gallery) {
		restoreFileLists(model.value.gallery)
	}
})

watch(() => model.value.gallery, (newVal) => {
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

:deep(.el-upload-list--picture-card) {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 8px;
}

/* :deep(.el-upload-list__item ~ .el-upload--picture-card) {
	display: none;
}

:deep(.el-upload-list__item-preview) {
	display: none !important;
}

:deep(.el-upload-list__item-delete) {
	margin: 0 !important;
} */
</style>
