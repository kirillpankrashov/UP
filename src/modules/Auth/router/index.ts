import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

export enum RouteName {
	SIGNIN_STREAMER = 'signin-streamer',
	STREAMER_REFERRAL_TOKEN = 'referral-token',
	STREAMER_REFERRAL_TOKEN_LOCALIZED = 'referral-token-localized',
	PARTNER_REFERRAL_TOKEN = 'partner-referral-token',
	PARTNER_REFERRAL_TOKEN_LOCALIZED = 'partner-referral-token-localized',
	AUTH = 'auth',
	AUTH_STREAMER = 'auth-streamer',
	AUTH_STREAMER_SETTINGS = 'auth-streamer-settings',
	PARTNER_SIGNIN = 'auth-partner-signin',
	PARTNER_SIGNUP = 'auth-partner-signup',
	PASSWORD_NEW = 'auth-new-password',
	PASSWORD_RESET = 'auth-reset-password',
	EMAIL_VERIFICATION = 'streamer-email-verification',
}

const routesMap = new Map()

routesMap.set(RouteName.SIGNIN_STREAMER, '/')
routesMap.set(RouteName.EMAIL_VERIFICATION, '/:user/email/verification')
routesMap.set(RouteName.STREAMER_REFERRAL_TOKEN, '/ref/:token')
routesMap.set(RouteName.STREAMER_REFERRAL_TOKEN_LOCALIZED, '/:locale/ref/:token')
routesMap.set(RouteName.PARTNER_REFERRAL_TOKEN, '/partner/ref/:token')
routesMap.set(RouteName.PARTNER_REFERRAL_TOKEN_LOCALIZED, '/:locale/partner/ref/:token')
routesMap.set(RouteName.AUTH_STREAMER, '/auth/streamer')
routesMap.set(RouteName.AUTH_STREAMER_SETTINGS, '/auth/streamer/settings')
routesMap.set(RouteName.PARTNER_SIGNIN, '/auth/partner')
routesMap.set(RouteName.PARTNER_SIGNUP, '/auth/partner/request')
routesMap.set(RouteName.PASSWORD_RESET, '/auth/partner/password/restore')
routesMap.set(RouteName.PASSWORD_NEW, '/auth/partner/password/new')

const SigninComponent = () => import('@/modules/Auth/views/SigninStreamer/SigninStreamer.vue')

export const routes: RouteRecordRaw[] = [
	{
		name: RouteName.SIGNIN_STREAMER,
		path: routesMap.get(RouteName.SIGNIN_STREAMER),
		meta: { title: 'Creator Log In - Uplify' },
		component: SigninComponent,
	},
	{
		name: RouteName.EMAIL_VERIFICATION,
		path: routesMap.get(RouteName.EMAIL_VERIFICATION),
		meta: { title: 'Email Verification - Uplify' },
		component: () => import('@/modules/Auth/views/EmailVerification/EmailVerification.vue'),
	},
	{
		name: RouteName.STREAMER_REFERRAL_TOKEN,
		path: routesMap.get(RouteName.STREAMER_REFERRAL_TOKEN),
		meta: { title: 'Creator Log In - Uplify' },
		component: SigninComponent,
	},
	{
		name: RouteName.STREAMER_REFERRAL_TOKEN_LOCALIZED,
		path: routesMap.get(RouteName.STREAMER_REFERRAL_TOKEN_LOCALIZED),
		meta: { title: 'Creator Log In - Uplify' },
		component: SigninComponent,
	},
	{
		name: RouteName.PARTNER_REFERRAL_TOKEN,
		path: routesMap.get(RouteName.PARTNER_REFERRAL_TOKEN),
		meta: { title: 'Creator Log In - Uplify' },
		component: SigninComponent,
	},
	{
		name: RouteName.PARTNER_REFERRAL_TOKEN_LOCALIZED,
		path: routesMap.get(RouteName.PARTNER_REFERRAL_TOKEN_LOCALIZED),
		meta: { title: 'Partner Log In - Uplify' },
		component: SigninComponent,
	},
	{
		name: RouteName.AUTH_STREAMER,
		path: routesMap.get(RouteName.AUTH_STREAMER),
		meta: { title: 'Creator Log In - Uplify' },
		component: SigninComponent,
	},
	{
		name: RouteName.AUTH_STREAMER_SETTINGS,
		path: routesMap.get(RouteName.AUTH_STREAMER_SETTINGS),
		meta: { title: 'Creator Setup Log In - Uplify' },
		component: () => import('@/modules/Auth/views/StreamerSettings/StreamerSettings.vue'),
	},
	{
		name: RouteName.PARTNER_SIGNIN,
		path: routesMap.get(RouteName.PARTNER_SIGNIN),
		meta: { title: 'Partner Log In - Uplify' },
		component: () => import('@/modules/Auth/views/SigninPartner/SigninPartner.vue'),
	},
	{
		name: RouteName.PARTNER_SIGNUP,
		path: routesMap.get(RouteName.PARTNER_SIGNUP),
		meta: { title: 'Partner Request - Uplify' },
		component: () => import('@/modules/Auth/views/SignupPartner/SignupPartner.vue'),
	},
	{
		name: RouteName.PASSWORD_RESET,
		path: routesMap.get(RouteName.PASSWORD_RESET),
		meta: { title: 'Password Recovery - Uplify' },
		component: () => import('@/modules/Auth/views/PasswordReset/PasswordReset.vue'),
	},
	{
		name: RouteName.PASSWORD_NEW,
		path: routesMap.get(RouteName.PASSWORD_NEW),
		meta: { title: 'New Password - Uplify' },
		component: () => import('@/modules/Auth/views/PasswordNew/PasswordNew.vue'),
	},
	{
		path: '/',
		redirect: { name: 'auth' },
	},
	{
		path: '/:pathMatch(.*)*',
		name: '404',
		component: () => import('@/modules/404/404.vue'),
	},
]

export const authRouter = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})
