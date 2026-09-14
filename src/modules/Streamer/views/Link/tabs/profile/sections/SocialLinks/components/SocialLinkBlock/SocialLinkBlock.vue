<template>
  <div
    data-name="streamer-link-profile-social-link-block"
  >
    <div class="mb-3 flex justify-between">
      <div
        data-test="social-link-block-title"
        class="_text-m-bold"
      >
        {{ t('link.profile.social.form.block.title') }} {{ index + 1 }}
      </div>

      <MiniXButton @click="$emit('delete-block')">
        {{ t('link.profile.social.form.deleteBlock') }}
      </MiniXButton>
    </div>

    <div class="mb-5 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-3">
      <ElFormItem
        :prop="`socialLinks.${index}.name`"
        :label="t('link.profile.social.form.block.category.label')"
      >
        <ElSelect
          :placeholder="t('link.profile.social.form.block.category.placeholder')"
          v-model="model.name"
          size="large"
        >
          <ElOption
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </ElFormItem>

      <ElFormItem
        :prop="`socialLinks.${index}.link`"
        :label="t('link.profile.social.form.block.description.label')"
        :rules="[required, isUrl]"
      >
        <ElInput
          data-test="link-block-input-properties"
          size="large"
          :placeholder="t('link.profile.social.form.block.description.placeholder')"
          v-model="model.link"
        />
      </ElFormItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'

import { type ISocialLink, SocialLinks } from '@/core/types/link'
import { useLocale } from '@/core/hooks'
import { isUrl, required } from '@/core/validators'
import { MiniXButton } from '@/components'
import {
	ElFormItem,
	ElInput,
	ElOption,
	ElSelect,
} from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Link/locales'

const props = defineProps<{
  index: number
	block: ISocialLink
	model: ISocialLink[]
}>()

const emit = defineEmits(['change-block', 'delete-block'])

const { t } = useLocale<typeof messages>(messages)

let model = reactive({
	...props.block,
})

const options = computed(() => {
	return Object.values(SocialLinks)
		.filter(option => (
			props.model.find(item => item.name === option)?.name !== option
		))
		.map(option => ({
			value: option,
			label: option,
		}))
})

watch(model, (value) => {
	emit('change-block', { ...value })
})

watch(() => props.block, (value) => {
	Object.assign(model, value)
})

defineExpose({
	options,
})
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>
