<template>
  <div
    class="step sm:flex sm:items-center"
    :class="{ 'step-completed _completed group': !!completed }"
  >
    <div class="flex flex-1 items-center">
      <div
        v-if="completed"
        :data-test="`setup-step-${indexId}-status`"
        class="mr-3 flex h-5 w-5 items-center justify-center rounded-full border border-success"
      >
        <CheckIcon class="h-2 w-2 group-[.step-completed]:fill-success" />
      </div>

      <div
        v-else
        :data-test="`setup-step-${indexId}-num`"
        class="mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary text-[10px] text-primary"
      >
        {{ indexId }}
      </div>

      <router-link
        :to="route"
        class="_text-l-regular group/link inline-block text-sm text-primary no-underline group-[.step-completed]:text-success"
      >
        {{ title }}
        <span
          class="ml-[0.3rem] inline-block align-bottom text-base transition-all group-hover/link:ml-[0.6rem]"
          v-if="!completed"
        >
          <ArrowIcon class="h-[0.95rem] w-[0.95rem]" />
        </span>
      </router-link>
    </div>

    <div class="ml-8 mt-2 flex basis-[220px] sm:ml-10 sm:mt-0">
      <button
        :data-test="`setup-step-${indexId}-btn`"
        class="group/hint flex items-center rounded-none border-none bg-transparent p-0 text-left text-black outline-none"
        @click="showGuide"
      >
        <div class="relative mr-1 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-dark-gray group-hover/hint:bg-primary">
          <PlayIcon class="ml-[2px] h-2 w-2 fill-white" />
        </div>
        <span class="_text-s-regular group-hover/hint:text-primary">{{ t('dashboard.setup.stepByStepGuide') }}</span>
      </button>
    </div>

    <ElDialog
      :title="title"
      v-model="dialogVisible"
    >
      <div class="aspect-video w-full">
        <iframe
          v-if="dialogVisible"
          class="h-full w-full"
          :src="guideUrl"
          :title="title"
          frameborder="0"
          allow="accelerometer; autoplay; gyroscope"
          allowfullscreen
        />
      </div>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { RouteLocationRaw } from 'vue-router'

import { useLocale } from '@/core/hooks'
import { ElDialog } from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Dashboard/locales'

import CheckIcon from '@/assets/img/icons/check.svg'
import ArrowIcon from '@/assets/img/icons/link-arrow.svg'
import PlayIcon from '@/assets/img/icons/play.svg'

const { t } = useLocale<typeof messages>(messages)

const props = defineProps<{
  indexId: number
  title: string
  completed: boolean
  route: RouteLocationRaw
  guideUrl?: string
}>()

const dialogVisible = ref(false)

const showGuide = () => {
	if (props.guideUrl && props.guideUrl.indexOf('youtube') === -1) {
		const w = window.open(props.guideUrl, '_blank')
		if (w) {
			w.focus()
			return
		}
	}

	dialogVisible.value = true
}
</script>
