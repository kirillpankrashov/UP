<template>
  <AgencySettingsSkeleton v-if="agencyStore.isFetchingData" />

  <ElForm
    v-else-if="agencyStore.data"
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
    <DashboardSection :title="t('creators.creatorsPayout.title')">
      <p class="_text-m-regular mb-6">
        {{ t('creators.creatorsPayout.description') }}
      </p>

      <ElFormItem :prop="'streamersParticipate'">
        <ElCheckbox v-model="model.streamersParticipate">
          {{ t('creators.creatorsPayout.thirdParty.checkbox') }}
          <QuestionTooltip>
            <p class="_text-m-bold">
              {{ t('creators.creatorsPayout.thirdParty.popover.label') }}
            </p>
            <p class="_text-s-regular break-normal text-left">
              {{ t('creators.creatorsPayout.thirdParty.popover.text') }}
            </p>
          </QuestionTooltip>
        </ElCheckbox>
      </ElFormItem>

      <div class="mb-6 grid grid-cols-2 gap-5">
        <div>
          <p class="_text-s-regular mb-2 inline-block">
            {{ t('creators.creatorsPayout.comission.label') }}&nbsp;
          </p>
          <QuestionTooltip>
            <p class="_text-m-bold">
              {{ t('creators.creatorsPayout.comission.popover.label') }}
            </p>
            <p class="_text-s-regular break-normal text-left">
              {{ t('creators.creatorsPayout.comission.popover.text') }}
            </p>
          </QuestionTooltip>

          <ElFormItem prop="commission">
            <ElInput
              size="large"
              v-model="model.commission"
              :disabled="!isAdmin"
            >
              <template #prefix>
                <span class="_text-m-regular text-gray">%</span>
              </template>
            </ElInput>
          </ElFormItem>
        </div>
      </div>

      <TextLink
        :href="t('creators.creatorsPayout.link.href')"
        target="_blank"
        class="no-underline"
      >
        {{ t('creators.creatorsPayout.link.text') }}
      </TextLink>

      <div class="mt-6 grid grid-cols-2 items-end gap-5">
        <DashboardSubsection
          :title="t('creators.creatorsPayout.cpaLabel')"
          class="!mb-6"
        >
          <CostInputs
            v-model="model"
            :currency-sign="agencyStore.data.wallet.icon"
            :disabled="!isAdmin"
            cpm-field="internalCpm"
            cpa-field="internalCpa"
            cpc-field="internalCpc"
          />
        </DashboardSubsection>

        <DashboardSubsection
          v-if="model.streamersParticipate"
          :title="t('creators.creatorsPayout.darkMarketLabel')"
          class="!mb-6"
        >
          <CostInputs
            v-model="model"
            :currency-sign="agencyStore.data.wallet.icon"
            :disabled="!isAdmin"
            cpm-field="externalCpm"
            cpa-field="externalCpa"
            cpc-field="externalCpc"
          />
        </DashboardSubsection>
      </div>

      <ElCheckbox
        v-model="model.useDarkMarket"
        :disabled="!model.streamersParticipate"
      >
        {{ t('creators.creatorsPayout.darkMarket.checkbox') }}
        <QuestionTooltip>
          <p class="_text-m-bold">
            {{ t('creators.creatorsPayout.darkMarket.popover.label') }}
          </p>
          <p class="_text-s-regular break-normal text-left">
            {{ t('creators.creatorsPayout.darkMarket.popover.text') }}
          </p>
        </QuestionTooltip>
      </ElCheckbox>

      <div
        v-if="model.streamersParticipate && model.useDarkMarket"
        class="mt-6 grid grid-cols-2 items-end gap-5"
      >
        <DashboardSubsection
          :title="t('creators.creatorsPayout.cpaLabel')"
          class="!mb-6"
        >
          <CostInputs
            v-model="model"
            :currency-sign="agencyStore.data.wallet.icon"
            :disabled="!isAdmin"
            cpm-field="darkMarketInternalCpm"
            cpa-field="darkMarketInternalCpa"
            cpc-field="darkMarketInternalCpc"
          />
        </DashboardSubsection>

        <DashboardSubsection
          :title="t('creators.creatorsPayout.darkMarketLabel')"
          class="!mb-6"
        >
          <CostInputs
            v-model="model"
            :currency-sign="agencyStore.data.wallet.icon"
            :disabled="!isAdmin"
            cpm-field="darkMarketExternalCpm"
            cpa-field="darkMarketExternalCpa"
            cpc-field="darkMarketExternalCpc"
          />
        </DashboardSubsection>
      </div>
    </DashboardSection>

    <DashboardSection
      :title="t('creators.categoriesStopList.title')"
      :no-border="true"
    >
      <p class="_text-m-regular mb-6">
        {{ t('creators.categoriesStopList.description') }}
      </p>

      <ElFormItem
        prop="ignoredCategories"
      >
        <ElSelect
          v-model="model.ignoredCategories"
          size="large"
          value-key="id"
          :placeholder="t('placeholder.chooseCategories')"
          multiple
          clearable
        >
          <ElOption
            v-for="item in categories"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </ElSelect>
      </ElFormItem>
    </DashboardSection>

    <DashboardSection :no-border="true">
      <ElButton
        class="w-full sm:max-w-[220px]"
        :type="success ? 'success' : 'primary'"
        size="large"
        :disabled="sending || success"
        :loading="sending || success"
        :native-type="'submit'"
      >
        <span class="_text-m-bold">{{ sending ? t('button.send.pending') : t('button.save') }}</span>
      </ElButton>
    </DashboardSection>
  </ElForm>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import { AdFormat } from '@/core/types'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { useDictStore } from '@/core/store'
