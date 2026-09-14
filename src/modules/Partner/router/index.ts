import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

export enum RouteName {
	BRAND_AWARENESS_CAMPAIGNS = 'brand-awareness-campaigns',
	BRAND_AWARENESS_ADSETS = 'brand-awareness-groups',
	BRAND_AWARENESS_CREATIVES = 'brand-awareness-creatives',
	PERFORMANCE_CAMPAIGNS = 'performance-campaigns',
	PERFORMANCE_ADSETS = 'performance-groups',
	PREROLL_CAMPAIGNS = 'preroll-campaigns',
	PREROLL_ADSETS = 'preroll-groups',
	EXTENSION_CAMPAIGNS = 'extension-campaigns',
	EXTENSION_ADSETS = 'extension-groups',
	EXTENSION_CREATIVES = 'extension-creatives',
	SPECIAL_PROJECT_CAMPAIGNS = 'special-project-campaigns',
	SPECIAL_PROJECT_ADSETS = 'special-project-groups',
	SPECIAL_PROJECT_CREATIVES = 'special-project-creatives',
	CAMPAIGN_CREATE = 'create-campaign',
	CAMPAIGN_EDIT = 'edit-campaign',
	ADSET_CREATE = 'create-group',
	ADSET_EDIT = 'edit-group',
	CREATIVE_CREATE = 'create-creative',
	CREATIVE_EDIT = 'edit-creative',
	SEGMENTS = 'segments',
	ANALYTICS = 'analytics',
	AGENCY = 'creators',
	ADVERTISERS = 'advertisers',
	PROFILE = 'profile',
	NOT_FOUND = '404',
	DEBUG = 'debug',
}

export const routesMap = new Map()
routesMap.set(RouteName.BRAND_AWARENESS_CAMPAIGNS, '/sponsorship/campaigns')
routesMap.set(RouteName.BRAND_AWARENESS_ADSETS, '/sponsorship/groups')
routesMap.set(RouteName.BRAND_AWARENESS_CREATIVES, '/sponsorship/creatives')
routesMap.set(RouteName.PERFORMANCE_CAMPAIGNS, '/interactive/campaigns')
routesMap.set(RouteName.PERFORMANCE_ADSETS, '/interactive/groups')
routesMap.set(RouteName.PREROLL_CAMPAIGNS, '/preroll/campaigns')
routesMap.set(RouteName.PREROLL_ADSETS, '/preroll/groups')
routesMap.set(RouteName.EXTENSION_CAMPAIGNS, '/extension/campaigns')
routesMap.set(RouteName.EXTENSION_ADSETS, '/extension/groups')
routesMap.set(RouteName.EXTENSION_CREATIVES, '/extension/creatives')
routesMap.set(RouteName.SPECIAL_PROJECT_CAMPAIGNS, '/special-project/campaigns')
routesMap.set(RouteName.SPECIAL_PROJECT_ADSETS, '/special-project/groups')
routesMap.set(RouteName.SPECIAL_PROJECT_CREATIVES, '/special-project/creatives')
routesMap.set(RouteName.CAMPAIGN_CREATE, '/campaigns/create/:campaignType')
routesMap.set(RouteName.CAMPAIGN_EDIT, '/campaign/:campaignSlug')
routesMap.set(RouteName.ADSET_CREATE, '/campaign/:campaignSlug/group/create')
routesMap.set(RouteName.ADSET_EDIT, '/campaign/:campaignSlug/group/:adsetSlug')
routesMap.set(RouteName.CREATIVE_CREATE, '/campaign/:campaignSlug/group/:adsetSlug/creative/create')
routesMap.set(RouteName.CREATIVE_EDIT, '/campaign/:campaignSlug/group/:adsetSlug/creative/:creativeSlug')
routesMap.set(RouteName.SEGMENTS, '/audience')
routesMap.set(RouteName.ANALYTICS, '/campaign/:campaignSlug/analytics')
routesMap.set(RouteName.AGENCY, '/creators')
routesMap.set(RouteName.ADVERTISERS, '/advertisers')
routesMap.set(RouteName.PROFILE, '/partner/profile')
routesMap.set(RouteName.NOT_FOUND, '/:pathMatch(.*)*')
routesMap.set(RouteName.DEBUG, '/debug/:apiVersion?/:slug?')

