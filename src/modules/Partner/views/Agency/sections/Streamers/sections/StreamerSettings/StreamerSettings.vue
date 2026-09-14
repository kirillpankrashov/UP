<template>
  <div
    data-name="partner-agency-streamer-settings"
    data-test="partner-agency-streamer-settings"
  >
    <ElDrawer
      v-model="streamersStore.settingsSidebarVisible"
      :before-close="onClose"
      :title="t('creators.settings.title')"
      direction="rtl"
      ref="drawer"
      :size="'560px'"
    >
      <StreamerSettingsSkeleton v-if="streamersStore.isFetchingStreamerInfo" />

      <div v-else-if="streamersStore.streamerInfo && agencyStore.data">
        <ElForm
          v-if="agencyStore.data"
          ref="formRef"
          :label-position="'top'"
          :model="model"
          :rules="rules"
          :validate-on-rule-change="false"
          scroll-to-error
          :scroll-into-view-options="{ behavior: 'smooth', block: 'center' }"
          :disabled="sending"
          @submit.prevent="onSubmit"
        >
          <h4 class="_text-m-bold mb-2">
            {{ t('creators.settings.custom.headline') }}
          </h4>

          <p class="_text-m-regular mb-6">
            {{ t('creators.settings.custom.descr', { streamer: streamersStore.selectedStreamer?.name || '' }) }}
          </p>

          <div class="mb-8 grid grid-cols-2 items-end gap-4">
            <DashboardSubsection :title="t('creators.creatorsPayout.cpaLabel')">
              <CostInputs
                v-model="model"
                :disabled="!isAdmin"
                :currency-sign="currencySign"
                :streamer="streamersStore.streamerInfo"
                cpm-field="internalCpm"
                cpa-field="internalCpa"
                cpc-field="internalCpc"
              />
            </DashboardSubsection>

            <DashboardSubsection
              v-if="agencyStore.data.streamersParticipate"
              :title="t('creators.creatorsPayout.darkMarketLabel')"
            >
              <CostInputs
                v-model="model"
                :disabled="!isAdmin"
                :currency-sign="currencySign"
                :streamer="streamersStore.streamerInfo"
                cpm-field="externalCpm"
                cpa-field="externalCpa"
                cpc-field="externalCpc"
              />
            </DashboardSubsection>
          </div>

          <h4 class="_text-m-bold mb-6">
            {{ t('creators.settings.darkMarket.headline') }}
          </h4>

          <div
            class="mb-8 grid grid-cols-2 items-end gap-4"
            v-if="agencyStore.data.streamersParticipate && agencyStore.data.useDarkMarket"
          >
            <DashboardSubsection :title="t('creators.creatorsPayout.cpaLabel')">
              <CostInputs
                v-model="model"
                :disabled="!isAdmin"
                :currency-sign="currencySign"
                :streamer="streamersStore.streamerInfo"
                cpm-field="darkMarketInternalCpm"
                cpa-field="darkMarketInternalCpa"
                cpc-field="darkMarketInternalCpc"
              />
            </DashboardSubsection>

            <DashboardSubsection :title="t('creators.creatorsPayout.darkMarketLabel')">
              <CostInputs
                v-model="model"
                :disabled="!isAdmin"
                :currency-sign="currencySign"
                :streamer="streamersStore.streamerInfo"
                cpm-field="darkMarketExternalCpm"
                cpa-field="darkMarketExternalCpa"
                cpc-field="darkMarketExternalCpc"
              />
            </DashboardSubsection>
          </div>

          <ElButton
            class="mt-8 w-full sm:max-w-[220px]"
            :type="success ? 'success' : 'primary'"
            size="large"
            :disabled="sending || success"
            :loading="sending || success"
            :native-type="'submit'"
          >
            <span class="_text-m-bold">{{ sending ? t('button.send.pending') : t('button.save') }}</span>
          </ElButton>
        </ElForm>
      </div>
    </ElDrawer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import { AdFormat, CurrencyIcon, type TCPM } from '@/core/types'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { useDictStore } from '@/core/store'
import { zeroOrPositive } from '@/core/validators'
import { ElButton, ElDrawer, ElForm } from '@/components/element-plus'
import { DashboardSubsection } from '@/components/layouts'
import type { IStreamerInfo } from '@/modules/Partner/views/Agency/api'
import { CostInputs } from '@/modules/Partner/views/Agency/components'
import { EDITABLE_FORMATS } from '@/modules/Partner/views/Agency/consts/formats'
import { messages } from '@/modules/Partner/views/Agency/locales'
import { useAgencyStore, useAgencyStreamersStore } from '@/modules/Partner/views/Agency/store'
import { usePartnerStore } from '@/modules/Partner/views/Profile/store'

