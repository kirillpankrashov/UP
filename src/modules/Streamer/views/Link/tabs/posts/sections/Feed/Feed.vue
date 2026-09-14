<template>
  <div
    v-if="posts"
    data-name="streamer-link-posts-feed"
    v-loading="postsStore.isLoadingPosts"
    class="flex flex-col gap-2"
  >
    <Post
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />

    <ElPagination
      v-if="posts.length"
      layout="prev, pager, next"
      :page-size="postsStore.posts.perPage"
      :current-page="postsStore.posts.page"
      :total="postsStore.posts.total"
      @current-change="changePage"
      hide-on-single-page
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { ElPagination } from '@/components/element-plus'
import { useLinkPostsStore } from '@/modules/Streamer/views/Link/store'

import { Post } from './components'

const postsStore = useLinkPostsStore()

const posts = computed(() => postsStore.posts.data)

const changePage = (page: number) => {
	postsStore.posts.page = page
	postsStore.getPosts()
}

defineExpose({
	changePage,
})
</script>
