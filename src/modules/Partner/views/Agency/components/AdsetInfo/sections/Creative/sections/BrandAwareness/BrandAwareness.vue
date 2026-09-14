<template>
  <div
    v-if="hasAds"
    data-name="campaigns-info-creative-brand-awareness"
    data-test="campaigns-info-creative-brand-awareness"
    class="border-t border-light-gray pt-8"
  >
    <div class="_text-s-regular mb-2">
      {{ t('creators.campaignSidebar.creativePreview') }}
    </div>

    <div
      v-if="!isExternalFormat(adset.format.id) && adset.format.id !== AdFormat.CHATBOT_TEXT"
      class="relative"
    >
      <Preview
        :key="slide.id + slide.slug"
        :slug="slide.slug"
      />

      <div
        v-if="hasMultipleAds"
        class="absolute left-[-5px] top-1/2 flex h-0 w-[calc(100%+10px)] -translate-y-1/2 justify-between sm:left-[-25px] sm:w-[calc(100%+50px)]"
      >
        <ArrowIcon
          class="h-4 w-4 cursor-pointer fill-gray hover:fill-primary"
          @click="prev"
        />
        <ArrowIcon
          class="h-4 w-4 rotate-180 cursor-pointer fill-gray hover:fill-primary"
          @click="next"
        />
      </div>
    </div>

    <div
      v-if="!isExternalFormat(adset.format.id)"
      class="mb-6 mt-4"
    >
      <div class="mb-3">
        <div class="_text-s-regular mb-2">
          {{ t('creators.campaignSidebar.chatMessage') }}
        </div>
        <div>
          {{ message || '—' }}
        </div>
      </div>
    </div>

    <div
      v-if="hasMultipleAds"
      class="mb-8 flex justify-center"
    >
      <span
        v-for="(dot, i) in adset.ads"
        :key="dot.id"
        data-test="dot"
        class="mx-1 block h-2 w-2 cursor-pointer rounded-full border-gray"
        :class="currentSlideIdx === i ? 'bg-gray' : 'bg-lightest-gray'"
        @click="currentSlideIdx = i"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { AdFormat } from '@/core/types'
import { isExternalFormat } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { Preview } from '@/components'
import type { IAdsetInfo } from '@/modules/Partner/views/Agency/api'
import { messages } from '@/modules/Partner/views/Agency/locales'

import ArrowIcon from '@/assets/img/icons/arrow-left.svg'

const { t } = useLocale<typeof messages>(messages)

const props = defineProps<{
  adset: IAdsetInfo
}>()

const currentSlideIdx = ref(0)

const hasAds = computed(() => props.adset.ads.length > 0)
const hasMultipleAds = computed(() => props.adset.ads.length > 1)
const slide = computed(() => props.adset.ads[currentSlideIdx.value])
const message = computed(() => props.adset.ads[currentSlideIdx.value]?.chatbotText || '')

const next = () => {
	if (props.adset.ads[currentSlideIdx.value + 1]) {
		currentSlideIdx.value += 1
	}
	else {
		currentSlideIdx.value = 0
	}
}

const prev = () => {
	if (props.adset.ads[currentSlideIdx.value - 1]) {
		currentSlideIdx.value -= 1
	}
	else {
		currentSlideIdx.value = props.adset.ads.length - 1
	}
}
</script>
