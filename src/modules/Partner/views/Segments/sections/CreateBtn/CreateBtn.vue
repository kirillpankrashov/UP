<template>
  <div
    id="partner-segments-create-btn"
    data-name="partner-segments-create-btn"
  >
    <ElButton
      type="primary"
      @click="onClick"
    >
      <span class="_text-m-bold">{{ t('segments.createBtn') }}</span>
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { ElButton } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Segments/locales'
import { useSegmentsStore } from '@/modules/Partner/views/Segments/store'

const { t } = useLocale<typeof messages>(messages)

const segmentsStore = useSegmentsStore()

const onClick = () => {
	segmentsStore.segment.data = null
	segmentsStore.segment.formVisible = true
}
</script>
