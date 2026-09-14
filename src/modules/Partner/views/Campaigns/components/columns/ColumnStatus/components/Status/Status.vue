<template>
  <ElPopover
    trigger="hover"
    popper-class="status-campaign-popover"
    placement="top"
    :disabled="!disabledReason"
  >
    <template #reference>
      <ElSwitch
        :class="{'el-switch_pending': pending}"
        style="--el-switch-on-color: var(--el-color-success); --el-switch-off-color: var(--el-color-danger)"
        :model-value="row.visible"
        :disabled="parentIsDisabled"
        :loading="pending"
        @input="onChange"
        active-text="On"
        inactive-text="Off"
        inline-prompt
      />
    </template>
    {{ disabledReason }}
  </ElPopover>
</template>

<script setup lang="ts">

import { computed, ref } from 'vue'

import { AdEntityType } from '@/core/types'
import { parseSlug } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { ElPopover, ElSwitch } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Campaigns/locales'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'
import type { AdEntity, AdEntityAdset, AdEntityCampaign, AdEntityCreative } from '@/modules/Partner/views/Campaigns/types'

const props = defineProps<{
	row: AdEntity
}>()

const { t } = useLocale<typeof messages>(messages)

const campaignsStore = useCampaignsStore()

const pending = ref(false)

const parentIsDisabled = computed(() => {
	const { adEntityType } = parseSlug(props.row.slug)

	switch(adEntityType) {
		case AdEntityType.CAMPAIGNS:
			return (props.row as AdEntityCampaign).closed
		case AdEntityType.ADSETS:
			return !(props.row as AdEntityAdset).campaign?.visible
		case AdEntityType.CREATIVES:
			return !(props.row as AdEntityCreative).adSet?.visible || !(props.row as AdEntityCreative).adSet?.campaign?.visible
		default:
			return false
	}
})

const disabledReason = computed(() => {
	if (parentIsDisabled.value) {
		return t('campaigns.tables.columns.disabledStatusReason.parentIsDisabled')
	}
	if ((props.row as AdEntityCampaign)?.closed) {
		return t('campaigns.tables.columns.disabledStatusReason.closed')
	}
	return null
})

const onChange = async () => {
	pending.value = true

	try {
		await campaignsStore.changeStatus(props.row.slug)
	}
	finally {
		pending.value = false
	}
}
</script>

<!-- <style lang="scss">
.status-campaign-popover {
  padding: 5px
}
</style>

<style lang="scss" scoped>
.el-switch {
  &_pending {
    opacity: 0.5;
    cursor: default;
  }
}
</style> -->
