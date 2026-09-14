<template>
  <AuthLayout>
    <ElForm
      ref="formRef"
      :model="model"
      :rules="rules"
      @submit.prevent="onSubmit"
    >
      <h1 class="_headline mb-8">
        {{ t('signUpPartner.partnerSignUp') }}
      </h1>

      <ElFormItem prop="email">
        <ElInput
          size="large"
          :placeholder="t('placeholder.email')"
          :disabled="sending || success"
          v-model="model.email"
        />
      </ElFormItem>

      <ElFormItem prop="name">
        <ElInput
          size="large"
          :placeholder="t('placeholder.contactPerson')"
          :disabled="sending || success"
          v-model="model.name"
        />
      </ElFormItem>

      <ElFormItem prop="phone">
        <ElInput
          size="large"
          :placeholder="t('placeholder.phoneNumber')"
          :disabled="sending || success"
          v-model="model.phone"
        />
      </ElFormItem>

      <ElFormItem prop="company">
        <ElInput
          size="large"
          :placeholder="t('placeholder.companyName')"
          :disabled="sending || success"
          v-model="model.company"
        />
      </ElFormItem>

      <ElButton
        class="w-full"
        size="large"
        native-type="submit"
        :disabled="success"
        :loading="sending"
        :type="success ? 'success' : 'primary'"
      >
        <span class="_text-m-bold">{{ submitButtonText }}</span>
      </ElButton>

      <ElAlert
        v-if="success"
        :type="'success'"
        :closable="false"
      >
        <div
          class="_text-m-regular text-black"
          v-html="t('signUpPartner.successMsg')"
        />
      </ElAlert>

      <p
        class="_text-s-regular mt-4 text-gray"
        v-html="termsAndPolicyText"
      />
    </ElForm>

    <div class="mt-8 text-center">
      <router-link
        class="no-underline"
        :to="{name: RouteName.PARTNER_SIGNIN}"
      >
        <TextLink>
          {{ t('signUpPartner.partnerSignIn') }}
        </TextLink>
      </router-link>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import type { ErrorMessage } from '@/core/types'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { email, phoneNumber, required } from '@/core/validators'
import { TextLink } from '@/components'
import { ElAlert,ElButton, ElForm, ElFormItem, ElInput } from '@/components/element-plus'
import { AuthLayout } from '@/modules/Auth/components/layouts'
import { RouteName } from '@/modules/Auth/router'
import { partnerSignup } from '@/modules/Auth/views/SignupPartner/api'
import { messages } from '@/modules/Auth/views/SignupPartner/locales'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()

const isValidPhone = ref(true)
const sending = ref(false)
const success = ref(false)

const submitButtonText = computed(() => {
	if (sending.value) {
		return t('button.send.pending')
	}
	if (success.value) {
		return t('button.requestHasBeenSent')
	}
	return t('button.send.static')
})

const termsAndPolicyText = computed(() => {
	const terms = t('links.terms')
	const privacy = t('links.privacy')

	return t('signUpPartner.termsAndPolicy', { terms, privacy })
})

interface RuleForm {
	email: string
	name: string
	phone: string
	company: string
	domain: string
}

const rules = reactive<FormRules<RuleForm>>({
	email: [ required, email ],
	name: [ required ],
	phone: [ required, phoneNumber(isValidPhone.value) ],
	company: [ required ],
})

const formRef = ref<FormInstance>()

const model = reactive<RuleForm>({
	email: '',
	name: '',
	phone: '',
	company: '',
	domain: '',
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

		const res = await partnerSignup({
			...model,
			domain: appStore.domain?.name as string,
		})

		if (!res?.status) {
			Logger.error('Error on when signing up')
			return
		}

		success.value = true
	}
	catch (err) {
		Logger.error('Error on when signing up', true, err)
	}
	finally {
		sending.value = false
	}
}
</script>

<style lang="scss" scoped>
.el-alert {
	@apply mt-4;

	:deep(.el-alert__content) {
		padding: 0;
	}
}
</style>
