<template>
  <DashboardSection
    id="streamer-link-profile-gears"
    data-name="streamer-link-profile-gears"
    class="relative"
    :title="t('link.profile.gear.title')"
  >
    <div class="_text-m-regular mb-8">
      <span v-html="t('link.profile.gear.description')" />
      <HelpIcon
        v-if="appStore.isMobile && streamer?.language === Locale.RU"
        class="h-4 w-4 fill-primary"
        @click="adviceRef?.toggleModal"
      />
    </div>

    <ElForm
      ref="formRef"
      :model="model"
      label-position="top"
      :disabled="sending || success"
      @submit.prevent="onSubmit"
    >
      <GearBlock
        v-for="(item, idx) in model.gears"
        :key="item.id || idx"
        :block="item"
        :index="idx"
        @delete-block="deleteBlock(idx)"
        @change-block="updateBlock(idx, $event)"
      />

      <PlusButton
        class="mb-8"
        @click="addBlock"
      >
        {{ t('link.profile.gear.form.addBlock') }}
      </PlusButton>

      <div class="sm:grid sm:gap-y-2">
        <ElButton
          class="w-full sm:max-w-[220px]"
          size="large"
          :type="success ? 'success' : 'primary'"
          native-type="submit"
          :loading="sending"
        >
          <span class="_text-m-bold">{{ success ? $t('button.saveChanges.success') : $t('button.saveChanges.static') }}</span>
        </ElButton>
      </div>
    </ElForm>

    <Advice
      v-if="streamer?.language === Locale.RU"
      ref="adviceRef"
      id="streamer-link-profile-gears-advice"
      class="sm:absolute sm:left-[calc(100%+24px)] sm:top-8"
      :title="t('link.profile.gear.advice.title')"
      :label="t('link.profile.gear.advice.label')"
    >
      <p
        class="_text-m-regular"
        v-html="t('link.profile.gear.advice.text')"
      />
    </Advice>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import { Locale } from '@/core/types'
import type { ILinkGearItem } from '@/core/types/link'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { Advice, PlusButton } from '@/components'
import {
	ElButton,
	ElForm,
} from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Link/locales'
import { useLinkProfileStore } from '@/modules/Streamer/views/Link/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

import { GearBlock } from './components'

import HelpIcon from '@/assets/img/icons/help-icon.svg'

const { t } = useLocale<typeof messages>(messages)

const adviceRef = ref<InstanceType<typeof Advice> | null>(null)

const appStore = useAppStore()
const streamerStore = useStreamerStore()
const profileStore = useLinkProfileStore()

const streamer = computed(() => streamerStore.profile)

const formRef = ref<HTMLFormElement>()

const success = ref(false)
const sending = ref(false)

const model = ref<{ gears: ILinkGearItem[] }>({
	gears: [],
})

const blocks = computed(() => profileStore.profile?.gears)

const addBlock = () => {
	model.value.gears.push({
		title: '',
		properties: '',
		link: '',
		sku: '',
	})
}

const deleteBlock = (idx: number) => {
	model.value.gears.splice(idx, 1)
}

const onSubmit = async () => {
	if (!formRef.value) return

	sending.value = true

	try {
		const isValid = await formRef.value.validate()

		if (!isValid) {
			Logger.error('Validation error')
			return
		}

		await profileStore.updateProfile({ gears: model.value.gears })

		success.value = true
		setTimeout(() => {
			success.value = false
		}, 3000)
	}
	catch (err) {
		Logger.error('Error saving gears setup', true, err)
	}
	finally {
		sending.value = false
	}
}

const updateBlock = (index: number, block: ILinkGearItem) => {
	model.value.gears[index] = block
}

const setModel = () => {
	if (!blocks.value?.length) {
		addBlock()
	}
	else {
		model.value.gears = blocks.value.map(gear => ({ ...gear }))
	}
}

onMounted(setModel)

watch(blocks, setModel)

defineExpose({
	model,
	addBlock,
	updateBlock,
	deleteBlock,
})
</script>
