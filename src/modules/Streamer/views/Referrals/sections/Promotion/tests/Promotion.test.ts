import { nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'
import { referralsData } from '@/modules/Streamer/views/Referrals/api/getReferral/fixtures/referralsData'
import { useReferralsStore } from '@/modules/Streamer/views/Referrals/store'

import Promotion from '../Promotion.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Streamer Referrals Promotion', () => {
	vi.mocked(useRoute).mockReturnValue({
		query: {},
	} as any)

	const factory = () => {
		const wrapper = mount(Promotion, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
		})

		const streamerStore = useStreamerStore()
		streamerStore.profile = profileData

		const referralsStore = useReferralsStore()
		referralsStore.referral = referralsData

		return { wrapper, streamerStore, referralsStore }
	}

	it('renders correctly when referral data is available', async () => {
		const { wrapper } = factory()

		await nextTick()

		expect(wrapper.find('[data-test="referrals-promotion-section"]').exists()).toBe(true)
	})

	it('does not render when referral data is not available', async () => {
		const { wrapper, referralsStore } = factory()
		referralsStore.referral = null

		await nextTick()

		expect(wrapper.find('[data-test="referrals-promotion-section"]').exists()).toBe(false)
	})

	it('calls togglePromotion method when switch is changed', async () => {
		const { wrapper, referralsStore } = factory()

		await nextTick()

		const switchElement = wrapper.find('[data-test="referrals-promotion-switch"]')
		await switchElement.trigger('click')

		expect(referralsStore.togglePromotion).toHaveBeenCalled()
	})

	it('calls sendWidgetPreview method when button is clicked', async () => {
		const { wrapper, referralsStore } = factory()

		await nextTick()

		const buttonElement = wrapper.find('[data-test="referrals-promotion-widget-preview"]')

		await buttonElement.trigger('click')

		expect(referralsStore.sendWidgetPreview).toHaveBeenCalled()
	})
})
