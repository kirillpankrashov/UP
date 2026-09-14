<template>
  <div
    v-loading="creativePreview?.isLoading"
    class="relative aspect-video overflow-hidden"
  >
    <div class="group absolute inset-0 z-50">
      <div
        class="absolute left-1/2 top-1/2 z-50 h-[48px] w-[48px] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-primary transition-all duration-300 group-hover:opacity-100"
        :class="{'opacity-0': isPlaying}"
        @click="replay"
      >
        <span
          class="absolute left-1/2 top-1/2 inline-block h-0 w-0 -translate-x-1/2 -translate-y-1/2 border-y-[10px] border-l-[18px] border-y-transparent border-l-white"
          :class="{'h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 border-none bg-white': isPlaying}"
        />
      </div>
    </div>

    <component
      :is="previewComponent"
      ref="creativePreview"
      :key="key"
      :slug="slug"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { CampaignType } from '@/core/types'
import { parseSlug } from '@/core/helpers'
import { CreativePreview, SpCreativePreview } from '@/components/Preview/section'

const props = defineProps<{
  slug: string
}>()

const previewComponent = computed(() => {
	try {
		const { campaignType } = parseSlug(props.slug)
		if (campaignType === CampaignType.SPECIAL_PROJECT) return SpCreativePreview
		return CreativePreview
	}
	catch {
		return CreativePreview
	}
})

const isPlaying = ref(false)
const key = ref(new Date().getTime())
const creativePreview = ref()

const replay = () => {
	if (isPlaying.value) {
		creativePreview.value.stop()
		isPlaying.value = false
	}
	else {
		creativePreview.value.start()
		isPlaying.value = true
	}
}
</script>
