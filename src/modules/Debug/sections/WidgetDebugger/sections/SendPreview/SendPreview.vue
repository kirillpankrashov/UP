<template>
  <div
    data-name="debug-send-preview"
    class="flex gap-2 shrink-0"
  >
    <div class="w-96 shrink-0">
      <ElSelect
        v-model="selected"
        :disabled="!widget?.enabled"
        placeholder="Select company"
        multiple
        clearable
      >
        <ElOption
          v-for="item in campaigns"
          :key="item.id"
          :value="item.slug"
          :label="item.title"
        />
      </ElSelect>
    </div>

    <ElButton
      :disabled="!widget?.enabled"
      type="primary"
      :loading="sending"
      @click="onClick"
    >
      <span class="_text-m-bold">{{ selected.length ? 'Send selected' : 'Send demo' }}</span>
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'

import { CampaignType } from '@/core/types'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import {
	ElButton,
	ElOption,
	ElSelect,
} from '@/components/element-plus'
import type { IDebugAdset } from '@/modules/Debug/api'
import * as DebugApi from '@/modules/Debug/api'
import type { IDebugWidget } from '@/modules/Debug/types'

interface Props {
  slug: string
  widget?: IDebugWidget | null
}

const props = defineProps<Props>()

const { t } = useLocale({})

const campaigns = ref<IDebugAdset[]>([])
const selected = ref<string[]>([])
const sending = ref(false)

const fetchCampaigns = async () => {
	try {
		const res = await DebugApi.getCampaignsList(props.slug)
		campaigns.value = res.filter((adset) => adset.campaign.type === CampaignType.BRAND_AWARENESS) || []
	}
	catch (err) {
		Logger.error('Error fetching campaigns', true, err)
	}
}

const onClick = async () => {
	if (selected.value.length) {
		await sendPreview()
	}
	else {
		await sendDemo()
	}
}

const sendPreview = async () => {
	sending.value = true

	try {
		const response = await DebugApi.sendPreview(props.slug, selected.value)

		if (response.status) {
			ElMessage.success(t('button.sendPreview.success'))
		}
	}
	catch (err) {
		Logger.error('Error sending preview', true, err)
	}
	finally {
		sending.value = false
	}
}

const sendDemo = async () => {
	sending.value = true

	try {
		const response = await DebugApi.sendDemo(props.slug)

		if (response.status) {
			ElMessage.success('Demo Sent')
		}
	}
	catch (err) {
		Logger.error('Error sending demo', true, err)
	}
	finally {
		sending.value = false
	}
}

onMounted(() => {
	fetchCampaigns()
})
</script>
