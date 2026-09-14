<template>
  <ElDrawer
    :title="t('wallet.paymentServices.tochkaBank.form.title')"
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
        {{ t('wallet.paymentServices.tochkaBank.form.whyDoWeNeedThisData') }}
      </TextLink>
    </div>

    <div class="mb-8">
      <ElAlert
        show-icon
        class="items-start whitespace-pre-line bg-primary-50 p-3 sm:mt-6 sm:pr-16"
        :title="t('wallet.paymentServices.tochkaBank.employment.taxHintSelf')"
        :closable="false"
      />

      <div class="mt-6 whitespace-pre-line border-b border-gray pb-8">
        <div class="_text-m-regular mb-4">
          {{ t('wallet.paymentServices.tochkaBank.employment.selfRegisterHint') }}
        </div>

        <ElButton
          class="w-full sm:max-w-[220px]"
          size="large"
          type="primary"
          @click="openSelfRegLink"
        >
          <span class="_text-m-bold">{{ t('wallet.paymentServices.tochkaBank.employment.register') }}</span>
        </ElButton>
      </div>
    </div>

    <ElForm
      ref="formRef"
      :label-position="'top'"
      :model="model"
      :rules="rules"
      :disabled="sending || success"
      @submit.prevent="onSubmit"
    >
      <div class="_text-m-regular mb-4 whitespace-pre-line">
        {{ t('wallet.paymentServices.tochkaBank.employment.formHint') }}
      </div>

      <div class="grid sm:grid-cols-2 sm:gap-5">
        <ElFormItem
          prop="name"
          :label="t('placeholder.name')"
        >
          <ElInput
            size="large"
            :placeholder="t('placeholder.enterName')"
            v-model="model.name"
          />
        </ElFormItem>

        <ElFormItem
          prop="lastName"
          :label="t('placeholder.lastname')"
        >
          <ElInput
            size="large"
            :placeholder="t('placeholder.enterLastname')"
            v-model="model.lastName"
          />
        </ElFormItem>
      </div>

      <div class="grid sm:grid-cols-2 sm:gap-5">
        <ElFormItem
          prop="middleName"
          :label="t('placeholder.middlename')"
        >
          <ElInput
            size="large"
            :placeholder="t('placeholder.enterMiddlename')"
            v-model="model.middleName"
          />
        </ElFormItem>

        <ElFormItem
          size="large"
          prop="personalCode"
          :label="t('placeholder.inn')"
          :error="customInnError"
        >
          <ElInput
            size="large"
            placeholder="12345678912345"
            v-model="model.personalCode"
            type="number"
          />
        </ElFormItem>
      </div>

      <div class="grid sm:grid-cols-2 sm:gap-5">
        <ElFormItem
          prop="accountNumber"
          :label="t('placeholder.iban')"
        >
          <ElInput
            size="large"
            placeholder="1234567890123456"
            v-model="model.accountNumber"
            type="number"
          />
        </ElFormItem>

        <ElFormItem
          prop="routingNumber"
          :label="t('placeholder.bic')"
        >
          <ElInput
            size="large"
            placeholder="123456789"
            v-model="model.routingNumber"
            type="number"
          />
        </ElFormItem>
      </div>

      <div class="grid grid-cols-2 gap-x-6 sm:mt-6">
        <ElButton
          size="large"
          type="primary"
          native-type="submit"
          :loading="sending"
        >
          <span class="_text-m-bold">{{ t('button.save') }}</span>
        </ElButton>

        <div class="flex items-center">
          <div class="_text-s-regular mr-2">
            {{ t('wallet.paymentServices.tochkaBank.employment.status') }}
          </div>
          <ElTag
            :type="isSelfRegistered ? 'success' : 'warning'"
            size="small"
            round
          >
            <span class="font-bold uppercase">{{ isSelfRegistered ? t('wallet.paymentServices.tochkaBank.employment.registered') : t('wallet.paymentServices.tochkaBank.employment.notRegistered') }}</span>
          </ElTag>
        </div>
      </div>
    </ElForm>
  </ElDrawer>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { isEqual } from 'lodash'

import { type IStreamerWalletTochkaPayoutMethod, type ITochkaBankUser, PayoutService } from '@/core/types'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import {
	bankAccount,
	beginsWith,
	bic,
	cyrillic,
	inn,
	required,
} from '@/core/validators'
import { TextLink } from '@/components'
import {
	ElAlert,
	ElButton,
	ElDrawer,
	ElForm,
	ElFormItem,
	ElInput,
	ElTag,
} from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Wallet/locales'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

const { t } = useLocale<typeof messages>(messages)

const formVisible = ref(false)

const toggleFormVisibility = () => formVisible.value = !formVisible.value

const appStore = useAppStore()
const walletStore = useWalletStore()

const formRef = ref<FormInstance>()

const sending = ref(false)
const success = ref(false)

const isPayable = computed(() => walletStore.isPayable)
const payoutMethod = computed<IStreamerWalletTochkaPayoutMethod>(() => walletStore.payoutMethod as IStreamerWalletTochkaPayoutMethod)
const isSelfEmployed = computed(() => payoutMethod.value.payload.selfEmployed)
const isSelfRegistered = computed(() => isPayable.value && isSelfEmployed.value)
const customInnError = ref<string | undefined>(undefined)

let model = reactive<ITochkaBankUser>({
	name: '',
	lastName: '',
	middleName: '',
	personalCode: '',
	accountNumber: '',
	routingNumber: '',
	selfEmployed: true,
})

const rules = reactive<FormRules<ITochkaBankUser>>({
	name: [required, cyrillic],
	lastName: [required, cyrillic],
	middleName: [required, cyrillic],
	personalCode: [required, inn],
	accountNumber: [required, beginsWith('40817810'), bankAccount],
	routingNumber: [required, bic],
})

watch(payoutMethod, (method) => {
	if (!method) return

	if (isEqual(model, method.payload)) return

	customInnError.value = undefined
	model = {
		...method.payload,
		selfEmployed: true,
	}
}, { deep: true })

onMounted(() => {
	if (!payoutMethod.value) return

	model = payoutMethod.value.payload
})

const onSubmit = async () => {
	if (!formRef.value) return

	sending.value = true
	customInnError.value = undefined

	try {
		const isValid = await formRef.value.validate()

		if (!isValid) {
			Logger.error('Validation error')
			return
		}

		await walletStore.savePayoutMethod(PayoutService.TOCHKA_BANK, {
			...model,
			selfEmployed: true,
		})
		await walletStore.fetchWallet()

		success.value = true
		setTimeout(() => {
			success.value = false
			toggleFormVisibility()
		}, 3000)
	}
	catch(err: any) {
		if (err?.origin?.messages[0]?.code === 'PAYMENT_METHOD_TOCHKA_NOT_selfEmployed') {
			customInnError.value = t('validator.userInnNotFound') as string
		}
		Logger.error('Error saving payment data', true, err)
	}
	finally {
		sending.value = false
	}
}

const openSelfRegLink = () => {
	window.open('https://lk.yasam.biz/?id=goZOxy')
}

defineExpose({
	rules,
	toggleFormVisibility,
})
</script>
