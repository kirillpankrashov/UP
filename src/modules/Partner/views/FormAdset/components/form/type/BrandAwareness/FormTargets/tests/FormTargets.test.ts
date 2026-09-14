import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { StrategyPayment } from '@/core/types'

import FormTargets from '../FormTargets.vue'

// Мокируем секции
vi.mock('../sections', () => ({
	PPV: {
		name: 'PPV',
		template: '<div>PPV Component</div>',
		props: ['modelValue'],
		emits: ['update:modelValue'],
	},
	CPA: {
		name: 'CPA',
		template: '<div>CPA Component</div>',
		props: ['modelValue'],
		emits: ['update:modelValue'],
	},
}))

describe('FormTargets Component', () => {
	const factory = (props = {}) => {
		const wrapper = mount(FormTargets, {
			props: {
				modelValue: {
					strategyPayment: StrategyPayment.PPV,
					targetCtr: undefined,
					targetEvr: undefined,
				},
				...props,
			},
		})
		return { wrapper }
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('renders PPV component when strategyPayment is PPV', async () => {
		const { wrapper } = factory({
			modelValue: {
				strategyPayment: StrategyPayment.PPV,
				targetCtr: undefined,
				targetEvr: undefined,
			},
		})

		await nextTick()

		expect(wrapper.findComponent({ name: 'PPV' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'CPA' }).exists()).toBe(false)
	})

	it('renders PPV component when strategyPayment is PPVA', async () => {
		const { wrapper } = factory({
			modelValue: {
				strategyPayment: StrategyPayment.PPVA,
				targetCtr: undefined,
				targetEvr: undefined,
			},
		})

		await nextTick()

		expect(wrapper.findComponent({ name: 'PPV' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'CPA' }).exists()).toBe(false)
	})

	it('renders CPA component when strategyPayment is CPA', async () => {
		const { wrapper } = factory({
			modelValue: {
				strategyPayment: StrategyPayment.CPA,
				targetCtr: undefined,
				targetEvr: undefined,
			},
		})

		await nextTick()

		expect(wrapper.findComponent({ name: 'CPA' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'PPV' }).exists()).toBe(false)
	})

	it('renders nothing when strategyPayment is CPC', async () => {
		const { wrapper } = factory({
			modelValue: {
				strategyPayment: StrategyPayment.CPC,
				targetCtr: undefined,
				targetEvr: undefined,
			},
		})

		await nextTick()

		expect(wrapper.findComponent({ name: 'PPV' }).exists()).toBe(false)
		expect(wrapper.findComponent({ name: 'CPA' }).exists()).toBe(false)
	})

	it('switches components when strategyPayment changes', async () => {
		const { wrapper } = factory({
			modelValue: {
				strategyPayment: StrategyPayment.PPV,
				targetCtr: 1.5,
				targetEvr: undefined,
			},
		})

		await nextTick()
		expect(wrapper.findComponent({ name: 'PPV' }).exists()).toBe(true)

		// Меняем стратегию на CPA
		await wrapper.setProps({
			modelValue: {
				strategyPayment: StrategyPayment.CPA,
				targetCtr: 1.5,
				targetEvr: 2.0,
			},
		})

		await nextTick()
		expect(wrapper.findComponent({ name: 'CPA' }).exists()).toBe(true)
		expect(wrapper.findComponent({ name: 'PPV' }).exists()).toBe(false)
	})

	it('passes model value to child component', async () => {
		const modelValue = {
			strategyPayment: StrategyPayment.PPV,
			targetCtr: 2.5,
			targetEvr: undefined,
		}

		const { wrapper } = factory({ modelValue })

		await nextTick()

		const component = wrapper.findComponent({ name: 'PPV' })
		expect(component.props('modelValue')).toEqual(modelValue)
	})

	it('emits update when child component changes', async () => {
		const { wrapper } = factory({
			modelValue: {
				strategyPayment: StrategyPayment.CPA,
				targetCtr: undefined,
				targetEvr: 1.0,
			},
		})

		await nextTick()

		const updatedModel = {
			strategyPayment: StrategyPayment.CPA,
			targetCtr: undefined,
			targetEvr: 3.0,
		}

		await wrapper.vm.$emit('update:modelValue', updatedModel)

		const emitted = wrapper.emitted('update:modelValue')
		expect(emitted).toBeTruthy()
		expect(emitted![0][0]).toEqual(updatedModel)
	})
})
