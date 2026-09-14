<template>
  <DashboardSection
    id="streamer-link-linkname"
    data-name="streamer-link-linkname"
    data-test="streamer-link-linkname"
    :title="t('link.setup.link.title')"
    :no-border="true"
  >
    <ElForm
      ref="formRef"
      :model="model"
      :rules="rules"
      :label-position="'top'"
      @submit.prevent="() => onSubmit()"
    >
      <p class="_text-m-regular mb-6">
        {{ t('link.setup.link.description') }}
      </p>

      <ElFormItem
        class="relative"
        prop="linkName"
        :error="error.linkName"
      >
        <ElInput
          v-model="model.linkName"
          size="large"
          :minlength="LINK_NAME_MIN_LENGTH"
          :maxlength="LINK_NAME_MAX_LENGTH"
          :placeholder="placeholder"
        >
          <template #prefix>
            {{ linkUrl }}
          </template>
        </ElInput>

        <div class="absolute right-[5px] top-1/2 z-10 -translate-y-1/2 bg-white p-[5px]">
          <CopyLink
            :link="fullLink"
            :hide-label="true"
          />
        </div>
      </ElFormItem>

      <ElButton
        data-test="streamer-link-linkname-btn"
        type="primary"
        size="large"
        class="mt-4 w-full sm:max-w-[220px]"
        native-type="submit"
        :disabled="disabled"
        @click="() => onSubmit()"
      >
        <span class="_text-m-bold">{{ t('button.save') }}</span>
      </ElButton>
    </ElForm>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed, onMounted,reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { required } from '@/core/validators'
import { CopyLink } from '@/components'
import { ElButton, ElForm, ElFormItem, ElInput } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Link/locales'
import { useLinkProfileStore } from '@/modules/Streamer/views/Link/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

const LINK_NAME_MIN_LENGTH = 4
const LINK_NAME_MAX_LENGTH = 25

const { t } = useLocale<typeof messages>(messages)

const streamerStore = useStreamerStore()
const linkProfileStore = useLinkProfileStore()

const loading = computed(() => linkProfileStore.isLoadingData || linkProfileStore.isUpdatingData)

const formRef = ref<FormInstance>()

const model = reactive({
	linkName: '',
})

const placeholder = computed(() => streamerStore.profile?.userId?.toString() || '')
const linkUrl = computed(() => import.meta.env.VITE_APP_FREEMIUM_URL || 'https://uplify.link/')
const fullLink = computed(() => {
	if (!model.linkName) {
		return `${linkUrl.value}${placeholder.value}`
	}

	return `${linkUrl.value}${model.linkName}`
})

const sending = ref(false)
const success = ref(false)

const rules = reactive<FormRules>({
	linkName: [ required ],
})

const error = ref({
	linkName: '',
})

const disabled = computed(() => {
	if (
		loading.value ||
		model.linkName.length < LINK_NAME_MIN_LENGTH ||
		model.linkName.length > LINK_NAME_MAX_LENGTH ||
		!isNaN(Number(model.linkName)) ||
		model.linkName === linkProfileStore.profile?.linkName ||
		model.linkName === ''
	) {
		return true
	}

	return false
})

const onSubmit = async () => {
	if (!formRef.value) return

	sending.value = true

	try {
		const isValid = await formRef.value.validate()

		if (!isValid) {
			Logger.error('Validation error')
			return
		}

		await linkProfileStore.updateProfile({
			linkName: model.linkName,
		}, true)

		success.value = true
		setTimeout(() => {
			success.value = false
		}, 1500)
	}
	catch (err: any) {
		if (err?.origin?.response?.status === 409) {
			error.value.linkName = t('link.setup.link.errors.unique')
			return
		}
		error.value.linkName = t('link.setup.link.errors.general')
	}
	finally {
		sending.value = false
	}
}

onMounted(() => {
	if (linkProfileStore.profile?.linkName) {
		model.linkName = linkProfileStore.profile.linkName
	}
})

watch(linkProfileStore, (value) => {
	if (value.profile?.linkName && !loading.value) {
		model.linkName = value.profile.linkName
	}
})

defineExpose({
	disabled,
	success,
	model,
	error,
	onSubmit,
	rules,
})
</script>
