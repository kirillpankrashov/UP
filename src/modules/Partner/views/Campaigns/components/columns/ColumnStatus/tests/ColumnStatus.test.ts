import { defineComponent } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElTable } from '@/components/element-plus'
import { brandAwarenessCampaign } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessCampaigns/fixtures/brandAwarenessCampaign'

import ColumnStatus from '../ColumnStatus.vue'

vi.mock('@/core/helpers')
vi.mock('@/modules/Partner/views/Campaigns/api')

vi.mock('vue-router', async () => {
	const actual = await vi.importActual<typeof import('vue-router')>('vue-router')

	return {
		...actual,
		useRouter: vi.fn(() => ({
			push: vi.fn(),
			currentRoute: { value: { query: {} } },
		})),
		useRoute: vi.fn(() => ({
			name: 'brand-awareness-campaigns',
			query: {},
		})),
	}
})

const StatusStub = {
	name: 'Status',
	props: ['row'],
	template: '<div data-test="status-stub" />',
}

const ColumnStatusTestHost = defineComponent({
	name: 'ColumnStatusTestHost',
	components: { ColumnStatus, ElTable },
	props: {
		tableData: { type: Array, required: true },
	},
	template: `
		<ElTable :data="tableData" style="width:100%">
			<ColumnStatus :items="tableData" />
		</ElTable>
	`,
})

describe('Partner Campaigns ColumnStatus Component', () => {
	let lastWrapper: ReturnType<typeof mount> | undefined

	afterEach(() => {
		lastWrapper?.unmount()
		lastWrapper = undefined
	})

	const factory = async (tableData: unknown[]) => {
		const wrapper = mount(ColumnStatusTestHost, {
			attachTo: document.body,
			global: {
				plugins: [
					i18n,
					createTestingPinia({ createSpy: vi.fn }),
				],
				stubs: {
					Status: StatusStub,
				},
			},
			props: { tableData },
		})

		await flushPromises()
		lastWrapper = wrapper

		return wrapper
	}

	it('sets column label from campaigns locale', async () => {
		const wrapper = await factory([brandAwarenessCampaign])
		const col = wrapper.findComponent({ name: 'ElTableColumn' })

		expect(col.props('label')).toBe('Status')
	})

	it('passes row to Status child component', async () => {
		const wrapper = await factory([brandAwarenessCampaign])
		const status = wrapper.findComponent(StatusStub)

		expect(status.exists()).toBe(true)
		expect(status.props('row')).toEqual(brandAwarenessCampaign)
	})
})
