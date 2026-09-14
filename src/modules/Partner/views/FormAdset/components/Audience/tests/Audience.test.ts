import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import type { IAudience } from '@/modules/Partner/views/FormAdset/api/calculateAudience/types'
import { useFormAdsetStore } from '@/modules/Partner/views/FormAdset/store'

import Audience from '../Audience.vue'

// vi.mock('@/components', () => ({
// 	Advice: {
// 		name: 'Advice',
// 		template: '<div><slot /></div>',
// 		props: ['type', 'label'],
// 	},
// }))
vi.mock('@/core/hooks', async () => ({
	// const actual = await vi.importActual<any>('@/core/hooks')
	useCurrency: () => ({
		formatNumber: (n: number) => `#${n}`,
	}),
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('FormAdset Audience', () => {
	const factory = (audience: IAudience | null = null) => {
		const wrapper = mount(Audience, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({
						createSpy: vi.fn,
					}),
				],
				// stubs: {},
			},
		})

		const formAdsetStore = useFormAdsetStore()
		formAdsetStore.audience = audience

		return wrapper
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders all labels and values', async () => {
		const wrapper = factory({
			impressions: 12345,
			reach: 6789,
			streamers: 42,
		})

		await nextTick()

		expect(wrapper.find('[data-test="audience-impressions"]').text()).toBe('#12345')
		expect(wrapper.find('[data-test="audience-reach"]').text()).toBe('#6789')
		expect(wrapper.find('[data-test="audience-streamers"]').text()).toBe('42')
	})

	it('renders zero and dash for missing values', async () => {
		const wrapper = factory(null)

		await nextTick()

		expect(wrapper.find('[data-test="audience-impressions"]').text()).toBe('#0')
		expect(wrapper.find('[data-test="audience-reach"]').text()).toBe('#0')
		expect(wrapper.find('[data-test="audience-streamers"]').text()).toBe('–')
	})

	it('renders dash for completely undefined audience', async () => {
		const wrapper = factory(null)

		await nextTick()

		expect(wrapper.find('[data-test="audience-impressions"]').text()).toBe('#0')
		expect(wrapper.find('[data-test="audience-reach"]').text()).toBe('#0')
		expect(wrapper.find('[data-test="audience-streamers"]').text()).toBe('–')
	})

	it('renders all translation keys', async () => {
		const wrapper = factory()

		await nextTick()

		expect(wrapper.text()).toContain('adset.targeting.evaluation.label')
		expect(wrapper.text()).toContain('adset.targeting.evaluation.description')
		expect(wrapper.text()).toContain('adset.targeting.evaluation.size')
		expect(wrapper.text()).toContain('adset.targeting.evaluation.reach')
		expect(wrapper.text()).toContain('adset.targeting.evaluation.streamersNumber')
		expect(wrapper.text()).toContain('adset.targeting.evaluation.howCalculated')
	})
})
