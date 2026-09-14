<template>
  <ElDrawer
    id="segments-form"
    data-name="segments-form"
    :title="title"
    :before-close="closeForm"
    v-model="segmentsStore.segment.formVisible"
    direction="rtl"
    :size="!appStore.isMobile ? '660px' : '100%'"
  >
    <div v-loading="segmentsStore.segment.loading">
      <ElForm
        ref="formRef"
        :label-position="'top'"
        :model="model"
        :rules="rules"
        :validate-on-rule-change="false"
        @submit.prevent="onSubmit"
        class="mb-8"
      >
        <ElFormItem
          prop="title"
          :label="t('segments.form.fields.title.label')"
        >
          <ElInput
            data-test="segments-form-title-input"
            size="large"
            :placeholder="t('segments.form.fields.title.placeholder')"
            v-model="model.title"
          />
        </ElFormItem>
        <ElFormItem
          prop="streamers"
          :label="t('segments.form.fields.streamers.label')"
        >
          <ElSelect
            ref="streamersSelectRef"
            data-test="segments-form-streamers-select"
            size="large"
            v-model="model.streamers"
            :placeholder="t('segments.form.fields.streamers.placeholder')"
            filterable
            multiple
            remote
            :remote-method="onStreamerSearch"
            :tag-type="'success'"
          >
            <template
              v-if="streamers.length > 0"
              #footer
            >
              <ElButton
                size="small"
                type="primary"
                @click="addFoundStreamers"
              >
                {{ 'Select All' }}
              </ElButton>
            </template>
            <ElOption
              v-for="streamer in streamers"
              :key="streamer.id"
              :label="`${streamer.label} (${streamer.id})`"
              :value="streamer.id"
            />
          </ElSelect>
        </ElFormItem>

        <ElButton
          class="mt-4 w-full sm:max-w-[220px]"
          size="large"
          type="primary"
          native-type="submit"
          :loading="sending || success"
        >
          <span class="_text-m-bold">{{ t('button.save') }}</span>
        </ElButton>
      </ElForm>

      <StreamersTable
        v-if="segment"
        ref="streamersTableRef"
      />
    </div>
  </ElDrawer>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { debounce, uniq } from 'lodash'

import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { required } from '@/core/validators'
import {
	ElButton,
	ElDrawer,
	ElForm,
	ElFormItem,
	ElInput,
	ElOption,
	ElSelect,
} from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Segments/locales'
import { useSegmentsStore } from '@/modules/Partner/views/Segments/store'
import type { ISegmentModel } from '@/modules/Partner/views/Segments/types'

import { StreamersTable } from './sections'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
const segmentsStore = useSegmentsStore()

const segment = computed(() => segmentsStore.segment.data)

const sending = ref(false)
const success = ref(false)

const formRef = ref<FormInstance>()
const streamersSelectRef = ref<InstanceType<typeof ElSelect>>()
const streamersTableRef = ref<InstanceType<typeof StreamersTable>>()

const title = computed(() => {
	if (segmentsStore.segment.loading) {
		return t('phrases.loading')
	}

	return segment.value?.title || t('segments.form.title')
})

const model = reactive<ISegmentModel>({
	title: '',
	streamers: [],
})

const rules = computed<FormRules<ISegmentModel>>(() => ({
	title: [required],
	streamers: [],
}))

const streamers = ref<Array<{
	id: number
	label: string
}>>([])

const closeForm = async () => {
	segmentsStore.segment.formVisible = false

	if (segmentsStore.segment.data?.streamers.length !== streamersTableRef.value?.selectedStreamers.length) {
		await segmentsStore.fetchSegments()
	}

	model.title = ''
	model.streamers = []
	segmentsStore.segment.data = null
}

const addFoundStreamers = () => {
	model.streamers = uniq([...model.streamers, ...streamers.value.map(s => s.id)])
	streamers.value = []
	streamersSelectRef.value?.blur()
}

const onSubmit = async () => {
	if (!formRef.value) return

	sending.value = true

	try {
		const isValid = await formRef.value.validate()

		if (!isValid) {
			Logger.error('Validation error')
			return
		}

		if (segmentsStore.segment.data) {
			await segmentsStore.updateSegment(model)
		}
		else {
			await segmentsStore.createSegment(model)
		}

		success.value = true
		closeForm()
	}
	catch(err) {
		Logger.error('Error saving payment data', true, err)
	}
	finally {
		success.value = false
		sending.value = false
	}
}

const onStreamerSearch = debounce(async (query: string) => {
	const res = await segmentsStore.searchStreamers(query)

	streamers.value = res?.map(s => ({
		id: s.id,
		label: s.name,
	})) || []
}, 600)

watch(segment, () => {
	if (segmentsStore.segment.formVisible) {
		model.title = segment.value?.title || ''
	}
})

defineExpose({
	model,
})
</script>
