<template>
  <DashboardSection
    id="streamer-link-profile-social-links"
    data-name="streamer-link-profile-social-links"
    :title="t('link.profile.social.title')"
  >
    <div
      class="_text-m-regular mb-8"
      v-html="t('link.profile.social.description')"
    />

    <ElForm
      ref="formRef"
      :model="model"
      label-position="top"
      :disabled="sending || success"
      @submit.prevent="onSubmit"
    >
      <SocialLinkBlock
        v-for="(item, idx) in model.socialLinks"
        :key="idx + 1"
        :block="item"
        :index="idx"
        :model="model.socialLinks"
        @delete-block="deleteBlock(idx)"
        @change-block="updateBlock(idx, $event)"
      />

      <PlusButton
        class="mb-8"
        @click="addBlock"
      >
        {{ t('link.profile.social.form.addBlock') }}
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
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

import type { ISocialLink } from '@/core/types/link'
import { Logger } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { PlusButton } from '@/components'
import {
	ElButton,
	ElForm,
} from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Link/locales'
import { useLinkProfileStore } from '@/modules/Streamer/views/Link/store'

import SocialLinkBlock from './components/SocialLinkBlock/SocialLinkBlock.vue'

const { t } = useLocale<typeof messages>(messages)

defineProps<{
  loading?: boolean
}>()

const profileStore = useLinkProfileStore()

const formRef = ref<HTMLFormElement>()

const success = ref(false)
const sending = ref(false)

const model = ref<{ socialLinks: ISocialLink[] }>({
	socialLinks: [],
})

const blocks = computed(() => profileStore.profile?.socialLinks)

const addBlock = () => {
	model.value.socialLinks.push({
		name: '',
		link: '',
	})
}

const deleteBlock = (idx: number) => {
	model.value.socialLinks.splice(idx, 1)
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

		await profileStore.updateProfile({ socialLinks: model.value.socialLinks }, true)

		success.value = true
		setTimeout(() => {
			success.value = false
		}, 3000)
	}
	catch (err) {
		Logger.error('Error saving social links', true, err)
	}
	finally {
		sending.value = false
	}
}

const updateBlock = (index: number, block: ISocialLink) => {
	model.value.socialLinks[index] = block
}

onMounted(async () => {
	if (!blocks.value?.length) {
		addBlock()
	}
	else {
		model.value.socialLinks = blocks.value.map(link => ({ ...link }))
	}
})

watch(blocks, () => {
	if (!blocks.value) {
		return
	}

	model.value.socialLinks = blocks.value.map(link => ({ ...link }))
})

defineExpose({
	model,
	addBlock,
	updateBlock,
	deleteBlock,
	formRef,
})
</script>
