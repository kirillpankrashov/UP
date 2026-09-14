import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import type { FormRules } from 'element-plus'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { bankAccount, beginsWith, bic, cyrillic, inn, required } from '@/core/validators'
import { walletDataTochka } from '@/modules/Streamer/views/Wallet/api/getWallet/fixtures/walletData'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import TochkaForm from '../TochkaForm.vue'

describe('Streamer Wallet overview TochkaForm', () => {
	const factory = () => {
		const wrapper = mount(TochkaForm, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
		})

		wrapper.vm.toggleFormVisibility()

		const walletStore = useWalletStore()
		walletStore.wallet = walletDataTochka

		return {
			wrapper,
			walletStore,
		}
	}

	beforeAll(() => {
		vi.useFakeTimers()
	})

	beforeEach(() => {
		vi.clearAllTimers()
	})

	it('form has corresponding validators', async () => {
		const { wrapper } = factory()

		const rules: FormRules = {
			name: [required, cyrillic],
			lastName: [required, cyrillic],
			middleName: [required, cyrillic],
			personalCode: [required, inn],
			accountNumber: [required, beginsWith('40817810'), bankAccount],
			routingNumber: [required, bic],
		}

		await nextTick()

		expect(JSON.stringify(wrapper.vm.rules)).toEqual(JSON.stringify(rules))
	})
})
