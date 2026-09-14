<template>
  <div
    ref="previewRef"
    class="h-[720px] w-[1280px] origin-top-left bg-cover bg-center"
    :style="{backgroundImage: `url(${streamImage})`}"
  >
    <Creatives
      :widget="widget"
      preview
      @finished="$emit('finished')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { fetchCreative } from '@/components/Preview/api'
import { Preparer } from '@/modules/Widget/class/Preparer'
import { Widget } from '@/modules/Widget/class/Widget'
import { Creatives } from '@/modules/Widget/sections'
import type { IRealDemoCreativeResponse } from '@/modules/Widget/types'

import streamImage from '@/assets/img/creatives/stream.jpg'

defineEmits(['finished'])

const route = useRoute()

const props = defineProps<{
  slug: string
}>()

const widget = new Widget()
const preparer = new Preparer(widget)

const previewRef = ref<HTMLDivElement | null>(null)
const isLoading = ref(false)

const creatives = ref<IRealDemoCreativeResponse[]>([])

const isPage = computed(() => {
	return !props.slug && (route.params.creativeSlug || route.query.creatives)
})

const start = async () => {
	await prepareCreativesPreview()
	preparer.prepareDemoCreatives({
		status: true,
		data: creatives.value,
	})
	widget.creativesLoop.startDemo()
}

const stop = () => {
	widget.creativesManager.finish()
}

const prepareCreativesPreview = async () => {
	creatives.value = []
	if (props.slug || route.params.creativeSlug) {
		try {
			isLoading.value = true
			const creative: IRealDemoCreativeResponse = await fetchCreative(props.slug || route.params.creativeSlug as string)
			creatives.value.push(creative)
		}
		finally {
			isLoading.value = false
		}
	}
	else if (route.query.creatives) {
		try {
			const creativesSlugs = route.query.creatives as string
			const slugs = creativesSlugs.split(',')
			const promises: Array<Promise<IRealDemoCreativeResponse>> = []

			slugs.forEach(slug => promises.push(fetchCreative(slug)))

			isLoading.value = true
			const creativeList = await Promise.all(promises)
			creatives.value = creativeList
		}
		finally {
			isLoading.value = false
		}
	}
}

onMounted(() => {
	setTimeout(() => {
		if (previewRef.value && previewRef.value.parentElement) {
			const transformScale = previewRef.value.parentElement.offsetWidth / previewRef.value.offsetWidth
			previewRef.value.style.transform = `scale(${transformScale})`
		}
	}, 300)

	if (isPage.value) start()
})

defineExpose({ start, stop, isLoading })
</script>
