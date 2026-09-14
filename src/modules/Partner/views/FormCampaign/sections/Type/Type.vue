<template>
  <div data-name="partner-form-campaign-type-selector">
    <div class="mb-6 flex flex-col gap-4">
      <TypeItem
        v-for="item in availableTypes"
        :key="item.id"
        :item="item"
        :disabled="disabled"
        :value="model"
        @update:value="onUpdate"
      />
    </div>

    <div
      v-if="comingSoonTypes.length"
      class="_text-s-regular mb-4"
    >
      {{ t('campaign.type.comingSoon') }}
    </div>

    <div class="flex flex-col gap-4">
      <TypeItem
        v-for="item in comingSoonTypes"
        :key="item.id"
        :item="item"
        :value="model"
        @update:value="onUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { CampaignType } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { useDictStore } from '@/core/store'
import { messages } from '@/modules/Partner/views/FormCampaign/locales'

import { TypeItem } from './components'

const props = withDefaults(defineProps<{
  disabled?: boolean
}>(), {
	disabled: false,
})

const model = defineModel<CampaignType | null>()

const { t } = useLocale<typeof messages>(messages)

const dictStore = useDictStore()

const types = computed(() => dictStore.campaigns?.types)

const availableTypes = computed(() => types.value?.filter(item => item.visible) || [])
const comingSoonTypes = computed(() => types.value?.filter(item => !item.visible) || [])

const onUpdate = (value: string) => {
	if (!value || props.disabled) return

	model.value = value as CampaignType
}
</script>
