<template>
  <SocialButton
    ref="discordButton"
    class="discord-button"
    :request-url="requestUrl || 'streamer/attach/discord'"
    @open-scope="discordButton?.auth()"
  >
    <template #icon>
      <DiscordIcon class="h-[24px] w-[32px] fill-white" />
    </template>

    <div class="_text-m-bold text-white">
      <slot v-if="$slots.default" />
      <template v-else>
        Join Discord
      </template>
    </div>
  </SocialButton>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import SocialButton from '@/components/AuthButton/SocialButton.vue'

import DiscordIcon from '@/assets/img/icons/discord-plain-icon.svg'

const discordButton = ref<InstanceType<typeof SocialButton>>()

defineProps<{
  requestUrl?: string
}>()
</script>

<style lang="scss" scoped>
.discord-button {
  background-color: var(--color-discord);

  &:not(:disabled) {
    cursor: pointer;
  }

  &:not(:disabled):hover,
	&:not(:disabled):active {
    background-color: var(--color-discord-darker);
  }

  &.is-plain {
    border: 1px solid var(--color-discord);
    background-color: var(--el-color-white);

		&:not(:disabled):hover,
		&:not(:disabled):active {
			background-color: var(--color-discord-lighter);
		}

		._text-m-bold {
			color: var(--color-discord);
		}

    :deep(.social-button__icon svg path) {
      fill: var(--color-discord);
    }
  }

  &.is_attached {
    background-color: var(--color-discord-lightest);
		border-color: transparent;

    &:hover {
      background-color: rgba(var(--color-discord), 0.05);
    }
  }
}
</style>
