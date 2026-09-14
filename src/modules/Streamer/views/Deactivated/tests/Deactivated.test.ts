import { nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import moment from 'moment'
import { describe, expect, it, vi } from 'vitest'

import { Locale } from '@/core/types'
import { i18n } from '@/core/i18n'
import { RouteName } from '@/modules/Streamer/router'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import Deactivated from '../Deactivated.vue'

vi.mock('vue-router')
vi.mock('vue-qr/src/packages/vue-qr.vue')
vi.mock('@/core/helpers')

describe('Streamer Deactivated', () => {
	vi.mocked(useRoute).mockReturnValue({
		query: {},
	} as any)

	vi.mocked(useRouter).mockReturnValue({
		push: vi.fn(),
	} as any)

	const factory = (props: any) => {
		const wrapper = mount(Deactivated, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
			props,
		})

		const streamerStore = useStreamerStore()
		streamerStore.profile = profileData

		return { wrapper, streamerStore }
	}

	it('should compute daysLeft correctly and render the date', async () => {
		const { wrapper, streamerStore } = factory({})

		streamerStore.profile!.deleted = {
			daysLeft: 40,
			isDeleted: false,
			isRequested: true,
		}

		await nextTick()

		const formattedDate = moment()
			.locale(Locale.EN)
			.add(streamerStore.profile!.deleted.daysLeft, 'days')
			.format('LL')

		expect(wrapper.text()).toContain(formattedDate)
	})

	it('should redirect to dashboard if streamer.deleted.isRequested is false', async () => {
		const { streamerStore } = factory({})

		streamerStore.profile!.deleted = {
			daysLeft: 40,
			isDeleted: false,
			isRequested: false,
		}

		const router = useRouter()

		expect(router.push).toHaveBeenCalledWith({ name: RouteName.DASHBOARD })
	})
})
