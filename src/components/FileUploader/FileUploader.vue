<template>
  <div class="file-uploader">
    <FormDragNDrop
      v-if="step === Step.TAKING"
      :is-error="errors.length > 0"
      :options="options"
      @change="onChange"
      @error="onError"
    >
      <slot name="drag-n-drop" />
    </FormDragNDrop>

    <CreativeUploader
      v-if="step === Step.UPLOADING"
      url=""
      :no-validate="noValidate"
      :uploading="uploading"
      :has-errors="!!errors.length"
      :params="endpointParams"
      :custom-url="uploadUrl"
      :headers="headers"
      :bucket-key="bucketKey"
      :with-extension="withExtension"
      @uploaded="onUploaded"
      @error="onError"
      @validate="onValidate"
    />

    <FilePreview
      v-if="step === Step.DISPLAYING"
      :type="previewType"
      :attachment="resultAttachment ? resultAttachment.file : existingFile"
      @delete="onDelete"
    />

    <div
      v-if="errors.length"
      class="mt-4"
    >
      <div
        v-for="item in errors"
        :key="item"
        class="_text-s-regular mb-3 text-danger last-of-type:mb-0"
        v-html="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO: refactor component. Move CreativeUploade, DragNDrop and FilePreview as sections to this component, unify styles and move validate function from CreativeUploader as emit function
import { computed, ref } from 'vue'

import type {
	IAttachments,
	IFileAttachment,
	IMessages,
	INewlyUploadedAttachment,
} from '@/core/types'
import { useLocale } from '@/core/hooks'
import { CreativeUploader, FilePreview, FormDragNDrop } from '@/components'
import { type IAcceptValues } from '@/components/DragNDrop/types'

enum Step {
  TAKING,
  UPLOADING,
  DISPLAYING,
}

const props = withDefaults(defineProps<{
  options: {
    maxSizeMb: number
    accept: keyof IAcceptValues
  }
  existingFile: INewlyUploadedAttachment | null
  uploadUrl: string
  withExtension?: boolean
	noValidate?: boolean
  headers?: Record<string, string> | null
  bucketKey?: string
}>(), {
	withExtension: true,
	noValidate: true,
	headers: null,
	bucketKey: '',
})

const { t } = useLocale({})

const emit = defineEmits(['uploading-start', 'file-error', 'file-delete', 'file-upload', 'validate'])

const file = ref<File | null>(null)
const uploading = ref(false)
const resultAttachment = ref<IFileAttachment | null>(null)
const errors = ref<string[]>([])

const previewType = computed(() => props.options.accept as keyof IAttachments)

const step = computed(() => {
	if (resultAttachment.value || props.existingFile) return Step.DISPLAYING
	if (uploading.value) return Step.UPLOADING
	return Step.TAKING
})

const endpointParams = computed(() => ({
	type: props.options.accept,
	[props.options.accept]: file,
}))

const onChange = (files: HTMLInputElement['files']) => {
	if (!files) {
		return
	}

	if (errors.value.length) {
		return
	}

	file.value = files[0]
	uploading.value = true
	errors.value = []
	emit('uploading-start')
}

const fileExt = file.value ? `.${file.value.name.split('.').pop()}` : ''

const onUploaded = (attachment: IFileAttachment) => {
	resultAttachment.value = attachment

	const keyWithExt = `${resultAttachment.value.file.key}${props.withExtension ? fileExt : ''}`

	resultAttachment.value.file.key = keyWithExt
	uploading.value = false

	emit('file-upload', {
		attachment: resultAttachment.value,
	})
}

const onDelete = () => {
	file.value = null
	resultAttachment.value = null
	errors.value = []

	emit('file-delete')
}

const onError = (errorsMsg: IMessages['messages']) => {
	errors.value = []
	resultAttachment.value = null

	emit('file-error')

	errorsMsg.forEach(error => {
		if (typeof error === 'string') {
			errors.value.push(error)
		}
		else if ('text' in error) {
			errors.value.push(error.text)
		}
		else {
			errors.value.push(t('errors.unknown'))
		}
	})
}

const onValidate = (key: string) => {
	emit('validate', key)
}
</script>
