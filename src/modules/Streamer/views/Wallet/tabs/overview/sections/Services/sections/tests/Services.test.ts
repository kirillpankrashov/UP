import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { walletDataRazorPay, walletDataTipalti, walletDataTochka } from '@/modules/Streamer/views/Wallet/api/getWallet/fixtures/walletData'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import Services from '../../Services.vue'
import { ServiceRazorPay, ServiceTipalti, ServiceTochka } from '..'

vi.mock('vue-router', async () => {
	const actual = await vi.importActual<typeof import('vue-router')>('vue-router')
	return {
		...actual,
		useRouter: () => ({
			push: vi.fn(),
		}),
	}
})

describe('Streamer Wallet overview Services', () => {
	const factory = () => {
		const wrapper = mount(Services, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
		})

		const walletStore = useWalletStore()

		return {
			wrapper,
			walletStore,
		}
	}

	it('shows service ui corresponding to payment method', async () => {
		const { wrapper, walletStore } = factory()

		walletStore.wallet = walletDataTochka
		walletStore.payoutMethod = walletDataTochka.methods[0]

		await nextTick()

		expect(wrapper.findComponent(ServiceTochka).exists()).toBe(true)
		expect(wrapper.findComponent(ServiceRazorPay).exists()).toBe(false)
		expect(wrapper.findComponent(ServiceTipalti).exists()).toBe(false)

		walletStore.wallet = walletDataRazorPay
		walletStore.payoutMethod = walletDataRazorPay.methods[0]

		await nextTick()

		expect(wrapper.findComponent(ServiceTochka).exists()).toBe(false)
		expect(wrapper.findComponent(ServiceRazorPay).exists()).toBe(true)
		expect(wrapper.findComponent(ServiceTipalti).exists()).toBe(false)

		walletStore.wallet = walletDataTipalti
		walletStore.payoutMethod = walletDataTipalti.methods[0]

		await nextTick()

		expect(wrapper.findComponent(ServiceTochka).exists()).toBe(false)
		expect(wrapper.findComponent(ServiceRazorPay).exists()).toBe(false)
		expect(wrapper.findComponent(ServiceTipalti).exists()).toBe(true)
	})
})
