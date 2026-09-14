<template>
  <DashboardSection
    data-name="partner-form-campaign-actions"
    class="absolute bottom-0 left-0 w-full"
    no-left
  >
    <div class="flex justify-between">
      <ElButton
        data-test="back-button"
        class="w-full max-w-[150px]"
        type="primary"
        size="large"
        plain
        :disabled="sending || success"
        @click="onBack"
      >
        <span class="_text-m-bold">{{ backButtonText }}</span>
      </ElButton>

      <ElButton
        data-test="next-button"
        class="w-full max-w-[150px]"
        :type="success ? 'success' : 'primary'"
        size="large"
        :disabled="nextButtonDisabled || sending || success"
        :loading="sending || success"
        @click="onNext"
      >
        <span class="_text-m-bold">{{ nextButtonText }}</span>
      </ElButton>
    </div>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useLocale } from '@/core/hooks'
import { ElButton } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { RouteName } from '@/modules/Partner/router'
import { messages } from '@/modules/Partner/views/FormCampaign/locales'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'
import { FormSection } from '@/modules/Partner/views/FormCampaign/types'

const props = defineProps<{
	sending: boolean
	success: boolean
}>()

const emit = defineEmits(['onReturn', 'onSubmit'])

const { t } = useLocale<typeof messages>(messages)

const route = useRoute()

const formCampaignStore = useFormCampaignStore()

const backButtonText = computed(() => {
	if (formCampaignStore.section === FormSection.TYPE) return t('button.cancel.static')
	if (formCampaignStore.section === FormSection.SETTINGS) return t('button.back.static')
	return '-'
})

const nextButtonText = computed(() => {
	if (formCampaignStore.section === FormSection.TYPE) return t('button.next.static')
	if (formCampaignStore.section === FormSection.SETTINGS) {
		if (props.success) return t('button.saveChanges.pending')
		if (props.sending) return t('button.send.pending')
		return t('button.save')
	}
	return '-'
})

const nextButtonDisabled = computed(() => {
	if (formCampaignStore.section === FormSection.TYPE) {
		return !formCampaignStore.currentCampaignType
	}

	return false
})

const onBack = () => {
	if (formCampaignStore.section === FormSection.TYPE || route.name === RouteName.CAMPAIGN_EDIT) {
		emit('onReturn')
	}
	else if (formCampaignStore.section === FormSection.SETTINGS) {
		formCampaignStore.section = FormSection.TYPE
	}
}

const onNext = () => {
	if (formCampaignStore.section === FormSection.TYPE) {
		formCampaignStore.section = FormSection.SETTINGS
	}
	else if (formCampaignStore.section === FormSection.SETTINGS) {
		emit('onSubmit')
	}
}
</script>
