<template>
  <DashboardSection
    id="streamer-link-profile-telegram"
    data-name="streamer-link-profile-telegram"
    :title="t('link.profile.telegram.title')"
  >
    <ElForm
      ref="formRef"
      :model="model"
      :rules="rules"
      label-position="top"
      :disabled="sending || success"
      @submit.prevent="onSubmit"
    >
      <div
        class="_text-m-regular mb-6"
        v-html="t('link.profile.telegram.description')"
      />

      <div
        class="_text-m-bold mb-2"
        v-html="t('link.profile.telegram.input.title')"
      />

      <div
        class="_text-m-regular mb-4"
        v-html="t('link.profile.telegram.input.description')"
      />

      <ElFormItem
        prop="telegram"
        :label="t('link.profile.telegram.input.label')"
        :error="error.telegram"
      >
        <ElInput
          size="large"
          :minlength="TELEGRAM_MIN_LENGTH"
          :maxlength="TELEGRAM_MAX_LENGTH"
          :placeholder="t('link.profile.telegram.input.placeholder')"
          v-model="model.telegram"
          @input="formatInput"
        />
      </ElFormItem>

      <ElButton
        class="w-full sm:max-w-[220px]"
        size="large"
        :type="success ? 'success' : 'primary'"
        native-type="submit"
        :loading="sending"
        :disabled="disabled"
      >
        <span class="_text-m-bold">{{ t('button.save') }}</span>
      </ElButton>
    </ElForm>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

import type { ErrorMessage } from '@/core/types'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { required } from '@/core/validators'
import {
	ElButton,
	ElForm,
	ElFormItem,
	ElInput,
} from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Link/locales'
import { useLinkProfileStore } from '@/modules/Streamer/views/Link/store'

const { t } = useLocale<typeof messages>(messages)

const TELEGRAM_MIN_LENGTH = 5
const TELEGRAM_MAX_LENGTH = 32

const profileStore = useLinkProfileStore()

const loading = computed(() => profileStore.isLoadingData)

const formRef = ref<HTMLFormElement>()

const sending = ref(false)
const success = ref(false)

let model = reactive({
	telegram: '',
})

const rules = reactive({
	telegram: [required],
})

const error = ref({
	telegram: '',
})

const disabled = computed(() => {
	if (loading.value) {
		return true
	}

	if (model.telegram.length < TELEGRAM_MIN_LENGTH || model.telegram.length > TELEGRAM_MAX_LENGTH) {
		return true
	}

	if (model.telegram === profileStore.profile?.telegramChannel || model.telegram === '') {
		return true
	}

	return false
})

const formatInput = (value: string) => {
	model.telegram = value.replace(/[^a-zA-Z0-9@_-]/g, '')
}

const onSubmit = async () => {
	if (!formRef.value) return

	sending.value = true

	try {
		const isValid = await formRef.value.validate()

		if (!isValid) {
			Logger.error('Validation error')
			return
		}

		await profileStore.updateProfile({
			telegramChannel: model.telegram,
		})

		success.value = true
		setTimeout(() => {
			success.value = false
		}, 3000)
	}
	catch (err: any) {
		if (err?.origin.response?.status === 400) {
			error.value.telegram = t('link.profile.telegram.errors.invalidName')
			return
		}
		if (err?.origin.response?.status === 404) {
			error.value.telegram = t('link.profile.telegram.errors.channelExists')
			return
		}
		error.value.telegram = t('link.profile.telegram.errors.general')
	}
	finally {
		sending.value = false
	}
}

watch(profileStore, (value) => {
	if (value.profile?.telegramChannel && !loading.value && !model.telegram) {
		formatInput(value.profile.telegramChannel)
	}
})

defineExpose({
	model,
	disabled,
})
</script>
