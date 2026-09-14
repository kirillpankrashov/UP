<template>
  <div
    id="partner-segments-search"
    data-name="partner-segments-search"
    class="max-w-[240px]"
  >
    <ElInput
      v-model="searchValue"
      :placeholder="t('segments.searchInput')"
      @input="onInput"
    >
      <template #suffix>
        <SearchIcon class="h-4 w-4 fill-gray" />
      </template>
    </ElInput>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { debounce } from 'lodash'

import { useLocale } from '@/core/hooks'
import { ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Segments/locales'
import { useSegmentsStore } from '@/modules/Partner/views/Segments/store'

import SearchIcon from '@/assets/img/icons/search-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const segmentsStore = useSegmentsStore()

const router = useRouter()
const route = useRoute()

const searchValue = ref(route.query.segment as string || '')

const onInput = debounce(async () => {
	if (searchValue.value === '') {
		await router.replace({ query: { ...route.query, segment: undefined } })
		segmentsStore.fetchSegments()
	}
	else {
		await router.push({ query: { ...route.query, page: undefined, segment: searchValue.value } })
		segmentsStore.searchSegments(searchValue.value)
	}
}, 600)
</script>

