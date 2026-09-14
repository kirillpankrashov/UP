import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { Locale } from '@/core/types'
import { i18n } from '@/core/i18n'
import { linkProfileData } from '@/modules/Streamer/views/Link/api/getProfile/fixtures/linkProfileData'
import { useLinkProfileStore } from '@/modules/Streamer/views/Link/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { profileData } from '@/modules/Streamer/views/Profile/store/__fixtures__/profileData'

import GearBlock from '../GearBlock.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Streamer Link Profile GearBlock', () => {
	const factory = (fetchProfile = true) => {
		const wrapper = mount(GearBlock, {
			props: {
				index: 0,
				block: {
					title: '',
					properties: '',
					link: '',
					sku: '',
				},
			},
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: [
					'router-link',
				],
			},
		})

		const streamerStore = useStreamerStore()
		const linkProfileStore = useLinkProfileStore()

		if (fetchProfile) {
			linkProfileStore.profile = linkProfileData
		}

		streamerStore.profile = profileData

		return { wrapper, linkProfileStore, streamerStore }
	}


	it('should emit delete-block event when delete button is clicked', async () => {
		const { wrapper } = factory()

		await nextTick()

		await wrapper.findComponent({ name: 'MiniXButton' }).trigger('click')

		expect(wrapper.emitted('delete-block')).toBeTruthy()
	})

	it('should emit change-block event when input value changes', async () => {
		const { wrapper } = factory()

		await nextTick()

		const input = wrapper.find('[data-test="gear-block-input-title"]')

		await input.setValue('New Title')
		expect(wrapper.emitted('change-block')).toBeTruthy()
		expect((wrapper.emitted('change-block')![0][0] as any).title).toBe('New Title')
	})

	it('should render link and sku fields if streamer language is RU', async () => {
		const { wrapper, streamerStore } = factory()

		await nextTick()

		expect(wrapper.find('[data-test="gear-block-input-link"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="gear-block-input-sku"]').exists()).toBe(false)

		streamerStore.profile!.language = Locale.RU

		await nextTick()

		expect(wrapper.find('[data-test="gear-block-input-link"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="gear-block-input-sku"]').exists()).toBe(true)
	})

	it('should update SKU when link input value changes', async () => {
		const { wrapper, streamerStore } = factory()

		streamerStore.profile!.language = Locale.RU

		await nextTick()

		const input = wrapper.find('[data-test="gear-block-input-link"]')

		await input.setValue('https://example.com?sku=67890')

		expect(wrapper.emitted('change-block')).toBeTruthy()
		expect((wrapper.emitted('change-block')![0][0] as any).link).toBe('https://example.com?sku=67890')
	})
})
