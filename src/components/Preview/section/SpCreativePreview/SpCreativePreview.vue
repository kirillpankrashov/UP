<template>
  <div
    ref="previewRef"
    class="h-[1080px] w-[1920px] origin-top-left bg-cover bg-center"
    :style="{ backgroundImage: `url(${streamImage})` }"
  >
    <div
      v-if="creative"
      class="relative inline-block max-h-full max-w-full"
    >
      <component
        :is="activeComponent"
        :creative="creative"
      />
      <div class="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4">
        <AdvertState :creative="creative" />
        <QrCode :creative="creative" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { AdFormat } from '@/core/types'
import { fetchCreative as fetchCreativeApi } from '@/components/Preview/api'
import type { ISpCreative } from '@/modules/SpecialProjectWidget/api'
import type { ISpStreamInfo } from '@/modules/SpecialProjectWidget/api/fetchCreative/types'
import { AdvertState, Custom, Fullscreen, QrCode } from '@/modules/SpecialProjectWidget/sections'
import type { IRealDemoCreativeResponse } from '@/modules/Widget/types'

import streamImage from '@/assets/img/creatives/stream.jpg'

defineEmits(['finished'])

const route = useRoute()

const props = defineProps<{
  slug: string
}>()

const previewRef = ref<HTMLDivElement | null>(null)
const isLoading = ref(false)

const creative = ref<ISpCreative | null>(null)

const activeComponent = computed(() => {
	const format = creative.value?.adSet.format
	if (format === AdFormat.SP_FULLSCREEN) return Fullscreen
	if (format === AdFormat.SP_CUSTOM) return Custom
	return null
})

const isPage = computed(() => {
	return !props.slug && (route.params.creativeSlug || route.query.creatives)
})

function responseToPreviewCreative (response: IRealDemoCreativeResponse): ISpCreative {
	const stubStream: ISpStreamInfo = {
		id: '',
		viewers: 0,
		category: '',
		title: '',
		gender: '',
		keywords: '',
		domain: '',
		page: '',
	}

	return {
		id: response.id,
		slug: response.slug,
		impressionSlug: response.impression_slug ?? null,
		viewersCount: response.viewers_count,
		qr: {
			code: response.qr_code,
			link: response.qr_link ?? null,
		},
		pixels: {
			impressions: [],
		},
		adSet: {
			id: response.ad_set.id,
			slug: response.ad_set.slug,
			format: response.ad_set.format,
			frequency: null,
			duration: null,
			campaign: {
				id: response.ad_set.campaign.id,
				slug: response.ad_set.campaign.slug,
				type: response.ad_set.campaign.type,
				ordMarkup: response.ad_set.campaign.ord_markup ?? '',
			},
			advertiser: {
				legalName: response.ad_set.advertiser.legal_name ?? null,
				tin: response.ad_set.advertiser.tin ?? null,
			},
		},
		attachments: response.attachments,
		stream: stubStream,
	}
}

const fetchCreativeData = async () => {
	const slug = props.slug || route.params.creativeSlug as string
	if (!slug) return

	try {
		isLoading.value = true
		const response = await fetchCreativeApi(slug)
		creative.value = responseToPreviewCreative(response)
	}
	finally {
		isLoading.value = false
	}
}

const start = async () => {
	await fetchCreativeData()
}

const stop = () => {
	creative.value = null
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
