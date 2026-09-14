<template>
  <div data-name="partner-form-creative">
    <FileUploader
      :options="options"
      :existing-file="attachment"
      :upload-url="uploadUrl"
      @file-error="setIsFileError(true)"
      @file-delete="onFileDelete"
      @file-upload="onFileUploadComplete"
      @uploading-start="onFileUploadStart"
      @validate="onValidate"
      :with-extension="true"
      :no-validate="false"
    >
      <template #drag-n-drop>
        <template v-if="[AdFormat.FULLSCREEN, AdFormat.PIP].includes(format)">
          <CreativeVideoIcon class="mx-auto mb-3 h-12 w-12 fill-primary" />
          <p class="_text-l-bold">
            {{ t('files.instructions.dragVideo') }}
          </p>
        </template>

        <template v-else-if="format === AdFormat.ADMNG">
          <CreativeUnitIcon class="mx-auto mb-3 h-12 w-12 fill-primary" />
          <p class="_text-l-bold">
            {{ t('files.instructions.dragVideo') }}
          </p>
        </template>

        <template v-else-if="format === AdFormat.CUSTOM">
          <CreativeUnitIcon class="mx-auto mb-3 h-12 w-12 fill-primary" />
          <p class="_text-l-bold">
            {{ t('files.instructions.dragZip') }}
          </p>
        </template>

        <template v-else-if="format === AdFormat.EXT_BANNER && ['banner', 'unit'].includes(field)">
          <CreativeUnitIcon class="mx-auto mb-3 h-12 w-12 fill-primary" />
          <p class="_text-l-bold">
            {{ t('files.instructions.dragImageOrVideo') }}
          </p>
        </template>

        <template v-else-if="[AdFormat.SP_FULLSCREEN].includes(format)">
          <CreativeUnitIcon class="mx-auto mb-3 h-12 w-12 fill-primary" />
          <p class="_text-l-bold">
            {{ t('files.instructions.dragImageOrVideo') }}
          </p>
        </template>

        <template v-else-if="format === AdFormat.SP_CUSTOM">
          <CreativeUnitIcon class="mx-auto mb-3 h-12 w-12 fill-primary" />
          <p class="_text-l-bold">
            {{ t('files.instructions.dragImageOrVideo') }}
          </p>
        </template>
      </template>
    </FileUploader>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { onMounted } from 'vue'

import {
	AdFormat,
	CampaignType,
	type IFileAttachment,
	type INewlyUploadedAttachment,
	type IUnitAttachment,
	type IVideoAttachment,
} from '@/core/types'
import { useLocale } from '@/core/hooks'
import { FileUploader } from '@/components'
import type { IAcceptValues } from '@/components/DragNDrop/types'
import { useFormCreativeStore } from '@/modules/Partner/views/FormCreative/store'

// import CreativeImageIcon from '@/assets/img/icons/creative-image.svg'
import CreativeVideoIcon from '@/assets/img/icons/creative-video.svg'
import CreativeUnitIcon from '@/assets/img/icons/creative-zip.svg'

const model = defineModel<{
	unit?: string | null
	video?: string | null
	zip?: string | null
	banner?: string | null
}>({ required: true })

const props = withDefaults(defineProps<{
	file: IUnitAttachment | IVideoAttachment | null
	field: keyof typeof model.value
	options: {
    maxSizeMb: number
    accept: keyof IAcceptValues
  }
	format: AdFormat
	uploadUrl?: string
  validate?: boolean
}>(), {
	validate: true,
	uploadUrl: `${import.meta.env.VITE_APP_API_URL}gcp/upload/config`,
})

const emit = defineEmits<{
  (e: 'file-delete'): void
}>()

const { t } = useLocale({})

const formCreativeStore = useFormCreativeStore()

const attachment = ref<INewlyUploadedAttachment | null>(null)

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
	model.value[props.field] = params.attachment.file.key
}

const attachmentFormat = computed(() => {
	if (formCreativeStore.currentCampaignType === CampaignType.PERFORMANCE) {
		return AdFormat.INTERACTIVE
	}

	if (formCreativeStore.currentCampaignType === CampaignType.PREROLL) {
		return AdFormat.PREROLL
	}

	return props.format
})

const onValidate = (key: string) => {
	if (!props.validate) {
		return
	}

	formCreativeStore.verifyAttachment({
		format: attachmentFormat.value,
		[props.field]: key,
	})
}

const setInitialModel = (value: IUnitAttachment | null) => {
	if (!value) {
		attachment.value = null
		return
	}

	attachment.value = { basename: value.basename } as INewlyUploadedAttachment
	model.value[props.field] = value.basename
}

watch(() => props.file, (value) => {
	setInitialModel(value)
})

onMounted(() => {
	setInitialModel(props.file)
})
</script>
