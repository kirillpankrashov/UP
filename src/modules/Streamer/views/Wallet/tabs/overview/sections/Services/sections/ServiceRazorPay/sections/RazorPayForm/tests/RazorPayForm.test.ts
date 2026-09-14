import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import type { FormRules } from 'element-plus'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

import { RazorPayPayoutMode } from '@/core/types'
import { i18n } from '@/core/i18n'
import { alphanumeric, required } from '@/core/validators'
import { walletDataRazorPay } from '@/modules/Streamer/views/Wallet/api/getWallet/fixtures/walletData'
import { useWalletStore } from '@/modules/Streamer/views/Wallet/store'

import RazorPayForm from '../RazorPayForm.vue'

describe('Streamer Wallet overview RazorPayForm', () => {
	const factory = () => {
		const wrapper = mount(RazorPayForm, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
		})

		wrapper.vm.toggleFormVisibility()

		const walletStore = useWalletStore()
		walletStore.wallet = walletDataRazorPay
		walletStore.payoutMethod = walletDataRazorPay.methods[0]

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
		const { wrapper, walletStore } = factory()

		const rules: FormRules = {
			fullName: [required],
			birthday: [required],
			phone: [required],
			email: [required],
			address: [required],
			payoutMode: [required],
			bankIfsc: [required],
			beneficiaryAccountNumber: [required],
			panCard: [alphanumeric],
			documentType: [required],
		}

		const upiRules: FormRules = {
			fullName: [required],
			birthday: [required],
			phone: [required],
			email: [required],
			address: [required],
			payoutMode: [required],
			accountVpa: [required],
			panCard: [alphanumeric],
			documentType: [required],
		}

		await nextTick()

		expect(wrapper.vm.rules).toEqual(rules)
		expect(wrapper.find('[data-test="razor-pay-form-non-upi-fields"]').exists()).toBe(true)

		//@ts-ignore
		walletStore.payoutMethod!.payload.payoutMode = RazorPayPayoutMode.UPI

		await nextTick()

		expect(wrapper.vm.rules).toEqual(upiRules)
		expect(wrapper.find('[data-test="razor-pay-form-upi-fields"]').exists()).toBe(true)
	})
})
