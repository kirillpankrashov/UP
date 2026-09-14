<template>
  <div
    id="settings-widgetlink-option-drag"
    data-name="settings-widgetlink-option-drag"
    data-test="settings-widgetlink-option-drag"
    class="mb-6"
  >
    <Collapse
      :label="t('settings.widgetLink.optionDrag.label')"
      :collapsed="false"
    >
      <TextLink
        class="mb-4 inline-block no-underline"
        :href="t('links.widgetSetupDrag')"
        target="_blank"
      >
        {{ t('settings.widgetLink.optionDrag.helpWithSetup') }}
      </TextLink>

      <ElAlert
        :title="t('settings.widgetLink.optionDrag.warn')"
        type="success"
        show-icon
        :closable="false"
      />

      <a
        data-test="settings-widgetlink-option-drag-link"
        class="mt-2 inline-block cursor-move whitespace-nowrap rounded-[4px] border border-dotted border-primary bg-white px-5 py-4 text-sm font-bold leading-none text-primary no-underline"
        :href="dragUrl"
      >{{ t('settings.widgetLink.optionDrag.btn') }}</a>
    </Collapse>
  </div>
</template>

<script setup lang=ts>
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { Collapse, TextLink } from '@/components'
import { ElAlert } from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Settings/locales'

const { t } = useLocale<typeof messages>(messages)

const props = defineProps<{
  url: string
}>()

const dragUrl = computed(() => props.url + '/?layer-name=Uplify&layer-width=1920&layer-height=1080')
</script>
