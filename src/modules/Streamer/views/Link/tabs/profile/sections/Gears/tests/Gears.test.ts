import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { linkProfileData } from '@/modules/Streamer/views/Link/api/getProfile/fixtures/linkProfileData'
import { useLinkProfileStore } from '@/modules/Streamer/views/Link/store'

import Gears from '../Gears.vue'

vi.mock('vue-router')
vi.mock('@/core/helpers')

describe('Streamer Link Profile Gears', () => {
	const factory = (fetchProfile = true) => {
		const wrapper = mount(Gears, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: [
					'router-link',
					// 'GearBlock',
					// 'PlusButton',
				],
			},
		})

		const linkProfileStore = useLinkProfileStore()

		if (fetchProfile) {
			linkProfileStore.profile = linkProfileData
		}

		return { wrapper, linkProfileStore }
	}

	it('renders the component with initial data', async () => {
		const { wrapper } = factory(false)

		await nextTick()

		const form = wrapper.findComponent({ name: 'ElForm' })
		expect(form.exists()).toBe(true)

		await nextTick()

		const gearBlocks = wrapper.findAllComponents({ name: 'GearBlock' })
		expect(gearBlocks.length).toBe(1)
	})

	it('adds a new gear block', async () => {
		const { wrapper } = factory()

		await nextTick()

		const addButton = wrapper.findComponent({ name: 'PlusButton' })

		await addButton.trigger('click')

		await nextTick()

		const gearBlocks = wrapper.findAllComponents({ name: 'GearBlock' })

		expect(gearBlocks.length).toBe(2)
	})

	it('updates a gear block', async () => {
		const { wrapper } = factory()

		await nextTick()

		const gearBlock = wrapper.findComponent({ name: 'GearBlock' })
		const spyUpdateBlock = vi.spyOn(wrapper.vm, 'updateBlock')

		gearBlock.vm.$emit('change-block', { title: 'Updated Title' })

		expect(spyUpdateBlock).toHaveBeenCalledWith(0, { title: 'Updated Title' })
	})

	it('deletes a gear block', async () => {
		const { wrapper } = factory()

		await nextTick()

		const gearBlock = wrapper.findComponent({ name: 'GearBlock' })
		await gearBlock.vm.$emit('delete-block', 0)

		const gearBlocks = wrapper.findAllComponents({ name: 'GearBlock' })
		expect(gearBlocks.length).toBe(0)
	})
})
