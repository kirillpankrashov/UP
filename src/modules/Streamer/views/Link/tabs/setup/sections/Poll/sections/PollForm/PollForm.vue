<template>
  <ElDrawer
    data-name="streamer-link-poll-form"
    :title="poll ? t('link.setup.pollForm.editTitle') : t('link.setup.pollForm.title')"
    :before-close="closeForm"
    v-model="formVisible"
    direction="rtl"
    :size="!appStore.isMobile ? '540px' : '100%'"
  >
    <ElForm
      v-if="model.answers"
      ref="formRef"
      :model="model"
      :rules="rules"
      label-position="top"
      :disabled="sending || success"
      @submit.prevent="onSubmit"
    >
      <ElFormItem
        prop="question"
        :label="t('link.setup.pollForm.fields.question.caption')"
      >
        <ElInput
          size="large"
          :placeholder="t('link.setup.pollForm.fields.question.placeholder')"
          maxlength="140"
          show-word-limit
          v-model="model.question"
        />
      </ElFormItem>

      <div class="my-8 h-[1px] bg-light-gray" />

      <div class="_text-m-regular mb-6">
        <strong>{{ t('link.setup.pollForm.responsesTitle') }}</strong> {{ t('link.setup.pollForm.responsesTitleMin') }}
      </div>

      <ElFormItem
        v-for="index in MAX_ANSWERS"
        :key="index"
        :prop="model.answers[index - 1].answer"
        :label="t('link.setup.pollForm.fields.answer.caption') + index"
      >
        <ElInput
          size="large"
          maxlength="80"
          show-word-limit
          v-model="model.answers[index - 1].answer"
        />
      </ElFormItem>

      <div class="my-8 h-[1px] bg-light-gray" />

      <div class="grid sm:grid-cols-2 sm:gap-5">
        <ElFormItem
          prop="endCondition"
          :label="t('link.setup.pollForm.fields.condition.caption')"
        >
          <template #label>
            {{ t('link.setup.pollForm.fields.condition.caption') }}
            <QuestionTooltip>
              <p
                class="_text-s-regular"
                v-html="t('link.setup.pollForm.fields.condition.hint')"
              />
            </QuestionTooltip>
          </template>

          <ElRadioGroup
            size="large"
            v-model="model.endCondition"
          >
            <ElRadioButton label="duration">
              {{ t('link.setup.pollForm.fields.condition.duration') }}
            </ElRadioButton>

            <ElRadioButton label="votes">
              {{ t('link.setup.pollForm.fields.condition.maxVotes') }}
            </ElRadioButton>
          </ElRadioGroup>
        </ElFormItem>

        <ElFormItem
          v-if="model.endCondition === LinkPollEndCondition.DURATION"
          prop="duration"
          data-test="poll-form-duration-form-item"
        >
          <template #label>
            {{ t('link.setup.pollForm.fields.duration.caption') }}
            <QuestionTooltip>
              <p
                class="_text-s-regular"
                v-html="t('link.setup.pollForm.fields.duration.hint')"
              />
            </QuestionTooltip>
          </template>

          <ElInput
            size="large"
            type="number"
            min="5"
            max="43200"
            v-model="model.duration"
          />
        </ElFormItem>

        <ElFormItem
          v-if="model.endCondition === LinkPollEndCondition.VOTES"
          prop="votes"
          data-test="poll-form-votes-form-item"
        >
          <template #label>
            {{ t('link.setup.pollForm.fields.maxVotes.caption') }}
            <QuestionTooltip>
              <p
                class="_text-s-regular"
                v-html="t('link.setup.pollForm.fields.maxVotes.hint')"
              />
            </QuestionTooltip>
          </template>

          <ElInput
            size="large"
            type="number"
            min="5"
            v-model="model.maxVotes"
          />
        </ElFormItem>
      </div>

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

import { LinkPollEndCondition } from '@/core/types/link'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { positiveNum, required } from '@/core/validators'
import { QuestionTooltip } from '@/components'
import {
	ElButton,
	ElDrawer,
	ElForm,
	ElFormItem,
	ElInput,
	ElRadioButton,
	ElRadioGroup,
} from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Link/locales'
import { type PollFormModel, useLinkSetupStore } from '@/modules/Streamer/views/Link/store'

const { t } = useLocale<typeof messages>(messages)

const formVisible = ref(false)

const closeForm = () => formVisible.value = false

const openForm = () => formVisible.value = true

enum Modes {
  CREATE = 'create',
  EDIT = 'edit'
}

const MAX_ANSWERS = 5

const appStore = useAppStore()
const setupStore = useLinkSetupStore()

const poll = computed(() => setupStore.poll)

const mode = computed(() => poll.value ? Modes.EDIT : Modes.CREATE)

const formRef = ref<HTMLFormElement>()

const sending = ref(false)
const success = ref(false)

const initialModel = {
	question: '',
	answers: Array.from({ length: MAX_ANSWERS }, () => ({ answer: '' })),
	endCondition: LinkPollEndCondition.DURATION,
	maxVotes: 0,
	duration: 0,
	remainderDuration: 0,
}

let model = reactive<PollFormModel>(cloneDeep(initialModel))

const rules = reactive<FormRules<Partial<PollFormModel>>>({
	question: [required],
	endCondition: [required],
	duration: [positiveNum],
	maxVotes: [positiveNum],
	// TODO: добавить валидацию answers
})

watch(poll, (pollData) => {
	if (!pollData) {
		Object.assign(model, cloneDeep(initialModel))
		return
	}

	if (isEqual(model, pollData)) return

	Object.assign(model, cloneDeep(pollData))

	model.answers = [
		...model.answers,
		...Array.from({ length: MAX_ANSWERS - model.answers.length }, () => ({ answer: '' })),
	]
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

		const data = {
			...model,
			answers: model.answers.filter(answer => answer.answer !== ''),
		}

		if (mode.value === Modes.CREATE) {
			await setupStore.createPoll(data)
		}
		else if (poll.value) {
			await setupStore.updatePoll(data)
		}

		success.value = true
		setTimeout(() => {
			success.value = false
			closeForm()
		}, 3000)
	}
	catch(err) {
		Logger.error('Error saving poll', true, err)
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
	model,
	onSubmit,
})
</script>
