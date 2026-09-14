<template>
  <div
    id="settings-widgetlink-option-with-socket"
    data-name="settings-widgetlink-option-with-socket"
    data-test="settings-widgetlink-option-with-socket"
    class="mb-6"
  >
    <Collapse :label="t('settings.widgetLink.optionWithSocket.label')">
      <TextLink
        class="mb-4 inline-block no-underline"
        :href="$t('links.widgetSetup')"
        target="_blank"
      >
        {{ t('settings.widgetLink.optionWithSocket.helpWithSetup') }}
      </TextLink>

      <ElAlert
        :title="t('settings.widgetLink.optionWithSocket.warn')"
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
          {{ widget?.url || '' }}
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

      <CopyLink
        class="mb-4"
        :link="widget?.url || ''"
      />

      <ElForm
        :label-position="'top'"
      >
        <ElFormItem :label="t('settings.widgetLink.optionWithSocket.obsSocketPassPlaceholder')">
          <ElInput
            v-model="settingsStore!.widget!.obsWebSocket.pass"
            type="password"
            size="large"
            show-password
          />
        </ElFormItem>

        <ElFormItem
          class="!mb-0"
          :label="t('settings.widgetLink.optionWithSocket.obsSocketPortPlaceholder')"
        >
          <ElInput
            v-model="settingsStore!.widget!.obsWebSocket.port"
            size="large"
            type="number"
          />
        </ElFormItem>
      </ElForm>
    </Collapse>
  </div>
</template>

<script setup lang=ts>
import { computed, ref } from 'vue'

import { useLocale } from '@/core/hooks'
import { Collapse, CopyLink,TextLink } from '@/components'
import { ElAlert, ElForm, ElFormItem, ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import EyeIcon from '@/assets/img/icons/eye.svg'
import EyeClosedIcon from '@/assets/img/icons/eye-close.svg'

const { t } = useLocale<typeof messages>(messages)

const settingsStore = useSettingsStore()

const widget = computed(() => settingsStore.widget)

const bluredLink = ref(true)
</script>
