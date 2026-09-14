<!-- eslint-disable vue/no-v-model-argument -->
<template>
  <div v-if="model.quiz">
    <div class="relative flex gap-8">
      <div class="flex-1">
        <DashboardSection
          :title="t('creative.form.quiz.settings.title')"
        >
          <ElFormItem
            prop="quiz.quizStatus"
            class="!mb-2"
          >
            <div class="_text-m-bold mr-2">
              {{ t('creative.form.quiz.settings.quizStatus') }}
            </div>
            <ElSwitch
              v-model="model.quiz.quizStatus"
              active-text="On"
              inactive-text="Off"
              inline-prompt
              style="--el-switch-on-color: var(--el-color-success); --el-switch-off-color: var(--el-color-danger)"
            />
          </ElFormItem>

          <ElFormItem
            prop="quiz.correctAnswersVisible"
            class="!mb-2"
          >
            <div class="_text-m-bold mr-2">
              {{ t('creative.form.quiz.settings.correctAnswersVisible') }}
            </div>
            <ElSwitch
              v-model="model.quiz.correctAnswersVisible"
              active-text="On"
              inactive-text="Off"
              inline-prompt
              style="--el-switch-on-color: var(--el-color-success); --el-switch-off-color: var(--el-color-danger)"
            />
          </ElFormItem>

          <ElFormItem
            prop="quiz.paginationEnabled"
            class="!mb-2"
          >
            <div class="_text-m-bold mr-2">
              {{ t('creative.form.quiz.settings.paginationEnabled') }}
            </div>
            <ElSwitch
              v-model="model.quiz.paginationEnabled"
              active-text="On"
              inactive-text="Off"
              inline-prompt
              style="--el-switch-on-color: var(--el-color-success); --el-switch-off-color: var(--el-color-danger)"
            />
          </ElFormItem>

          <ElFormItem
            class="!mb-0"
            prop="quiz.resultsVisible"
          >
            <div class="_text-m-bold mr-2">
              {{ t('creative.form.quiz.settings.resultsVisible') }}
            </div>
            <ElSwitch
              v-model="model.quiz.resultsVisible"
              active-text="On"
              inactive-text="Off"
              inline-prompt
              style="--el-switch-on-color: var(--el-color-success); --el-switch-off-color: var(--el-color-danger)"
            />
          </ElFormItem>
        </DashboardSection>

        <DashboardSection :title="t('creative.form.quiz.welcome.title')">
          <ElFormItem
            :label="t('creative.form.quiz.welcome.text')"
            prop="quiz.welcomeText"
          >
            <ElInput
              v-model="model.quiz.welcomeText"
              size="large"
              placeholder="Welcome to the quiz"
              :maxlength="300"
              type="textarea"
              :rows="4"
              clearable
              show-word-limit
            />
          </ElFormItem>

          <ElFormItem prop="welcomeBlob">
            <div
              class="w-full max-w-[460px]"
              :class="{'_uploaded-image': model.quiz.welcomeBlob}"
            >
              <ElUpload
                v-model:file-list="welcomeFileList"
                :auto-upload="false"
                :show-file-list="true"
                :limit="1"
                :on-change="(file: UploadFile) => handleFileChange(file, 'welcomeBlob')"
                :on-error="handleUploadError"
                :before-upload="beforeUpload"
                :on-remove="() => handleRemove('welcomeBlob')"
                list-type="picture"
                accept=".png, .jpg, .jpeg, .gif, .mp4, .webm"
              >
                <ElButton
                  type="primary"
                  native-type="button"
                >
                  <span class="_text-m-bold">{{ t('creative.form.files.uploadBtn') }}</span>
                </ElButton>
              </ElUpload>
            </div>
          </ElFormItem>

          <ElFormItem
            :label="t('creative.form.quiz.welcome.color')"
            prop="quiz.welcomeColor"
          >
            <ElColorPicker
              v-model="model.quiz.welcomeColor"
            />
          </ElFormItem>
        </DashboardSection>

        <DashboardSection :title="t('creative.form.quiz.questions.title')">
          <div>
            <div
              v-for="(question, qIndex) in model.quiz.questions"
              :key="qIndex"
              class="mb-6"
            >
              <div>
                <div class="mb-3 flex items-center justify-between">
                  <span class="font-bold">{{ t('creative.form.quiz.questions.question', { index: qIndex + 1 }) }}</span>
                  <MiniXButton
                    v-if="model.quiz.questions?.length > 1 && qIndex > 0"
                    @click="removeQuestion(qIndex)"
                  >
                    {{ t('creative.form.quiz.questions.deleteQuestion') }}
                  </MiniXButton>
                </div>

                <div class="space-y-4">
                  <ElFormItem
                    :label="t('creative.form.quiz.questions.questionText')"
                    prop="questionText"
                  >
                    <ElInput
                      v-model="question.questionText"
                      size="large"
                      :maxlength="100"
                      :placeholder="t('creative.form.quiz.questions.questionPlaceholder')"
                      show-word-limit
                    />
                  </ElFormItem>

                  <ElFormItem
                    :label="t('creative.form.quiz.questions.explain')"
                    prop="description"
                  >
                    <ElInput
                      v-model="question.description"
                      :maxlength="300"
                      type="textarea"
                      :rows="4"
                      :placeholder="t('creative.form.quiz.questions.explainPlaceholder')"
                      show-word-limit
                    />
                  </ElFormItem>

                  <ElFormItem prop="answers">
                    <div
                      v-for="(option, oIndex) in question.answers || []"
                      :key="oIndex"
                      class="mb-2 w-full last:mb-0"
                    >
                      <div class="mb-2 flex items-end justify-between">
                        <span class="text-xs text-[#909399]">{{ t('creative.form.quiz.questions.answer', { index: oIndex + 1 }) }}</span>
                        <MiniXButton
                          v-if="(question.answers?.length || 0) > 2"
                          @click="removeOption(qIndex, oIndex)"
                        >
                          {{ t('creative.form.quiz.questions.deleteAnswer') }}
                        </MiniXButton>
                      </div>

                      <div class="space-y-1">
                        <ElInput
                          v-model="option.answerText"
                          :maxlength="100"
                          size="large"
                          :placeholder="t('creative.form.quiz.questions.answerPlaceholder', { index: oIndex + 1 })"
                          clearable
                        />
                        <ElCheckbox
                          v-model="option.isCorrect"
                          :label="t('creative.form.quiz.questions.correctAnswer')"
                          size="large"
                        />
                      </div>
                    </div>
                  </ElFormItem>

                  <ElButton
                    v-if="(question.answers?.length || 0) < 4"
                    class="mb-6"
                    type="primary"
                    @click="addOption(qIndex)"
                  >
                    <ElIcon>
                      <PlusIcon />
                    </ElIcon>
                    <span class="_text-m-bold">{{ t('creative.form.quiz.questions.addAnswer') }}</span>
                  </ElButton>

                  <ElFormItem
                    :label="t('creative.form.quiz.questions.questionBackground')"
                    prop="questionBlob"
                  >
                    <div
                      class="w-full max-w-[460px]"
                      :class="{'_uploaded-image': question.questionBlob}"
                    >
                      <ElUpload
                        v-model:file-list="questionFileLists[qIndex]"
                        :auto-upload="false"
                        :show-file-list="true"
                        :limit="1"
                        :on-change="(file: UploadFile) => handleFileChange(file, 'questionBlob', qIndex)"
                        :on-error="handleUploadError"
                        :before-upload="beforeUpload"
                        list-type="picture"
                        accept=".png, .jpg, .jpeg, .gif, .mp4, .webm"
                        :on-remove="() => handleRemove('questionBlob', qIndex)"
                      >
                        <ElButton
                          type="primary"
                          native-type="button"
                        >
                          <span class="_text-m-bold">{{ t('creative.form.files.uploadBtn') }}</span>
                        </ElButton>
                      </ElUpload>
                    </div>
                  </ElFormItem>

                  <ElFormItem
                    :label="t('creative.form.quiz.questions.questionColor')"
                    prop="questionColor"
                  >
                    <ElColorPicker
                      v-model="question.questionColor"
                    />
                  </ElFormItem>
                </div>
              </div>
            </div>

            <div class="mt-8 flex">
              <ElButton
                type="primary"
                @click="addQuestion"
                class="!font-bold"
              >
                <ElIcon>
                  <PlusIcon />
                </ElIcon>
                <span class="font-bold">{{ t('creative.form.quiz.questions.addQuestion') }}</span>
              </ElButton>
            </div>
          </div>
        </DashboardSection>

        <DashboardSection :title="t('creative.form.quiz.result.title')">
          <ElFormItem
            :label="t('creative.form.quiz.result.text')"
            prop="quiz.resultText"
          >
            <ElInput
              v-model="model.quiz.resultText"
              size="large"
              :placeholder="t('creative.form.quiz.result.placeholder')"
              :maxlength="300"
              type="textarea"
              :rows="4"
              clearable
              show-word-limit
            />
          </ElFormItem>

          <ElFormItem
            :label="t('creative.form.quiz.result.background')"
            prop="quiz.resultBlob"
          >
            <div
              class="w-full max-w-[460px]"
              :class="{'_uploaded-image': model.quiz.resultBlob}"
            >
              <ElUpload
                class="w-full"
                v-model:file-list="resultFileList"
                :auto-upload="false"
                :show-file-list="true"
                :limit="1"
                :on-change="(file: UploadFile) => handleFileChange(file, 'resultBlob')"
                :on-error="handleUploadError"
                :before-upload="beforeUpload"
                list-type="picture"
                accept=".png, .jpg, .jpeg, .gif, .mp4, .webm"
                :on-remove="() => handleRemove('resultBlob')"
              >
                <ElButton
                  type="primary"
                  native-type="button"
                >
                  <span class="_text-m-bold">{{ t('creative.form.files.uploadBtn') }}</span>
                </ElButton>
              </ElUpload>
            </div>
          </ElFormItem>

          <ElFormItem
            :label="t('creative.form.quiz.result.color')"
            prop="quiz.resultColor"
          >
            <ElColorPicker
              v-model="model.quiz.resultColor"
            />
          </ElFormItem>
        </DashboardSection>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Plus as PlusIcon } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import { v4 as uuidv4 } from 'uuid'

