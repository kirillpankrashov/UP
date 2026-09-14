import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { adsetsActive as adsetsActiveData } from '@/modules/Partner/views/Agency/api/getAdsetsActive/fixtures/adsetsActive'

import Tags from '../Tags.vue'

const tMock = vi.fn((key: string) => key)

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: tMock,
	}),
}))

const adsetsStoreMock = {
	getStreamers: vi.fn(),
} as any

vi.mock('@/components', () => ({
	TextLink: {
		name: 'TextLink',
		props: ['size'],
		emits: ['click'],
		template: '<button type="button" data-test="text-link" @click="$emit(\'click\', $event)"><slot /></button>',
	},
}))

vi.mock('@/components/element-plus', () => ({
	ElTag: {
		template: '<div data-test="el-tag"><slot /></div>',
	},
}))

describe('Agency AdsetCard Tags Component', () => {
	it('does not render anything for closed adset', () => {
		const wrapper = mount(Tags, {
			props: {
				adset: { ...adsetsActiveData.data[0], status: 'closed' } as any,
				adsetsStore: adsetsStoreMock,
			},
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-brand-awareness"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="text-link"]').exists()).toBe(false)
	})

	it('renders format label and triggers getStreamers on click', async () => {
		adsetsStoreMock.getStreamers.mockClear()
		tMock.mockClear()

		const adset = { ...adsetsActiveData.data[0], status: 'active' } as any

		const wrapper = mount(Tags, {
			props: {
				adset,
				adsetsStore: adsetsStoreMock,
			},
		})

		expect(wrapper.find('[data-name="campaigns-adset-card-tags-brand-awareness"]').exists()).toBe(true)
		expect(wrapper.text()).toContain(adset.format.title)
		expect(wrapper.text()).toContain('creators.campaigns.reportBtn.short')

		wrapper.findComponent({ name: 'TextLink' }).vm.$emit('click', new MouseEvent('click'))
		await nextTick()

		expect(adsetsStoreMock.getStreamers).toHaveBeenCalledWith(adset.slug)
	})

	it('uses fallback label when format.title is missing', () => {
		const adset = {
			...adsetsActiveData.data[0],
			status: 'active',
			format: {
				...adsetsActiveData.data[0].format,
				title: '',
			},
		} as any

		const wrapper = mount(Tags, {
			props: {
				adset,
				adsetsStore: adsetsStoreMock,
			},
		})

		expect(wrapper.text()).toContain('creators.campaignRow.tags.undefinedFormat')
	})
})

