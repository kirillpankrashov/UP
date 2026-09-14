<template>
  <DashboardSection
    data-name="partner-form-creative-actions"
    data-test="creative-actions-root"
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

      <ElButton
        data-test="next-button"
        class="w-full max-w-[150px]"
        :type="success ? 'success' : 'primary'"
        size="large"
        :disabled="sending || success"
        :loading="sending || success"
        @click="emit('onSubmit')"
      >
        <span class="_text-m-bold">{{ nextButtonText }}</span>
      </ElButton>
    </div>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElButton } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Partner/views/FormCreative/locales'

const props = defineProps<{
	sending: boolean
	success: boolean
}>()

const emit = defineEmits(['onReturn', 'onSubmit'])

const { t } = useLocale<typeof messages>(messages)

const backButtonText = computed(() => {
	return t('button.back.static')
})

const nextButtonText = computed(() => {
	if (props.success) return t('button.saveChanges.pending')
	if (props.sending) return t('button.send.pending')
	return t('button.save')
})
</script>
