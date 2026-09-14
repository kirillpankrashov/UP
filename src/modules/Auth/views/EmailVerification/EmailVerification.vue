<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <div
      data-test="page-text"
      class="_headline"
    >
      {{ title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { useLocale } from '@/core/hooks'
import { verifyEmail } from '@/modules/Auth/views/EmailVerification/api'
import { messages } from '@/modules/Auth/views/EmailVerification/locales'

const { t } = useLocale<typeof messages>(messages)

const error = ref('')
const success = ref(false)

const title = computed(() => {
	if (success.value) {
		return t('emailVerification.verifingSuccess')
	}
	if (error.value) {
		return error
	}
	return t('emailVerification.verifing')
})

const route = useRoute()

const verify = async () => {
	const token = route.query.token as string

	if (!token) {
		error.value = t('emailVerification.verifingError.general')
		return
	}

	try {
		await verifyEmail({ token })

		success.value = true

		setTimeout(() => {
			window.location.href = '/'
		}, 2000)
	}
	catch {
		error.value = t('emailVerification.verifingError.token')
	}
}

onMounted(verify)
</script>