const routes: RouteRecordRaw[] = [
	{
		name: RouteName.BRAND_AWARENESS_CAMPAIGNS,
		path: routesMap.get(RouteName.BRAND_AWARENESS_CAMPAIGNS),
		meta: { title: 'Partner Campaigns - Uplify' },
		component: () => import('@/modules/Partner/views/Campaigns/Campaigns.vue'),
	},
	{
		name: RouteName.BRAND_AWARENESS_ADSETS,
		path: routesMap.get(RouteName.BRAND_AWARENESS_ADSETS),
		meta: { title: 'Partner Campaigns - Uplify' },
		component: () => import('@/modules/Partner/views/Campaigns/Campaigns.vue'),
	},
	{
		name: RouteName.BRAND_AWARENESS_CREATIVES,
		path: routesMap.get(RouteName.BRAND_AWARENESS_CREATIVES),
		meta: { title: 'Partner Campaigns - Uplify' },
		component: () => import('@/modules/Partner/views/Campaigns/Campaigns.vue'),
	},
	{
		name: RouteName.PERFORMANCE_CAMPAIGNS,
		path: routesMap.get(RouteName.PERFORMANCE_CAMPAIGNS),
		meta: { title: 'Partner Campaigns - Uplify' },
		component: () => import('@/modules/Partner/views/Campaigns/Campaigns.vue'),
	},
	{
		name: RouteName.PERFORMANCE_ADSETS,
		path: routesMap.get(RouteName.PERFORMANCE_ADSETS),
		meta: { title: 'Partner Campaigns - Uplify' },
		component: () => import('@/modules/Partner/views/Campaigns/Campaigns.vue'),
	},
	{
		name: RouteName.PREROLL_CAMPAIGNS,
		path: routesMap.get(RouteName.PREROLL_CAMPAIGNS),
		meta: { title: 'Partner Campaigns - Uplify' },
		component: () => import('@/modules/Partner/views/Campaigns/Campaigns.vue'),
	},
	{
		name: RouteName.PREROLL_ADSETS,
		path: routesMap.get(RouteName.PREROLL_ADSETS),
		meta: { title: 'Partner Campaigns - Uplify' },
		component: () => import('@/modules/Partner/views/Campaigns/Campaigns.vue'),
	},
	{
		name: RouteName.EXTENSION_CAMPAIGNS,
		path: routesMap.get(RouteName.EXTENSION_CAMPAIGNS),
		meta: { title: 'Partner Campaigns - Uplify' },
		component: () => import('@/modules/Partner/views/Campaigns/Campaigns.vue'),
	},
	{
		name: RouteName.EXTENSION_ADSETS,
		path: routesMap.get(RouteName.EXTENSION_ADSETS),
		meta: { title: 'Partner Campaigns - Uplify' },
		component: () => import('@/modules/Partner/views/Campaigns/Campaigns.vue'),
	},
	{
		name: RouteName.EXTENSION_CREATIVES,
		path: routesMap.get(RouteName.EXTENSION_CREATIVES),
		meta: { title: 'Partner Campaigns - Uplify' },
		component: () => import('@/modules/Partner/views/Campaigns/Campaigns.vue'),
	},
	{
		name: RouteName.SPECIAL_PROJECT_CAMPAIGNS,
		path: routesMap.get(RouteName.SPECIAL_PROJECT_CAMPAIGNS),
		meta: { title: 'Partner Campaigns - Uplify' },
		component: () => import('@/modules/Partner/views/Campaigns/Campaigns.vue'),
	},
	{
		name: RouteName.SPECIAL_PROJECT_ADSETS,
		path: routesMap.get(RouteName.SPECIAL_PROJECT_ADSETS),
		meta: { title: 'Partner Campaigns - Uplify' },
		component: () => import('@/modules/Partner/views/Campaigns/Campaigns.vue'),
	},
	{
		name: RouteName.SPECIAL_PROJECT_CREATIVES,
		path: routesMap.get(RouteName.SPECIAL_PROJECT_CREATIVES),
		meta: { title: 'Partner Campaigns - Uplify' },
		component: () => import('@/modules/Partner/views/Campaigns/Campaigns.vue'),
	},
	{
		name: RouteName.CAMPAIGN_CREATE,
		path: routesMap.get(RouteName.CAMPAIGN_CREATE),
		meta: { title: 'Create Campaign - Uplify' },
		component: () => import('@/modules/Partner/views/FormCampaign/FormCampaign.vue'),
	},
	{
		name: RouteName.CAMPAIGN_EDIT,
		path: routesMap.get(RouteName.CAMPAIGN_EDIT),
		meta: { title: 'Edit Campaign - Uplify' },
		component: () => import('@/modules/Partner/views/FormCampaign/FormCampaign.vue'),
	},
	{
		name: RouteName.ADSET_CREATE,
		path: routesMap.get(RouteName.ADSET_CREATE),
		meta: { title: 'Create Group - Uplify' },
		component: () => import('@/modules/Partner/views/FormAdset/FormAdset.vue'),
	},
	{
		name: RouteName.ADSET_EDIT,
		path: routesMap.get(RouteName.ADSET_EDIT),
		meta: { title: 'Edit Group - Uplify' },
		component: () => import('@/modules/Partner/views/FormAdset/FormAdset.vue'),
	},
	{
		name: RouteName.CREATIVE_CREATE,
		path: routesMap.get(RouteName.CREATIVE_CREATE),
		meta: { title: 'Create Creative - Uplify' },
		component: () => import('@/modules/Partner/views/FormCreative/FormCreative.vue'),
	},
	{
		name: RouteName.CREATIVE_EDIT,
		path: routesMap.get(RouteName.CREATIVE_EDIT),
		meta: { title: 'Edit Creative - Uplify' },
		component: () => import('@/modules/Partner/views/FormCreative/FormCreative.vue'),
	},
	{
		name: RouteName.SEGMENTS,
		path: routesMap.get(RouteName.SEGMENTS),
		meta: { title: 'Segments - Uplify' },
		component: () => import('@/modules/Partner/views/Segments/Segments.vue'),
	},
	{
		name: RouteName.ANALYTICS,
		path: routesMap.get(RouteName.ANALYTICS),
		meta: { title: 'Analytics - Uplify' },
		component: () => import('@/modules/Partner/views/Analytics/Analytics.vue'),
	},
	{
		name: RouteName.AGENCY,
		path: routesMap.get(RouteName.AGENCY),
		meta: { title: 'Partner creators - Uplify' },
		component: () => import('@/modules/Partner/views/Agency/Agency.vue'),
	},
	{
		name: RouteName.ADVERTISERS,
		path: routesMap.get(RouteName.ADVERTISERS),
		meta: { title: 'Advertisers - Uplify' },
		component: () => import('@/modules/Partner/views/Advertisers/Advertisers.vue'),
	},
	{
		name: RouteName.PROFILE,
		path: routesMap.get(RouteName.PROFILE),
		meta: { title: 'Partner Profile - Uplify' },
		component: () => import('@/modules/Partner/views/Profile/Profile.vue'),
	},
	{
		name: RouteName.DEBUG,
		path: routesMap.get(RouteName.DEBUG),
		meta: { title: 'Debug - Uplify' },
		component: () => import('@/modules/Debug/Debug.vue'),
	},
	{
		path: '/',
		name: 'main',
		redirect: { name: RouteName.BRAND_AWARENESS_CAMPAIGNS },
	},
	{
		path: '/:pathMatch(.*)*',
		name: RouteName.NOT_FOUND,
		meta: { title: '404 - Uplify' },
		component: () => import('@/modules/404/404.vue'),
	},
]

export const partnerRouter = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})
