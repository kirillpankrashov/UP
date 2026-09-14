<template>
  <ElDrawer
    :title="t('wallet.paymentServices.razorPay.form.title')"
    :before-close="toggleFormVisibility"
    v-model="formVisible"
    direction="rtl"
    :size="!appStore.isMobile ? '540px' : '100%'"
  >
    <div class="mb-8">
      <TextLink
        class="no-underline"
        :href="t('links.whyDoWeNeedThisData')"
        target="_blank"
      >
        {{ t('wallet.paymentServices.razorPay.form.whyDoWeNeedThisData') }}
      </TextLink>
    </div>

    <ElForm
      ref="formRef"
      :label-position="'top'"
      :model="model"
      :rules="rules"
      :validate-on-rule-change="false"
      :disabled="sending || success"
      @submit.prevent="onSubmit"
    >
      <div class="w-full sm:mb-6">
        <ElFormItem
          prop="fullName"
          :label="t('placeholder.fullname')"
        >
          <ElInput
            size="large"
            :placeholder="t('placeholder.fullname')"
            v-model="model.fullName"
          />
        </ElFormItem>
      </div>

      <div class="grid w-full sm:grid-cols-2 sm:gap-5">
        <ElFormItem
          prop="birthday"
          :label="t('placeholder.birthday')"
        >
          <ElDatePicker
            size="large"
            :placeholder="t('placeholder.selectDate')"
            type="date"
            format="DD.MM.YYYY"
            value-format="DD.MM.YYYY"
            v-model="model.birthday"
          />
        </ElFormItem>

        <ElFormItem
          prop="phone"
          :label="t('placeholder.phoneNumber')"
        >
          <ElInput
            size="large"
            :placeholder="t('placeholder.phoneNumber')"
            v-model="model.phone"
          />
        </ElFormItem>
      </div>

      <div class="w-full sm:mb-6">
        <ElFormItem
          prop="email"
          :label="t('placeholder.email')"
        >
          <ElInput
            size="large"
            :placeholder="t('placeholder.email')"
            v-model="model.email"
          />
        </ElFormItem>
      </div>

      <div class="w-full sm:mb-6">
        <ElFormItem
          prop="address"
          :label="t('placeholder.address')"
        >
          <ElInput
            size="large"
            :placeholder="t('placeholder.enterAddress')"
            v-model="model.address"
          />
        </ElFormItem>
      </div>

      <div class="grid w-full sm:grid-cols-2 sm:gap-5">
        <ElFormItem
          prop="numberIdentification"
          :label="t('placeholder.passportNumber')"
        >
          <ElInput
            size="large"
            :placeholder="t('placeholder.enterPassportNumber')"
            v-model="model.numberIdentification"
          />
        </ElFormItem>

        <ElFormItem
          prop="panCard"
          :label="t('placeholder.panCardNumber')"
        >
          <ElInput
            size="large"
            :placeholder="t('placeholder.enterPanCardNumber')"
            v-model="model.panCard"
          />
        </ElFormItem>
      </div>

      <div class="mb-6 w-full">
        <PanCardUploader />
      </div>

      <div class="mb-6 border-t border-gray" />

      <div class="w-full sm:mb-6">
        <ElFormItem
          prop="payoutMode"
          :label="t('placeholder.payoutMode')"
        >
          <ElSelect
            size="large"
            :placeholder="t('placeholder.choosePayoutMode')"
            v-model="model.payoutMode"
          >
            <ElOption
              v-for="item in payoutModes"
              :key="item"
              :value="item"
            />
          </ElSelect>
        </ElFormItem>
      </div>

      <div
        v-if="model.payoutMode === RazorPayPayoutMode.UPI"
        data-test="razor-pay-form-upi-fields"
        class="w-full sm:mb-6"
      >
        <ElFormItem
          prop="accountVpa"
          :label="t('placeholder.accountVpa')"
        >
          <ElInput
            size="large"
            placeholder="0123456789"
            v-model="model.accountVpa"
          />
        </ElFormItem>
      </div>

      <div
        v-else
        data-test="razor-pay-form-non-upi-fields"
        class="grid w-full sm:grid-cols-2 sm:gap-5"
      >
        <ElFormItem
          size="large"
          prop="bankIfsc"
          :label="t('placeholder.bankIFSC')"
        >
          <ElInput
            placeholder="ABCD0123456"
            v-model="model.bankIfsc"
          />
        </ElFormItem>

        <ElFormItem
          size="large"
          prop="beneficiaryAccountNumber"
          :label="t('placeholder.beneficiaryAccountNumber')"
        >
          <ElInput
            placeholder="0123456"
            v-model="model.beneficiaryAccountNumber"
          />
        </ElFormItem>
      </div>

      <ElButton
        class="mt-4 w-full sm:max-w-[220px]"
        size="large"
        type="primary"
        native-type="submit"
        :loading="sending"
      >
        <span class="_text-m-bold">{{ t('button.save') }}</span>
      </ElButton>
    </ElForm>
  </ElDrawer>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { isEqual } from 'lodash'

