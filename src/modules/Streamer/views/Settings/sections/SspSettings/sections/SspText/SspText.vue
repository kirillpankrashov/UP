<template>
  <div
    v-if="widget && campaignsList.length"
    id="settings-ssp-text"
    data-test="settings-ssp-text"
  >
    <div class="_text-m-bold mb-2">
      {{ t('settings.ssp.text.title') }}
    </div>

    <ElFormItem class="!mb-4">
      <ElCheckbox
        v-model="model"
        @change="onChange"
        :disabled="campaignsStore.isFetchingActiveCampaigns"
      >
        {{ t('settings.ssp.text.label') }}

        <ElTooltip effect="light">
          <template #content>
            <div class="_text-s-regular max-w-[220px]">
              {{ t('settings.ssp.text.hint') }}
            </div>
          </template>
          <HelpIcon class="inline-block h-4 w-4 fill-dark-gray" />
        </ElTooltip>
      </ElCheckbox>
    </ElFormItem>

    <div class="grid gap-4 sm:grid-cols-2">
      <ElFormItem
        class="!m-0"
        :label="t('settings.ssp.text.frequency.label')"
      >
        <ElSelect
          v-model="widget.ssp.text.frequency"
          size="large"
        >
          <ElOption
            v-for="frequency in textFrequency"
            :key="frequency.value"
            :label="frequency.title"
            :value="frequency.value"
          />
        </ElSelect>
      </ElFormItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { watch } from 'vue'
import { onMounted } from 'vue'
import type { CheckboxValueType } from 'element-plus'

import { AdsetStatus } from '@/core/types'
import { isSspTextFormat } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { useDictStore } from '@/core/store'
import { ElCheckbox, ElFormItem, ElOption,ElSelect, ElTooltip } from '@/components/element-plus'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import HelpIcon from '@/assets/img/icons/help-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const model = ref()

const dictStore = useDictStore()
const settingsStore = useSettingsStore()
const campaignsStore = useCampaignsStore()

const widget = computed(() => settingsStore.widget)
const textFrequency = computed(() => dictStore.all?.sspTextFrequency)

const campaignsList = computed(() => ([
	...campaignsStore.activeCampaignsShort.data.active.filter(campaign => isSspTextFormat(campaign.format) && campaign.status === AdsetStatus.ACTIVE),
	...campaignsStore.activeCampaignsShort.data.inactive.filter(campaign => isSspTextFormat(campaign.format) && campaign.status === AdsetStatus.INACTIVE),
]))

const isEnabled = computed(() => campaignsList.value.every(campain => campain.status === AdsetStatus.ACTIVE))

const onChange = async (isActive: CheckboxValueType) => {
	await campaignsStore.changeSspTextCampaignsStatuses(isActive as boolean)
}

watch(isEnabled, () => model.value = isEnabled.value)

onMounted(() => model.value = isEnabled.value)

defineExpose({
	onChange,
	isEnabled,
})
</script>
