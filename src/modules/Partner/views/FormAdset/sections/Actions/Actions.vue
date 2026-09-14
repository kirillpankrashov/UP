<template>
  <DashboardSection
    data-name="partner-form-adset-actions"
    data-test="adset-actions-root"
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
        @click="emit('onReturn')"
      >
        <span class="_text-m-bold">{{ backButtonText }}</span>
      </ElButton>

      <div class="grid grid-cols-2 gap-2">
        <ElButton
          v-if="isEdit"
          data-test="duplicate-button"
          class="w-[150px]"
          type="primary"
          size="large"
          :disabled="sending || success"
          :loading="sending || success"
          @click="onDuplicate"
        >
          <span class="_text-m-bold">{{ t('button.duplicate') }}</span>
        </ElButton>

        <div v-else />

        <ElButton
          data-test="next-button"
          class="w-[150px]"
          :type="success ? 'success' : 'primary'"
          size="large"
          :disabled="sending || success"
          :loading="sending || success"
          @click="emit('onSubmit')"
        >
          <span class="_text-m-bold">{{ nextButtonText }}</span>
        </ElButton>
      </div>
    </div>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useLocale } from '@/core/hooks'
import { ElButton } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { RouteName } from '@/modules/Partner/router'
import { messages } from '@/modules/Partner/views/FormAdset/locales'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'

const props = defineProps<{
	sending: boolean
	success: boolean
}>()

const { t } = useLocale<typeof messages>(messages)

const emit = defineEmits(['onReturn', 'onSubmit'])

const route = useRoute()
const router = useRouter()

const formAdsetStore = useFormAdsetStore()

const isEdit = computed(() => route.name === RouteName.ADSET_EDIT)

const onDuplicate = async () => {
	const adset = formAdsetStore.adset

	await router.push({
		name: RouteName.ADSET_CREATE,
		params: {
			campaignSlug: route.params.campaignSlug,
		},
	})

	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	})

	formAdsetStore.adset = adset
}

const backButtonText = computed(() => {
	return t('button.back.static')
})

const nextButtonText = computed(() => {
	if (props.success) return t('button.saveChanges.pending')
	if (props.sending) return t('button.send.pending')
	return t('button.save')
})
</script>
