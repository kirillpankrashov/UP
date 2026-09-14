<template>
  <div data-name="partner-form-campaign-uplify-pixel">
    <div class="_text-m-regular mb-6">
      {{ t('campaign.pixel.description') }}
    </div>

    <div class="_text-m-bold mb-2">
      {{ t('campaign.pixel.field.label') }}
    </div>

    <ElInput
      size="large"
      :value="pixel"
      :disabled="true"
    />

    <CopyLink
      class="mt-3"
      :link="pixel"
      :label="t('campaign.pixel.field.btn')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { CopyLink } from '@/components'
import { ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormCampaign/locales'

const { t } = useLocale<typeof messages>(messages)

const pixel = computed(() => {
	return '<img src="https://www.uplify.us/pixel/action?visit_id={{uplify_id}}">'
})

defineExpose({
	pixel,
})
</script>

<style lang="scss" scoped>
.el-input__inner {
	text-overflow: ellipsis;
	cursor: default;
}
</style>
