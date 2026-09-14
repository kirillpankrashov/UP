import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import type { IStreamer } from '@/modules/Partner/views/Agency/api'
import { streamers } from '@/modules/Partner/views/Agency/api/getStreamers/fixtures/streamers'

import StreamerStatus from '../StreamerStatus.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

describe('Partner Agency Streamers StreamersList StreamerStatus Component', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	const fixtureStreamer = streamers.data[0]!

	const factory = (streamer: IStreamer) => {
		return mount(StreamerStatus, {
			props: { streamer },
			global: {
				plugins: [i18n],
				stubs: {
					ElPopover: {
						name: 'ElPopover',
						props: ['placement', 'popperClass', 'width', 'trigger'],
						template: '<div data-test="el-popover"><slot name="reference" /><slot /></div>',
					},
				},
			},
		})
	}

	const statusIcon = (wrapper: ReturnType<typeof factory>) =>
		wrapper.find('svg.h-4.w-4.cursor-pointer')

	it('hides icon when checklist and payable ok and ctr is false', () => {
		const streamer = {
			...fixtureStreamer,
			checkListStatus: true,
			payableStatus: true,
			ctrStatus: false,
		}
		const wrapper = factory(streamer)

		expect(statusIcon(wrapper).exists()).toBe(false)
		expect(wrapper.text()).not.toContain('creators.creatorsTable.status.checkList.label')
		expect(wrapper.text()).not.toContain('creators.creatorsTable.status.payable.label')
		expect(wrapper.text()).not.toContain('creators.creatorsTable.status.lowCtr.label')
	})

	it('shows checklist block when checkListStatus is false', () => {
		const streamer = { ...fixtureStreamer, checkListStatus: false }
		const wrapper = factory(streamer)

		expect(wrapper.text()).toContain('creators.creatorsTable.status.checkList.label')
		const icon = statusIcon(wrapper)
		expect(icon.exists()).toBe(true)
		expect(icon.classes()).toContain('fill-danger')
	})

	it('shows payable block when payableStatus is false', () => {
		const streamer = {
			...fixtureStreamer,
			checkListStatus: true,
			payableStatus: false,
			ctrStatus: false,
		}
		const wrapper = factory(streamer)

		expect(wrapper.text()).toContain('creators.creatorsTable.status.payable.label')
		const icon = statusIcon(wrapper)
		expect(icon.exists()).toBe(true)
		expect(icon.classes()).toContain('fill-warning')
	})

	it('shows low CTR block and danger icon when ctrStatus is true', () => {
		const streamer = {
			...fixtureStreamer,
			checkListStatus: true,
			payableStatus: true,
			ctrStatus: true,
		}
		const wrapper = factory(streamer)

		expect(wrapper.text()).toContain('creators.creatorsTable.status.lowCtr.label')
		const icon = statusIcon(wrapper)
		expect(icon.exists()).toBe(true)
		expect(icon.classes()).toContain('fill-danger')
	})

	it('shows both checklist and payable sections when both flags are false', () => {
		const streamer = {
			...fixtureStreamer,
			checkListStatus: false,
			payableStatus: false,
			ctrStatus: false,
		}
		const wrapper = factory(streamer)

		expect(wrapper.text()).toContain('creators.creatorsTable.status.checkList.label')
		expect(wrapper.text()).toContain('creators.creatorsTable.status.payable.label')
		expect(wrapper.text()).not.toContain('creators.creatorsTable.status.lowCtr.label')
	})
})
