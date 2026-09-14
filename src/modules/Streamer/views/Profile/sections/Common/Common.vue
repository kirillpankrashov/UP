<template>
  <DashboardSection id="profile-common">
    <template #left>
      <UserInfo />
    </template>

    <StreamerSettingsForm
      v-model="model"
      :is-edit-profile="true"
      @on-submit="onSubmit"
    >
      <template #after-language>
        <ElAlert
          :title="t('profile.form.howToChangeLanguage')"
          :closable="false"
          show-icon
        />
        <div class="my-6 h-px bg-light-gray" />
      </template>
    </StreamerSettingsForm>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'

import { DomainName } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { ElAlert } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import {
	type RuleForm,
	StreamerSettingsForm,
	type TProfileModel,
} from '@/components/StreamerSettingsForm'
import { messages } from '@/modules/Streamer/views/Profile/locales'
import { handleSubmit } from '@/modules/Streamer/views/Profile/sections/Common/helpers'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

import { UserInfo } from './components'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
const streamerStore = useStreamerStore()

const streamer = computed(() => streamerStore.profile)

const model = reactive<RuleForm>({
	domain: appStore.domain?.name || DomainName.UPLIFY,
	email: streamer.value?.email || '',
	language: streamer.value?.language || '',
	country: streamer.value?.country || '',
	gender: streamer.value?.gender || '',
	birthday: streamer.value?.birthday.toString() || '',
})

const onSubmit = async (cb: () => void) => {
	handleSubmit({
		model: model as TProfileModel,
		cb,
	})
}
</script>
