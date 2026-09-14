<template>
  <DashboardSection
    id="streamer-link-profile-about"
    data-name="streamer-link-profile-about"
    class="relative"
    :title="t('link.profile.about.title')"
    :no-border="true"
  >
    <div
      class="_text-m-regular mb-8"
      v-html="t('link.profile.about.description')"
    />

    <ElForm
      ref="formRef"
      :model="model"
      :rules="rules"
      label-position="top"
      :disabled="sending || success"
      @submit.prevent="onSubmit"
    >
      <ElFormItem>
        <ElInput
          type="textarea"
          :autosize="{ minRows: 4 }"
          :maxlength="ABOUT_MAX_LENGTH"
          show-word-limit
          :placeholder="t('link.profile.about.placeholder')"
          v-model="model.about"
        />
      </ElFormItem>

      <div class="mb-8 mt-6">
        <div class="_text-s-regular mb-3">
          {{ t('link.profile.about.preview') }}
        </div>

        <div
          v-if="markup"
          class="break-all"
          v-html="markup"
        />
      </div>

      <ElButton
        class="w-full sm:max-w-[220px]"
        size="large"
        :type="success ? 'success' : 'primary'"
        native-type="submit"
        :loading="sending"
      >
        <span class="_text-m-bold">{{ success ? $t('button.saveChanges.success') : $t('button.saveChanges.static') }}</span>
      </ElButton>
    </ElForm>

    <Advice
      ref="adviceRef"
      id="streamer-link-profile-about-advice"
      class="sm:absolute sm:left-[calc(100%+24px)] sm:top-0"
      :title="t('link.profile.about.advice.title')"
      :label="t('link.profile.about.advice.label')"
    >
      <p
        class="_text-m-regular"
        v-html="t('link.profile.about.advice.description')"
      />
    </Advice>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import type { FormRules } from 'element-plus'
import { Converter } from 'showdown'
import { filterXSS } from 'xss'

import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { Advice } from '@/components'
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

const adviceRef = ref<InstanceType<typeof Advice> | null>(null)

const ABOUT_MAX_LENGTH = 1000

const profileStore = useLinkProfileStore()

const converter = new Converter({
	emoji: true,
	simpleLineBreaks: true,
	openLinksInNewWindow: true,
	headerLevelStart: 3,
	noHeaderId: true,
})

converter.addExtension(() => {
	return [{
		type: 'listener',
		listeners: {
			'headers.before': (_, text) => text.replace(/[#]{4,}/g, '###'),
		},
	}]
})

const formRef = ref<HTMLFormElement>()

const model = reactive({
	about: '',
})

const success = ref(false)
const sending = ref(false)

const rules = reactive<FormRules>({
	about: [],
})

const markup = computed(() => filterXSS(converter.makeHtml(model.about)))

const onSubmit = async () => {
	if (!formRef.value) return

	sending.value = true

	try {
		const isValid = await formRef.value.validate()

		if (!isValid) {
			Logger.error('Validation error')
			return
		}

		await profileStore.updateProfile({ about: model.about })

		success.value = true
		setTimeout(() => {
			success.value = false
		}, 3000)
	}
	catch (err) {
		Logger.error('Error saving about data', true, err)
	}
	finally {
		sending.value = false
	}
}

watch(profileStore, (value) => {
	if (value.profile?.about) {
		model.about = value.profile.about
	}
})

defineExpose({
	model,
	markup,
	onSubmit,
})
</script>

<!-- <style lang="scss">
@import './markdown.scss';
</style> -->
