<template>
  <div
    id="settings-widgetlink-option-link"
    data-name="settings-widgetlink-option-link"
    data-test="settings-widgetlink-option-link"
    class="mb-6"
  >
    <Collapse :label="t('settings.widgetLink.optionLink.label')">
      <TextLink
        class="mb-4 inline-block no-underline"
        :href="$t('links.widgetSetupLink')"
        target="_blank"
      >
        {{ t('settings.widgetLink.optionLink.helpWithSetup') }}
      </TextLink>

      <ElAlert
        :title="t('settings.widgetLink.optionLink.warn')"
        type="success"
        show-icon
        :closable="false"
      />

      <div class="relative my-2 inline-block h-12 w-full overflow-hidden text-ellipsis rounded-[4px] bg-primary-50 bg-gradient-to-r px-4 text-black">
        <div
          data-test="settings-widgetlink-option-link-input"
          class="whitespace-nowrap leading-[48px]"
          :class="{'blur-sm': bluredLink}"
        >
          {{ url }}
        </div>

        <div class="absolute right-4 top-4 z-20 cursor-pointer select-none">
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

      <CopyLink :link="url" />
    </Collapse>
  </div>
</template>

<script setup lang=ts>
import { ref } from 'vue'

import { useLocale } from '@/core/hooks'
import { Collapse, CopyLink,TextLink } from '@/components'
import { ElAlert } from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Settings/locales'

import EyeIcon from '@/assets/img/icons/eye.svg'
import EyeClosedIcon from '@/assets/img/icons/eye-close.svg'

const { t } = useLocale<typeof messages>(messages)

defineProps<{
  url: string
}>()

const bluredLink = ref(true)
</script>
