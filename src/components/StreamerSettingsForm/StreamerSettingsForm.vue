<template>
  <ElForm
    id="streamer-settings-form"
    :class="{'labels-hidden': !isEditProfile}"
    ref="formRef"
    :model="modelValue"
    :label-position="'top'"
    :rules="rules"
    @submit.prevent="onSubmit"
  >
    <ElFormItem
      prop="language"
      :label="t('placeholder.translationLanguage')"
    >
      <ElSelect
        id="input-language"
        size="large"
        :placeholder="t('placeholder.translationLanguage')"
        :disabled="sending || success || isEditProfile"
        v-model="modelValue.language"
        filterable
      >
        <ElOption
          v-for="item in languages"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        />
      </ElSelect>
    </ElFormItem>

    <ElFormItem
      prop="country"
      :label="t('placeholder.country')"
    >
      <ElSelect
        id="input-country"
        size="large"
        :placeholder="t('placeholder.country')"
        :disabled="sending || success || isEditProfile"
        v-model="modelValue.country"
        filterable
      >
        <ElOption
          v-for="item in countries"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        />
      </ElSelect>
    </ElFormItem>

    <slot
      v-if="isEditProfile"
      name="after-language"
    />

    <ElFormItem
      prop="email"
      :label="t('placeholder.email')"
    >
      <ElInput
        size="large"
        :placeholder="t('placeholder.email')"
        :disabled="sending || success"
        v-model="modelValue.email"
      />
    </ElFormItem>

    <ElFormItem
      prop="gender"
      :label="t('placeholder.gender')"
    >
      <ElSelect
        id="input-gender"
        size="large"
        :placeholder="t('placeholder.gender')"
        :disabled="sending || success || isEditProfile"
        v-model="modelValue.gender"
        filterable
      >
        <ElOption
          v-for="item in genders"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        />
      </ElSelect>
    </ElFormItem>

    <ElFormItem
      prop="birthday"
      :label="t('placeholder.birthday')"
    >
      <ElInput
        size="large"
        :placeholder="t('placeholder.birthYear')"
        :disabled="sending || success"
        v-model="modelValue.birthday"
        type="number"
      />
    </ElFormItem>

    <div :class="{'grid gap-2 sm:grid-cols-2': isEditProfile}">
      <ElButton
        class="mt-4 w-full"
        size="large"
        native-type="submit"
        :disabled="success"
        :loading="sending"
        :type="success ? 'success' : 'primary'"
        plain
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
import { useDictStore } from '@/core/store'
import { birthYear, email, required } from '@/core/validators'
import { ElButton, ElForm, ElFormItem, ElInput, ElOption, ElSelect } from '@/components/element-plus'
import { messages } from '@/modules/Auth/views/StreamerSettings/locales'

import { type RuleForm } from './types/rule-form'

defineProps<{
	isEditProfile: boolean
}>()

const modelValue = defineModel<RuleForm>({
	required: true,
})

const emit = defineEmits(['onSubmit'])

const { t } = useLocale<typeof messages>(messages)

const dictStore = useDictStore()

const sending = ref(false)
const success = ref(false)

const submitButtonText = computed(() => {
	if (sending.value) {
		return t('button.saving')
	}
	if (success.value) {
		return t('button.saved')
	}
	return t('button.save')
})

const languages = computed(() => dictStore.all?.languages)
const countries = computed(() => dictStore.all?.countries)
const genders = computed(() => dictStore.all?.gender)

const rules = reactive<FormRules<RuleForm>>({
	domain: [ required ],
	email: [ required, email ],
	language: [ required ],
	country: [ required ],
	gender: [ required ],
	birthday: [ required, birthYear ],
})

const formRef = ref<FormInstance>()

const afterSend = () => sending.value = false

const onSubmit = async () => {
	if (!formRef.value) return

	sending.value = true

	try {
		const isValid = await formRef.value.validate()

		if (!isValid) {
			Logger.error('Validation error')
			return
		}

		emit('onSubmit', afterSend)

		success.value = true
	}
	catch(err) {
		Logger.error('Error updating profile', true, err)
	}
}
</script>

<style lang="scss" scoped>
	#streamer-settings-form.lebels-hidden {
		:deep(.el-form-item__label) {
			display: none;
		}
	}

</style>
