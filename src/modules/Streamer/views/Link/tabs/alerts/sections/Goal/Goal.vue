<template>
  <DashboardSection
    id="streamer-link-alerts-goal"
    data-name="streamer-link-alerts-goal"
    :title="t('link.alerts.goalAlert')"
  >
    <div class="_text-s-regular text-gray">
      {{ t('link.alerts.preview') }}
    </div>

    <div class="mb-6 mt-2 rounded bg-[#4d4d4d] p-4">
      <img
        class="w-full max-w-[260px]"
        src="@/assets/img/freemium/goal-alert.png"
      >
    </div>

    <ElFormItem>
      <template #label>
        {{ t('link.alerts.fields.supportAlertPosition.caption') }}
        <QuestionTooltip>
          <span class="_text-s-regular">{{ t('link.alerts.fields.supportAlertPosition.hint') }}</span>
        </QuestionTooltip>
      </template>

      <ElSelect
        v-model="modelValue.goalPosition"
        size="large"
      >
        <ElOption
          :label="t('link.widgetPosition.leftTop')"
          :value="LinkCardPosition.LEFT_TOP_CORNER"
        />
        <ElOption
          :label="t('link.widgetPosition.rightTop')"
          :value="LinkCardPosition.RIGHT_TOP_CORNER"
        />
        <ElOption
          :label="t('link.widgetPosition.leftBottom')"
          :value="LinkCardPosition.LEFT_BOTTOM_CORNER"
        />
        <ElOption
          :label="t('link.widgetPosition.rightBottom')"
          :value="LinkCardPosition.RIGHT_BOTTOM_CORNER"
        />
        <ElOption
          :label="t('link.widgetPosition.disabled')"
          :value="LinkCardPosition.DISABLED"
        />
      </ElSelect>
    </ElFormItem>
  </DashboardSection>
</template>

<script setup lang="ts">
import { type ILinkAlerts, LinkCardPosition } from '@/core/types/link'
import { useLocale } from '@/core/hooks'
import { QuestionTooltip } from '@/components'
import { ElFormItem, ElOption, ElSelect } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Link/locales'

const { t } = useLocale<typeof messages>(messages)

const modelValue = defineModel<ILinkAlerts>({
	required: true,
})
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>