import { type IRazorPayUser,RazorPayPayoutMode } from '@/core/types'
import { PayoutService } from '@/core/types'
import type { IStreamerWalletRazorPayPayoutMethod } from '@/core/types/streamer-wallet'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { alphanumeric, required } from '@/core/validators'
import { TextLink } from '@/components'
import {
	ElButton,
	ElDatePicker,
	ElDrawer,
	ElForm,
	ElFormItem,
	ElInput,
	ElOption,
	ElSelect,
} from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Wallet/locales'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import { PanCardUploader } from './sections'

const { t } = useLocale<typeof messages>(messages)

const formVisible = ref(false)

const toggleFormVisibility = () => formVisible.value = !formVisible.value

const appStore = useAppStore()
const walletStore = useWalletStore()

const formRef = ref<FormInstance>()

let model = reactive<IRazorPayUser>({
	fullName: '',
	birthday: new Date(),
	phone: '',
	email: '',
	address: '',
	numberIdentification: '',
	panCard: '',
	panCardDoc: '',
	payoutMode: RazorPayPayoutMode.IMPS,
	accountVpa: '',
	beneficiaryAccountNumber: '',
	bankIfsc: '',
	documentType: '',
})

const sending = ref(false)
const success = ref(false)

const payoutMethod = computed<IStreamerWalletRazorPayPayoutMethod>(() => walletStore.payoutMethod as IStreamerWalletRazorPayPayoutMethod)
const payoutModes = computed(() => payoutMethod?.value?.dictionary?.payoutMode)

const rules = computed<FormRules<IRazorPayUser>>(() => {
	if (model.payoutMode === RazorPayPayoutMode.UPI) {
		return {
			fullName: [required],
			birthday: [required],
			phone: [required],
			email: [required],
			address: [required],
			payoutMode: [required],
			accountVpa: [required],
			panCard: [alphanumeric],
			documentType: [required],
		}
	}

	return {
		fullName: [required],
		birthday: [required],
		phone: [required],
		email: [required],
		address: [required],
		payoutMode: [required],
		bankIfsc: [required],
		beneficiaryAccountNumber: [required],
		panCard: [alphanumeric],
		documentType: [required],
	}
})

watch(payoutMethod, (method) => {
	if (!method) return

	if (isEqual(model, method.payload)) return

	model = method.payload
}, { deep: true })

onMounted(() => {
	if (!payoutMethod.value) return

	model = payoutMethod.value.payload
})

const onSubmit = async () => {
	if (!formRef.value) return

	sending.value = true

	try {
		const isValid = await formRef.value.validate()

		if (!isValid) {
			Logger.error('Validation error')
			return
		}

		await walletStore.savePayoutMethod(PayoutService.RAZOR_PAY, model)
		await walletStore.fetchWallet()

		success.value = true
		setTimeout(() => {
			success.value = false
			toggleFormVisibility()
		}, 3000)
	}
	catch(err) {
		Logger.error('Error saving payment data', true, err)
	}
	finally {
		sending.value = false
	}
}

defineExpose({
	formVisible,
	toggleFormVisibility,
	rules,
	model,
})
</script>
