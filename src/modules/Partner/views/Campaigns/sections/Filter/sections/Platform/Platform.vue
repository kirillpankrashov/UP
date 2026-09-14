<template>
  <div class="relative shrink-0">
    <button
      data-test="filter-platform-close-btn"
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
          class="!justify-start !pr-7"
        >
          <div class="filter-item__btn">
            {{ t('campaigns.partnerSearchFilter.platform') }}: {{ platform }}
          </div>
        </ElButton>
      </template>

      <div class="space-y-4">
        <ElRadioGroup
          v-model="platform"
          @change="onChange"
        >
          <div class="flex flex-col">
            <ElRadio :label="Platform.TWITCH">
              <span class="_text-m-regular">Twitch</span>
            </ElRadio>
          </div>
          <div class="flex flex-col">
            <ElRadio :label="Platform.YOUTUBE">
              <span class="_text-m-regular">Youtube</span>
            </ElRadio>
          </div>
          <div class="flex flex-col">
            <ElRadio :label="Platform.TROVO">
              <span class="_text-m-regular">Trovo</span>
            </ElRadio>
          </div>
          <div class="flex flex-col">
            <ElRadio :label="Platform.VK_PLAY">
              <span class="_text-m-regular">VK Play</span>
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

import { Platform } from '@/core/types'
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

const platform = ref(route.query.platform as Platform)

const onChange = async () => {
	if (platform.value === null) {
		return
	}

	await router.push({ query: { ...route.query, page: undefined, platform: platform.value } })
	campaignsStore.fetchCollection()
}

onMounted(onChange)

onBeforeUnmount(async () => {
	await router.replace({ query: { ...route.query, page: undefined, platform: undefined } })
	campaignsStore.fetchCollection()
})
</script>
