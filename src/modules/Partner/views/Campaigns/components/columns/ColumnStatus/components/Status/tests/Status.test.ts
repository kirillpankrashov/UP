import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, type Mock,vi } from 'vitest'

import { AdEntityType } from '@/core/types'
import * as helpers from '@/core/helpers'
import { i18n } from '@/core/i18n'
import { brandAwarenessAdset } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessAdsets/fixtures/brandAwarenessAdset'
import { brandAwarenessCampaign } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessCampaigns/fixtures/brandAwarenessCampaign'
import { brandAwarenessCreative } from '@/modules/Partner/views/Campaigns/api/getBrandAwarenessCreatives/fixtures/brandAwarenessCreative'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

import Status from '../Status.vue'

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

describe('Partner Campaigns ColumnStatus Status Component', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	let lastWrapper: ReturnType<typeof mount> | undefined

	afterEach(() => {
		lastWrapper?.unmount()
		lastWrapper = undefined
	})

	const factory = (row: unknown) => {
		const wrapper = mount(Status, {
			global: {
				plugins: [
					i18n,
					createTestingPinia({ createSpy: vi.fn }),
				],
			},
			props: { row: row as any },
		})

		const campaignsStore = useCampaignsStore()
		lastWrapper = wrapper

		return { wrapper, campaignsStore }
	}

	it('renders switch with current visible state for a campaign', () => {
		;(helpers.parseSlug as Mock).mockReturnValue({ adEntityType: AdEntityType.CAMPAIGNS })

		const { wrapper } = factory({ ...brandAwarenessCampaign, visible: true, closed: false })
		const sw = wrapper.findComponent({ name: 'ElSwitch' })

		expect(sw.exists()).toBe(true)
		expect(sw.props('modelValue')).toBe(true)
		expect(sw.props('disabled')).toBe(false)
	})

	it('disables switch when campaign is closed', () => {
		;(helpers.parseSlug as Mock).mockReturnValue({ adEntityType: AdEntityType.CAMPAIGNS })

		const { wrapper } = factory({ ...brandAwarenessCampaign, visible: false, closed: true })
		const sw = wrapper.findComponent({ name: 'ElSwitch' })

		expect(sw.props('disabled')).toBe(true)
	})

	it('disables switch when ad set parent campaign is not visible', () => {
		;(helpers.parseSlug as Mock).mockReturnValue({ adEntityType: AdEntityType.ADSETS })

		const row = {
			...brandAwarenessAdset,
			campaign: { ...brandAwarenessAdset.campaign, visible: false },
		}
		const { wrapper } = factory(row)
		const sw = wrapper.findComponent({ name: 'ElSwitch' })

		expect(sw.props('disabled')).toBe(true)
	})

	it('does not disable switch when ad set parent campaign is visible', () => {
		;(helpers.parseSlug as Mock).mockReturnValue({ adEntityType: AdEntityType.ADSETS })

		const row = {
			...brandAwarenessAdset,
			campaign: { ...brandAwarenessAdset.campaign, visible: true },
		}
		const { wrapper } = factory(row)
		const sw = wrapper.findComponent({ name: 'ElSwitch' })

		expect(sw.props('disabled')).toBe(false)
	})

	it('disables switch when creative parent ad set is not visible', () => {
		;(helpers.parseSlug as Mock).mockReturnValue({ adEntityType: AdEntityType.CREATIVES })

		const row = {
			...brandAwarenessCreative,
			adSet: {
				...brandAwarenessCreative.adSet,
				visible: false,
				campaign: { ...brandAwarenessCreative.adSet.campaign, visible: true },
			},
		}
		const { wrapper } = factory(row)
		const sw = wrapper.findComponent({ name: 'ElSwitch' })

		expect(sw.props('disabled')).toBe(true)
	})

	it('disables switch when creative parent campaign is not visible', () => {
		;(helpers.parseSlug as Mock).mockReturnValue({ adEntityType: AdEntityType.CREATIVES })

		const row = {
			...brandAwarenessCreative,
			adSet: {
				...brandAwarenessCreative.adSet,
				visible: true,
				campaign: { ...brandAwarenessCreative.adSet.campaign, visible: false },
			},
		}
		const { wrapper } = factory(row)
		const sw = wrapper.findComponent({ name: 'ElSwitch' })

		expect(sw.props('disabled')).toBe(true)
	})

	it('enables popover when parent is disabled', async () => {
		;(helpers.parseSlug as Mock).mockReturnValue({ adEntityType: AdEntityType.ADSETS })

		const row = {
			...brandAwarenessAdset,
			campaign: { ...brandAwarenessAdset.campaign, visible: false },
		}
		const { wrapper } = factory(row)
		await nextTick()

		const popover = wrapper.findComponent({ name: 'ElPopover' })
		expect(popover.props('disabled')).toBe(false)
	})

	it('enables popover when campaign is closed', async () => {
		;(helpers.parseSlug as Mock).mockReturnValue({ adEntityType: AdEntityType.CAMPAIGNS })

		const { wrapper } = factory({ ...brandAwarenessCampaign, closed: true })
		await nextTick()

		const popover = wrapper.findComponent({ name: 'ElPopover' })
		expect(popover.props('disabled')).toBe(false)
	})

	it('disables popover when there is no disabled reason', async () => {
		;(helpers.parseSlug as Mock).mockReturnValue({ adEntityType: AdEntityType.CAMPAIGNS })

		const { wrapper } = factory({ ...brandAwarenessCampaign, visible: true, closed: false })
		await nextTick()

		const popover = wrapper.findComponent({ name: 'ElPopover' })
		expect(popover.props('disabled')).toBe(true)
	})

	it('calls changeStatus on toggle and resets pending', async () => {
		;(helpers.parseSlug as Mock).mockReturnValue({ adEntityType: AdEntityType.CAMPAIGNS })

		const { wrapper, campaignsStore } = factory({ ...brandAwarenessCampaign, visible: true, closed: false })
		vi.mocked(campaignsStore.changeStatus).mockResolvedValue(undefined)

		const sw = wrapper.findComponent({ name: 'ElSwitch' })
		await sw.vm.$emit('input', false)
		await flushPromises()

		expect(campaignsStore.changeStatus).toHaveBeenCalledWith(brandAwarenessCampaign.slug)
	})
})
