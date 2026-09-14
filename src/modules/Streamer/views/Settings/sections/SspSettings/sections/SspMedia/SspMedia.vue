<template>
  <div
    v-if="widget && campaignsList.length"
    id="settings-ssp-media"
    data-test="settings-ssp-media"
    class="mb-6"
  >
    <div class="_text-m-bold mb-2">
      {{ t('settings.ssp.instream.title') }}
    </div>
    <ElFormItem>
      <ElCheckbox
        v-model="model"
        @change="onChange"
        :disabled="campaignsStore.isFetchingActiveCampaigns"
      >
        {{ t('settings.ssp.instream.label') }}

        <ElTooltip effect="light">
          <template #content>
            <div class="_text-s-regular max-w-[220px]">
              {{ t('settings.ssp.instream.hint') }}
            </div>
          </template>
          <HelpIcon class="inline-block h-4 w-4 fill-dark-gray" />
        </ElTooltip>
      </ElCheckbox>
    </ElFormItem>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { watch } from 'vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import type { CheckboxValueType } from 'element-plus'

import { AdsetStatus } from '@/core/types'
import { isExternalMediaFormat } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { ElCheckbox, ElFormItem, ElTooltip } from '@/components/element-plus'
import { useCampaignsStore } from '@/modules/Streamer/views/Campaigns/store'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

import HelpIcon from '@/assets/img/icons/help-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const model = ref()

const settingsStore = useSettingsStore()
const campaignsStore = useCampaignsStore()

const widget = computed(() => settingsStore.widget)

const campaignsList = computed(() => ([
	...campaignsStore.activeCampaignsShort.data.active.filter(campaign => isExternalMediaFormat(campaign.format) && campaign.status === AdsetStatus.ACTIVE),
	...campaignsStore.activeCampaignsShort.data.inactive.filter(campaign => isExternalMediaFormat(campaign.format) && campaign.status === AdsetStatus.INACTIVE),
]))

const isEnabled = computed(() => campaignsList.value.every(campain => campain.status === AdsetStatus.ACTIVE))

const onChange = async (isActive: CheckboxValueType) => {
	await campaignsStore.changeSspMediaCampaignsStatuses(isActive as boolean)
}

watch(isEnabled, () => model.value = isEnabled.value)

onMounted(() => model.value = isEnabled.value)

defineExpose({
	onChange,
	isEnabled,
})
</script>
