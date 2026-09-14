<template>
  <div class="relative shrink-0">
    <button
      data-test="filter-status-close-btn"
      class="group absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 border-none bg-transparent"
      @click="$emit('close')"
    >
      <CloseMenuIcon class="h-4 w-4 fill-black group-hover:fill-primary" />
    </button>

    <ElPopover
      placement="bottom-start"
      :show-arrow="false"
    >
      <template #reference>
        <ElButton
          plain
          class="w-[136px] !justify-start"
        >
          {{ t('campaigns.partnerSearchFilter.status') }}: {{ status !== null ? status ? 'On' : 'Off' : '' }}
        </ElButton>
      </template>

      <div class="space-y-4">
        <ElRadioGroup
          v-model="status"
          @change="onChange"
        >
          <div class="flex flex-col">
            <ElRadio :label="1">
              <span class="_text-m-regular">On</span>
            </ElRadio>
            <ElRadio :label="0">
              <span class="_text-m-regular">Off</span>
            </ElRadio>
          </div>
        </ElRadioGroup>
      </div>
    </ElPopover>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useLocale } from '@/core/hooks'
import { ElButton, ElPopover, ElRadio, ElRadioGroup } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

import CloseMenuIcon from '@/assets/img/icons/close-menu-icon.svg'

defineEmits(['close'])

const { t } = useLocale<typeof messages>(messages)

const router = useRouter()
const route = useRoute()

const campaignsStore = useCampaignsStore()

const status = ref((route.query.visible || 1) as number)

const onChange = async () => {
	if (status.value === null) {
		return
	}

	await router.push({ query: { ...route.query, page: undefined, visible: status.value } })
	campaignsStore.fetchCollection()
}

onMounted(onChange)

onBeforeUnmount(async () => {
	await router.replace({ query: { ...route.query, page: undefined, visible: undefined } })
	campaignsStore.fetchCollection()
})
</script>