import type { IAnswer, IQuestion, IQuiz } from '@/core/types'
import { getSignedUrl, uploadFile } from '@/core/api'
import { EXTENSION_QUIZ_MAX_SIZE_MB } from '@/core/consts'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { MiniXButton } from '@/components'
import {
	ElButton,
	ElCheckbox,
	ElColorPicker,
	ElFormItem,
	ElIcon,
	ElInput,
	ElSwitch,
	ElUpload,
} from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Partner/views/FormCreative/locales'
import { getNumericId } from '@/modules/Partner/views/FormCreative/sections/Form/sections/Extension/helpers/getDefaultQuiz'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
	quiz: IQuiz | undefined
}>({ required: true })

const welcomeFileList = ref<UploadFile[]>([])
const resultFileList = ref<UploadFile[]>([])
const questionFileLists = ref<Record<number, UploadFile[]>>({})

// const isValid = computed(() => {
// 	return model.value.quiz.questions && model.value.quiz.questions.length > 0 &&
//     model.value.quiz.questions.every(q => q.questionText.trim() &&
//       q.answers && q.answers.length >= 2 &&
//       q.answers.some(a => a.isCorrect) &&
//       q.answers.every(a => a.answerText.trim()),
//     )
// })

function handleRemove(field: string, questionIndex?: number): void {
	if (!model.value.quiz) return

	if (field === 'welcomeBlob') {
		welcomeFileList.value = []
		model.value.quiz.welcomeBlob = ''
	}
	else if (field === 'resultBlob') {
		resultFileList.value = []
		model.value.quiz.resultBlob = ''
	}
	else if (field === 'questionBlob' && questionIndex !== undefined) {
		questionFileLists.value[questionIndex] = []
		model.value.quiz.questions[questionIndex].questionBlob = ''
	}
}

