import { nextTick, ref } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useAgencyReferralStore } from '@/modules/Partner/views/Agency/store'

import ReferralLink from '../ReferralLink.vue'

const copyMock = vi.fn()
const copiedRef = ref(false)
const isSupportedRef = ref(true)

vi.mock('@vueuse/core', () => ({
	useClipboard: () => ({
		copy: copyMock,
		copied: copiedRef,
		isSupported: isSupportedRef,
	}),
}))

vi.mock('@/core/helpers')

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

vi.mock('@/components/element-plus', () => ({
	ElButton: {
		name: 'ElButton',
		props: ['type', 'size'],
		emits: ['click'],
		template: '<button data-test="partner-agency-overview-referral-link-copy-btn" :data-type="type" @click="$emit(\'click\')"><slot /></button>',
	},
}))

describe('Partner Agency Overview ReferralLink', () => {
	beforeEach(() => {
		copyMock.mockReset()
		copiedRef.value = false
		isSupportedRef.value = true
		vi.clearAllMocks()
	})

	const factory = (referral: { link: string } | null) => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
		})

		const referralStore = useAgencyReferralStore(pinia)
		referralStore.referral.data = referral as any

		const wrapper = mount(ReferralLink, {
			global: {
				plugins: [i18n, pinia],
			},
		})

		return { wrapper, referralStore }
	}

	it('renders referral link text and copy button (static)', async () => {
		const { wrapper } = factory({ link: 'https://example.com/ref' })

		await nextTick()

		expect(wrapper.text()).toContain('https://example.com/ref')
		const btn = wrapper.find('[data-test="partner-agency-overview-referral-link-copy-btn"]')
		expect(btn.exists()).toBe(true)
		expect(btn.attributes('data-type')).toBe('primary')
		expect(btn.text()).toContain('button.copyLink.static')
	})

	it('switches button to success state when clipboard is copied', async () => {
		copiedRef.value = true
		const { wrapper } = factory({ link: 'https://example.com/ref' })

		await nextTick()

		const btn = wrapper.find('[data-test="partner-agency-overview-referral-link-copy-btn"]')
		expect(btn.attributes('data-type')).toBe('success')
		expect(btn.text()).toContain('button.copyLink.success')
	})

	it('click copies referral link when clipboard is supported and not copied yet', async () => {
		const { wrapper } = factory({ link: 'https://example.com/ref' })

		await nextTick()
		await wrapper.find('[data-test="partner-agency-overview-referral-link-copy-btn"]').trigger('click')

		expect(copyMock).toHaveBeenCalledTimes(1)
		expect(copyMock).toHaveBeenCalledWith('https://example.com/ref')
	})

	it('does not copy and logs when clipboard is not supported', async () => {
		isSupportedRef.value = false
		const { wrapper } = factory({ link: 'https://example.com/ref' })

		await nextTick()
		await wrapper.find('[data-test="partner-agency-overview-referral-link-copy-btn"]').trigger('click')

		expect(copyMock).not.toHaveBeenCalled()
		const { Logger } = await import('@/core/helpers')
		expect(Logger.info).toHaveBeenCalledWith('Clipboard is not supported', true)
	})

	it('does not copy again when already copied', async () => {
		copiedRef.value = true
		const { wrapper } = factory({ link: 'https://example.com/ref' })

		await nextTick()
		await wrapper.find('[data-test="partner-agency-overview-referral-link-copy-btn"]').trigger('click')

		expect(copyMock).not.toHaveBeenCalled()
	})
})

