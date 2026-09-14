<template>
  <div
    id="signin-streamer-info"
    class="flex h-full flex-col items-center justify-center bg-primary-50 p-5 pb-16 sm:flex-row sm:px-5 sm:pb-24 sm:pt-10 md:p-6"
  >
    <div class="auth-info__wrap w-full max-w-full divide-y-[1px] divide-light-gray md:max-w-2xl">
      <div class="relative pt-28 sm:pr-28 sm:pt-0">
        <h2
          class="info-heading"
          v-html="t('signinStreamer.info.block1.title')"
        />
        <TextLink
          :href="t('signinStreamer.info.block1.linkHref')"
          target="_blank"
          class="no-underline"
        >
          {{ t('signinStreamer.info.block1.linkText') }}
        </TextLink>
        <button
          class="absolute left-0 top-0 h-20 w-20 cursor-pointer border-0 bg-transparent sm:bottom-3 sm:left-auto sm:right-0 sm:top-auto sm:h-24 sm:w-24"
          @click="dialogVisible = true"
        >
          <VideoBtnIcon
            class="auth-info__play-btn"
          />
        </button>
      </div>

      <div class="relative mt-4 pt-10 sm:mt-8 sm:pr-20 sm:pt-8">
        <h2
          class="info-heading"
          v-html="t('signinStreamer.info.block2.title')"
        />
        <TextLink
          :href="t('signinStreamer.info.block2.linkHref')"
          target="_blank"
          class="no-underline"
        >
          {{ t('signinStreamer.info.block2.linkText') }}
        </TextLink>
      </div>

      <div class="relative mt-4 pt-10 sm:mt-8 sm:pr-20 sm:pt-8">
        <h2
          class="info-heading"
          v-html="t('signinStreamer.info.block3.title')"
        />
        <TextLink
          :href="t('signinStreamer.info.block3.linkHref')"
          target="_blank"
          class="no-underline"
        >
          {{ t('signinStreamer.info.block3.linkText') }}
        </TextLink>
      </div>
    </div>

    <ElDialog
      v-model="dialogVisible"
    >
      <div class="auth-info__video relative aspect-video">
        <iframe
          v-if="dialogVisible"
          class="absolute inset-0 h-full w-full"
          src="https://www.youtube-nocookie.com/embed/YwVVjHJ_Ii0?rel=0&controls=0&showinfo=0&autoplay=1&modestbranding=1&version=3&hl=en_US&autohide=1"
          title="YouTube video player"
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

import { useLocale } from '@/core/hooks'
import { TextLink } from '@/components'
import { ElDialog } from '@/components/element-plus'
import { messages } from '@/modules/Auth/views/SigninStreamer/locales'

import VideoBtnIcon from '@/assets/img/icons/circle-video-btn.svg'

const { t } = useLocale<typeof messages>(messages)

const dialogVisible = ref(false)
</script>

<style lang="scss" scoped>
.info-heading {
	@apply mb-4 text-2xl/[1] tracking-tight sm:text-[32px]/[1];

	:deep(strong) {
		@apply font-bold text-primary-500;
	}
}
</style>
