<template>
  <button
    data-name="streamer-link-posts-add-new-btn"
    data-test="link-posts-add-new-btn"
    class="_text-s-regular mb-6 flex items-center border-none bg-transparent text-primary"
    @click="addPost"
  >
    <PlusCircleIcon class="mr-2 h-6 w-6" />
    {{ t('link.posts.addNewBtn') }}
  </button>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import { messages } from '@/modules/Streamer/views/Link/locales'
import { useLinkPostsStore } from '@/modules/Streamer/views/Link/store'

import PlusCircleIcon from '@/assets/img/icons/plus-circle.svg'

const { t } = useLocale<typeof messages>(messages)

const postsStore = useLinkPostsStore()

const addPost = () => {
	postsStore.post = null
	postsStore.sidebarVisible = true
}
</script>
