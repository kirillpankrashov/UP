<template>
  <DashboardSection
    id="streamer-link-theme"
    data-name="streamer-link-theme"
    :title="t('link.profile.theme.title')"
  >
    <div
      class="_text-m-regular"
      v-html="t('link.profile.theme.description')"
    />

    <div class="mb-8 mt-6 grid grid-cols-[repeat(4,_64px)] gap-3">
      <div>
        <input
          id="theme-light"
          class="peer hidden"
          v-model="model"
          type="radio"
          name="theme"
          :value="LinkColorTheme.LIGHT"
        >
        <label
          class="theme-label bg-[#CAD4E9]"
          for="theme-light"
        />
      </div>

      <div>
        <input
          id="theme-dark"
          class="peer hidden"
          v-model="model"
          type="radio"
          name="theme"
          :value="LinkColorTheme.DARK"
        >
        <label
          class="theme-label bg-[#193263]"
          for="theme-dark"
        />
      </div>
    </div>

    <ElButton
      class="w-full sm:max-w-[220px]"
      size="large"
      :type="success ? 'success' : 'primary'"
      :loading="sending"
      :disabled="sending || success"
      @click="() => onSubmit()"
    >
      <span class="_text-m-bold">{{ success ? $t('button.saveChanges.success') : $t('button.saveChanges.static') }}</span>
    </ElButton>
  </DashboardSection>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { LinkColorTheme } from '@/core/types/link'
import { useLocale } from '@/core/hooks'
import { ElButton } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Link/locales'
import { useLinkProfileStore } from '@/modules/Streamer/views/Link/store'

const { t } = useLocale<typeof messages>(messages)

const linkProfileStore = useLinkProfileStore()

const sending = ref(false)
const success = ref(false)

const model = ref<LinkColorTheme>(LinkColorTheme.LIGHT)

const onSubmit = async () => {
	sending.value = true

	try {
		await linkProfileStore.updateProfile({
			theme: model.value,
		})

		success.value = true
		setTimeout(() => {
			success.value = false
		}, 1500)
	}
	finally {
		sending.value = false
	}
}

onMounted(() => {
	if (linkProfileStore.profile?.theme) {
		model.value = linkProfileStore.profile.theme
	}
	else {
		model.value = LinkColorTheme.LIGHT
	}
})

defineExpose({
	model,
	success,
})
</script>

<style lang="scss" scoped>
.theme-label {
	@apply relative inline-block w-16 h-16 rounded-full cursor-pointer peer-checked:before:opacity-100;

	&:before {
		content: '';
		@apply absolute right-0 top-0 z-10 h-5 w-5 rounded-full opacity-0 transition;
		background: url("data:image/svg+xml,%3Csvg width='20' height='20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='9.5' fill='%2313BF34' stroke='%2313BF34'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M15.354 7.354 9 13.707l-3.354-3.353.708-.708L9 12.293l5.646-5.647.708.708Z' fill='%23fff'/%3E%3C/svg%3E") center / contain no-repeat;
		transition: opacity .25s;
	}
}
</style>
