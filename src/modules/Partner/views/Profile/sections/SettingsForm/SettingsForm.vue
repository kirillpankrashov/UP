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
      prop="name"
      :label="t('placeholder.name')"
    >
      <ElInput
        size="large"
        :placeholder="t('placeholder.name')"
        v-model="model.name"
      />
    </ElFormItem>

    <ElFormItem
      prop="company"
      :label="t('placeholder.companyName')"
    >
      <ElInput
        size="large"
        :placeholder="t('placeholder.companyName')"
        v-model="model.company"
      />
    </ElFormItem>

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

    <ElFormItem
      prop="currency"
      :label="t('placeholder.commonCurrency')"
    >
      <ElSelect
        size="large"
        :placeholder="t('placeholder.commonCurrency')"
        v-model="model.currency"
        disabled
      >
        <ElOption
          v-for="currency in currencies"
          :key="currency.id"
          :label="currency.title"
          :value="currency.id"
        />
      </ElSelect>
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
import { computed, onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import { CurrencyName, type TPartner } from '@/core/types'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { useDictStore } from '@/core/store'
import { email,required } from '@/core/validators'
import {
	ElButton,
	ElForm,
	ElFormItem,
	ElInput,
	ElOption,
	ElSelect,
} from '@/components/element-plus'
import type { IUpdateProfileData } from '@/modules/Partner/views/Profile/api'
import { messages } from '@/modules/Partner/views/Profile/locales'
import { usePartnerStore } from '@/modules/Partner/views/Profile/store'

const { t } = useLocale<typeof messages>(messages)

const dictStore = useDictStore()
const profileStore = usePartnerStore()

const sending = ref(false)
const formRef = ref<FormInstance>()
const success = ref(false)

const currencies = computed(() => dictStore.all?.currencies ?? [])

const model = reactive<IUpdateProfileData>({
	name: '',
	company: '',
	email: '',
	currency: CurrencyName.USD,
})

const rules = computed<FormRules<IUpdateProfileData>>(() => ({
	name: [required],
	company: [required],
	email: [required, email],
	currency: [],
}))

const submitButtonText = computed(() => {
	if (sending.value) {
		return t('button.saving')
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

		await profileStore.updateProfile(model)

		success.value = true
		setTimeout(() => {
			success.value = false
		}, 3000)
	}
	catch (err) {
		Logger.error('Error updating profile', true, err)
	}
	finally {
		sending.value = false
	}
}

const dataToModel = (profileData: TPartner) => {
	if (!profileData) {
		Object.assign(model, {
			name: '',
			company: '',
			email: '',
			currency: null,
		})
		return
	}

	Object.assign(model, {
		name: profileData.username,
		company: profileData.company,
		email: profileData.email,
		currency: profileData.currency,
	})
}

onMounted(() => {
	if (!profileStore.profile) return

	dataToModel(profileStore.profile)
})

// watch(profileStore.profile, (profileData) => {
// 	if (!profileData) return

// 	dataToModel(profileData)
// })

defineExpose({
	model,
})
</script>
