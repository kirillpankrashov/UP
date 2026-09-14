<template>
  <ElSelect
    v-model="selectedIds"
    placeholder="Select creators..."
    :disabled="disabled"
    :loading="loading"
    :remote-method="onSearch"
    filterable
    multiple
    remote
    reserve-keyword
    @change="onChange"
  >
    <ElOption
      v-for="item in availableStreamers"
      :key="item.id"
      :value="item.id"
      :label="item.name"
      :data-test="`adset-form-targeting-streamers-option-${item.id}`"
    >
      <div class="flex items-center">
        <div
          v-if="item.platform?.avatar"
          class="mr-2 h-6 w-6 rounded-full bg-cover bg-center"
          :style="{backgroundImage: `url(${item.platform?.avatar})`}"
        />
        {{ item.name }}
        <SocialIcon
          v-if="item.platform"
          :platform="item.platform.name"
          class="ml-2 h-4 w-4"
        />
      </div>
    </ElOption>
  </ElSelect>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { debounce, uniqBy } from 'lodash'

import { Platform } from '@/core/types'
import { Logger } from '@/core/helpers'
import { SocialIcon } from '@/components'
import { ElOption, ElSelect } from '@/components/element-plus'
import type { IDebugWidget } from '@/modules/Debug/types'
import { type ITargetingStreamerSearch, searchStreamers } from '@/modules/Partner/views/FormAdset/api'

const props = defineProps<{
	widgets: IDebugWidget[]
	disabled: boolean
}>()

const emit = defineEmits(['onInput'])

const selectedIds = ref<number[]>([])
const allStreamers = ref<ITargetingStreamerSearch[]>([])
const loading = ref(false)

// Получаем ID стримеров, которые уже есть в виджетах
const excludedStreamerIds = computed(() => {
	if (!props.widgets.length) return []

	return props.widgets[0].streamer?.user_id ? [props.widgets[0].streamer.user_id] : []
})

const availableStreamers = computed(() => {
	return allStreamers.value.filter(streamer =>
		!excludedStreamerIds.value.includes(streamer.id),
	)
})

const searchInPlatform = async (platform: Platform, value: string) => {
	try {
		return await searchStreamers(platform, { query: value })
	}
	catch (err) {
		Logger.error('Error searching streamers', true, err)
		return []
	}
}

const debouncedSearch = debounce(async (value: string) => {
	if (props.disabled || value.length < 3) {
		allStreamers.value = []
		return
	}

	loading.value = true

	try {
		let newStreamers: ITargetingStreamerSearch[] = []

		await Promise.all(Object.values(Platform).map(async platform => {
			if (platform === Platform.TIKTOK) return

			const res = await searchInPlatform(platform, value)
			if (res) newStreamers.push(...res)
		}))

		allStreamers.value = uniqBy(newStreamers, 'id')
	}
	finally {
		loading.value = false
	}
}, 500)

const onSearch = (value: string) => {
	debouncedSearch(value)
}

const onChange = (ids: number[]) => {
	const selectedStreamers = allStreamers.value.filter(streamer =>
		ids.includes(streamer.id),
	)

	emit('onInput', selectedStreamers[0].widget?.slug || '')

	selectedIds.value = []
}
</script>
