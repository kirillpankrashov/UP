<template>
  <ElTag
    data-name="campaigns-adset-card-tags-preroll-status"
    size="small"
    :type="tagType"
    round
  >
    <span class="font-regular">
      {{ [PrerollAdsetStatus.REJECTED, PrerollAdsetStatus.MISSING].includes(adset.status) ? 'Rejected' : '' }}
      {{ adset.status === PrerollAdsetStatus.MODERATION ? 'Moderation' : '' }}
      {{ adset.status === PrerollAdsetStatus.CONFIRMED ? 'Active' : '' }}
    </span>
  </ElTag>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { PrerollAdsetStatus } from '@/core/types'
import { ElTag } from '@/components/element-plus'
import type { IPrerollAdset } from '@/modules/Streamer/views/Campaigns/api'

const props = defineProps<{
  adset: IPrerollAdset
}>()

const tagType = computed(() => {
	if ([PrerollAdsetStatus.REJECTED, PrerollAdsetStatus.MISSING].includes(props.adset.status)) {
		return 'danger'
	}

	if (props.adset.status === PrerollAdsetStatus.MODERATION) {
		return 'warning'
	}

	if (props.adset.status === PrerollAdsetStatus.CONFIRMED) {
		return 'success'
	}

	return 'primary'
})
</script>