function createEmptyAnswer(questionId: number):IAnswer {
	return {
		id: getNumericId(),
		questionId: questionId,
		answerText: '',
		isCorrect: false,
	}
}

function createEmptyQuestion(quizId: string): IQuestion {
	const questionId = getNumericId()

	return {
		id: questionId,
		quizId,
		questionText: '',
		description: '',
		questionBlob: '',
		questionColor: '',
		answers: [
			{ id: getNumericId(), questionId, answerText: '', isCorrect: false },
			{ id: getNumericId(), questionId, answerText: '', isCorrect: false },
		],
	}
}

function beforeUpload(file: File): boolean | Promise<boolean> {
	// if (!file.type.startsWith('image/')) {
	// 	Logger.error('Only images can be uploaded')
	// 	return false
	// }

	if (file.size > EXTENSION_QUIZ_MAX_SIZE_MB * 1024 * 1024) {
		Logger.error('File size must be less than 2MB')
		return false
	}

	return true
}

async function handleFileUpload(file: File, field: string, questionIndex?: number): Promise<void> {
	if (!model.value.quiz) return

	try {
		const res = await getSignedUrl({
			contentType: file.type,
			key: `extension/quiz/${file.name}`,
			bucket: '',
			expires: '',
			visibility: '',
		}, `${import.meta.env.VITE_APP_API_URL}gcp/upload/extension/quiz/config`)

		await uploadFile({
			signedUrl: res.url,
			file,
			contentType: file.type,
		})

		const uploadedFile = res.url.split('?')[0]

		if (questionIndex !== undefined && field === 'questionBlob') {
			const question = model.value.quiz.questions?.[questionIndex]
			if (question) {
				question.questionBlob = uploadedFile
			}
			if (!questionFileLists.value[questionIndex]) {
				questionFileLists.value[questionIndex] = []
				model.value.quiz.questions[questionIndex].questionBlob = ''
			}
			questionFileLists.value[questionIndex] = [{
				name: file.name,
				url: uploadedFile,
				status: 'success',
				uid: Date.now(),
			}]
			model.value.quiz.questions[questionIndex].questionBlob = uploadedFile
		}
		else {
			if (field === 'welcomeBlob') {
				model.value.quiz.welcomeBlob = uploadedFile

				welcomeFileList.value = [{
					name: file.name,
					url: uploadedFile,
					status: 'success',
					uid: Date.now(),
				}]
			}
			else if (field === 'resultBlob') {
				model.value.quiz.resultBlob = uploadedFile

				resultFileList.value = [{
					name: file.name,
					url: uploadedFile,
					status: 'success',
					uid: Date.now() + 1,
				}]
			}
		}

		Logger.info('Image uploaded successfully!')
	}
	catch (err) {
		Logger.error('Upload error:', false, err)
		Logger.error('Image upload error')
	}
}

