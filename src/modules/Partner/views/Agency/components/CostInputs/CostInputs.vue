<template>
  <div
    data-name="partner-agency-cost-inputs"
    data-test="partner-agency-cost-inputs"
    class="grid grid-cols-1 gap-4"
  >
    <div
      v-for="(value, format) in model.cpm[props.cpmField]"
      :key="`cpm.${props.cpmField}.${format}`"
      class="empty:hidden"
    >
      <ElFormItem
        v-if="EDITABLE_FORMATS.includes(format)"
        :label="t(`creators.creatorsPayout.fields.${format}`)"
        :prop="`cpm.${props.cpmField}.${format}`"
      >
        <ElInput
          v-model="model.cpm[props.cpmField]![format]"
          size="large"
          :placeholder="getCpmPlaceHolder(format)"
          :disabled="disabled"
        >
          <template #prefix>
            <span class="_text-m-regular text-gray">
              {{ currencySign }}
            </span>
          </template>
        </ElInput>
      </ElFormItem>
    </div>

    <ElFormItem
      :label="t(`creators.creatorsPayout.fields.cpc`)"
      :prop="`cpm.${props.cpcField}`"
    >
      <ElInput
        v-model="model.cpm[props.cpcField]"
        size="large"
        :placeholder="getCpcPlaceholder()"
        :disabled="disabled"
      >
        <template #prefix>
          <span class="_text-m-regular text-gray">
            {{ currencySign }}
          </span>
        </template>
      </ElInput>
    </ElFormItem>

    <ElFormItem
      :label="t(`creators.creatorsPayout.fields.cpa`)"
      :prop="`cpm.${props.cpaField}`"
    >
      <ElInput
        v-model="model.cpm[props.cpaField]"
        size="large"
        :placeholder="getCpaPlaceholder()"
        :disabled="disabled"
      >
        <template #prefix>
          <span class="_text-m-regular text-gray">
            {{ currencySign }}
          </span>
        </template>
      </ElInput>
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { AdFormat, CurrencyIcon, TCPM } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { useDictStore } from '@/core/store'
import { ElFormItem, ElInput } from '@/components/element-plus'
import type { IStreamerInfo } from '@/modules/Partner/views/Agency/api'
import { EDITABLE_FORMATS } from '@/modules/Partner/views/Agency/consts/formats'
import { messages } from '@/modules/Partner/views/Agency/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
	cpm: TCPM
}>({ required: true })

const props = defineProps<{
  disabled: boolean
  currencySign: CurrencyIcon
  streamer?: IStreamerInfo
	cpmField: keyof Pick<TCPM, 'internalCpm' | 'externalCpm' | 'darkMarketInternalCpm' | 'darkMarketExternalCpm'>
  cpaField: keyof Pick<TCPM, 'internalCpa' | 'externalCpa' | 'darkMarketInternalCpa' | 'darkMarketExternalCpa'>
  cpcField: keyof Pick<TCPM, 'internalCpc' | 'externalCpc' | 'darkMarketInternalCpc' | 'darkMarketExternalCpc'>
}>()

const dictStore = useDictStore()

const agenciesPayableCpm = computed(() => dictStore.campaigns?.agenciesPayableCpm)
const agenciesPayableCpa = computed(() => dictStore.campaigns?.agenciesPayableCpa || 0)
const agenciesPayableCpc = computed(() => dictStore.campaigns?.agenciesPayableCpc || 0)

const getCpmPlaceHolder = (format: AdFormat) => {
	if (!agenciesPayableCpm.value) return ''

	if (props.streamer) {
		const streamerPrice = props.streamer[props.cpmField]?.[format]

		if (streamerPrice) return parseFloat(streamerPrice.toString()).toFixed(2)
	}

	return parseFloat(agenciesPayableCpm.value?.[format]?.toString() || '0').toFixed(2)
}

const getCpaPlaceholder = () => {
	if (props.streamer) {
		const streamerPrice = props.streamer[props.cpaField]

		if (streamerPrice) return parseFloat(streamerPrice.toString()).toFixed(2)
	}

	return parseFloat( agenciesPayableCpa.value.toString()).toFixed(2)
}

const getCpcPlaceholder = () => {
	if (props.streamer) {
		const streamerPrice = props.streamer[props.cpcField]

		if (streamerPrice) return parseFloat(streamerPrice.toString()).toFixed(2)
	}

	return parseFloat(agenciesPayableCpc.value.toString()).toFixed(2)
}
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0 !important;
}
</style>
