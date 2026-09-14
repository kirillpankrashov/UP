<template>
  <div
    id="link-posts"
    data-name="streamer-link-posts"
  >
    <AddPost />
    <Feed />
    <PostForm />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useLinkPostsStore } from '@/modules/Streamer/views/Link/store'

import { AddPost, Feed, PostForm } from './sections'

const postsStore = useLinkPostsStore()

onMounted(async () => {
	postsStore.getPosts()
})
</script>
