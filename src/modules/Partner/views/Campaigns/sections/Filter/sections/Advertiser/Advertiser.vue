<template>
  <div class="relative shrink-0">
    <button
      data-test="filter-advertiser-close-btn"
      class="group absolute right-2 top-1/2 z-10 h-4 w-4 -translate-y-1/2 border-none bg-transparent"
      @click="$emit('close')"
    >
      <CloseMenuIcon class="h-4 w-4 fill-black group-hover:fill-primary" />
    </button>

    <ElSelect
      v-model="selectedAdvertiser"
      collapse-tags
      collapse-tags-tooltip
      filterable
      :show-arrow="false"
      @change="onSelect"
    >
      <ElOption
        :label="t('campaigns.partnerSearchFilter.allAdvertisers')"
        :value="''"
      />
      <ElOption
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </ElSelect>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useLocale } from '@/core/hooks'
import { ElOption, ElSelect } from '@/components/element-plus'
import { useAdvertisersStore } from '@/modules/Partner/views/Advertisers/store'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

import CloseMenuIcon from '@/assets/img/icons/close-menu-icon.svg'

defineEmits(['close'])

const { t } = useLocale<typeof messages>(messages)

const router = useRouter()
const route = useRoute()

const campaignsStore = useCampaignsStore()
const advertisersStore = useAdvertisersStore()

const selectedAdvertiser = ref(route.query.advertiser || '')
const advertisers = computed(() => advertisersStore.advertisers)

const options = computed(() => {
	if (!advertisers.value) return []
	return advertisers.value.map(item => {
		return {
			value: item.id.toString(),
			label: item.title,
		}
	})
})

const onSelect = async () => {
	if (selectedAdvertiser.value === '') {
		await router.replace({ query: { ...route.query, page: undefined, advertiser: undefined } })
	}
	else {
		await router.push({ query: { ...route.query, page: undefined, advertiser: selectedAdvertiser.value } })
	}

	campaignsStore.fetchCollection()
}

onMounted(async () => {
	await advertisersStore.fetchAdvertisers()
	onSelect()
})

onBeforeUnmount(async () => {
	await router.replace({ query: { ...route.query, page: undefined, advertiser: undefined } })
	campaignsStore.fetchCollection()
})
</script>
