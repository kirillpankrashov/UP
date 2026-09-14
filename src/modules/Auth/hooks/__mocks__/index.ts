import { vi } from 'vitest'

export const useReferral = vi.fn(() => {
	return {
		getReferral: vi.fn(),
		setReferral: vi.fn(),
	}
})

export const useRegisterParams = vi.fn(() => {
	return {
		useRegisterParams: vi.fn(),
		setRegisterParams: vi.fn(),
	}
})
