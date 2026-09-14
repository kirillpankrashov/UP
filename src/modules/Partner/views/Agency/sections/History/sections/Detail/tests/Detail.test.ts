import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { useAgencyReferralStore } from '@/modules/Partner/views/Agency/store'

import Detail from '../Detail.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
	useCurrency: () => ({
		formatCurrency: (value: number) => `FMT-${value}`,
	}),
}))

vi.mock('@/core/helpers')

vi.mock('@/components/element-plus', () => ({
	ElDrawer: {
		name: 'ElDrawer',
		props: ['modelValue', 'beforeClose', 'title'],
		emits: ['update:modelValue'],
		template: '<div data-test="el-drawer" :data-model-value="String(modelValue)"><slot /></div>',
	},
	ElTable: {
		name: 'ElTable',
		props: ['data'],
		template: '<div data-test="el-table"><slot /></div>',
	},
	ElTableColumn: {
		name: 'ElTableColumn',
		props: ['prop', 'label', 'align', 'sortable'],
		template: '<div />',
	},
}))

describe('Partner Agency History Detail', () => {
	const createWrapper = (historyDetailData: any[]) => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
		})

		const referralStore = useAgencyReferralStore(pinia)
		referralStore.historyDetail.data = historyDetailData

		const wrapper = mount(Detail, {
			global: {
				plugins: [i18n, pinia],
				stubs: {},
			},
		})

		return { wrapper, referralStore }
	}

	it('renders empty state when historyDetail is empty', () => {
		const { wrapper } = createWrapper([])

		expect(wrapper.findComponent({ name: 'ElTable' }).exists()).toBe(false)
		expect(wrapper.text()).toContain('creators.list.none')
	})

	it('renders table when historyDetail has data', async () => {
		const { wrapper } = createWrapper([
			{
				streamer: { name: 'Streamer 1' },
				amount: 123,
			},
		])

		await nextTick()
		expect(wrapper.findComponent({ name: 'ElTable' }).exists()).toBe(true)
	})

	it('toggles drawer visibility via exposed method', async () => {
		const { wrapper } = createWrapper([])

		const drawer = wrapper.find('[data-test="el-drawer"]')
		expect(drawer.attributes('data-model-value')).toBe('false')

		// method is exposed from <script setup>
		await (wrapper.vm as any).toggleSidebarVisibility()
		await nextTick()

		const drawerAfter = wrapper.find('[data-test="el-drawer"]')
		expect(drawerAfter.attributes('data-model-value')).toBe('true')
	})
})

