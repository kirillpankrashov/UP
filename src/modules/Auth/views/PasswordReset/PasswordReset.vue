<template>
  <AuthLayout>
    <ElForm
      ref="formRef"
      :model="model"
      :rules="rules"
      @submit.prevent="onSubmit"
    >
      <h1 class="_headline mb-8">
        {{ t('passwordReset.title') }}
      </h1>

      <p
        class="_text-s-regular mb-4 text-dark-gray"
        v-html="t('passwordReset.description')"
      />

      <ElFormItem prop="email">
        <ElInput
          size="large"
          :placeholder="t('placeholder.email')"
          :disabled="sending || success"
          v-model="model.email"
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
    </ElForm>

    <div class="mt-8 text-center">
      <router-link
        class="no-underline"
        :to="{name: RouteName.AUTH_STREAMER }"
      >
        <TextLink>
          {{ t('passwordReset.partnerSignIn') }}
        </TextLink>
      </router-link>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { email, required } from '@/core/validators'
import { TextLink } from '@/components'
import { ElButton, ElForm, ElFormItem, ElInput } from '@/components/element-plus'
import { AuthLayout } from '@/modules/Auth/components/layouts'
import { RouteName } from '@/modules/Auth/router'
import { messages } from '@/modules/Auth/views/PasswordReset/locales'

import { requestNewPassword } from './api'

const { t } = useLocale<typeof messages>(messages)

const sending = ref(false)
const success = ref(false)

const submitButtonText = computed(() => {
	if (sending.value) {
		return t('button.recoverySent')
	}
	return t('button.recoverySend')
})

interface RuleForm {
	email: string
}

const rules = reactive<FormRules<RuleForm>>({
	email: [ email, required ],
})

const formRef = ref<FormInstance>()

const model = reactive<RuleForm>({
	email: '',
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

		await requestNewPassword(model)

		success.value = true
	}
	catch (err) {
		Logger.error('Error requesting new password', true, err)
	}
	finally {
		sending.value = false
	}
}
</script>
