<template>
  <component
    v-if="formAdsetStore.currentCampaignType"
    data-name="form-adset-form"
    data-test="form-adset-component"
    ref="formRef"
    :is="formComponent"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { CampaignType } from '@/core/types'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'

import {
	BrandAwareness,
	Extension,
	Performance,
	Preroll,
	SpecialProject,
} from './sections'

const formAdsetStore = useFormAdsetStore()

const formRef = ref<InstanceType<typeof BrandAwareness | typeof Extension | typeof Performance | typeof Preroll | typeof SpecialProject> | null>(null)

const formComponent = computed<any>(() => {
	switch (formAdsetStore.currentCampaignType) {
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
