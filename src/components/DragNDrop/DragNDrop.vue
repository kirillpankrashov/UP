<template>
  <div class="uplify-drag-n-drop">
    <div
      class="uplify-drag-n-drop__container"
      :class="{'uplify-drag-n-drop__container_is-drag-over': isDragOver}"
      @dragover.prevent="isDragOver = false"
      @dragleave.prevent="isDragOver = false"
      @drop.prevent="drop"
    >
      <input
        ref="fileEl"
        class="uplify-drag-n-drop__input"
        :id="id"
        :accept="accepted"
        type="file"
        :multiple="multiple"
        @change="onChange"
      >

      <div class="uplify-drag-n-drop__content">
        <slot />
      </div>

      <label
        :for="id"
        ref="labelEl"
        class="uplify-drag-n-drop__label"
      >
        <ElButton
          size="large"
          type="primary"
          plain
          @click="labelEl?.click()"
        >
          <span class="_text-m-bold">{{ t('button.chooseFile.static') }}</span>
        </ElButton>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElButton } from '@/components/element-plus'

import { type IAcceptValues } from './types'

const { t } = useLocale({})

const emit = defineEmits(['change', 'error'])

const acceptValues: IAcceptValues = {
	image: 'image/png,image/jpeg,image/jpg,image/gif',
	video: 'video/mp4,video/webm',
	zip: 'zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed',
	all: '*/*',
}

acceptValues.unit = [
	acceptValues.image,
	acceptValues.video,
].join(',')

const props = withDefaults(defineProps<{
  multiple?: boolean
  accept: keyof IAcceptValues
  maxSizeMb: number
  displayMaxSizeMb?: number
}>(), {
	multiple: false,
	accept: 'all',
	displayMaxSizeMb: 100,
})

const fileEl = ref<InstanceType<typeof HTMLInputElement>>()
const labelEl = ref<InstanceType<typeof HTMLLabelElement>>()

const id = ref('uplify-drag-n-drop-' + Math.random())
const files = ref<FileList>()
const isDragOver = ref(false)

const maxBytes = computed(() => {
	if (props.maxSizeMb) {
		return props.maxSizeMb * 1000 * 1000
	}
	return Infinity
})

const accepted = computed(() => {
	if (props.accept in acceptValues) {
		return acceptValues[props.accept]
	}
	return props.accept
})

const update = () => {
	try {
		validate()
		emit('change', files.value)
	}
	catch (err) {
		emit('error', err)
	}
}

const onChange = () => {
	try {
		if (fileEl.value) {
			validate(fileEl.value.files as FileList)
			files.value = fileEl.value.files as FileList
			update()
		}
	}
	catch (err) {
		emit('error', err)
	}
}

const drop = (event: DragEvent) => {
	try {
		validate(event.dataTransfer?.files)
		isDragOver.value = false
		files.value = event.dataTransfer?.files as FileList
		update()
	}
	catch (err) {
		emit('error', err)
	}
}

const validate = (fileList: FileList | undefined = files.value) => {
	const errors: string[] = []

	if (!fileList) {
		return
	}

	if (!props.multiple && fileList.length > 1) {
		fileList = [fileList[0]] as unknown as FileList
	}

	Array.from(fileList).forEach(file => {
		if (accepted.value?.indexOf(file.type) === -1) {
			errors.push(t('files.errors.wrongExtension') as string)
		}

		if (file.size > maxBytes.value) {
			const fileSize = (file.size / 1000 / 1000).toFixed(2)
			const translateOpts = {
				name: file.name,
				size: fileSize,
				maxSize: props.maxSizeMb,
			}
			errors.push(t('files.errors.fileSize', translateOpts) as string)
		}
	})

	if (errors.length) {
		emit('error', errors)
	}
}
</script>

<style lang="scss" scoped>
.uplify-drag-n-drop {
  @apply w-full;

  &__container {
    @apply flex h-64 w-full flex-col items-center justify-center rounded bg-primary-50 text-center transition-all;

    &_is-drag-over {
      @apply border-primary shadow-sm shadow-primary;
    }
  }

  &__input {
    @apply invisible absolute h-0 w-0 opacity-0;
  }

  &__label {
    @apply mt-5;
  }
}
</style>
