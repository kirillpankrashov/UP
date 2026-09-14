<template>
  <AuthLayout>
    <ElForm
      ref="formRef"
      :model="model"
      :rules="rules"
      @submit.prevent="onSubmit"
    >
      <h1 class="_headline mb-8">
        {{ t('signinPartner.title') }}
      </h1>

      <ElFormItem prop="login">
        <ElInput
          id="input-login"
          size="large"
          :placeholder="t('placeholder.email')"
          :disabled="sending || success"
          v-model="model.login"
        />
      </ElFormItem>

      <ElFormItem prop="password">
        <ElInput
          id="input-password"
          size="large"
          type="password"
          :placeholder="t('placeholder.password')"
          :disabled="sending || success"
          v-model="model.password"
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

    <div class="mt-4">
      <router-link
        class="_text-s-regular text-gray no-underline hover:text-primary"
        :to="{name: RouteName.PASSWORD_RESET}"
      >
        {{ t('signinPartner.forgotPassword') }}
      </router-link>
    </div>

    <div class="_text-m-regular mt-8 text-center">
      {{ t('signinPartner.wannaLaunchAd') }}
      <br>
      <router-link
        class="no-underline"
        :to="{name: RouteName.PARTNER_SIGNUP}"
      >
        <TextLink>
          {{ t('signinPartner.contactUs') }}
        </TextLink>
      </router-link>
    </div>

    <div class="mt-4 border-t border-t-light-gray pt-4 text-center">
      <router-link
        class="no-underline"
        :to="{name: RouteName.AUTH_STREAMER }"
      >
        <TextLink>
          {{ t('signinPartner.streamerLogin') }}
        </TextLink>
      </router-link>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import { Role } from '@/core/types'
import { Logger, setToken } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { email, required } from '@/core/validators'
import { TextLink } from '@/components'
import { ElButton, ElForm, ElFormItem, ElInput } from '@/components/element-plus'
import { AuthLayout } from '@/modules/Auth/components/layouts'
import { RouteName } from '@/modules/Auth/router'
import { partnerSignin } from '@/modules/Auth/views/SigninPartner/api'
import { messages } from '@/modules/Auth/views/SigninPartner/locales'

const { t } = useLocale<typeof messages>(messages)

const sending = ref(false)
const success = ref(false)

const submitButtonText = computed(() => {
	if (sending.value) {
		return t('button.send.pending')
	}
	return t('button.signIn')
})

interface RuleForm {
	login: string
	password: string
}

const rules = reactive<FormRules<RuleForm>>({
	login: [ required, email ],
	password: [ required ],
})

const formRef = ref<FormInstance>()

const model = reactive<RuleForm>({
	login: '',
	password: '',
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

		const res = await partnerSignin(model)

		if (!res?.token) {
			Logger.error('Error on when signing in')
			return
		}

		setToken(res.token, Role.PARTNER)
		success.value = true
		window.location.href = '/'
	}
	catch (err) {
		Logger.error('Error on when signing in', true, err)
	}
	finally {
		sending.value = false
	}
}
</script>
