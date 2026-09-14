import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import { LINK_ENABLED } from '@/core/consts'

export enum RouteName {
	DEACTIVATED = 'deactivated',
	REFERRAL_CHECK = 'referral-check',
	TIPALTI_ONBOARDING = 'tipalti-onboarding',
	DASHBOARD = 'dashboard',
	CAMPAIGNS_LIVESTREAM = 'campaigns-livesteam',
	CAMPAIGNS_PREROLL = 'campaigns-preroll',
	CAMPAIGNS_SPECIAL_PROJECT = 'campaigns-special-project',
	WALLET = 'wallet',
	SETTINGS = 'settings',
	REFERRALS = 'referrals',
	PROFILE = 'profile',
	LINK = 'link',
	DEBUG = 'debug',
	STREAMER_AUTH = 'streamer-auth',
	NOT_FOUND = '404',
}

export const routesMap = new Map()

routesMap.set(RouteName.DEACTIVATED, '/deactivated')
routesMap.set(RouteName.REFERRAL_CHECK, '/ref/:token')
routesMap.set(RouteName.TIPALTI_ONBOARDING, '/onboarding')
routesMap.set(RouteName.DASHBOARD, '/dashboard')
routesMap.set(RouteName.CAMPAIGNS_LIVESTREAM, '/campaigns/livestream')
routesMap.set(RouteName.CAMPAIGNS_PREROLL, '/campaigns/preroll')
routesMap.set(RouteName.CAMPAIGNS_SPECIAL_PROJECT, '/campaigns/special-project')
routesMap.set(RouteName.WALLET, '/wallet')
routesMap.set(RouteName.SETTINGS, '/widget')
routesMap.set(RouteName.REFERRALS, '/referrals')
routesMap.set(RouteName.PROFILE, '/profile')
routesMap.set(RouteName.LINK, '/link')
routesMap.set(RouteName.DEBUG, '/debug/:apiVersion?/:slug?')
routesMap.set(RouteName.NOT_FOUND, '/:pathMatch(.*)*')

const routes: RouteRecordRaw[] = [
	{
		name: RouteName.DEACTIVATED,
		path: routesMap.get(RouteName.DEACTIVATED),
		meta: { title: 'Uplify' },
		component: () => import('@/modules/Streamer/views/Deactivated/Deactivated.vue'),
	},
	{
		name: RouteName.REFERRAL_CHECK,
		path: routesMap.get(RouteName.REFERRAL_CHECK),
		meta: { title: 'Creator Log In - Uplify' },
		component: () => import('@/modules/Streamer/views/ReferralCheck/ReferralCheck.vue'),
	},
	{
		name: RouteName.TIPALTI_ONBOARDING,
		path: routesMap.get(RouteName.TIPALTI_ONBOARDING),
		meta: { title: 'Tipalti - Uplify' },
		component: () => import('@/modules/Streamer/views/TipaltiOnboarding/TipaltiOnboarding.vue'),
	},
	{
		name: RouteName.DASHBOARD,
		path: routesMap.get(RouteName.DASHBOARD),
		meta: { title: 'Creator Home - Uplify' },
		component: () => import('@/modules/Streamer/views/Dashboard/Dashboard.vue'),
	},
	{
		name: RouteName.CAMPAIGNS_LIVESTREAM,
		path: routesMap.get(RouteName.CAMPAIGNS_LIVESTREAM),
		meta: { title: 'Creator Campaigns - Uplify' },
		component: () => import('@/modules/Streamer/views/Campaigns/Campaigns.vue'),
	},
	{
		name: RouteName.CAMPAIGNS_PREROLL,
		path: routesMap.get(RouteName.CAMPAIGNS_PREROLL),
		meta: { title: 'Creator Campaigns - Uplify' },
		component: () => import('@/modules/Streamer/views/Campaigns/Campaigns.vue'),
	},
	{
		name: RouteName.CAMPAIGNS_SPECIAL_PROJECT,
		path: routesMap.get(RouteName.CAMPAIGNS_SPECIAL_PROJECT),
		meta: { title: 'Creator Campaigns - Uplify' },
		component: () => import('@/modules/Streamer/views/Campaigns/Campaigns.vue'),
	},
	{
		name: RouteName.WALLET,
		path: routesMap.get(RouteName.WALLET),
		meta: { title: 'Creator Wallet - Uplify' },
		component: () => import('@/modules/Streamer/views/Wallet/Wallet.vue'),
	},
	{
		name: RouteName.SETTINGS,
		path: routesMap.get(RouteName.SETTINGS),
		meta: { title: 'Creator Widget - Uplify' },
		component: () => import('@/modules/Streamer/views/Settings/Settings.vue'),
	},
	{
		name: RouteName.REFERRALS,
		path: routesMap.get(RouteName.REFERRALS),
		meta: { title: 'Creator Referrals - Uplify' },
		component: () => import('@/modules/Streamer/views/Referrals/Referrals.vue'),
	},
	{
		name: RouteName.PROFILE,
		path: routesMap.get(RouteName.PROFILE),
		meta: { title: 'Creator Profile - Uplify' },
		component: () => import('@/modules/Streamer/views/Profile/Profile.vue'),
	},
	...(LINK_ENABLED ? [{
		name: RouteName.LINK,
		path: routesMap.get(RouteName.LINK),
		meta: { title: 'Creator Link - Uplify' },
		component: () => import('@/modules/Streamer/views/Link/Link.vue'),
	}] : []),
	{
		name: RouteName.DEBUG,
		path: routesMap.get(RouteName.DEBUG),
		meta: { title: 'Debug - Uplify' },
		component: () => import('@/modules/Debug/Debug.vue'),
	},
	{
		path: '/auth/*',
		name: 'streamer-auth',
		redirect: { name: RouteName.DASHBOARD },
	},
	{
		path: '/',
		name: 'main',
		redirect: { name: RouteName.DASHBOARD },
	},
	{
		path: '/:pathMatch(.*)*',
		name: RouteName.NOT_FOUND,
		meta: { title: '404 - Uplify' },
		component: () => import('@/modules/404/404.vue'),
	},
]

export const streamerRouter = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})
