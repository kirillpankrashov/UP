import { defineComponent } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElTable } from '@/components/element-plus'

import ColumnDaysRemaining from '../ColumnDaysRemaining.vue'

const ColumnDaysRemainingTestHost = defineComponent({
	name: 'ColumnDaysRemainingTestHost',
	components: { ColumnDaysRemaining, ElTable },
	props: {
		tableData: { type: Array, required: true },
	},
	template: `
		<ElTable :data="tableData" style="width:100%">
			<ColumnDaysRemaining :items="tableData" />
		</ElTable>
	`,
})

describe('Partner Campaigns ColumnDaysRemaining Component', () => {
	let lastWrapper: ReturnType<typeof mount> | undefined

	afterEach(() => {
		lastWrapper?.unmount()
		lastWrapper = undefined
		vi.useRealTimers()
	})

	const factory = async (tableData: { dates: { end: string } }[]) => {
		const wrapper = mount(ColumnDaysRemainingTestHost, {
			attachTo: document.body,
			global: {
				plugins: [i18n],
			},
			props: { tableData },
		})

		await flushPromises()
		lastWrapper = wrapper

		return wrapper
	}

	const bodyCellText = (wrapper: ReturnType<typeof mount>) =>
		wrapper.find('.el-table__body .el-table__cell').text().trim()

	it('sets column label from campaigns locale', async () => {
		const wrapper = await factory([{ dates: { end: '30.06.2025' } }])
		const col = wrapper.findComponent({ name: 'ElTableColumn' })

		expect(col.props('label')).toBe('Days Remaining')
	})

	it('shows days remaining from end date when end is in the future', async () => {
		vi.useFakeTimers()
		vi.setSystemTime(new Date(2025, 5, 15, 12, 0, 0))

		const wrapper = await factory([{ dates: { end: '20.06.2025' } }])

		// moment end.diff(today,'days')+1 under fake timers (local TZ)
		expect(bodyCellText(wrapper)).toBe('5')
	})

	it('shows 1 when today matches the end date', async () => {
		vi.useFakeTimers()
		vi.setSystemTime(new Date(2025, 5, 15, 12, 0, 0))

		const wrapper = await factory([{ dates: { end: '15.06.2025' } }])

		expect(bodyCellText(wrapper)).toBe('1')
	})

	it('shows 0 when the end date is in the past', async () => {
		vi.useFakeTimers()
		vi.setSystemTime(new Date(2025, 5, 15, 12, 0, 0))

		const wrapper = await factory([{ dates: { end: '10.06.2025' } }])

		expect(bodyCellText(wrapper)).toBe('0')
	})

	it('floors at 0 when diff crosses below zero after adding one', async () => {
		vi.useFakeTimers()
		vi.setSystemTime(new Date(2025, 5, 15, 12, 0, 0))

		const wrapper = await factory([{ dates: { end: '14.06.2025' } }])

		expect(bodyCellText(wrapper)).toBe('0')
	})
})
