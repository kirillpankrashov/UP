<template>
  <DashboardSection
    id="streamer-link-alerts-supporters"
    data-name="streamer-link-alerts-supporters"
    :title="t('link.alerts.supportAlert')"
  >
    <div class="_text-s-regular text-gray">
      {{ t('link.alerts.preview') }}
    </div>

    <div class="mb-6 mt-2 rounded bg-[#4d4d4d] p-4">
      <img
        class="max-w-[323px]"
        src="@/assets/img/freemium/support-alert.png"
      >
    </div>

    <div class="grid grid-cols-2 gap-6">
      <ElFormItem>
        <template #label>
          <div :class="{'max-w-[150px]': appStore.appLocale === Locale.RU}">
            <span
              v-html="t('link.alerts.fields.messageDuration.caption')"
            />
            <QuestionTooltip>
              <span class="_text-s-regular">{{ t('link.alerts.fields.messageDuration.hint') }}</span>
            </QuestionTooltip>
          </div>
        </template>

        <ElSelect
          v-model="modelValue.supporterAlertDuration"
          size="large"
        >
          <ElOption
            label="10 sec"
            :value="10"
          />
          <ElOption
            label="15 sec"
            :value="15"
          />
        </ElSelect>
      </ElFormItem>

      <ElFormItem>
        <template #label>
          <div :class="{'max-w-[150px]': appStore.appLocale === Locale.RU}">
            <span
              v-html="t('link.alerts.fields.supportAlertPosition.caption')"
            />
            <QuestionTooltip>
              <span class="_text-s-regular">{{ t('link.alerts.fields.supportAlertPosition.hint') }}</span>
            </QuestionTooltip>
          </div>
        </template>

        <ElSelect
          v-model="modelValue.supporterAlertPosition"
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
    </div>
  </DashboardSection>
</template>

<script setup lang="ts">
import { Locale } from '@/core/types'
import { type ILinkAlerts,LinkCardPosition } from '@/core/types/link'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { QuestionTooltip } from '@/components'
import { ElFormItem, ElOption, ElSelect } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Link/locales'

const { t } = useLocale<typeof messages>(messages)

const modelValue = defineModel<ILinkAlerts>({
	required: true,
})

const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>
