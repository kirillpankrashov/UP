<template>
  <ElRadioGroup
    v-model="adEntityType"
    @change="onChange"
  >
    <ElRadioButton
      v-if="campaignTypeCollection.includes(AdEntityType.CAMPAIGNS)"
      :label="AdEntityType.CAMPAIGNS"
      :value="AdEntityType.CAMPAIGNS"
      class="group"
    >
      <div class="flex items-center justify-center gap-2">
        <FolderIcon
          class="w-5 fill-black transition group-hover:fill-primary"
          :class="{'fill-primary': adEntityType === AdEntityType.CAMPAIGNS}"
        />
        <span class="_text-m-bold">{{ t('campaigns.types.campaign') }}</span>
      </div>
    </ElRadioButton>

    <ElRadioButton
      v-if="campaignTypeCollection.includes(AdEntityType.ADSETS)"
      :label="AdEntityType.ADSETS"
      :value="AdEntityType.ADSETS"
      class="group"
    >
      <div class="flex items-center justify-center gap-2">
        <SmallGridIcon
          class="w-4 fill-black transition group-hover:fill-primary"
          :class="{'fill-primary': adEntityType === AdEntityType.ADSETS}"
        />
        <span class="_text-m-bold">{{ t('campaigns.types.group') }}</span>
      </div>
    </ElRadioButton>

    <ElRadioButton
      v-if="campaignTypeCollection.includes(AdEntityType.CREATIVES)"
      :label="AdEntityType.CREATIVES"
      :value="AdEntityType.CREATIVES"
      class="group"
    >
      <div class="flex items-center justify-center gap-2">
        <CreativeIcon
          class="w-5 fill-black transition group-hover:fill-primary"
          :class="{'fill-primary': adEntityType === AdEntityType.CREATIVES}"
        />
        <span class="_text-m-bold">{{ t('campaigns.types.creative') }}</span>
      </div>
    </ElRadioButton>
  </ElRadioGroup>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { AdEntityType } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { ElRadioButton, ElRadioGroup } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

import CreativeIcon from '@/assets/img/icons/creative.svg'
import FolderIcon from '@/assets/img/icons/folder.svg'
import SmallGridIcon from '@/assets/img/icons/small-grid.svg'

const { t } = useLocale<typeof messages>(messages)

const router = useRouter()

const campaignsStore = useCampaignsStore()

const campaignType = computed(() => campaignsStore.campaignType)
const adEntityType = computed(() => campaignsStore.adEntityType || AdEntityType.CAMPAIGNS)
const campaignTypeCollection = computed(() => campaignsStore.campaignTypeCollection.get(campaignType.value))

const onChange = (val: any) => {
	const routeName = campaignsStore.collectionRoute.get(`${campaignType.value}:${val as AdEntityType}`)
	router.push({ name: routeName })
}
</script>
