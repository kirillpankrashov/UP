<template>
  <div
    data-name="campaigns-info-creative-special-project"
    data-test="campaigns-info-creative-special-project"
    class="border-t border-light-gray pt-8"
  >
    <div class="_text-s-regular mb-2 text-gray">
      {{ t('campaignSidebar.creativePreview') }}
    </div>

    <div class="relative">
      <Preview
        :key="slide.id + slide.slug"
        :slug="slide.slug"
      />

      <div
        v-if="adset.ads.length > 1"
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

    <div class="mb-6 mt-4">
      <div class="mb-3">
        <div class="_text-s-regular mb-2 text-gray">
          {{ t('campaignSidebar.chatMessage') }}
        </div>
        <div>
          {{ slide.chatbotText || '—' }}
        </div>
      </div>

      <div>
        <CopyLink
          v-if="slide.productUrl"
          class="mt-4"
          :link="slide.productUrl"
          :label="t('campaignSidebar.copyProductLink')"
        />
      </div>
    </div>

    <div
      v-if="adset.ads.length > 1"
      class="mb-8 flex justify-center"
    >
      <span
        v-for="(dot, i) in adset.ads"
        :key="dot.id"
        class="mx-1 block h-2 w-2 cursor-pointer rounded-full border-gray"
        :class="currentSlideIdx === i ? 'bg-gray' : 'bg-lightest-gray'"
        @click="currentSlideIdx = i"
      />
    </div>

    <div
      v-if="adset.widgetUrl"
      class="mb-6"
    >
      <div class="_text-s-regular mb-2 text-gray">
        {{ t('campaignSidebar.specialProject.creative') }}
      </div>

      <Collapse
        :label="t('campaignSidebar.specialProject.optionWidget')"
        :collapsed="false"
      >
        <div class="relative my-2 inline-block h-12 w-full overflow-hidden text-ellipsis rounded-[4px] bg-primary-50 px-4 text-black">
          <div
            class="whitespace-nowrap pr-10 leading-[48px]"
            :class="{'blur-sm': bluredLink}"
          >
            {{ adset.widgetUrl }}
          </div>

          <div class="absolute right-0 top-0 z-20 flex h-full w-12 cursor-pointer items-center justify-center bg-primary-50 select-none">
            <EyeIcon
              v-if="bluredLink"
              class="h-4 w-4"
              @click="bluredLink = !bluredLink"
            />
            <EyeClosedIcon
              v-else
              class="h-4 w-4"
              @click="bluredLink = !bluredLink"
            />
          </div>
        </div>

        <CopyLink :link="adset.widgetUrl" />
      </Collapse>
    </div>

    <div
      v-if="hasDownloadableAttachments"
      class="mb-6"
    >
      <Collapse
        :label="t('campaignSidebar.specialProject.optionFile')"
        :collapsed="true"
      >
        <div
          v-for="ad in adset.ads"
          :key="ad.id"
          class="mb-4 last:mb-0"
        >
          <div class="inline-flex flex-wrap gap-8">
            <TextLink
              v-if="ad.attachments.video"
              class="no-underline"
              :href="ad.attachments.video"
              target="_blank"
              :download="true"
            >
              {{ t('campaignSidebar.downloadCreativeFile') }}
            </TextLink>

            <TextLink
              v-if="ad.attachments.unit"
              class="no-underline"
              :href="ad.attachments.unit"
              target="_blank"
              :download="true"
            >
              {{ t('campaignSidebar.downloadCreativeFile') }}
            </TextLink>

            <TextLink
              v-if="ad.attachments.zip"
              class="no-underline"
              :href="ad.attachments.zip.path"
              target="_blank"
              :download="true"
            >
              {{ t('campaignSidebar.downloadCreativeFile') }}
            </TextLink>
          </div>
        </div>
      </Collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { useLocale } from '@/core/hooks'
import { Collapse, CopyLink, Preview, TextLink } from '@/components'
import type { ISpecialProjectAdsetInfo } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

import ArrowIcon from '@/assets/img/icons/arrow-left.svg'
import EyeIcon from '@/assets/img/icons/eye.svg'
import EyeClosedIcon from '@/assets/img/icons/eye-close.svg'

const props = defineProps<{
  adset: ISpecialProjectAdsetInfo
}>()

const { t } = useLocale<typeof messages>(messages)

const bluredLink = ref(true)
const currentSlideIdx = ref(0)

const slide = computed(() => props.adset.ads[currentSlideIdx.value])

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

const hasDownloadableAttachments = computed(() =>
	props.adset.ads.some(ad => ad.attachments.video || ad.attachments.unit || ad.attachments.zip),
)
</script>
