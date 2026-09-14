<template>
  <AuthLayout>
    <ElForm
      ref="formRef"
      :model="model"
      :rules="rules"
      @submit.prevent="onSubmit"
    >
      <h1 class="_headline mb-8">
        {{ t('passwordNew.title') }}
      </h1>

      <p
        class="_text-s-regular mb-4 text-dark-gray"
        v-html="t('passwordNew.description')"
      />

      <ElFormItem prop="password">
        <InputPassword
          size="large"
          :placeholder="t('placeholder.password')"
          :disabled="sending || success"
          v-model="model.password"
        />
      </ElFormItem>

      <ElFormItem prop="passwordConfirmation">
        <InputPassword
          size="large"
          :placeholder="t('placeholder.repeatPassword')"
          :disabled="sending || success"
          v-model="model.passwordConfirmation"
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

    <template v-if="success">
      <p class="_text-s-regular mt-4 text-dark-gray">
        {{ t('passwordNew.pageOpenIn') }} {{ t('helpers.inSeconds', timeout / 1000) }}
      </p>
      <p class="_text-s-regular text-dark-gray no-underline">
        <router-link :to="RouteName.PARTNER_SIGNIN">
          {{ t('passwordNew.openNow') }}
        </router-link>
      </p>
    </template>
  </AuthLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'

import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { required  } from '@/core/validators'
import { InputPassword } from '@/components'
import { ElButton, ElForm, ElFormItem } from '@/components/element-plus'
import { AuthLayout } from '@/modules/Auth/components/layouts'
import { RouteName } from '@/modules/Auth/router'
import { messages } from '@/modules/Auth/views/PasswordNew/locales'

import { resetPassword } from './api'

const { t } = useLocale<typeof messages>(messages)

const route = useRoute()
const router = useRouter()

const sending = ref(false)
const success = ref(false)

const timeout = ref(10000)

const submitButtonText = computed(() => {
	if (sending.value) {
		return t('passwordNew.successText')
	}
	return t('button.save')
})

interface RuleForm {
	token: string
	email: string
	password: string
	passwordConfirmation: string
}

const rules = reactive<FormRules<RuleForm>>({
	password: [ required ],
	passwordConfirmation: [ required ],
})

const formRef = ref<FormInstance>()

const model = reactive<RuleForm>({
	token: '',
	email: '',
	password: '',
	passwordConfirmation: '',
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

		await resetPassword({
			...model,
			token: route.query.token as string,
			email: route.query.email as string,
		})

		success.value = true

		const interval = setInterval(() => {
			timeout.value -= 1000

			if (timeout.value === 1000) {
				clearInterval(interval)
			}
		}, 1000)

		setTimeout(() => {
			router.push({ name: RouteName.PARTNER_SIGNIN })
		}, timeout.value)
	}
	catch (err) {
		Logger.error('Error resetting password', true, err)
	}
	finally {
		sending.value = false
	}
}

onMounted(() => {
	if (!route.query.token || !route.query.email) {
		router.push({ name: RouteName.PARTNER_SIGNIN })
	}
})
</script>
