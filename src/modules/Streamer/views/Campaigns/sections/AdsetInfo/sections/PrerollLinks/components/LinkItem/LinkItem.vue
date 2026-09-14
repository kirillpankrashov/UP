<template>
  <ElForm
    data-name="campaigns-info-preroll-link-item"
    :model="model"
    :rules="rules"
    valida
    @submit.prevent="submit"
  >
    <div class="flex gap-2">
      <ElFormItem
        class="!mb-0 w-full"
        prop="video"
        :error="errors.video"
      >
        <ElInput
          v-model="model.video"
          size="large"
          :disabled="vod.status === PrerollAdsetStatus.CONFIRMED"
        />
      </ElFormItem>

      <ElButton
        data-test="campaigns-info-preroll-link-item-save"
        class="w-[220px]"
        size="large"
        type="primary"
        :disabled="disabled"
        :loading="sending || success"
        native-type="submit"
      >
        <span class="_text-m-bold">{{ success ? t('button.saved') : t('button.save') }}</span>
      </ElButton>
    </div>
  </ElForm>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import type { FormItemRule, FormRules } from 'element-plus'

import { type IPrerollVod,PrerollAdsetStatus } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { isYoutubeUrl, required } from '@/core/validators'
import { Trigger } from '@/core/validators/consts/types'
import { ElButton, ElForm, ElFormItem, ElInput } from '@/components/element-plus'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'

const { t } = useLocale({})
const campaignsStore = useCampaignsStore()

type VOD = IPrerollVod | {
  id: null
  video: ''
  status: PrerollAdsetStatus.MISSING
}

const props = defineProps<{
  adsetSlug: string
  vod: VOD
  vods: VOD[]
}>()

const model = reactive<VOD>({
	id: null,
	video: '',
	status: PrerollAdsetStatus.MISSING,
})

const extractYoutubeId = (url: string) => {
	const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
	const match = url.match(regExp)
	return (match && match[7].length === 11) ? match[7] : false
}

const isUniqueVodVideo = (vods: VOD[]): FormItemRule => ({
	validator: (rule: any, value: any, callback: (error?: string | Error | undefined) => void) => {
		const alreadyExists = vods.find(vod => {
			const isSameId = extractYoutubeId(vod.video) === extractYoutubeId(value)

			return isSameId && vod.id !== model.id
		})

		if (alreadyExists) {
			return callback(new Error(t('validator.uniqueYoutubeUrl')))
		}

		callback()
	},
	trigger: [Trigger.Blur, Trigger.Change],
})

const rules = computed<FormRules>(() => ({
	video: [required, isYoutubeUrl, isUniqueVodVideo(props.vods)],
}))

const errors = reactive({
	video: '',
})

const success = ref(false)
const sending = ref(false)

const disabled = computed(() => {
	if (sending.value) return true

	if (props.vod.status === PrerollAdsetStatus.CONFIRMED) return true

	return false
})

const submit = async () => {
	try {
		sending.value = true

		const res = await campaignsStore.savePrerollVideo(model.id, { adsetSlug: props.adsetSlug, video: model.video })

		if (res?.status) {
			success.value = true
			setTimeout(() => {
				Object.assign(model, res.data)
				success.value = false
			}, 2000)
		}
	}
	finally {
		sending.value = false
	}
}

onMounted(() => {
	Object.assign(model, props.vod)
})

watch(props.vod, () => {
	Object.assign(model, props.vod)
})

defineExpose({
	model,
})
</script>
