<template>
  <div data-name="partner-advertisers">
    <div class="mb-8 max-w-[260px]">
      <ElInput
        v-model="searchValue"
        :placeholder="t('placeholder.partnerSearch')"
      >
        <template #prefix>
          <SearchIcon class="h-4 w-4 fill-gray" />
        </template>
      </ElInput>
    </div>

    <ElTable
      :data="filteredAdvertisers || []"
      style="width: 100%"
    >
      <ElTableColumn
        label="ID"
        width="84"
        prop="id"
      />

      <ElTableColumn
        :label="t('advertisers.advertisers.table.advertiser')"
        width="240"
        prop="title"
      />

      <ElTableColumn
        :label="t('advertisers.advertisers.table.currency')"
        width="100"
      >
        <template #default="{ row }">
          {{ row.wallet.currency.code.toUpperCase() }}
        </template>
      </ElTableColumn>

      <ElTableColumn
        :label="t('advertisers.advertisers.table.balance')"
        width="180"
      >
        <template #default="{ row }">
          <Progress
            :current="row.wallet.balance"
            :total="row.wallet.balance"
            :text="formatCurrency(row.wallet.balance, false, row.wallet.currency.code.toLocaleLowerCase())"
          />
        </template>
      </ElTableColumn>

      <ElTableColumn
        :label="t('advertisers.advertisers.table.links')"
      >
        <template #default="{ row }">
          <div class="flex items-center">
            <router-link :to="{name: RouteName.BRAND_AWARENESS_CAMPAIGNS, query: { advertiser: row.id.toString() }}">
              {{ t('advertisers.advertisers.links.campaigns') }}
            </router-link>

            <div class="mx-2 h-4 w-[1px] bg-gray" />

            <router-link :to="{name: RouteName.BRAND_AWARENESS_ADSETS, query: { advertiser: row.id.toString() }}">
              {{ t('advertisers.advertisers.links.groups') }}
            </router-link>

            <div class="mx-2 h-4 w-[1px] bg-gray" />

            <router-link :to="{name: RouteName.BRAND_AWARENESS_CREATIVES, query: { advertiser: row.id.toString() }}">
              {{ t('advertisers.advertisers.links.creatives') }}
            </router-link>
          </div>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { useCurrency, useLocale } from '@/core/hooks'
import { Progress } from '@/components'
import { ElInput, ElTable, ElTableColumn } from '@/components/element-plus'
import { RouteName } from '@/modules/Partner/router'
import { messages } from '@/modules/Partner/views/Advertisers/locales'
import { useAdvertisersStore } from '@/modules/Partner/views/Advertisers/store'

import SearchIcon from '@/assets/img/icons/search-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency } = useCurrency()

const searchValue = ref('')
const advertisersStore = useAdvertisersStore()

const filteredAdvertisers = computed(() => {
	if (searchValue.value === '') {
		return advertisersStore.advertisers
	}

	return advertisersStore.advertisers?.filter(advertiser => {
		return advertiser.id.toString().includes(searchValue.value) || advertiser.title.toLowerCase().includes(searchValue.value.toLowerCase())
	})
})

onMounted(() => {
	advertisersStore.fetchAdvertisers()
})
</script>
