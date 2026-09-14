<template>
  <ElDrawer
    data-name="streamer-link-posts-form"
    :title="isEdit ? t('link.posts.sidebar.title.edit') : t('link.posts.sidebar.title.add')"
    v-model="postsStore.sidebarVisible"
    :size="!appStore.isMobile ? '768px' : '100%'"
    :show-close="false"
  >
    <ElForm
      ref="formRef"
      v-loading="postsStore.isLoadingPost || sending"
      :model="model"
      label-position="top"
      :disabled="sending || success"
      @submit.prevent="onSubmit"
    >
      <ElFormItem prop="content">
        <template #label>
          <div>
            <span class="_text-s-regular">{{ t('link.posts.sidebar.markdown.label') }}</span>
            <QuestionTooltip :placement="'top'">
              <div v-html="t('link.posts.sidebar.markdown.hint')" />
            </QuestionTooltip>
          </div>
        </template>
        <v-md-editor
          v-model="model.content"
          height="400px"
          :left-toolbar="'h bold italic strikethrough quote emoji | ul ol table hr | link code'"
          :right-toolbar="'fullscreen'"
          :mode="'editable'"
          @change="onContentChange"
        />
      </ElFormItem>

      <ElFormItem prop="embed">
        <template #label>
          <div>
            <span class="_text-s-regular">{{ t('link.posts.sidebar.embed.label') }}</span>
            <QuestionTooltip :placement="'top'">
              {{ t('link.posts.sidebar.embed.hint') }}
            </QuestionTooltip>
          </div>
        </template>

        <ElInput
          v-model="model.embed"
          size="large"
          :placeholder="'Embed from YouTube, Spotify, Twitter ...'"
          @input="onEmbedChange"
        />
      </ElFormItem>

      <EmbedPreview :embed="model.embed" />

      <div class="mt-6 grid w-full gap-4 sm:grid-cols-2">
        <ElButton
          size="large"
          plain
          type="primary"
          @click="postsStore.sidebarVisible = false"
        >
          <span class="_text-m-bold">{{ $t('button.cancel.static') }}</span>
        </ElButton>

        <ElButton
          size="large"
          :type="success ? 'success' : 'primary'"
          native-type="submit"
          :disabled="disabled"
          :loading="sending"
        >
          <span class="_text-m-bold">{{ success ? $t('button.saved') : isEdit ? $t('button.save') : t('link.posts.sidebar.btns.post') }}</span>
        </ElButton>
      </div>
    </ElForm>
  </ElDrawer>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { cloneDeep, isEqual } from 'lodash'

import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { QuestionTooltip } from '@/components'
import { ElButton, ElDrawer, ElForm, ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Link/locales'
import { type ILinkPostModel,useLinkPostsStore } from '@/modules/Streamer/views/Link/store'
import { EmbedPreview } from '@/modules/Streamer/views/Link/tabs/posts/components'

const POST_CONTENT_MAX_LENGTH = 1024

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
const postsStore = useLinkPostsStore()

const post = computed(() => postsStore.post)

const isEdit = computed(() => 'id' in model)

const formRef = ref<HTMLFormElement>()

const sending = ref(false)
const success = ref(false)

const initialModel = {
	content: '',
	embed: '',
}

let model = reactive<ILinkPostModel>(cloneDeep(initialModel))

watch(post, (postData) => {
	if (!postData) {
		Object.assign(model, cloneDeep(initialModel))
		return
	}

	if (isEqual(model, postData)) return

	Object.assign(model, cloneDeep(postData))
})

const disabled = computed(() => {
	if (!model.content && !model.embed) {
		return true
	}
	if (sending.value || success.value) {
		return true
	}
	return false
})

const onSubmit = async () => {
	if (!formRef.value) return

	sending.value = true

	try {
		await postsStore.submitPost(model)

		success.value = true
		setTimeout(() => {
			success.value = false
			postsStore.sidebarVisible = false
			postsStore.post = null
		}, 3000)
	}
	finally {
		sending.value = false
	}
}

const onContentChange = (text: string) => {
	if (text.length > POST_CONTENT_MAX_LENGTH) {
		model.content = text.slice(0, POST_CONTENT_MAX_LENGTH)
	}
}

const onEmbedChange = (val: string) => {
	try {
		const link = new URL(val)
		model.embed = link.href
	}
	catch (_) {
		model.embed = val
	}
}
</script>
