import { nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { Locale } from '@/core/types'
import { useCurrency } from '@/core/hooks'
import { i18n } from '@/core/i18n'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'
import { referralsData } from '@/modules/Streamer/views/Referrals/api/getReferral/fixtures/referralsData'
import { useReferralsStore } from '@/modules/Streamer/views/Referrals/store'

import Invite from '../Invite.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Streamer Referrals Invite', () => {
	vi.mocked(useRoute).mockReturnValue({
		query: {},
	} as any)

	const { formatCurrency } = useCurrency()

	const factory = () => {
		const wrapper = mount(Invite, {
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

	// beforeEach(() => {
	// 	vi.useFakeTimers()
	// })

	it('renders correctly when referral data is available', async () => {
		const { wrapper } = factory()

		await nextTick()

		expect(wrapper.find('[data-test="referrals-invite-section"]').exists()).toBe(true)
	})

	it('does not render when referral data is not available', async () => {
		const { wrapper, referralsStore } = factory()
		referralsStore.referral = null

		await nextTick()

		expect(wrapper.find('[data-test="referrals-invite-section"]').exists()).toBe(false)
	})

	it('displays the correct referral link', async () => {
		const { wrapper } = factory()

		await nextTick()

		expect(wrapper.find('[data-test="referrals-invite-link"]').text()).toBe(referralsData.link)
	})

	it('displays correct statistics', async () => {
		const { wrapper } = factory()

		await nextTick()

		const statCards = wrapper.findAllComponents({ name: 'StatCard' })

		expect(statCards).toHaveLength(2)
		expect(statCards[0]!.props('value')).toBe(referralsData.invited.toString())
		expect(statCards[1]!.props('value')).toBe(formatCurrency(referralsData.amount, false, referralsData.currency))
	})

	it('does not display the amount if showAmount is false', async () => {
		const { wrapper, streamerStore, referralsStore } = factory()

		streamerStore.profile!.language = Locale.RU
		referralsStore.referral!.amount = 0

		await nextTick()

		const statCards = wrapper.findAllComponents({ name: 'StatCard' })
		expect(statCards).toHaveLength(1)
	})

	it('calls share method when share button is clicked', async () => {
		const { wrapper } = factory()

		await nextTick()

		const shareSpy = vi.spyOn(wrapper.vm, 'share')

		wrapper.find('[data-test="referrals-invite-share-twitter"]').trigger('click')
		expect(shareSpy).toHaveBeenCalled()

		wrapper.find('[data-test="referrals-invite-share-facebook"]').trigger('click')
		expect(shareSpy).toHaveBeenCalled()
	})
})
