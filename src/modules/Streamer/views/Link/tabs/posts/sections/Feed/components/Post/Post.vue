<template>
  <div
    data-name="streamer-link-post"
    class="relative rounded bg-primary-50 p-4 pr-12"
  >
    <div>
      <div
        v-if="markup"
        data-test="post-markup"
        class="break-all"
      >
        <div v-html="markup" />
      </div>

      <div
        v-if="post.embed"
        data-test="post-embed"
        :class="{'mt-6': markup}"
      >
        <EmbedPreview :embed="post.embed" />
      </div>
      <div
        data-test="post-date"
        class="_text-m-regular mt-4 text-gray"
      >
        {{ t('link.posts.post.createdAt') }} {{ date }}
      </div>
    </div>

    <ElPopover
      popper-class="post-actions-popper"
      placement="bottom-start"
      v-model="visiblePopover"
      trigger-click
    >
      <template #reference>
        <button class="group absolute right-4 top-4 z-10 flex border-none bg-transparent">
          <DotsIcon class="h-4 w-4 group-hover:fill-primary" />
        </button>
      </template>

      <div>
        <button
          class="group mt-4 flex items-center border-none bg-transparent"
          data-test="post-edit-btn"
          @click="onEdit"
        >
          <EditIcon class="mr-2 h-4 w-4 fill-gray group-hover:fill-primary" />

          <span class="group-hover:text-primary">{{ t('link.posts.post.edit') }}</span>
        </button>

        <button
          class="group mt-4 flex items-center border-none bg-transparent"
          data-test="post-delete-btn"
          @click="onDelete"
        >
          <CloseMenuIcon class="mr-2 h-4 w-4 fill-gray group-hover:fill-primary" />

          <span class="group-hover:text-primary">{{ t('link.posts.post.remove') }}</span>
        </button>
      </div>
    </ElPopover>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { Converter } from 'showdown'
import { filterXSS } from 'xss'

import type { ILinkPost } from '@/core/types/link'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { ElPopover } from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Link/locales'
import { useLinkPostsStore } from '@/modules/Streamer/views/Link/store'
import { EmbedPreview } from '@/modules/Streamer/views/Link/tabs/posts/components'

import CloseMenuIcon from '@/assets/img/icons/close-menu-icon.svg'
import DotsIcon from '@/assets/img/icons/dots.svg'
import EditIcon from '@/assets/img/icons/edit.svg'

const props = defineProps<{
  post: ILinkPost
}>()

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
const postsStore = useLinkPostsStore()

const date = computed(() => moment(props.post.createdAt).locale(appStore.appLocale).format('LLL'))

const visiblePopover = ref(false)

const converter = new Converter({
	emoji: true,
	simpleLineBreaks: true,
	openLinksInNewWindow: true,
	headerLevelStart: 3,
	noHeaderId: true,
	ghCodeBlocks: true,
})

const markup = computed(() => {
	return filterXSS(converter.makeHtml(props.post.content || ''))
})

const onEdit = () => {
	postsStore.post = cloneDeep(props.post)
	postsStore.sidebarVisible = true
}

const onDelete = () => {
	if (!props.post.id) return

	postsStore.deletePost(props.post.id)
}

defineExpose({
	onEdit,
	onDelete,
})
</script>
