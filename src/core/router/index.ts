import { createRouter, createWebHistory } from 'vue-router'

export enum RouteName {
	WIDGET = 'widget',
	SP_WIDGET = 'sp-widget',
	OBS_DOCK = 'obs-dock',
	PUBLIC_CAMPAIGN_ANALYTICS = 'public-campaign-analytics',
	NOT_FOUND = '404',
	DEBUG = 'debug',
}

export const routesMap = new Map()

routesMap.set(RouteName.WIDGET, '/ads/:apiVersion/:slug')
routesMap.set(RouteName.PUBLIC_CAMPAIGN_ANALYTICS, '/campaign-analytics/:campaignSlug')
routesMap.set(RouteName.SP_WIDGET, '/streamer/widget/special-project/:widgetSlug/:adsetSlug')
routesMap.set(RouteName.OBS_DOCK, '/obs-dock/:token')

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: routesMap.get(RouteName.WIDGET),
			name: RouteName.WIDGET,
			meta: { title: 'Widget - Uplify' },
			component: () => import('@/modules/Widget/Widget.vue'),
		},
		{
			path: routesMap.get(RouteName.SP_WIDGET),
			name: RouteName.SP_WIDGET,
			meta: { title: 'Special Project - Uplify' },
			component: () => import('@/modules/SpecialProjectWidget/SpecialProjectWidget.vue'),
		},
		{
			path: routesMap.get(RouteName.PUBLIC_CAMPAIGN_ANALYTICS),
			name: RouteName.PUBLIC_CAMPAIGN_ANALYTICS,
			component: () => import('@/modules/Partner/views/Analytics/Analytics.vue'),
		},
		{
			path: routesMap.get(RouteName.OBS_DOCK),
			name: RouteName.OBS_DOCK,
			component: () => import('@/modules/Panel/Panel.vue'),
		},
	],
	scrollBehavior(to) {
		if (to.hash) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve({
						el: to.hash,
						behavior: 'smooth',
					})
				}, 1500)
			})
		}
	},
})
