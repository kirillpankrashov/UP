<template>
  <ElTableColumn
    fixed="right"
    width="60"
    align="center"
  >
    <template #header>
      <span class="flex w-full cursor-pointer items-center justify-center">
        <ElPopover
          placement="left-start"
          trigger="click"
          :width="200"
        >
          <template #reference>
            <FilterIcon class="h-4 w-4 fill-gray" />
          </template>
          <div>
            <div class="_text-caption-caps mb-2 whitespace-nowrap">{{ t('campaigns.tables.columns.filterLabel') }}</div>

            <div
              v-for="(_, key) in modelValue"
              :key="key"
            >
              <ElCheckbox
                v-if="modelValue"
                v-model="modelValue[key]"
                :name="key"
                @change="onChange"
              >
                {{ columnNames[key] }}
              </ElCheckbox>
            </div>
          </div>
        </ElPopover>
      </span>
    </template>

    <template
      v-if="showAnalytics"
      #default="{ row }: {row: AdEntityCampaign}"
    >
      <router-link
        :to="getAnalyticsRoute(row)"
        class="text-center"
      >
        <ChartIcon class="inline-block h-5 w-5 fill-[var(--el-color-gray)] hover:fill-primary" />
      </router-link>
    </template>
  </ElTableColumn>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationNamedRaw } from 'vue-router'
import moment from 'moment'

import { AdEntityType } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { ElCheckbox, ElPopover, ElTableColumn } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { TABLE_FILTER_KEY } from '@/modules/Partner/views/Campaigns/consts'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'
import type { AdEntity, AdEntityAdset, AdEntityCampaign, AdEntityCreative } from '@/modules/Partner/views/Campaigns/types'

import ChartIcon from '@/assets/img/icons/pie-chart.svg'
import FilterIcon from '@/assets/img/icons/table-filter-icon.svg'

withDefaults(defineProps<{
  showAnalytics?: boolean
}>(), {
	showAnalytics: true,
})

const { t, tm } = useLocale<typeof messages>(messages)

const columnNames = tm('campaigns.tables.columns')

const modelValue = defineModel<Partial<Record<keyof typeof columnNames, boolean>>>()

const campaignsStore = useCampaignsStore()

const campaignType = computed(() => campaignsStore.campaignType)
const adEntityType = computed(() => campaignsStore.adEntityType)

const onChange = () => {
	if (!campaignType.value || !adEntityType.value) {
		return
	}

	const filter = JSON.parse(window.localStorage.getItem(TABLE_FILTER_KEY) || '{}')

	filter[campaignType.value] = {
		[adEntityType.value]: modelValue.value,
	}

	window.localStorage.setItem(TABLE_FILTER_KEY, JSON.stringify(filter))
}

const getAnalyticsRoute = (row: AdEntity): RouteLocationNamedRaw => {
	let campaignSlug = null
	let dates = null

	switch (adEntityType.value) {
		case AdEntityType.CAMPAIGNS:
			campaignSlug = (row as AdEntityCampaign).slug
			dates = (row as AdEntityCampaign).dates
			break
		case AdEntityType.ADSETS:
			campaignSlug = (row as AdEntityAdset).campaign.slug
			dates = (row as AdEntityAdset).dates
			break
		case AdEntityType.CREATIVES:
			campaignSlug = (row as AdEntityCreative).adSet.campaign.slug
			dates = (row as AdEntityCreative).adSet.dates
			break
	}

	if (!dates || !campaignSlug) {
		return {} as RouteLocationNamedRaw
	}

	return {
		name: RouteName.ANALYTICS,
		params: {
			campaignSlug,
		},
		query: {
			start: moment(dates.start, 'DD.MM.YYYY').format('YYYY-MM-DD'),
			end: moment(dates.end, 'DD.MM.YYYY').subtract(1, 'days').format('YYYY-MM-DD'),
		},
		hash: adEntityType.value !== AdEntityType.CAMPAIGNS ? '#creatives' : undefined,
	}
}
</script>
