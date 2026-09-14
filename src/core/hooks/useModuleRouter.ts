import { nextTick } from 'vue'
import type { Router,RouteRecordRaw } from 'vue-router'
import { useRouter } from 'vue-router'

export const useModuleRouter = () => {
	const router = useRouter()

	const mergeRoutes = async (moduleRouter: Router) => {
		moduleRouter.getRoutes().map((route: RouteRecordRaw) => {
			if (!route.name) {
				return
			}
			router.addRoute(route)
		})
		router.replace(router.currentRoute.value.fullPath)
		await nextTick()
		await router.isReady()
	}

	return {
		mergeRoutes,
	}
}
