<template>
  <ElConfigProvider :locale="appStore.uiLocale">
    <div id="app-root">
      <AppComponent />
    </div>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElConfigProvider } from 'element-plus'

import { DomainTheme, Locale, Role } from '@/core/types'
import {
	Analytic,
	getRole,
	initToken,
	setFavicon,
	setToken,
} from '@/core/helpers'
import { RouteName } from '@/core/router'
import { useAppStore } from '@/core/store'
import { RouteName as AuthRouteName } from '@/modules/Auth/router'

import { linkClient } from './core/client'
import { Api } from './core/client'

import AppComponent from '@/AppComponent.vue'

const router = useRouter()
const route = useRoute()

const appStore = useAppStore()

const user = computed(() => appStore.auth.user)

class App {
	get skipPreloadUrl() {
		return [
			RouteName.WIDGET,
			RouteName.SP_WIDGET,
			RouteName.OBS_DOCK,
			AuthRouteName.EMAIL_VERIFICATION,
		].includes(route.name as RouteName)
	}

	async init() {
		this.setDomain()
		this.setLocale()
		this.setTheme()

		await router.isReady()

		if (this.skipPreloadUrl) {
			this.setIsLoaded()
			return
		}

		this.checkAccessToken()

		await this.fetchUser()

		if (!user.value) {
			this.setIsLoaded()
			return
		}

		this.setAnalytics()
		this.setClearCacheHandler()
		this.setLinkClient()

		this.setIsLoaded()
	}

	private setDomain() {
		appStore.setCurrentDomain()
	}

	private setLocale() {
		appStore.setLocale(
      localStorage.getItem('locale') as Locale ||
      import.meta.env.VITE_APP_DEFAULT_LOCALE ||
      Locale.EN,
		)
	}

	private setTheme() {
		if (window.location.href.includes('/ads/v1/WGT-')) {
			window.document.body.classList.add('is-widget')
		}
		window.document.body.setAttribute('data-theme', appStore.domain?.theme || DomainTheme.UPLIFY)

		appStore.setIsMobile()

		setFavicon(appStore.domain)
	}

	private setIsLoaded() {
		appStore.setIsLoaded()
	}

	private checkAccessToken() {
		if (!route.query.access_token) {
			initToken()
			return
		}

		setToken(route.query.access_token as string, Role.STREAMER)
		appStore.auth.role = getRole()
		router.replace({
			...route,
			query: {
				access_token: undefined,
			},
		})
	}

	private async fetchUser() {
		await appStore.fetchUser()
	}

	private setAnalytics() {
		if (!user.value) return

		Analytic.pushUserToDataLayer(user.value)

		Analytic.ym(import.meta.env.VITE_APP_YANDEX_METRIKA_ID, 'setUserID', user.value.userId)
		Analytic.ym(import.meta.env.VITE_APP_YANDEX_METRIKA_ID, 'params', { user_id: user.value.userId })

		if (appStore.auth.role === Role.STREAMER) {
			Analytic.heapIdentity(user.value.userId)
			Analytic.heapAddUserProperties({
				Nickname: user.value.username,
				Email: user.value.email,
			})
		}
	}

	private setClearCacheHandler() {
		const clearCacheHandler = async (e: KeyboardEvent) => {
			if (e.ctrlKey && e.shiftKey && (e.key.toLowerCase() === 'k' || e.key.toLowerCase() === 'л')) {
				e.preventDefault()
				await Api.clearCache()
				router.go(0)
			}
		}

		window.addEventListener('keydown', clearCacheHandler)
	}

	private setLinkClient() {
		if (!user.value) return

		linkClient.setHeaders(user.value.userId)
	}
}

const app = new App()

onBeforeMount(() => app.init())
</script>
