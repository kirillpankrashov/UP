import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { walletDataTochka } from '@/modules/Streamer/views/Wallet/api/getWallet/fixtures/walletData'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import ServiceTochka from '../ServiceTochka.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

const ElButtonStub = {
	name: 'ElButton',
	emits: ['click'],
	template: '<button data-test="tochka-setup-btn" @click="$emit(\'click\')"><slot /></button>',
}

const ElTagStub = {
	name: 'ElTag',
	props: ['type'],
	template: '<span data-test="el-tag" :data-type="type"><slot /></span>',
}

const ElAlertStub = {
	name: 'ElAlert',
	props: ['title', 'type'],
	template: '<div data-test="tochka-alert" :data-type="type">{{ title }}<slot /></div>',
}

const TextLinkStub = {
	name: 'TextLink',
	props: ['href'],
	template: '<a data-test="tochka-learn-more" :href="href"><slot /></a>',
}

const toggleFormVisibilityMock = vi.fn()
const TochkaFormStub = {
	name: 'TochkaForm',
	setup (_p: any, { expose }: any) {
		expose({ toggleFormVisibility: toggleFormVisibilityMock })
		return () => null
	},
}

describe('Streamer Wallet Services ServiceTochka', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = () => {
		const wrapper = mount(ServiceTochka, {
			global: {
				plugins: [createTestingPinia({ createSpy: vi.fn })],
				stubs: {
					ElButton: ElButtonStub,
					ElTag: ElTagStub,
					ElAlert: ElAlertStub,
					TextLink: TextLinkStub,
					TochkaForm: TochkaFormStub,
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

		expect(wrapper.find('[data-test="wallet-service-tochka"]').exists()).toBe(false)
	})

	it('shows warning alert and NOT payable tag when isPayable=false', async () => {
		const { wrapper, walletStore } = factory()
		walletStore.wallet = walletDataTochka as any
		walletStore.payoutMethod = walletDataTochka.methods[0] as any
		await nextTick()

		expect(wrapper.find('[data-test="wallet-service-tochka"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="tochka-alert"]').exists()).toBe(true)
		expect(wrapper.text()).toContain('wallet.paymentServices.tochkaBank.statuses.notPayable')
	})

	it('hides warning alert and shows payable tag when isPayable=true', async () => {
		const { wrapper, walletStore } = factory()
		walletStore.wallet = walletDataTochka as any
		walletStore.payoutMethod = walletDataTochka.methods[0] as any

		;(walletStore.payoutMethod as any).payload = {
			...(walletStore.payoutMethod as any).payload,
			name: 'A',
			lastName: 'B',
			middleName: 'C',
			personalCode: 'pc',
			accountNumber: 'acc',
			routingNumber: 'r',
			selfEmployed: true,
		}

		await nextTick()

		expect(wrapper.find('[data-test="tochka-alert"]').exists()).toBe(false)
		expect(wrapper.text()).toContain('wallet.paymentServices.tochkaBank.statuses.payable')
	})

	it('calls TochkaForm.toggleFormVisibility on setup button click', async () => {
		const { wrapper, walletStore } = factory()
		walletStore.wallet = walletDataTochka as any
		walletStore.payoutMethod = walletDataTochka.methods[0] as any
		await nextTick()

		await wrapper.find('[data-test="tochka-setup-btn"]').trigger('click')
		expect(toggleFormVisibilityMock).toHaveBeenCalled()
	})
})

