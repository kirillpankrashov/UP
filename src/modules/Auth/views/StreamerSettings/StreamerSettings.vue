<template>
  <AuthLayout>
    <h1 class="_headline mb-8">
      {{ t('hi') }}, {{ streamer?.username }}&nbsp;👋!
    </h1>

    <StreamerSettingsForm
      v-model="model"
      :is-edit-profile="false"
      @on-submit="onSubmit"
    />
  </AuthLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { DomainName } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import {
	type RuleForm,
	StreamerSettingsForm,
	type TProfileModel,
} from '@/components/StreamerSettingsForm'
import { AuthLayout } from '@/modules/Auth/components/layouts'
import { useReferral, useRegisterParams } from '@/modules/Auth/hooks'
import {
	checkStreamerSettings,
	getStreamerReferral,
	handleSubmit,
} from '@/modules/Auth/views/StreamerSettings/helpers'
import { messages } from '@/modules/Auth/views/StreamerSettings/locales'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

const { t } = useLocale<typeof messages>(messages)

const router = useRouter()
const appStore = useAppStore()
const streamerStore = useStreamerStore()

const streamer = computed(() => streamerStore.profile)

const { getReferral } = useReferral()
const { getRegisterParams } = useRegisterParams()

const model = reactive<RuleForm>({
	domain: appStore.domain?.name || DomainName.UPLIFY,
	email: streamer.value?.email || '',
	language: streamer.value?.language || '',
	country: streamer.value?.country || '',
	gender: streamer.value?.gender || '',
	birthday: streamer.value?.birthday?.toString() || '',
})

const onSubmit = async (cb: () => void) => {
	if (!streamer.value) {
		return
	}

	handleSubmit({
		streamer: streamer.value,
		model: ({
			...model,
			...getStreamerReferral(getReferral),
			...getRegisterParams(),
		}  as unknown as TProfileModel),
		cb,
	})
}

onMounted(() => checkStreamerSettings(router, model))
</script>
