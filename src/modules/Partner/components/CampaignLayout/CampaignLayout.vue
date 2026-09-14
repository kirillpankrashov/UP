<template>
  <div
    data-name="partner-campaign-layout"
    class="relative"
  >
    <Sidebar :ad-entity-structure="adEntityStructure" />

    <div class="ml-[200px] min-h-screen w-[780px] px-10 pt-8 2xl:mx-auto">
      <slot />
    </div>

    <div
      class="group fixed right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-md"
      @click="closeIconClick"
    >
      <CloseIcon class="text-gray-500 h-3 w-3 fill-[var(--el-text-color-regular)] group-hover:fill-primary" />
    </div>

    <ElDialog
      v-model="dialogVisible"
      width="360px"
    >
      <h3 class="_headline-2 mb-6">
        {{ t('closeDialog.heading') }}
      </h3>
      <p class="_text-m-regular mb-6">
        {{ t('closeDialog.text') }}
      </p>

      <ElButton
        class="mb-4 w-full"
        size="large"
        type="primary"
        @click="dialogVisible = false"
      >
        <span class="_text-m-bold">{{ t('closeDialog.btnSave') }}</span>
      </ElButton>

      <ElButton
        class="w-full"
        size="large"
        type="primary"
        plain
        @click="$emit('closeAndReturn')"
      >
        <span class="_text-m-bold">{{ t('closeDialog.btnContinue') }}</span>
      </ElButton>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElButton, ElDialog } from '@/components/element-plus'
import { messages } from '@/modules/Partner/components/CampaignLayout/locales'
import type { ICampaignStructure } from '@/modules/Partner/views/FormCampaign/types'

import { Sidebar } from './sections'

import CloseIcon from '@/assets/img/icons/x.svg'

const emit = defineEmits(['closeAndReturn'])

const props = defineProps<{
  adEntityStructure: ICampaignStructure | null
	showCloseDialog?: boolean
}>()

const { t } = useLocale<typeof messages>(messages)

const dialogVisible = ref(false)

const closeIconClick = () => {
	if (props.showCloseDialog) {
		dialogVisible.value = true
	}
	else {
		emit('closeAndReturn')
	}
}
</script>