import { required, zeroOrPositive } from '@/core/validators'
import { QuestionTooltip, TextLink } from '@/components'
import {
	ElButton,
	ElCheckbox,
	ElForm,
	ElFormItem,
	ElInput,
	ElOption,
	ElSelect,
} from '@/components/element-plus'
import { DashboardSection, DashboardSubsection } from '@/components/layouts'
import type { IAgency, IUpdateAgencyData } from '@/modules/Partner/views/Agency/api'
import { CostInputs } from '@/modules/Partner/views/Agency/components'
import { EDITABLE_FORMATS } from '@/modules/Partner/views/Agency/consts/formats'
import { messages } from '@/modules/Partner/views/Agency/locales'
import { useAgencyStore } from '@/modules/Partner/views/Agency/store'
import { usePartnerStore } from '@/modules/Partner/views/Profile/store'

import AgencySettingsSkeleton from './AgencySettingsSkeleton.vue'

const { t } = useLocale<typeof messages>(messages)

const dictStore = useDictStore()
const partnerStore = usePartnerStore()
const agencyStore = useAgencyStore()

const isAdmin = computed(() => partnerStore.profile?.roleExtended)

const categories = computed(() => dictStore.all?.campaignsCategories || [])

const formRef = ref<FormInstance>() 

const sending = ref(false)
const success = ref(false)

const rules = computed<FormRules<IUpdateAgencyData>>(() => {
	const rulesObj: FormRules<IUpdateAgencyData> = {}

	Object.values(AdFormat).forEach((format) => {
		const formatKey = format.toLowerCase()
		;(rulesObj as any)[`cpm.internalCpm.${formatKey}`] = [zeroOrPositive]
		;(rulesObj as any)[`cpm.externalCpm.${formatKey}`] = [zeroOrPositive]
		;(rulesObj as any)[`cpm.darkMarketInternalCpm.${formatKey}`] = [zeroOrPositive]
		;(rulesObj as any)[`cpm.darkMarketExternalCpm.${formatKey}`] = [zeroOrPositive]
	})

	rulesObj.commission = [zeroOrPositive]
	rulesObj.streamersParticipate = [required]
	rulesObj.useDarkMarket = [required]
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

const defaultModel: IUpdateAgencyData = {
	streamersParticipate: false,
	useDarkMarket: false,
	commission: null,
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
	ignoredCategories: [],
}

let model = reactive<IUpdateAgencyData>({
	...defaultModel,
})

const dataToModel = (data: IAgency): IUpdateAgencyData => {
	if (!data) return { ...defaultModel }

	return {
		streamersParticipate: data.streamersParticipate,
		useDarkMarket: data.useDarkMarket,
		commission: data.commission,
		cpm: data.cpm,
		ignoredCategories: data.ignoredCategories,
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
		await agencyStore.updateData(model)

		success.value = true

		await new Promise((resolve) => setTimeout(resolve, 2000))

		success.value = false
	}
	catch(err) {
		Logger.error('Error saving agency settings', true, err)
	}
	finally {
		sending.value = false
	}
}

const setFormData = (formData: IAgency | null) => {
	if (!formData) return

	const data = dataToModel(formData)

	Object.assign(model, data)
}

onMounted(() => {
	setFormData(agencyStore.data)
})

watch(() =>agencyStore.data, (data) => {
	setFormData(data)
})
</script>

<style>
.el-form-item {
	margin-bottom: 0 !important;
}
</style>
