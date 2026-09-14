import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useAgencyStreamersStore } from '@/modules/Partner/views/Agency/store'

import Search from '../Search.vue'

vi.mock('@/core/helpers')

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))
vi.mock('@/modules/Partner/views/Agency/api')

vi.mock('@/components/element-plus', () => ({
	ElInput: {
		name: 'ElInput',
		props: ['modelValue', 'placeholder', 'disabled'],
		emits: ['update:modelValue', 'input'],
		template: `
			<input
				data-test="search-input"
				:placeholder="placeholder"
				:value="modelValue"
				:disabled="disabled"
				@input="$emit('update:modelValue', $event.target.value); $emit('input', $event.target.value)"
			/>
		`,
	},
}))

describe('Partner Agency Streamers Search Component', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		vi.useRealTimers()
	})

	const factory = () => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
		})

		const streamersStore = useAgencyStreamersStore(pinia)

		const wrapper = mount(Search, {
			global: {
				plugins: [i18n, pinia],
				stubs: {
					SearchIcon: {
						name: 'SearchIcon',
						template: '<span data-test="search-icon" />',
					},
				},
			},
		})

		return { wrapper, streamersStore }
	}

	it('disables input when streamers are not bootstrapped', async () => {
		const { wrapper } = factory()
		await nextTick()

		const input = wrapper.find('[data-test="search-input"]')
		expect(input.exists()).toBe(true)
		expect(input.attributes('disabled')).toBeDefined()
	})

	it('renders search input with placeholder', async () => {
		const { wrapper } = factory()
		await nextTick()

		const input = wrapper.find('[data-test="search-input"]')
		expect(input.exists()).toBe(true)
		expect(input.attributes('placeholder')).toBe('placeholder.partnerSearch')
	})

	it('debounced input calls fetchStreamers with search term', async () => {
		vi.useFakeTimers()
		const { wrapper, streamersStore } = factory()
		streamersStore.isBootstrapped = true
		await nextTick()

		const input = wrapper.find('[data-test="search-input"]')
		await input.setValue('abc')

		expect(streamersStore.fetchStreamers).not.toHaveBeenCalled()

		await vi.advanceTimersByTimeAsync(600)
		await nextTick()

		expect(streamersStore.fetchStreamers).toHaveBeenCalledTimes(1)
		expect(streamersStore.fetchStreamers).toHaveBeenCalledWith(1, false, 'abc')

		vi.useRealTimers()
	})
})