async function handleFileChange(uploadFile: UploadFile, field: string, questionIndex?: number): Promise<void> {
	if (uploadFile.raw && uploadFile.status === 'ready') {
		const maxSize = 2 * 1024 * 1024
		if (uploadFile.raw.size > maxSize) {
			Logger.error('File size must be less than 2MB')

			if (field === 'welcome_blob') {
				welcomeFileList.value = []
			}
			else if (field === 'result_blob') {
				resultFileList.value = []
			}
			else if (field === 'question_blob' && questionIndex !== undefined) {
				questionFileLists.value[questionIndex] = []
			}

			return
		}

		await handleFileUpload(uploadFile.raw, field, questionIndex)
	}
}

function handleUploadError(error: Error): void {
	Logger.error('Upload error:', false, error)
	Logger.error('Image upload error')
}

function addQuestion() {
	if (!model.value.quiz) return

	if (!model.value.quiz.questions) model.value.quiz.questions = []
	const newQuestion = createEmptyQuestion(model.value.quiz.id)
	model.value.quiz.questions.push(newQuestion as IQuestion)
}

function removeQuestion(index: number) {
	if (!model.value.quiz) return

	if (!model.value.quiz.questions) return
	if (model.value.quiz.questions.length > 1) {
		model.value.quiz.questions.splice(index, 1)
	}
	else {
		Logger.warning('There must be at least one question')
	}
}

function addOption(questionIndex: number) {
	if (!model.value.quiz) return

	const question = model.value.quiz.questions?.[questionIndex]

	if (!question?.answers) return

	if (question.answers.length >= 4) {
		Logger.warning('Maximum 4 answer options allowed')
		return
	}

	const newAnswer = createEmptyAnswer(question.id)
	question.answers.push(newAnswer as IAnswer)
}

function removeOption(questionIndex: number, optionIndex: number) {
	if (!model.value.quiz) return

	const question = model.value.quiz.questions?.[questionIndex]

	if (!question?.answers) return

	if (question.answers.length > 2) {
		question.answers.splice(optionIndex, 1)
	}
	else {
		Logger.warning('There must be at least 2 answer options')
	}
}

async function restoreFileLists(quiz: IQuiz): Promise<void> {
	try {
		if (quiz.welcomeBlob) {
			welcomeFileList.value = [{
				name: quiz.welcomeBlob,
				url: quiz.welcomeBlob,
				status: 'success',
				uid: Date.now(),
			}]
		}

		if (quiz.resultBlob) {
			resultFileList.value = [{
				name: quiz.resultBlob,
				url: quiz.resultBlob,
				status: 'success',
				uid: Date.now() + 1,
			}]
		}

		if (quiz.questions) {
			for (let i = 0; i < quiz.questions.length; i++) {
				const question = quiz.questions[i]
				if (question.questionBlob) {
					questionFileLists.value[i] = [{
						name: question.questionBlob,
						url: question.questionBlob,
						status: 'success',
						uid: Date.now() + i + 2,
					}]
				}
			}
		}
	}
	catch (err) {
		Logger.error('Failed to restore file lists:', false, err)
	}
}

onMounted(() => {
	if (model.value.quiz) {
		restoreFileLists(model.value.quiz)
	}
})

watch(() => model.value.quiz, (newVal) => {
	if (newVal) {
		restoreFileLists(newVal)
	}
})
</script>

<style scoped>
:deep(.el-form-item--label-top .el-form-item__label) {
  line-height: 1.2;

  font-size: 12px;
  color: #909399;
}

:deep(.el-upload-list__item ~ .el-upload--picture-card) {
	display: none;
}

:deep(.el-upload-list__item-preview) {
	display: none !important;
}

:deep(.el-upload-list__item-delete) {
	margin: 0 !important;
}

._uploaded-image :deep(.el-upload) {
	display: none;
}

:deep(.el-upload-list) {
	margin: 0;
}

:deep(.el-upload-list__item) {
	margin: 0;
}

._uploaded-image :deep(.el-upload-list__item-info) {
	width: calc(100% - 70px);
}
</style>
