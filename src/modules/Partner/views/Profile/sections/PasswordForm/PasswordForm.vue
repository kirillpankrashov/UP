<template>
  <ElForm
    ref="formRef"
    :model="model"
    :rules="rules"
    :label-position="'top'"
    :validate-on-rule-change="false"
    @submit.prevent="onSubmit"
    class="w-full max-w-[460px]"
  >
    <ElFormItem
      prop="current"
      :label="t('placeholder.currentPassword')"
    >
      <ElInput
        size="large"
        :placeholder="t('placeholder.currentPassword')"
        v-model="model.current"
        type="password"
        show-password
      />
    </ElFormItem>

    <ElFormItem
      prop="password"
      :label="t('placeholder.newPassword')"
    >
      <ElInput
        size="large"
        :placeholder="t('placeholder.newPassword')"
        v-model="model.password"
        type="password"
        show-password
      />
    </ElFormItem>

    <ElFormItem
      prop="passwordConfirmation"
      :label="t('placeholder.repeatPassword')"
    >
      <ElInput
        size="large"
        :placeholder="t('placeholder.repeatPassword')"
        v-model="model.passwordConfirmation"
        type="password"
        show-password
      />
    </ElFormItem>

    <div class="mt-8">
      <ElButton
        class="w-full sm:max-w-[220px]"
        :type="success ? 'success' : 'primary'"
        size="large"
        native-type="submit"
        :disabled="sending || success"
        :loading="sending || success"
      >
        <span class="_text-m-bold">{{ submitButtonText }}</span>
      </ElButton>
    </div>
  </ElForm>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { required } from '@/core/validators'
import {
	ElButton,
	ElForm,
	ElFormItem,
	ElInput,
} from '@/components/element-plus'
import type { IChangePasswordData } from '@/modules/Partner/views/Profile/api'
import { messages } from '@/modules/Partner/views/Profile/locales'
import { usePartnerStore } from '@/modules/Partner/views/Profile/store'

const { t } = useLocale<typeof messages>(messages)

const profileStore = usePartnerStore()

const sending = ref(false)
const success = ref(false)
const formRef = ref<FormInstance>()

const model = reactive<IChangePasswordData>({
	current: '',
	password: '',
	passwordConfirmation: '',
})

const rules = computed<FormRules<IChangePasswordData>>(() => ({
	current: [required],
	password: [required],
	passwordConfirmation: [required],
}))

const submitButtonText = computed(() => {
	if (sending.value) {
		return t('button.saving')
	}
	if (success.value) {
		return t('button.passwordChanged')
	}
	return t('button.save')
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

		await profileStore.changePassword(model)

		Object.assign(model, {
			current: '',
			password: '',
			passwordConfirmation: '',
		})

		await formRef.value.clearValidate()

		success.value = true
		setTimeout(() => {
			success.value = false
		}, 3000)

		Logger.info('Password changed successfully')
	}
	catch (err) {
		Logger.error('Error changing password', true, err)
	}
	finally {
		sending.value = false
	}
}

defineExpose({
	model,
})
</script>
