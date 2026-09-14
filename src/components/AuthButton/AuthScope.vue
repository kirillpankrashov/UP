<template>
  <div
    class="fixed left-0 top-0 z-50 h-screen w-screen overflow-auto bg-background"
    ref="root"
  >
    <BackButton
      class="absolute left-5 top-9 sm:left-6 sm:top-7"
      @click="$emit('close')"
    >
      Go back
    </BackButton>

    <div class="mx-auto my-0 w-full max-w-[420px] px-5 pb-28 pt-32 sm:w-[360px] sm:max-w-full sm:px-3 sm:py-10">
      <h1
        class="_headline mb-4"
        v-html="locale.heading"
      />

      <p
        class="_text-m-regular mb-2"
        v-html="locale.headline"
      />

      <ElTag
        class="mx-[-8px] mb-2 inline-block h-auto whitespace-normal p-2"
        type="success"
      >
        <p
          class="_text-m-bold"
          v-html="locale.info"
        />
      </ElTag>

      <TextLink
        class="text-primary"
        target="_blank"
        :href="t('links.whyAreWeCollectingThisData')"
      >
        {{ locale.link }}
      </TextLink>

      <div class="relative mt-6 sm:mb-16">
        <img
          v-if="platform === Platform.TWITCH"
          class="mx-[-8px] my-0 h-auto w-[400px] max-w-[400px] sm:mx-[-32px]"
          src="@/assets/img/scope-twitch.png"
          alt="Scope Twitch"
        >
        <img
          v-if="platform === Platform.YOUTUBE"
          class="mx-[-8px] my-0 h-auto w-[400px] max-w-[400px] sm:mx-[-32px]"
          src="@/assets/img/scope-youtube.png"
          alt="Scope Youtube"
        >
        <img
          v-if="platform === Platform.TROVO"
          class="mx-[-8px] my-0 h-auto w-[400px] max-w-[400px] sm:mx-[-32px]"
          src="@/assets/img/scope-trovo.png"
          alt="Scope Trovo"
        >

        <button
          class="_text-m-regular mt-4 flex w-full items-center border-none bg-transparent bg-none text-success outline-0 lg:hidden"
          @click="toggleList"
        >
          {{ locale.link }}
          <ChevronDownIcon
            class="ml-auto shrink-0 grow-0 basis-4 fill-success"
            :class="{'rotate-180' : listIsOpened}"
            width="16"
            height="16"
          />
        </button>

        <ul
          class="mt-6 hidden w-full max-w-full sm:mt-10 lg:absolute lg:bottom-0 lg:left-[calc(100%+30px)] lg:m-0 lg:block lg:w-[calc((100vw-400px)/2)] lg:max-w-[342px] lg:p-0"
          :class="{'block' : listIsOpened}"
        >
          <li
            v-for="(item, index) in locale.desciptions"
            :key="index"
            class="mb-4 flex last:mb-0"
          >
            <span class="mr-1 flex h-4 w-4 shrink-0 translate-y-[-2px] items-center justify-center rounded-lg bg-success text-[10px] leading-none text-white">
              {{ index + 1 }}
            </span>
            <div>
              <h5
                class="_text-s-bold"
                v-html="item.title"
              />
              <p
                class="_text-s-regular mt-2"
                v-html="item.text"
              />
            </div>
          </li>
        </ul>
      </div>

      <div class="my-4 h-px w-full bg-light-gray lg:hidden" />

      <ElButton
        type="primary"
        :loading="pending"
        @click="submit"
        size="large"
      >
        <span class="_text-m-bold">{{ locale.redirectBtn }}</span>
      </ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { Platform } from '@/core/types/platform'
import { useLocale } from '@/core/hooks'
import { BackButton, TextLink } from '@/components'
import { ElButton, ElTag } from '@/components/element-plus'

import { messages } from './locales'

import ChevronDownIcon from '@/assets/img/icons/chevron-down.svg'

const { t, tm } = useLocale<typeof messages>(messages)

const props = defineProps<{
  platform: Platform
}>()

const locale = computed<any>(() => {
	switch (props.platform) {
		case Platform.TWITCH:
			return tm('scopeTwitch')
		case Platform.YOUTUBE:
			return tm('scopeYoutube')
		case Platform.TROVO:
			return tm('scopeTrovo')
		case Platform.VK_PLAY:
			return tm('scopeVkplay')
		case Platform.TIKTOK:
			return tm('scopeTiktok')
	}
})

const emit = defineEmits(['submit', 'close'])

const root = ref<Node>()
const pending = ref(false)
const listIsOpened = ref(false)

const toggleList = () => {
	listIsOpened.value = !listIsOpened.value
}

const submit = () => {
	pending.value = true
	emit('submit')
}

onMounted(() => {
	document.getElementById('app-root')?.appendChild(root.value as Node)
})
</script>

<style lang="scss" scoped>
.el-tag {
	@apply mx-[-8px] mb-2 inline-block h-auto whitespace-normal p-2
}

.el-button {
	@apply mx-auto block w-full max-w-full lg:max-w-[320px]
}
</style>
