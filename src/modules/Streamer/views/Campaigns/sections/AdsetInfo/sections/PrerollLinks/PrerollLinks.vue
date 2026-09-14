<template>
  <div
    data-name="preroll-links"
    class="mt-8"
  >
    <div class="_text-s-regular mb-2">
      Video Link
    </div>
    <div class="flex flex-col gap-2">
      <LinkItem
        v-for="vod in vods"
        :key="vod.id?.toString()"
        :adset-slug="adset.slug"
        :vod="vod"
        :vods="vods"
      />
    </div>

    <button
      data-test="add-preroll-link"
      class="mt-4 flex items-center gap-2 border-none bg-transparent"
      @click="addEmptyVod"
      :disabled="vods[vods.length - 1]?.id === null"
    >
      <PlusIcon class="h-4 w-4" />
      Add another video
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import { type IPrerollVod,PrerollAdsetStatus } from '@/core/types'
import type { IPrerollAdsetInfo } from '@/modules/Streamer/views/Campaigns/api'

import { LinkItem } from './components'

import PlusIcon from '@/assets/img/icons/plus.svg'

const props = defineProps<{
	adset: IPrerollAdsetInfo
}>()

type VOD = IPrerollVod | {
  id: null
  video: ''
  status: PrerollAdsetStatus.MISSING
}

const vods = ref<VOD[]>([])

const addEmptyVod = () => {
	vods.value.push({
		id: null,
		video: '',
		status: PrerollAdsetStatus.MISSING,
	})
}

const setVods = () => {
	if (!props.adset.vod.length) {
		addEmptyVod()
		return
	}

	vods.value = props.adset.vod
}

onMounted(setVods)

watch(props.adset, setVods)
</script>
