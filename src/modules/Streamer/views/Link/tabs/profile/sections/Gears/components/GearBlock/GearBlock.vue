<template>
  <div>
    <div
      data-name="streamer-link-gear-block"
      class="mb-3 flex justify-between"
    >
      <div class="_text-m-bold">
        {{ t('link.profile.gear.form.block.title') }} {{ index + 1 }}
      </div>

      <MiniXButton @click="$emit('delete-block')">
        {{ t('link.profile.gear.form.deleteBlock') }}
      </MiniXButton>
    </div>

    <div class="mb-5 sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-3">
      <ElFormItem
        :prop="`gears.${index}.title`"
        :rules="required"
        :label="t('link.profile.gear.form.block.category.label')"
      >
        <ElInput
          data-test="gear-block-input-title"
          size="large"
          :placeholder="t('link.profile.gear.form.block.category.placeholder')"
          v-model="model.title"
        />
      </ElFormItem>

      <ElFormItem
        :prop="`gears.${index}.properties`"
        :rules="required"
        :label="t('link.profile.gear.form.block.description.label')"
      >
        <ElInput
          data-test="gear-block-input-properties"
          size="large"
          :placeholder="t('link.profile.gear.form.block.description.placeholder')"
          v-model="model.properties"
        />
      </ElFormItem>

      <ElFormItem
        v-if="streamer?.language === Locale.RU"
        :prop="`gears.${index}.link`"
        :rules="[isUrl, urlHasSku]"
        :label="t('link.profile.gear.form.block.link.label')"
      >
        <ElInput
          data-test="gear-block-input-link"
          size="large"
          :placeholder="t('link.profile.gear.form.block.link.placeholder')"
          v-model="model.link"
        />
      </ElFormItem>

      <ElFormItem
        v-if="streamer?.language === Locale.RU"
        :prop="`gears.${index}.sku`"
        :label="t('link.profile.gear.form.block.sku.label')"
      >
        <ElInput
          data-test="gear-block-input-sku"
          size="large"
          :placeholder="t('link.profile.gear.form.block.sku.placeholder')"
          v-model="model.sku"
          disabled
        />
      </ElFormItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'

import { Locale } from '@/core/types'
import type { ILinkGearItem } from '@/core/types/link'
import { useLocale } from '@/core/hooks'
import { isUrl, required, urlHasSku } from '@/core/validators'
import { MiniXButton } from '@/components'
import {
	ElFormItem,
	ElInput,
} from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Link/locales'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

const props = defineProps<{
  index: number
	block: ILinkGearItem
}>()

const emit = defineEmits(['change-block', 'delete-block'])

const { t } = useLocale<typeof messages>(messages)

const streamerStore = useStreamerStore()

const streamer = computed(() => streamerStore.profile)

let model = reactive({
	...props.block,
})

watch(model, (value) => {
	emit('change-block', { ...value })
})

watch(() => props.block, (value) => {
	Object.assign(model, value)
})
</script>

<style lang="scss" scoped>
.el-form-item {
	margin-bottom: 0;
}
</style>
