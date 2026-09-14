import { defineComponent } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElTable } from '@/components/element-plus'
import { brandAwarenessCampaign } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessCampaigns/fixtures/brandAwarenessCampaign'

import ColumnImpressions from '../ColumnImpressions.vue'

const ProgressStub = defineComponent({
	name: 'Progress',
	props: ['current', 'total', 'text'],
	template: '<div data-test="progress-stub" />',
})

const ColumnImpressionsTestHost = defineComponent({
	name: 'ColumnImpressionsTestHost',
	components: { ColumnImpressions, ElTable },
	props: {
		tableData: { type: Array, required: true },
	},
	template: `
		<ElTable :data="tableData" style="width:100%">
			<ColumnImpressions :items="tableData" />
		</ElTable>
	`,
})

describe('Partner Campaigns ColumnImpressions Component', () => {
	let lastWrapper: ReturnType<typeof mount> | undefined

	afterEach(() => {
		lastWrapper?.unmount()
		lastWrapper = undefined
	})

	const factory = async (tableData: unknown[]) => {
		const wrapper = mount(ColumnImpressionsTestHost, {
			attachTo: document.body,
			global: {
				plugins: [
					i18n,
					createTestingPinia({ createSpy: vi.fn }),
				],
				stubs: {
					Progress: ProgressStub,
				},
			},
			props: { tableData },
		})

		await flushPromises()
		lastWrapper = wrapper

		return wrapper
	}

	const findProgress = (wrapper: ReturnType<typeof mount>) =>
		wrapper.findComponent(ProgressStub)

	it('sets column label from campaigns locale', async () => {
		const wrapper = await factory([brandAwarenessCampaign])
		const col = wrapper.findComponent({ name: 'ElTableColumn' })

		expect(col.props('label')).toBe('Views')
	})

	it('passes impressions current, total, and formatted total text to Progress', async () => {
		const wrapper = await factory([brandAwarenessCampaign])
		const progress = findProgress(wrapper)

		expect(progress.exists()).toBe(true)
		expect(progress.props('current')).toBe(brandAwarenessCampaign.impressions.current)
		expect(progress.props('total')).toBe(brandAwarenessCampaign.impressions.total)
		expect(String(progress.props('text'))).toMatch(/\d/)
	})
})