import StreamerSettingsSkeleton from './StreamerSettingsSkeleton.vue'

const { t } = useLocale<typeof messages>(messages)

const streamersStore = useAgencyStreamersStore()
const agencyStore = useAgencyStore()
const partnerStore = usePartnerStore()
const dictStore = useDictStore()

const currencies = computed(() => dictStore.all?.currencies || [])
const currencySign = computed(() => {
	const currency = currencies.value.find(currency => currency.id === agencyStore.data?.wallet.currency)
	return currency?.icon || CurrencyIcon.USD as CurrencyIcon
})

const isAdmin = computed(() => partnerStore.profile?.roleExtended)

const onClose = () => {
	streamersStore.settingsSidebarVisible = false
	streamersStore.streamerInfo = null
	streamersStore.streamerId = null
}

const formRef = ref<FormInstance>()

const sending = ref(false)
const success = ref(false)

interface IStreamerModel {
	cpm: TCPM
}

const rules = computed<FormRules<IStreamerModel>>(() => {
	const rulesObj: FormRules<{ cpm: TCPM }> = {}

	Object.values(AdFormat).forEach((format) => {
		const formatKey = format.toLowerCase()
		;(rulesObj as any)[`cpm.internalCpm.${formatKey}`] = [zeroOrPositive]
		;(rulesObj as any)[`cpm.externalCpm.${formatKey}`] = [zeroOrPositive]
		;(rulesObj as any)[`cpm.darkMarketInternalCpm.${formatKey}`] = [zeroOrPositive]
		;(rulesObj as any)[`cpm.darkMarketExternalCpm.${formatKey}`] = [zeroOrPositive]
	})

	rulesObj['cpm.darkMarketExternalCpa'] = [zeroOrPositive]
	rulesObj['cpm.darkMarketExternalCpc'] = [zeroOrPositive]
	rulesObj['cpm.darkMarketInternalCpa'] = [zeroOrPositive]
	rulesObj['cpm.darkMarketInternalCpc'] = [zeroOrPositive]
	rulesObj['cpm.externalCpa'] = [zeroOrPositive]
	rulesObj['cpm.externalCpc'] = [zeroOrPositive]
	rulesObj['cpm.internalCpa'] = [zeroOrPositive]
	rulesObj['cpm.internalCpc'] = [zeroOrPositive]

	return rulesObj
})

const defaultCpm = Object.values(AdFormat)
	.filter((format) => EDITABLE_FORMATS.includes(format))
	.reduce((acc, format) => {
		acc[format as AdFormat] = null
		return acc
	}, {} as Record<AdFormat, number | null>)

const defaultModel: IStreamerModel = {
	cpm: {
		internalCpa: null,
		internalCpc: null,
		internalCpm: defaultCpm,
		externalCpa: null,
		externalCpc: null,
		externalCpm: defaultCpm,
		darkMarketInternalCpa: null,
		darkMarketInternalCpc: null,
		darkMarketInternalCpm: defaultCpm,
		darkMarketExternalCpa: null,
		darkMarketExternalCpc: null,
		darkMarketExternalCpm: defaultCpm,
	},
}

let model = reactive<IStreamerModel>({
	...defaultModel,
})

const dataToModel = (data: IStreamerInfo): IStreamerModel => {
	if (!data) return { ...defaultModel }

	return {
		cpm: data,
	}
}

const onSubmit = async () => {
	if (!formRef.value) return

	sending.value = true

	const isValid = await formRef.value.validate()

	if (!isValid) {
		Logger.error('Validation error')
		return
	}

	try {
		await streamersStore.updateStreamerInfo(model.cpm)

		success.value = true

		await new Promise((resolve) => setTimeout(resolve, 2000))

		success.value = false
	}
	catch(err) {
		Logger.error('Error saving streamer settings', true, err)
	}
	finally {
		sending.value = false
	}
}

const setFormData = (formData: IStreamerInfo | null) => {
	if (!formData) return

	const data = dataToModel(formData)

	Object.assign(model, data)
}

onMounted(() => {
	setFormData(streamersStore.streamerInfo)
})

watch(() => streamersStore.streamerInfo, (data) => {
	setFormData(data)
})
</script>
