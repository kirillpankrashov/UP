<template>
  <div
    data-name="partner-form-adset-schedule"
    class="grid grid-cols-2 gap-4"
  >
    <ElFormItem
      :label="t('adset.settings.form.schedule.startedAtLabel')"
      prop="dates.start"
    >
      <ElDatePicker
        data-test="partner-form-adset-schedule-start"
        :placeholder="placeholder.start"
        v-model="model.dates.start"
        size="large"
        type="date"
        format="DD.MM.YYYY"
        value-format="DD.MM.YYYY"
        :disabled-date="disableBefore"
        :picker-options="{
          disabledDate: disableBefore,
        }"
      />
    </ElFormItem>

    <ElFormItem
      :label="t('adset.settings.form.schedule.endedAtLabel')"
      prop="dates.end"
    >
      <ElDatePicker
        data-test="partner-form-adset-schedule-end"
        :placeholder="placeholder.end"
        v-model="model.dates.end"
        size="large"
        type="date"
        format="DD.MM.YYYY"
        value-format="DD.MM.YYYY"
        :disabled-date="disableAfter"
        :picker-options="{
          disabledDate: disableAfter,
        }"
      />
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'

import { useLocale } from '@/core/hooks'
import { ElDatePicker, ElFormItem } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

const model = defineModel<{
	dates: {
		start: string | undefined
		end: string | undefined
	}
}>({ required: true })

const { t } = useLocale<typeof messages>(messages)

const placeholder = computed(() => ({
	start: moment().format('DD.MM.YYYY'),
	end: moment().add(1, 'month').format('DD.MM.YYYY'),
}))

const disableBefore = computed(() => (date: Date) => {
	const today = moment().startOf('day').valueOf()
	const dateTime = date.getTime()

	// Блокируем даты до сегодня
	if (dateTime < today) return true

	// Если есть дата окончания — блокируем даты после неё
	if (model.value.dates.end) {
		return dateTime > moment(model.value.dates.end, 'DD.MM.YYYY').startOf('day').valueOf()
	}

	return false
})

const disableAfter = computed(() => (date: Date) => {
	const today = moment().startOf('day').valueOf()
	const dateTime = date.getTime()

	// Блокируем даты до сегодня
	if (dateTime < today) return true

	// Если есть дата начала — блокируем даты до неё
	if (model.value.dates.start) {
		return dateTime < moment(model.value.dates.start, 'DD.MM.YYYY').startOf('day').valueOf()
	}

	return false
})
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>
