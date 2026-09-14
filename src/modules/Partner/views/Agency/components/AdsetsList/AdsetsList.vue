<template>
  <div data-name="partner-agency-adsets-list">
    <DashboardSection no-border>
      <template #left>
        <div class="_text-m-bold">
          {{ title }}
        </div>
      </template>
      <div class="_text-m-regular">
        {{ description }}
      </div>
    </DashboardSection>

    <DashboardSection no-border>
      <template #left>
        <ElSelect
          v-model="selectedType"
          class="w-60"
          :disabled="adsetsStore.isFetchingData"
          @change="onTypeChange"
        >
          <template #label="{ label }">
            <span class="font-bold">{{ label }}</span>
          </template>
          <ElOption
            v-for="item in campaignTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </template>
    </DashboardSection>

    <div>
      <AdsetsListSkeleton v-if="showInitialSkeleton" />

      <div v-else-if="adsetsStore.adsets?.data?.length">
        <AdsetCard
          v-for="adset in adsetsStore.adsets.data"
          :key="adset.id"
          :adset="adset"
          :adsets-store="adsetsStore"
        />
      </div>

      <div
        v-else
        class="_headline-2 pt-10 text-center text-lightest-gray"
      >
        {{ t('creators.campaigns.none') }}
      </div>

      <ElPagination
        v-if="!showInitialSkeleton && adsetsStore.adsets?.data?.length"
        class="mt-6"
        layout="prev, pager, next"
        :prev-text="t('pagination.prev')"
        :next-text="t('pagination.next')"
        :page-size="adsetsStore.adsets.perPage"
        :current-page="adsetsStore.adsets.page"
        :total="adsetsStore.adsets.total"
        hide-on-single-page
        @current-change="onChangePage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { CampaignType } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { ElOption, ElPagination, ElSelect } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Partner/views/Agency/locales'
import type { useAdsetsActiveStore, useAdsetsClosedStore } from '@/modules/Partner/views/Agency/store'

import { AdsetCard } from '../'

import AdsetsListSkeleton from './AdsetsListSkeleton.vue'

const props = defineProps<{
	title: string
	description: string
	adsetsStore: ReturnType<typeof useAdsetsActiveStore> | ReturnType<typeof useAdsetsClosedStore>
}>()

const { t } = useLocale<typeof messages>(messages)

const campaignTypeOptions = [
	{
		value: CampaignType.BRAND_AWARENESS,
		label: 'Sponsorship',
	},
	{
		value: CampaignType.PERFORMANCE,
		label: 'Interactive',
	},
	{
		value: CampaignType.PREROLL,
		label: 'Pre-Roll',
	},
	// {
	// 	value: CampaignType.EXTENSION,
	// 	label: 'Extension',
	// },
	// {
	// 	value: CampaignType.SPECIAL_PROJECT,
	// 	label: 'Special Project',
	// },
]

const selectedType = ref<CampaignType>(campaignTypeOptions[0].value)

const showInitialSkeleton = computed(() => {
	return props.adsetsStore.isFetchingData && !props.adsetsStore.adsets?.data?.length
})

const onTypeChange = (type: CampaignType) => {
	selectedType.value = type
	props.adsetsStore.setTypeCompany(type)
	props.adsetsStore.getAdsets(1)
}

const onChangePage = (page: number) => {
	props.adsetsStore.getAdsets(page)
}
</script>
