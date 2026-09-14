<template>
  <div class="h-20 rounded bg-primary-50 p-5">
    <div class="flex">
      <div
        v-loading="showSpinner"
        class="w-10"
      >
        <CircleLoader
          v-if="!showSpinner"
          :percent="current"
        />
      </div>

      <div class="ml-5 pt-1">
        <div class="_text-m-bold mb-2">
          {{ status }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import { getSignedUrl, uploadFile } from '@/core/api'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
// import Vapor from '@/core/libs/vapor'
import { CircleLoader } from '@/components'

const emit = defineEmits(['uploaded', 'error', 'validate'])

const props = withDefaults(defineProps<{
	url: string
	params: { [key: string]: any }
	uploading: boolean
	hasErrors: boolean
	noValidate: boolean
	customUrl: string
	headers: Record<string, string> | null
	bucketKey: string
	withExtension: boolean
}>(), {
	uploading: false,
	hasErrors: false,
	noValidate: false,
	customUrl: '',
	headers: null,
	bucketKey: '',
	withExtension: true,
})

const { t } = useLocale({})

const percent = ref(0)
const current = ref(0)
const processing = ref(false)

const isLoaded = computed(() => percent.value === 100)

const showSpinner = computed(() => props.uploading && processing.value)

const type = computed(() => {
	let type

	for (const key in props.params) {
		if (/unit|video|zip|image/.test(key)) {
			type = key
		}
	}

	return type
})

const status = computed(() => {
	if (isLoaded.value && processing) {
		return t('other.uploader.processing')
	}
	if (isLoaded.value && props.hasErrors) {
		return t('other.uploader.declined')
	}
	return `${t('other.uploader.loading')} ${current.value}%`
})

const upload = async () => {
	if (!type.value) return

	const file = props.params[type.value].value || props.params[type.value]

	const fileExt = `.${file.name.split('.').pop()}`
	const keyWithExt = `${props.bucketKey}${props.withExtension ? fileExt : ''}`

	const uploadUrl = props.customUrl || `${import.meta.env.VITE_APP_API_URL}gcp/upload/config`

	// const signedStorageUrl = props.customUrl || `${import.meta.env.VITE_APP_API_URL}aws/upload/config`

	// const res = await Vapor.store(file, {
	// 	signedStorageUrl,
	// 	key: keyWithExt,
	// 	progress: (progress: number) => {
	// 		percent.value = Math.round(progress * 100)
	// 	},
	// 	headers: props.headers || {},
	// })

	// console.log('res', res)

	const res = await getSignedUrl({
		bucket: '',
		contentType: file.type,
		key: keyWithExt,
		visibility: '',
	}, uploadUrl, props.headers || {})

	const data = 'data' in res ? res.data : res

	await uploadFile({
		signedUrl: data.url,
		file,
		contentType: file.type,
	})

	if (!props.noValidate) {
		await validate(data.key)
	}

	emit('uploaded', {
		type: type.value,
		file: {
			basename: file.name,
			path: data.url,
			key: data.key,
		},
	})
}

const validate = async (key: string) => {
	if (!type.value) return

	processing.value = true

	try {
		await emit('validate', key)
	}
	catch (err: any) {
		if (err.response) {
			Logger.error('Error validating file', false, err)

			emit('error', [t('other.uploader.fileUploadError')])
		}
		else if (err.request) {
			Logger.error('Error validating file: no response', false, err)

			emit('error', [t('other.uploader.fileUploadError')])
		}
		else if (err.message) {
			emit('error', [err.message])
		}
	}
	finally {
		processing.value = false
	}
}

onMounted(() => {
	upload()
})

watch(percent, () => {
	const interval = setInterval(() => {
		if (current.value < percent.value) {
			current.value += 1
		}
		else {
			clearInterval(interval)
		}
	}, 1)
})
</script>
