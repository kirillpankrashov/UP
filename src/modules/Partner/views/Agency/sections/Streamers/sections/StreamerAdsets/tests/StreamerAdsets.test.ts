import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import type { Pinia } from 'pinia'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { streamerAdsets } from '@/modules/Partner/views/Agency/api/getStreamerAdsets/fixtures/streamerAdsets'
import { streamerInfo as streamerInfoFixture } from '@/modules/Partner/views/Agency/api/getStreamerInfo/fixtures/streamerInfo'
import { streamers } from '@/modules/Partner/views/Agency/api/getStreamers/fixtures/streamers'
import { useAdsetsActiveStore, useAgencyStreamersStore } from '@/modules/Partner/views/Agency/store'

import StreamerAdsets from '../StreamerAdsets.vue'

vi.mock('@/core/helpers')

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string, params?: Record<string, string>) =>
			params?.streamer ? `${key}:${params.streamer}` : key,
	}),
	useCurrency: () => ({
		formatCurrency: (value: number, _withCents?: boolean, currency?: string) =>
			currency ? `FMT-${value}-${currency}` : `FMT-${value}`,
	}),
}))

const tableColumnRow = streamerAdsets[0]

const ElTableColumnStub = {
	name: 'ElTableColumn',
	props: ['label', 'width'],
	setup (_props: unknown, { slots }: { slots: any }) {
		return () => slots.default?.({ row: tableColumnRow }) ?? null
	},
}

const ElTableStub = {
	name: 'ElTable',
	template: '<div data-test="el-table"><slot /></div>',
}

const ElDrawerStub = {
	name: 'ElDrawer',
	props: ['modelValue', 'beforeClose', 'title', 'direction', 'size'],
	template: `
		<div data-test="el-drawer">
			<button data-test="streamer-adsets-drawer-before-close" type="button" @click="beforeClose && beforeClose()">x</button>
			<slot />
		</div>
	`,
}

const ElPopoverStub = {
	name: 'ElPopover',
	template: '<div data-test="el-popover"><slot name="reference" /><slot /></div>',
}

const ElSwitchStub = {
	name: 'ElSwitch',
	props: ['modelValue', 'disabled'],
	template: '<input data-test="el-switch" type="checkbox" :checked="modelValue" :disabled="disabled" />',
}

describe('Partner Agency Streamers StreamerAdsets Component', () => {
	const baseStreamersState = () => {
		const pinia = createTestingPinia({
			createSpy: vi.fn,
		})

		const streamersStore = useAgencyStreamersStore(pinia)
		streamersStore.streamerId = streamers.data[0].id
		streamersStore.streamers.data = [streamers.data[0]]
		streamersStore.adsetsSidebarVisible = true
		streamersStore.isFetchingStreamerAdsets = false

		const adsetsStore = useAdsetsActiveStore(pinia)

		return { pinia, streamersStore, adsetsStore }
	}

	const factory = (
		streamersStore: ReturnType<typeof useAgencyStreamersStore>,
		pinia: Pinia,
	) => {
		return mount(StreamerAdsets, {
			global: {
				plugins: [i18n, pinia],
				stubs: {
					ElDrawer: ElDrawerStub,
					ElTable: ElTableStub,
					ElTableColumn: ElTableColumnStub,
					ElPopover: ElPopoverStub,
					ElSwitch: ElSwitchStub,
					StreamerAdsetsSkeleton: {
						name: 'StreamerAdsetsSkeleton',
						template: '<div data-test="streamer-adsets-skeleton-stub" />',
					},
					ChevronRightIcon: { template: '<span data-test="chevron-icon" />' },
				},
			},
		})
	}

	it('shows empty state when streamerCampaigns is empty', async () => {
		const { streamersStore, pinia } = baseStreamersState()
		streamersStore.streamerCampaigns = []

		const wrapper = factory(streamersStore, pinia)
		await nextTick()

		expect(wrapper.find('[data-test="el-table"]').exists()).toBe(false)
		expect(wrapper.text()).toContain('creators.stats.none')
	})

	it('renders table when streamerCampaigns has items', async () => {
		const { streamersStore, pinia } = baseStreamersState()
		streamersStore.streamerCampaigns = streamerAdsets

		const wrapper = factory(streamersStore, pinia)
		await nextTick()

		expect(wrapper.find('[data-test="el-table"]').exists()).toBe(true)
		expect(wrapper.text()).toContain(streamerAdsets[0].title)
		expect(wrapper.text()).toContain(`FMT-${streamerAdsets[0].revenue}-${streamers.data[0].wallet.currency}`)
	})

	it('shows skeleton while adsets are loading', async () => {
		const { streamersStore, pinia } = baseStreamersState()
		streamersStore.isFetchingStreamerAdsets = true
		streamersStore.streamerCampaigns = streamerAdsets

		const wrapper = factory(streamersStore, pinia)
		await nextTick()

		expect(wrapper.find('[data-test="streamer-adsets-skeleton-stub"]').exists()).toBe(true)
		expect(wrapper.find('[data-test="el-table"]').exists()).toBe(false)
	})

	it('opens adset info when campaign button is clicked', async () => {
		const { streamersStore, pinia, adsetsStore } = baseStreamersState()
		streamersStore.streamerCampaigns = streamerAdsets

		const wrapper = factory(streamersStore, pinia)
		await nextTick()

		const btn = wrapper.find('button.cursor-pointer')
		expect(btn.exists()).toBe(true)
		await btn.trigger('click')

		expect(adsetsStore.getAdsetInfo).toHaveBeenCalledTimes(1)
		expect(adsetsStore.getAdsetInfo).toHaveBeenCalledWith(streamerAdsets[0].slug)
	})

	it('drawer before-close resets sidebar and streamerInfo', async () => {
		const { streamersStore, pinia } = baseStreamersState()
		streamersStore.streamerCampaigns = []
		streamersStore.streamerInfo = streamerInfoFixture

		const wrapper = factory(streamersStore, pinia)
		await nextTick()

		await wrapper.find('[data-test="streamer-adsets-drawer-before-close"]').trigger('click')
		await nextTick()

		expect(streamersStore.adsetsSidebarVisible).toBe(false)
		expect(streamersStore.streamerInfo).toBeNull()
	})

	it('sets drawer title with streamer name', async () => {
		const { streamersStore, pinia } = baseStreamersState()
		streamersStore.streamerCampaigns = []

		const wrapper = factory(streamersStore, pinia)
		await nextTick()

		const drawer = wrapper.findComponent({ name: 'ElDrawer' })
		expect(drawer.props('title')).toBe(`creators.creatorCampaigns.title:${streamers.data[0].name}`)
	})
})
