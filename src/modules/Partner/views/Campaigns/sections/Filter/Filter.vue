<template>
  <div
    class="flex flex-1 shrink-0"
    :class="{'_collapsed-btn': someFiltersActive}"
  >
    <Status
      v-if="filters.status.visible && filters.status.available"
      @close="() => filters.status.visible = false"
    />
    <Platform
      v-if="filters.platform.visible && filters.platform.available"
      @close="() => filters.platform.visible = false"
    />
    <Advertiser
      v-if="filters.advertiser.visible && filters.advertiser.available"
      @close="() => filters.advertiser.visible = false"
    />

    <ElPopover
      placement="bottom-start"
      :show-arrow="false"
      v-model="filterListVisible"
      trigger="click"
    >
      <template #reference>
        <ElButton
          data-test="filter-btn"
          plain
          class="w-full"
          size="default"
          v-if="!allFiltersActive"
        >
          <div class="group flex w-full justify-between gap-2">
            <span :class="{'hidden': someFiltersActive}">{{ t('campaigns.partnerSearchFilter.add') }}</span>
            <PlusIcon class="h-3 w-3 fill-[var(--el-text-color-regular)] group-hover:fill-primary" />
          </div>
        </ElButton>
      </template>

      <ul class="space-y-4">
        <li
          v-for="filter in filters"
          :key="filter.title"
          v-show="!filter.visible && filter.available"
        >
          <button
            @click="filter.visible = true; filterListVisible = false"
            class="_text-m-regular background-transparent border-none p-0"
          >
            {{ filter.title }}
          </button>
        </li>
      </ul>
    </ElPopover>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { AdEntityType } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { ElButton, ElPopover } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

import { Advertiser, Platform, Status } from './sections'

import PlusIcon from '@/assets/img/icons/plus.svg'

const { t } = useLocale<typeof messages>(messages)

const route = useRoute()

const campaignsStore = useCampaignsStore()

const filters = ref({
	status: {
		title: t('campaigns.partnerSearchFilter.status'),
		visible: false,
		available: true,
	},
	platform: {
		title: t('campaigns.partnerSearchFilter.platform'),
		visible: false,
		available: false,
	},
	advertiser: {
		title: t('campaigns.partnerSearchFilter.advertiser'),
		visible: false,
		available: true,
	},
})

const filterListVisible = ref(false)

const someFiltersActive = computed(() => (
	Object.values(filters.value)
		.some(platform => platform.visible)),
)
const allFiltersActive = computed(() => (
	Object.values(filters.value)
		.every(platform => platform.visible)),
)

const collectionsType = computed(() => campaignsStore.adEntityType)

const setAvailableFilters = () => {
	if (collectionsType.value !== AdEntityType.ADSETS) {
		filters.value.platform.available = false
		filters.value.platform.visible = false
	}
	if (collectionsType.value === AdEntityType.ADSETS) {
		filters.value.platform.available = true
		filters.value.platform.visible = !!route.query.platform
	}

	filters.value.advertiser.visible = !!route.query.advertiser
	filters.value.status.visible = !!route.query.visible
}

onMounted(setAvailableFilters)

watch(collectionsType, setAvailableFilters)

defineExpose({
	filterListVisible,
	filters,
	someFiltersActive,
	allFiltersActive,
})
</script>
