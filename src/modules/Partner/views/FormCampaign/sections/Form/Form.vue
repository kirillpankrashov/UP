<template>
  <component
    v-if="formCampaignStore.currentCampaignType"
    data-name="form-campaign-form"
    ref="formRef"
    :is="formComponent"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { CampaignType } from '@/core/types'
import { useFormCampaignStore } from '@/modules/Partner/views/FormCampaign/store'

import {
	BrandAwareness,
	Extension,
	Performance,
	Preroll,
	SpecialProject,
} from './sections'

const formCampaignStore = useFormCampaignStore()

const formRef = ref<InstanceType<typeof BrandAwareness | typeof Performance | typeof Preroll | typeof SpecialProject> | null>(null)

const formComponent = computed<any>(() => {
	switch (formCampaignStore.currentCampaignType) {
		case CampaignType.BRAND_AWARENESS:
			return BrandAwareness
		case CampaignType.PERFORMANCE:
			return Performance
		case CampaignType.PREROLL:
			return Preroll
		case CampaignType.EXTENSION:
			return Extension
		case CampaignType.SPECIAL_PROJECT:
			return SpecialProject
		default:
			return null
	}
})

const form = computed(() => formRef.value)

defineExpose({
	form,
})
</script>
