<template>
  <DashboardSection
    v-if="widget && visible"
    id="settings-youtube-text-section"
    data-name="settings-youtube-text-section"
    data-test="settings-youtube-text-section"
    class="relative"
    :title="t('settings.youtubeText.title')"
  >
    <div class="_text-m-regular mb-2">
      <div class="mb-2">
        {{ t('settings.youtubeText.description') }}
      </div>
      <TextLink
        class="no-underline"
        target="_blank"
        href="t('settings.youtubeText.link.href')"
      >
        {{ t('settings.youtubeText.link.text') }}
      </TextLink>
    </div>

    <ElForm
      ref="formRef"
      :label-position="'top'"
      :model="settingsStore.youtubeText"
      :rules="rules"
    >
      <ElFormItem
        v-if="streamerStore.profile"
        class="!mb-4"
      >
        <ElCheckbox
          v-model="streamerStore.profile.youtubeTextActive"
          @change="onCheckboxChange"
          :disabled="settingsStore.youtubeText.sending"
        >
          {{ t('settings.youtubeText.allow.label') }}
        </ElCheckbox>
      </ElFormItem>

      <ElFormItem
        class="!mb-0"
        prop="blacklist"
      >
        <template #label>
          {{ t('settings.youtubeText.blacklist.label') }}
          <ElTooltip effect="light">
            <template #content>
              <div class="_text-s-regular max-w-[220px]">
                {{ t('settings.youtubeText.blacklist.hint') }}
              </div>
            </template>
            <HelpIcon class="inline-block h-4 w-4 fill-dark-gray" />
          </ElTooltip>
        </template>

        <ElInput
          data-test="settings-youtube-text-input"
          type="textarea"
          v-model="settingsStore.youtubeText.blacklist"
          @input="onBlackListChange"
          :disabled="!streamerStore.profile?.youtubeTextActive || settingsStore.youtubeText.sending"
          :autosize="{ minRows: 4 }"
        />
      </ElFormItem>
    </ElForm>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { ref } from 'vue'
import type { CheckboxValueType, FormInstance, FormRules } from 'element-plus'
import { debounce } from 'lodash'

import { Locale } from '@/core/types'
import { useLocale, useYoutube } from '@/core/hooks'
import { TextLink } from '@/components'
import { ElCheckbox, ElForm, ElFormItem, ElInput, ElTooltip } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import { blacklist } from './validators/blacklist'

import HelpIcon from '@/assets/img/icons/help-icon.svg'

const { t } = useLocale<typeof messages>(messages)
const { getYouTubeVideoId } = useYoutube()

const settingsStore = useSettingsStore()
const streamerStore = useStreamerStore()

const visible = computed(() => streamerStore.profile?.youtubeTextActive && streamerStore.profile.language === Locale.RU)

const formRef = ref<FormInstance>()

const rules = computed<FormRules>(() => {
	return {
		blacklist: [blacklist(t)],
	}
})

const widget = computed(() => settingsStore.widget)

const onCheckboxChange = debounce(async (value: CheckboxValueType) => {
	if (!formRef.value) return

	settingsStore.toggleYoutubeText(value as boolean)

	if (value) {
		settingsStore.fetchYoutubeTextBlackList()
	}
}, 2000)

const onBlackListChange = debounce(async (value: string) => {
	if (!formRef.value) return

	const isValid = await formRef.value.validate()

	if (!isValid) return

	const list = value
		.trim()
		.replaceAll('\n', ',')
		.split(',')
		.filter(url => !!url.trim())
		.map(url => getYouTubeVideoId(url))
		.join(',')

	settingsStore.updateYoutubeTextBlackList(list)
}, 2000)

onMounted(() => {
	if (!visible.value) return

	settingsStore.fetchYoutubeTextBlackList()
})
</script>
