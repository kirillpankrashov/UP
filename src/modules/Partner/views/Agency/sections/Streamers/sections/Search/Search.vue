<template>
  <div
    data-name="partner-agency-streamers-search"
    data-test="partner-agency-streamers-search"
  >
    <ElInput
      v-model="searchValue"
      :placeholder="t('placeholder.partnerSearch')"
      @input="onSearch"
      :disabled="!streamersStore.isBootstrapped"
    >
      <template #prefix>
        <SearchIcon class="h-4 w-4 fill-gray" />
      </template>
    </ElInput>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { debounce } from 'lodash'

import { useLocale } from '@/core/hooks'
import { ElInput } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Agency/locales'
import { useAgencyStreamersStore } from '@/modules/Partner/views/Agency/store'

import SearchIcon from '@/assets/img/icons/search-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const streamersStore = useAgencyStreamersStore()

const searchValue = ref('')

const onSearch = debounce((value: string) => {
	streamersStore.fetchStreamers(1, false, value)
}, 600)
</script>
