import { vi } from 'vitest'

export const useModuleRouter = vi.fn(() => {
	return {
		mergeRoutes: vi.fn().mockResolvedValue(undefined),
	}
})
