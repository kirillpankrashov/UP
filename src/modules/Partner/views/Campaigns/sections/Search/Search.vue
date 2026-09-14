<template>
  <div class="w-[258px] shrink-0">
    <ElInput
      data-test="filter-search-input"
      v-model="searchValue"
      :placeholder="t('placeholder.partnerSearch')"
      @input="onInput"
    >
      <template #suffix>
        <SearchIcon class="h-4 w-4" />
      </template>
    </ElInput>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { debounce } from 'lodash'

import { CampaignType } from '@/core/types'
import { parseSlug } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

import SearchIcon from '@/assets/img/icons/search-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const router = useRouter()
const route = useRoute()

const campaignsStore = useCampaignsStore()

const searchValue = ref(route.query.name as string || route.query.slug as string || '')

const onInput = debounce(async () => {
	if (searchValue.value === '') {
		await router.replace({ query: { ...route.query, name: undefined, slug: undefined } })
	}
	else {

		const searchValueTrimed = searchValue.value.trim()
		const { campaignType } = parseSlug(searchValueTrimed)

		if (Object.values(CampaignType).includes(campaignType as unknown as CampaignType)) {
			await router.push({ query: { ...route.query, page: undefined, name: undefined, slug: searchValueTrimed } })
		}
		else {
			await router.push({ query: { ...route.query, page: undefined, name: searchValueTrimed, slug: undefined } })
		}
	}

	campaignsStore.fetchCollection()
}, 600)
</script>
