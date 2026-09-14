<template>
  <component
    v-if="formCreativeStore.currentCampaignType"
    data-name="form-creative-form"
    data-test="form-creative-component"
    ref="formRef"
    :is="formComponent"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { CampaignType } from '@/core/types'
import { useFormCreativeStore } from '@/modules/Partner/views/FormCreative/store'

import {
	BrandAwareness,
	Extension,
	SpecialProject,
} from './sections'

const formCreativeStore = useFormCreativeStore()

const formRef = ref<InstanceType<typeof BrandAwareness | typeof Extension | typeof SpecialProject> | null>(null)

const formComponent = computed<any>(() => {
	switch (formCreativeStore.currentCampaignType) {
		case CampaignType.BRAND_AWARENESS:
			return BrandAwareness
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
