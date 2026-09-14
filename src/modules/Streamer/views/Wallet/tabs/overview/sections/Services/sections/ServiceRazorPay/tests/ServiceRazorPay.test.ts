import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { RazorPayPayoutMode } from '@/core/types'
import { i18n } from '@/core/i18n'
import { walletDataRazorPay } from '@/modules/Streamer/views/Wallet/api/getWallet/fixtures/walletData'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import ServiceRazorPay from '../ServiceRazorPay.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

const ElButtonStub = {
	name: 'ElButton',
	emits: ['click'],
	template: '<button data-test="razorpay-setup-btn" @click="$emit(\'click\')"><slot /></button>',
}

const ElTagStub = {
	name: 'ElTag',
	props: ['type'],
	template: '<span data-test="el-tag" :data-type="type"><slot /></span>',
}

const TextLinkStub = {
	name: 'TextLink',
	props: ['href'],
	template: '<a data-test="razorpay-learn-more" :href="href"><slot /></a>',
}

const RazorPayFormStub = {
	name: 'RazorPayForm',
	setup (_p: any, { expose }: any) {
		expose({ toggleFormVisibility: toggleFormVisibilityMock })
		return () => null
	},
}

const toggleFormVisibilityMock = vi.fn()

describe('Streamer Wallet Services ServiceRazorPay', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = () => {
		const wrapper = mount(ServiceRazorPay, {
			global: {
				plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
				stubs: {
					ElButton: ElButtonStub,
					ElTag: ElTagStub,
					TextLink: TextLinkStub,
					RazorPayForm: RazorPayFormStub,
				},
			},
		})

		const walletStore = useWalletStore()
		return { wrapper, walletStore }
	}

	it('does not render when wallet is null', async () => {
		const { wrapper, walletStore } = factory()
		walletStore.wallet = null
		await nextTick()

		expect(wrapper.find('[data-test="wallet-service-razorpay"]').exists()).toBe(false)
	})

	it('renders payable tag and payment method when wallet + payoutMethod exist', async () => {
		const { wrapper, walletStore } = factory()
		walletStore.wallet = walletDataRazorPay as any
		walletStore.payoutMethod = walletDataRazorPay.methods[0] as any

		// make it payable via store getter requirements
		;(walletStore.payoutMethod as any).payload = {
			...(walletStore.payoutMethod as any).payload,
			payoutMode: RazorPayPayoutMode.UPI,
			accountVpa: 'test@upi',
			fullName: 'Test User',
			birthday: '2000-01-01',
			phone: '123',
			email: 'a@b.c',
			address: 'addr',
			numberIdentification: 'id',
		}

		await nextTick()

		expect(wrapper.find('[data-test="wallet-service-razorpay"]').exists()).toBe(true)

		const tags = wrapper.findAll('[data-test="el-tag"]')
		expect(tags.length).toBeGreaterThanOrEqual(2)

		expect(wrapper.text()).toContain('wallet.paymentServices.razorPay.statuses.payable')
		expect(wrapper.text()).toContain(String(RazorPayPayoutMode.UPI))
	})

	it('calls RazorPayForm.toggleFormVisibility on setup button click', async () => {
		const { wrapper, walletStore } = factory()
		walletStore.wallet = walletDataRazorPay as any
		walletStore.payoutMethod = walletDataRazorPay.methods[0] as any
		await nextTick()

		await wrapper.find('[data-test="razorpay-setup-btn"]').trigger('click')
		expect(toggleFormVisibilityMock).toHaveBeenCalled()
	})
})

