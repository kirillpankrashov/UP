<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'

import { useModuleRouter } from '@/core/hooks'
import { useReferral, useRegisterParams } from '@/modules/Auth/hooks'
import { authRouter } from '@/modules/Auth/router'
import { RouteName } from '@/modules/Auth/router'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

const route = useRoute()
const router = useRouter()

const { mergeRoutes } = useModuleRouter()

const streamerStore = useStreamerStore()

const { setRegisterParams } = useRegisterParams()
const { setReferral } = useReferral()

let routesMerged = false
let checkAuthCalled = false

const checkRoute = async () => {
	if (!checkAuthCalled && routesMerged) {
		checkAuthCalled = true

		const isReferralRoute = [
			RouteName.STREAMER_REFERRAL_TOKEN,
			RouteName.STREAMER_REFERRAL_TOKEN_LOCALIZED,
			RouteName.PARTNER_REFERRAL_TOKEN,
			RouteName.PARTNER_REFERRAL_TOKEN_LOCALIZED,
		].includes(route.name as RouteName)

		await setRegisterParams(route.query)

		if (isReferralRoute) {
			setReferral(route.params.token as string, route.query.utm_campaign as string)
			router.push({ name: RouteName.SIGNIN_STREAMER })
			return
		}

		const isProfileNotFilled = streamerStore.profile && !streamerStore.profile.isFilled
		const isNotSettingsRoute = route.name !== RouteName.AUTH_STREAMER_SETTINGS

		if (isProfileNotFilled && isNotSettingsRoute) {
			router.replace({ name: RouteName.AUTH_STREAMER_SETTINGS })
		}
	}
}

onMounted(async () => {
	await mergeRoutes(authRouter)

	routesMerged = true

	await checkRoute()
})

watch(
	() => route.name,
	async () => {
		if (routesMerged && route.name) {
			checkAuthCalled = false

			await checkRoute()
		}
	},
)
</script>
