<template>
  <SocialButton
    ref="socialButton"
    :class="{
      'twitch-button': platform === Platform.TWITCH,
      'youtube-button': platform === Platform.YOUTUBE,
      'trovo-button': platform === Platform.TROVO,
      'vkplay-button': platform === Platform.VK_PLAY,
      'tiktok-button': platform === Platform.TIKTOK,
    }"
    :request-url="requestUrl"
    :plain="plain"
    :attaching="attaching"
    :attached="attached"
    :demo-auth="demoAuth"
    @open-scope="openScope"
  >
    <template #icon>
      <div class="social-button__icon">
        <TwitchIcon
          v-if="platform === Platform.TWITCH"
          class="h-[28px] w-[28px] fill-white"
        />
        <YoutubeIcon
          v-if="platform === Platform.YOUTUBE"
          class="h-[28px] w-[28px] fill-white"
        />
        <TrovoIcon
          v-if="platform === Platform.TROVO"
          class="h-[32px] w-[32px] fill-white"
        />
        <VkplayIcon
          v-if="platform === Platform.VK_PLAY"
          class="h-[30px] w-[30px] fill-white"
        />
        <TiktokIcon
          v-if="platform === Platform.TIKTOK"
          class="h-[30px] w-[30px] fill-white"
        />
      </div>
    </template>

    <div class="_text-m-bold text-white">
      <slot v-if="$slots.default" />
      <template v-else>
        {{ locale.startWith }}
      </template>
    </div>

    <AuthScope
      v-if="showScope"
      :platform="platform"
      @submit="socialButton?.auth()"
      @close="showScope = false"
    />
  </SocialButton>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { Platform } from '@/core/types'
import { useLocale } from '@/core/hooks'

import AuthScope from './AuthScope.vue'
import { messages } from './locales'
import SocialButton from './SocialButton.vue'

import TiktokIcon from '@/assets/img/icons/tiktok-icon.svg'
import TrovoIcon from '@/assets/img/icons/trovo-icon.svg'
import TwitchIcon from '@/assets/img/icons/twitch-icon.svg'
import VkplayIcon from '@/assets/img/icons/vkplay-icon.svg'
import YoutubeIcon from '@/assets/img/icons/youtube-icon.svg'

const props = defineProps<{
  platform: Platform
  requestUrl: string
  plain?: boolean
  attaching?: boolean
  attached?: boolean
  demoAuth?: boolean
}>()

const { t } = useLocale<typeof messages>(messages)

const showScope = ref(false)
const socialButton = ref<InstanceType<typeof SocialButton> | null>(null)

const locale = computed(() => {
	switch (props.platform) {
		case Platform.TWITCH:
			return { startWith: t('startWithTwitch') }
		case Platform.YOUTUBE:
			return { startWith: t('startWithYoutube') }
		case Platform.TROVO:
			return { startWith: t('startWithTrovo') }
		case Platform.VK_PLAY:
			return { startWith: t('startWithVkplay') }
		case Platform.TIKTOK:
			return { startWith: t('startWithTiktok') }
	}
})

const openScope = () => {
	if (props.attached) return
	showScope.value = true
}
</script>

<style lang="scss" scoped>
.twitch-button {
  background-color: var(--color-twitch);

  &:not(:disabled) {
    cursor: pointer;
  }

  &:not(:disabled):hover,
	&:not(:disabled):active {
    background-color: var(--color-twitch-darker);
  }

  &.is-plain {
    border: 1px solid var(--color-twitch);
    background-color: var(--el-color-white);

		&:not(:disabled):hover,
		&:not(:disabled):active {
			background-color: var(--color-twitch-lighter);
		}

		._text-m-bold {
			color: var(--color-twitch);
		}

    :deep(.social-button__icon svg path) {
      fill: var(--color-twitch);
    }
  }

  &.is_attached {
    background-color: var(--color-twitch-lightest);
		border-color: transparent;

    &:hover {
      background-color: rgba(var(--color-twitch), 0.05);
    }
  }
}

.youtube-button {
  background-color: var(--color-youtube);

  &:not(:disabled) {
    cursor: pointer;
  }

	&:not(:disabled):hover,
	&:not(:disabled):active {
		background-color: var(--color-youtube-darker);
	}

  &.is-plain {
    border: 1px solid var(--color-youtube);
    background-color: var(--el-color-white);
    color: var(--color-youtube);

		&:not(:disabled):hover,
		&:not(:disabled):active {
			background-color: var(--color-youtube-lighter);
		}

		._text-m-bold {
			color: var(--color-youtube);
		}

    :deep(.social-button__icon svg) {
      fill: var(--color-youtube);
    }
  }

  &.is_attached {
		background-color: var(--color-youtube-lightest);
		border-color: transparent;

    &:hover {
      background-color: rgba(var(--color-youtube), 0.05);
    }
  }
}

.trovo-button {
  background-color: var(--color-trovo);

  &:not(:disabled) {
    cursor: pointer;
  }

	&:not(:disabled):hover,
	&:not(:disabled):active {
		background-color: var(--color-trovo-darker);
	}

  &.is-plain {
    border: 1px solid var(--color-trovo);
    background-color: var(--el-color-white);
    color: var(--color-trovo);

		&:not(:disabled):hover,
		&:not(:disabled):active {
			background-color: var(--color-trovo-lighter);
		}

		._text-m-bold {
			color: var(--color-trovo);
		}

    :deep(.social-button__icon svg) {
      fill: var(--color-trovo);
    }
  }

  &.is_attached {
		background-color: var(--color-trovo-lightest);
		border-color: transparent;

    &:hover {
      background-color: rgba(var(--color-trovo), 0.05);
    }
  }
}

.vkplay-button {
  background-color: var(--color-vkplay);

  &:not(:disabled) {
    cursor: pointer;
  }

	&:not(:disabled):hover,
	&:not(:disabled):active {
		background-color: var(--color-vkplay-darker);
	}

  &.is-plain {
    border: 1px solid var(--color-vkplay);
    background-color: var(--el-color-white);
    color: var(--color-vkplay);

		&:not(:disabled):hover,
		&:not(:disabled):active {
			background-color: var(--color-vkplay-lighter);
		}

		._text-m-bold {
			color: var(--color-vkplay);
		}

    :deep(.social-button__icon svg) {
      fill: var(--color-vkplay);
    }
  }

  &.is_attached {
		background-color: var(--color-vkplay-lightest);
		border-color: transparent;

    &:hover {
      background-color: rgba(var(--color-vkplay), 0.05);
    }
  }
}

.tiktok-button {
  background-color: var(--color-tiktok);
	border-color: var(--color-tiktok-darker);

  &:not(:disabled) {
    cursor: pointer;
  }

	._text-m-bold {
		color: var(--color-tiktok-darker) !important;
	}

	&:not(:disabled):hover,
	&:not(:disabled):active {
		background-color: var(--color-tiktok-lightest);
	}

  /* &.is-plain {
    border: 1px solid var(--color-tiktok);
    background-color: var(--el-color-white);
    color: var(--color-tiktok);

		&:not(:disabled):hover,
		&:not(:disabled):active {
			background-color: var(--color-tiktok-lighter);
		}

    :deep(.social-button__icon svg) {
      fill: var(--color-tiktok);
    }
  } */

  &.is_attached {
		background-color: var(--color-tiktok-lightest);
		border-color: transparent;

    &:hover {
      background-color: var(--color-tiktok-lighter);

			._text-m-bold {
				color: var(--color-tiktok-darker) !important;
			}
    }
  }
}
</style>
