import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import TipaltiOnboarding from '../TipaltiOnboarding.vue'

const hmacMock = vi.fn(() => ({ _type: 'mock-hmac' }))
const hexStringifyMock = vi.fn(() => 'mock-hex')

vi.mock('crypto-js', () => ({
	default: {
		HmacSHA256: (...args: any[]) => (hmacMock as any).apply(null, args),
		enc: {
			Hex: {
				stringify: (...args: any[]) => (hexStringifyMock as any).apply(null, args),
			},
		},
	},
}))

describe('Streamer TipaltiOnboarding Component', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = (streamerId: number | null) => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
		})

		const streamerStore = useStreamerStore(pinia as any)
		streamerStore.profile = streamerId
			? ({ ...profileData, userId: streamerId } as any)
			: null

		const wrapper = mount(TipaltiOnboarding, {
			global: {
				plugins: [pinia],
			},
		})

		return { wrapper, streamerStore }
	}

	it('does not render iframe when streamerId is missing', async () => {
		const { wrapper } = factory(null)
		await nextTick()

		expect(wrapper.find('iframe').exists()).toBe(false)
		expect(hmacMock).not.toHaveBeenCalled()
		expect(hexStringifyMock).not.toHaveBeenCalled()
	})

	it('builds iframe src with hmac + redirect url when streamerId exists', async () => {
		const nowMs = 1700000000000
		vi.spyOn(Date, 'now').mockReturnValue(nowMs)

		const originBackup = window.location.origin
		Object.defineProperty(window, 'location', {
			writable: true,
			value: { origin: 'http://example.test' },
		})

		const { wrapper } = factory(123)
		await nextTick()

		const time = nowMs / 1000
		const url = 'https://ui2.tipalti.com/payeedashboard/home'
		const query = encodeURI(`idap=123&payer=Uplify&ts=${time}`)
		const expected = `${url}?${query}&hashkey=mock-hex&redirectto=http://example.test/wallet`

		const iframe = wrapper.find('iframe')
		expect(iframe.exists()).toBe(true)
		expect(iframe.attributes('src')).toBe(expected)

		expect(hmacMock).toHaveBeenCalledWith(
			query,
			'j0YPT6AkeKPUl3z8+glS5S0mt4wjU9G4EuglK0/q/X659Qih7ds/GCBseRmmCDbS',
		)
		expect(hexStringifyMock).toHaveBeenCalled()

		// restore
		Object.defineProperty(window, 'location', {
			writable: true,
			value: { origin: originBackup },
		})
	})
})

