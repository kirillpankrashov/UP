import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useDashboardStore } from '@/modules/Streamer/views/Dashboard/store'
import { tierData } from '@/modules/Streamer/views/Dashboard/store/__fixtures__/tierData'

import Level from '../Level.vue'

import Level3Icon from '@/assets/img/icons/level-3.svg'

describe('Streamer Dashboard Loyalty Progress Level', () => {
	const factory = (props: any, level: number) => {
		const wrapper = mount(Level, {
			global: {
				plugins: [i18n, createTestingPinia({
					createSpy: vi.fn,
				})],
				stubs: ['router-link'],
			},
			props,
		})

		const dashboardStore = useDashboardStore()
		dashboardStore.tier.data = tierData

		dashboardStore.tier.selectedLevel = level

		return { wrapper, dashboardStore }
	}

	it('renders the correct icon and level', async () => {
		const { wrapper } = factory({
			level: 3,
		}, 3)

		await nextTick()

		expect(wrapper.findComponent(Level3Icon).exists()).toBe(true)

		expect(wrapper.text()).toContain('LVL 3')
	})

	it('adds the _selected class when selectedLevel matches level prop', async () => {
		const { wrapper } = factory({
			level: 2,
		}, 2)

		await nextTick()

		expect(wrapper.classes()).toContain('_selected')
	})

	it('adds the _current-level class when currentLevel matches level prop', async () => {
		const { wrapper } = factory({
			level: 1,
		}, 1)

		await nextTick()

		expect(wrapper.classes()).toContain('_current-level')
	})

	it('emits the setSelectedLevel event when clicked', async () => {
		const { wrapper } = factory({
			level: 1,
		}, 2)

		const spy = vi.spyOn(wrapper.vm, 'setSelectedLevel')

		await wrapper.trigger('click')

		expect(spy).toHaveBeenCalled()
	})

	it('selectedLevel doesn\'t change if level 0 was clicked', async () => {
		const { wrapper, dashboardStore } = factory({
			level: 1,
		}, 2)

		wrapper.vm.setSelectedLevel(0)

		expect(dashboardStore.tier.selectedLevel).toBe(2)
	})
})
