<template>
  <div
    data-name="agency-billing-form"
    data-test="agency-billing-form"
  >
    <FormSkeleton v-if="billingStore.isFetchingData" />

    <ElForm
      v-else
      ref="formRef"
      :label-position="'top'"
      :model="model"
      :rules="rules"
      :validate-on-rule-change="false"
      scroll-to-error
      :scroll-into-view-options="{ behavior: 'smooth', block: 'center' }"
      :disabled="sending || success"
      @submit.prevent="onSubmit"
    >
      <DashboardSection
        :title="t('creators.billing.companyInformation.title')"
        :no-border="true"
      >
        <ElFormItem
          :label="t('creators.billing.companyInformation.name.label')"
          prop="name"
        >
          <ElInput
            v-model="model.name"
            :placeholder="t('creators.billing.companyInformation.name.placeholder')"
            size="large"
            class="!mb-6"
          />
        </ElFormItem>

        <ElFormItem
          :label="t('creators.billing.companyInformation.email.label')"
          prop="email"
        >
          <ElInput
            v-model="model.email"
            size="large"
            class="!mb-6"
          />
        </ElFormItem>

        <ElFormItem
          :label="t('creators.billing.companyInformation.address.label')"
          prop="address"
        >
          <ElInput
            v-model="model.address"
            :placeholder="t('creators.billing.companyInformation.address.placeholder')"
            size="large"
            class="!mb-6"
          />
        </ElFormItem>

        <ElFormItem
          :label="t('creators.billing.companyInformation.phone.label')"
          prop="phone"
        >
          <ElInput
            v-model="model.phone"
            :placeholder="t('creators.billing.companyInformation.phone.placeholder')"
            size="large"
          />
        </ElFormItem>
      </DashboardSection>

      <DashboardSection
        :title="t('creators.billing.paymentDetails.title')"
        :no-border="true"
      >
        <ElFormItem
          :label="t('creators.billing.paymentDetails.bankName.label')"
          prop="bankName"
        >
          <ElInput
            v-model="model.bankName"
            :placeholder="t('creators.billing.paymentDetails.bankName.placeholder')"
            size="large"
            class="!mb-6"
          />
        </ElFormItem>

        <ElFormItem
          :label="t('creators.billing.paymentDetails.bankAccountName.label')"
          prop="bankAccountName"
        >
          <ElInput
            v-model="model.bankAccountName"
            :placeholder="t('creators.billing.paymentDetails.bankAccountName.placeholder')"
            size="large"
            class="!mb-6"
          />
        </ElFormItem>

        <ElFormItem
          :label="t('creators.billing.paymentDetails.bankAccountHolderAddress.label')"
          prop="bankAccountHolderAddress"
        >
          <ElInput
            v-model="model.bankAccountHolderAddress"
            :placeholder="t('creators.billing.paymentDetails.bankAccountHolderAddress.placeholder')"
            size="large"
            class="!mb-6"
          />
        </ElFormItem>

        <ElFormItem
          :label="t('creators.billing.paymentDetails.bankAddress.label')"
          prop="bankAddress"
        >
          <ElInput
            v-model="model.bankAddress"
            :placeholder="t('creators.billing.paymentDetails.bankAddress.placeholder')"
            size="large"
            class="!mb-6"
          />
        </ElFormItem>

        <ElFormItem
          :label="t('creators.billing.paymentDetails.bankAccountNumber.label')"
          prop="bankAccountNumber"
        >
          <ElInput
            v-model="model.bankAccountNumber"
            :placeholder="t('creators.billing.paymentDetails.bankAccountNumber.placeholder')"
            size="large"
            class="!mb-6"
          />
        </ElFormItem>

        <ElFormItem
          :label="t('creators.billing.paymentDetails.BIC.label')"
          prop="swiftCode"
        >
          <ElInput
            v-model="model.swiftCode"
            :placeholder="t('creators.billing.paymentDetails.BIC.placeholder')"
            size="large"
            class="!mb-6"
          />
        </ElFormItem>

        <ElFormItem
          :label="t('creators.billing.paymentDetails.routingNumber.label')"
          prop="routingNumber"
        >
          <ElInput
            v-model="model.routingNumber"
            :placeholder="t('creators.billing.paymentDetails.routingNumber.placeholder')"
            size="large"
          />
        </ElFormItem>
      </DashboardSection>

      <DashboardSection
        :no-border="true"
      >
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
      <!-- <Invoices
        v-loading="billingStore.isInvoicesData"
        :model="billingStore.invoices"
        :on-change="billingStore.getInvoices"
      /> -->
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { bic,email, phone, required, swift } from '@/core/validators'
import { ElButton, ElForm, ElFormItem, ElInput } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import type { IBilling } from '@/modules/Partner/views/Agency/api'
import { messages } from '@/modules/Partner/views/Agency/locales'
import { useBillingStore } from '@/modules/Partner/views/Agency/store'

import FormSkeleton from './FormSkeleton.vue'

const { t } = useLocale<typeof messages>(messages)

const billingStore = useBillingStore()

const formRef = ref<FormInstance>() 

const sending = ref(false)
const success = ref(false)

const rules = computed<FormRules<IBilling>>(() => ({
	name: [ required ],
	email: [ required, email ],
	address: [ required ],
	phone: [ phone, required ],
	bank_name: [ required ],
	bank_account_name: [ required ],
	bank_account_holder_address: [ required ],
	bank_address: [ required ],
	bank_account_number: [ required ],
	swift_code: [ required, swift ],
	routing_number: [ required, bic ],
}))

const defaultModel: IBilling = {
	name: '',
	email: '',
	address: '',
	phone: '',
	bankName: '',
	bankAccountName: '',
	bankAccountHolderAddress: '',
	bankAddress: '',
	bankAccountNumber: '',
	swiftCode: '',
	routingNumber: '',
}

let model = reactive<IBilling>({ ...defaultModel })

const dataToModel = (data: IBilling): IBilling => {
	if (!data) return { ...defaultModel }

	return {
		name: data.name,
		email: data.email,
		address: data.address,
		phone: data.phone,
		bankName: data.bankName,
		bankAccountName: data.bankAccountName,
		bankAccountHolderAddress: data.bankAccountHolderAddress,
		bankAddress: data.bankAddress,
		bankAccountNumber: data.bankAccountNumber,
		swiftCode: data.swiftCode,
		routingNumber: data.routingNumber,
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
		await billingStore.updateData(model)

		success.value = true

		await new Promise((resolve) => setTimeout(resolve, 2000))

		success.value = false
	}
	catch(err) {
		Logger.error('Error saving Brand Awareness campaign', true, err)
	}
	finally {
		sending.value = false
	}
}

const setFormData = (formData: IBilling | null) => {
	if (!formData) return

	const data = dataToModel(formData)

	Object.assign(model, data)
}

onMounted(async () => {
	setFormData(billingStore.billing)
})

watch(() =>billingStore.billing, (data) => {
	setFormData(data)
})
</script>
