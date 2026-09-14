<template>
  <DashboardLayout
    id="segments"
    data-name="segments"
    v-loading="segmentsStore.segments.loading"
  >
    <DashboardTitle :title="title" />

    <div class="mb-12 flex max-w-screen-lg items-start justify-between">
      <Search />
      <CreateBtn />
    </div>

    <List />

    <Form />
  </DashboardLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTitle } from '@vueuse/core'

import { useLocale } from '@/core/hooks'
import { DashboardLayout, DashboardTitle } from '@/components/layouts'
import { messages } from '@/modules/Partner/views/Segments/locales'
import { useSegmentsStore } from '@/modules/Partner/views/Segments/store'

import {
	CreateBtn,
	Form,
	List,
	Search,
} from './sections'

const { t } = useLocale<typeof messages>(messages)

const title = computed(() => t('segments.title'))

useTitle(title)

const segmentsStore = useSegmentsStore()

const route = useRoute()

onMounted(() => {
	if (route.query.segment) {
		segmentsStore.searchSegments(route.query.segment as string)
	}
	else {
		segmentsStore.fetchSegments()
	}
})
</script>
