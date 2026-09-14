<template>
  <div
    id="signin-streamer-demo"
    class="mt-6 border-t border-light-gray pt-6"
  >
    <ElButton
      class="mb-4 w-full"
      type="primary"
      @click="onClick"
      :size="'large'"
    >
      <span class="_text-m-bold">{{ t('signinStreamer.tryDemo') }}</span>
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import { Logger, setDemoToken } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { ElButton } from '@/components/element-plus'
import { demoSignin } from '@/modules/Auth/views/SigninStreamer/api'
import { messages } from '@/modules/Auth/views/SigninStreamer/locales'

const { t } = useLocale<typeof messages>(messages)

const onClick = async () => {
	try {
		const res = await demoSignin()
		const url = `${window.location.origin}?access_token=${res.accessToken}`
		setDemoToken()
		window.location.href = url
	}
	catch (error) {
		Logger.error(t('signinStreamer.errors.demoSignin'), true, error)
	}
}
</script>
