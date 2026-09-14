<template>
  <ElDrawer
    data-name="streamer-link-goal-form"
    :title="goal ? t('link.setup.goalForm.editTitle') : t('link.setup.goalForm.title')"
    :before-close="closeForm"
    v-model="formVisible"
    direction="rtl"
    :size="!appStore.isMobile ? '540px' : '100%'"
  >
    <ElForm
      ref="formRef"
      :model="model"
      :rules="rules"
      label-position="top"
      :disabled="sending || success"
      @submit.prevent="onSubmit"
    >
      <ElFormItem
        prop="title"
        :label="t('link.setup.goalForm.fields.title.caption')"
      >
        <ElInput
          size="large"
          :placeholder="t('link.setup.goalForm.fields.title.placeholder')"
          maxlength="60"
          show-word-limit
          v-model="model.title"
        />
      </ElFormItem>

      <ElFormItem prop="description">
        <template #label>
          {{ t('link.setup.goalForm.fields.description.caption') }}
          <QuestionTooltip>
            <p
              class="_text-s-regular"
              v-html="t('link.setup.goalForm.fields.description.hint')"
            />
          </QuestionTooltip>
        </template>

        <ElInput
          size="large"
          type="textarea"
          :placeholder="t('link.setup.goalForm.fields.description.placeholder')"
          maxlength="200"
          resize="none"
          show-word-limit
          :autosize="{ minRows: 3 }"
          v-model="model.description"
        />
      </ElFormItem>

      <div class="grid sm:grid-cols-2 sm:gap-5">
        <ElFormItem prop="total">
          <template #label>
            {{ t('link.setup.goalForm.fields.amount.caption') }}
            <QuestionTooltip>
              <p
                class="_text-s-regular"
                v-html="t('link.setup.goalForm.fields.amount.hint')"
              />
            </QuestionTooltip>
          </template>

          <ElInput
            size="large"
            placeholder="1000"
            type="number"
            v-model="model.total"
          />
        </ElFormItem>

        <ElFormItem prop="value">
          <template #label>
            {{ t('link.setup.goalForm.fields.progress.caption') }}
            <QuestionTooltip>
              <p
                class="_text-s-regular"
                v-html="t('link.setup.goalForm.fields.progress.hint')"
              />
            </QuestionTooltip>
          </template>

          <ElInput
            size="large"
            placeholder="20"
            v-model="model.start"
            type="number"
          />
        </ElFormItem>
      </div>

      <ElFormItem prop="publicTotal">
        <ElCheckbox v-model="model.isPublicTotal">
          {{ t('link.setup.goalForm.fields.publicAmount.caption') }}
          <QuestionTooltip>
            <p
              class="_text-s-regular"
              v-html="t('link.setup.goalForm.fields.publicAmount.hint')"
            />
          </QuestionTooltip>
        </ElCheckbox>
      </ElFormItem>

      <ElButton
        class="w-full sm:max-w-[220px]"
        size="large"
        :type="success ? 'success' : 'primary'"
        native-type="submit"
        :loading="sending"
      >
        <span class="_text-m-bold">{{ t('button.save') }}</span>
      </ElButton>
    </ElForm>
  </ElDrawer>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import type { FormRules } from 'element-plus'
import { cloneDeep, isEqual } from 'lodash'

import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { required } from '@/core/validators'
import { QuestionTooltip } from '@/components'
import {
	ElButton,
	ElCheckbox,
	ElDrawer,
	ElForm,
	ElFormItem,
	ElInput,
} from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Link/locales'
import { type GoalFormModel, useLinkSetupStore } from '@/modules/Streamer/views/Link/store'

const { t } = useLocale<typeof messages>(messages)

const formVisible = ref(false)

const closeForm = () => formVisible.value = false

const openForm = () => formVisible.value = true

enum Modes {
  CREATE = 'create',
  EDIT = 'edit'
}

const appStore = useAppStore()
const setupStore = useLinkSetupStore()

const goal = computed(() => setupStore.goal)

const mode = computed(() => goal.value ? Modes.EDIT : Modes.CREATE)

const formRef = ref<HTMLFormElement>()

const sending = ref(false)
const success = ref(false)

const initialModel = {
	title: '',
	description: '',
	start: null,
	total: null,
	isPublicTotal: false,
}

let model = reactive<GoalFormModel>(cloneDeep(initialModel))

const rules = reactive<FormRules<Partial<GoalFormModel>>>({
	title: [required],
	description: [required],
	total: [required],
})

watch(goal, (goalData) => {
	if (!goalData) {
		Object.assign(model, cloneDeep(initialModel))
		return
	}

	if (isEqual(model, goalData)) return

	Object.assign(model, cloneDeep(goalData))
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

		if (mode.value === Modes.CREATE) {
			await setupStore.createGoal(model)
		}
		else if (goal.value) {
			await setupStore.updateGoal(model)
		}

		success.value = true
		setTimeout(() => {
			success.value = false
			closeForm()
		}, 3000)
	}
	catch(err) {
		Logger.error('Error saving goal', true, err)
	}
	finally {
		sending.value = false
	}
}

defineExpose({
	formVisible,
	closeForm,
	openForm,
	rules,
	onSubmit,
	// model,
})
</script>
