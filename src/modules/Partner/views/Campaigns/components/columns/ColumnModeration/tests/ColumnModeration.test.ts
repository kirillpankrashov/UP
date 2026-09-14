import { defineComponent } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElTable } from '@/components/element-plus'

import ColumnModeration from '../ColumnModeration.vue'

const ColumnModerationTestHost = defineComponent({
	name: 'ColumnModerationTestHost',
	components: { ColumnModeration, ElTable },
	props: {
		tableData: { type: Array, required: true },
	},
	template: `
		<ElTable :data="tableData" style="width:100%">
			<ColumnModeration :items="tableData" />
		</ElTable>
	`,
})

describe('Partner Campaigns ColumnModeration Component', () => {
	let lastWrapper: ReturnType<typeof mount> | undefined

	afterEach(() => {
		lastWrapper?.unmount()
		lastWrapper = undefined
	})

	const factory = async (tableData: { published: boolean }[]) => {
		const wrapper = mount(ColumnModerationTestHost, {
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

	const cellSpan = (wrapper: ReturnType<typeof mount>) =>
		wrapper.find('.el-table__body .el-table__cell span')

	it('sets column label from campaigns locale', async () => {
		const wrapper = await factory([{ published: true }])
		const col = wrapper.findComponent({ name: 'ElTableColumn' })

		expect(col.props('label')).toBe('Moderation')
	})

	it('shows complete status without warning class when published', async () => {
		const wrapper = await factory([{ published: true }])
		const span = cellSpan(wrapper)

		expect(span.text()).toBe('Complete')
		expect(span.classes()).not.toContain('text-warning')
	})

	it('shows pending status with warning class when not published', async () => {
		const wrapper = await factory([{ published: false }])
		const span = cellSpan(wrapper)

		expect(span.text()).toBe('Pending')
		expect(span.classes()).toContain('text-warning')
	})
})
