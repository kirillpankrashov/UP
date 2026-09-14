import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { RouteName } from '@/modules/Streamer/router'
import { walletDataTipalti } from '@/modules/Streamer/views/Wallet/api/getWallet/fixtures/walletData'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import ServiceTipalti from '../ServiceTipalti.vue'

const pushMock = vi.fn()

vi.mock('vue-router', async () => {
	const actual = await vi.importActual<typeof import('vue-router')>('vue-router')
	return {
		...actual,
		useRouter: () => ({
			push: pushMock,
		}),
	}
})

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

const ElButtonStub = {
	name: 'ElButton',
	emits: ['click'],
	template: '<button data-test="tipalti-setup-btn" @click="$emit(\'click\')"><slot /></button>',
}

const TextLinkStub = {
	name: 'TextLink',
	props: ['href'],
	template: '<a data-test="tipalti-learn-more" :href="href"><slot /></a>',
}

describe('Streamer Wallet overview ServiceTipalti', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const factory = () => {
		const pinia = createTestingPinia({ createSpy: vi.fn })
		const walletStore = useWalletStore(pinia as any)

		walletStore.wallet = null

		const wrapper = mount(ServiceTipalti, {
			global: {
				plugins: [pinia],
				stubs: {
					ElButton: ElButtonStub,
					TextLink: TextLinkStub,
				},
			},
		})

		return { wrapper, walletStore }
	}

	it('does not render when wallet is null', async () => {
		const { wrapper } = factory()
		await nextTick()

		expect(wrapper.find('[data-test="wallet-service-default"]').exists()).toBe(false)
	})

	it('renders setup button and navigates on click when wallet exists', async () => {
		const { wrapper, walletStore } = factory()
		walletStore.wallet = walletDataTipalti as any
		await nextTick()

		expect(wrapper.find('[data-test="wallet-service-default"]').exists()).toBe(true)
		const btn = wrapper.find('[data-test="tipalti-setup-btn"]')
		expect(btn.exists()).toBe(true)

		await btn.trigger('click')

		expect(pushMock).toHaveBeenCalledWith({ name: RouteName.TIPALTI_ONBOARDING })
	})
})

