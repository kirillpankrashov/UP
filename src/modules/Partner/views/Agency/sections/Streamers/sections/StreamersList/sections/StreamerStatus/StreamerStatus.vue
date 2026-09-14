<template>
  <ElPopover
    data-name="partner-agency-streamer-status"
    data-test="partner-agency-streamer-status"
    placement="bottom"
    popper-class="creator-status-popper"
    :width="220"
    trigger="click"
  >
    <div class="grid gap-4">
      <div
        v-if="!streamer.checkListStatus"
        class="break-normal text-left"
      >
        <div class="_text-s-bold mb-1">
          {{ t('creators.creatorsTable.status.checkList.label') }}
        </div>
        <div class="_text-s-regular">
          {{ t('creators.creatorsTable.status.checkList.text') }}
        </div>
      </div>

      <div
        v-if="!streamer.payableStatus"
        class="break-normal text-left"
      >
        <div class="_text-s-bold mb-1">
          {{ t('creators.creatorsTable.status.payable.label') }}
        </div>
        <div class="_text-s-regular">
          {{ t('creators.creatorsTable.status.payable.text') }}
        </div>
      </div>

      <div
        v-if="streamer.ctrStatus"
        class="break-normal text-left"
      >
        <div class="_text-s-bold mb-1 text-danger">
          {{ t('creators.creatorsTable.status.lowCtr.label') }}
        </div>
        <div class="_text-s-regular">
          {{ t('creators.creatorsTable.status.lowCtr.text') }}
        </div>
      </div>
    </div>

    <template #reference>
      <CircleExclamationIcon
        v-if="showIcon"
        class="h-4 w-4 shrink-0 cursor-pointer"
        :class="[!streamer.checkListStatus || streamer.ctrStatus ? 'fill-danger' : 'fill-warning']"
      />
    </template>
  </ElPopover>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElPopover } from '@/components/element-plus'
import type { IStreamer } from '@/modules/Partner/views/Agency/api'
import { messages } from '@/modules/Partner/views/Agency/locales'

import CircleExclamationIcon from '@/assets/img/icons/circle-exclamation.svg'

const { t } = useLocale<typeof messages>(messages)

const props = defineProps<{
  streamer: IStreamer
}>()

const showIcon = computed(() => {
	if (props.streamer.checkListStatus && props.streamer.payableStatus && !props.streamer.ctrStatus) {
		return false
	}
	return true
})
</script>
