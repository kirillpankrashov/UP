<template>
  <ElFormItem
    data-name="partner-form-adset-targeting-streamers"
    data-test="adset-form-targeting-streamers-item"
    :label="t('adset.targeting.form.streamers.label')"
    prop="targeting.streamers"
  >
    <ElTable
      v-if="model.targeting.streamers.length"
      :data="tableItems"
      class="mb-4 w-full"
      size="small"
    >
      <ElTableColumn :label="t('adset.targeting.form.streamers.nameColumn')">
        <template #default="{ row }">
          <div class="flex items-center gap-2">
            <div
              v-if="row.avatar"
              class="h-6 w-6 shrink-0 rounded-full bg-cover bg-center"
              :style="{ backgroundImage: `url(${row.avatar})` }"
            />
            <SocialIcon
              v-if="row.platformName"
              :platform="row.platformName"
              class="h-4 w-4 shrink-0"
            />
            <span>{{ row.name }}</span>
          </div>
        </template>
      </ElTableColumn>

      <ElTableColumn
        prop="price"
        :label="t('adset.targeting.form.streamers.priceColumn')"
        width="120"
      >
        <template #default="{ row }">
          {{ formatCurrency(row.price, true, props.currency?.code) }}
        </template>
      </ElTableColumn>

      <ElTableColumn
        width="60"
        align="center"
      >
        <template #default="{ row }">
          <ElButton
            type="danger"
            link
            :disabled="disabled"
            @click="removeStreamer(row.id)"
          >
            ✕
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>

    <div class="flex w-full gap-3">
      <ElSelect
        v-model="selectedStreamerId"
        data-test="adset-form-targeting-streamers-select"
        :placeholder="t('adset.targeting.form.streamers.placeholder')"
        :disabled="disabled"
        :loading="loading"
        :remote-method="onSearch"
        size="large"
        remote
        filterable
        clearable
        class="flex-1"
      >
        <ElOption
          v-for="item in searchResults"
          :key="item.id"
          :value="item.id"
          :label="item.name"
          :data-test="`adset-form-targeting-streamers-option-${item.id}`"
        >
          <div class="flex items-center">
            <div
              v-if="item.platform?.avatar"
              class="mr-2 h-6 w-6 rounded-full bg-cover bg-center"
              :style="{ backgroundImage: `url(${item.platform?.avatar})` }"
            />
            {{ item.name }}
            <SocialIcon
              v-if="item.platform"
              :platform="item.platform.name"
              class="ml-2 h-4 w-4"
            />
          </div>
        </ElOption>
      </ElSelect>

      <ElInputNumber
        v-model="selectedPrice"
        :min="0"
        :placeholder="t('adset.targeting.form.streamers.pricePlaceholder')"
        :disabled="disabled"
        size="large"
        class="w-28"
        :controls="false"
        :precision="2"
      >
        <template #prefix>
          <span class="text-gray">{{ props.currency?.flag }}&nbsp;</span>
        </template>
      </ElInputNumber>

      <ElButton
        type="primary"
        size="large"
        :disabled="disabled || selectedStreamerId === null || !selectedPrice"
        @click="addStreamer"
      >
        <span class="_text-m-bold">{{ t('adset.targeting.form.streamers.addBtn') }}</span>
      </ElButton>
    </div>
  </ElFormItem>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { debounce } from 'lodash'

import { CurrencyName, type ICurrencyDict,Platform } from '@/core/types'
import { Logger } from '@/core/helpers'
import { useCurrency, useLocale } from '@/core/hooks'
import { SocialIcon } from '@/components'
import { ElButton, ElFormItem, ElInputNumber, ElOption, ElSelect, ElTable, ElTableColumn } from '@/components/element-plus'
import { type ITargetingStreamerSearch, searchStreamers } from '@/modules/Partner/views/FormAdset/api'
import { messages } from '@/modules/Partner/views/FormAdset/locales'

const { t } = useLocale<typeof messages>(messages)

const model = defineModel<{
	targeting: {
		streamers: Array<{ id: number; price: number }>
	}
}>({ required: true })

const props = defineProps<{
  currency?: ICurrencyDict
	platform: Platform
	disabled: boolean
}>()

const { formatCurrency } = useCurrency()

const searchResults = ref<ITargetingStreamerSearch[]>([])
const knownStreamers = ref(new Map<number, ITargetingStreamerSearch>())
const loading = ref(false)
const selectedStreamerId = ref<number | null>(null)
const selectedPrice = ref<number | undefined>(undefined)

const tableItems = computed(() =>
	model.value.targeting.streamers.map(s => {
		const known = knownStreamers.value.get(s.id)
		return {
			id: s.id,
			name: known?.name ?? `#${s.id}`,
			price: s.price,
			avatar: known?.platform?.avatar ?? '',
			platformName: known?.platform?.name ?? null,
		}
	}),
)

const onSearch = debounce(async (value: string) => {
	if (props.disabled || value.length < 3) return

	loading.value = true

	try {
		const results = await searchStreamers(props.platform, { query: value }, true)

		results.forEach(s => knownStreamers.value.set(s.id, s))
		searchResults.value = results
	}
	catch (err) {
		Logger.error('Error searching streamers', true, err)
	}
	finally {
		loading.value = false
	}
}, 500)

const addStreamer = () => {
	if (selectedStreamerId.value === null || !selectedPrice.value) return

	const alreadyAdded = model.value.targeting.streamers.some(s => s.id === selectedStreamerId.value)

	if (!alreadyAdded) {
		model.value.targeting.streamers = [
			...model.value.targeting.streamers,
			{ id: selectedStreamerId.value, price: selectedPrice.value },
		]
	}

	selectedStreamerId.value = null
	selectedPrice.value = undefined
	searchResults.value = []
}

const removeStreamer = (id: number) => {
	model.value.targeting.streamers = model.value.targeting.streamers.filter(s => s.id !== id)
}
</script>
