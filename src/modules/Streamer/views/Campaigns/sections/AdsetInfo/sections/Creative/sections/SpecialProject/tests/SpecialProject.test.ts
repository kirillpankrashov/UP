import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { specialProjectAdsetInfo } from '@/modules/Streamer/views/Campaigns/api/getSpecialProjectAdsetInfo/fixtures/specialProjectAdsetInfo'

import SpecialProject from '../SpecialProject.vue'

vi.mock('@/core/hooks', () => ({
	useLocale: () => ({
		t: (key: string) => key,
	}),
}))

vi.mock('@/assets/img/icons/arrow-left.svg', () => ({
	default: {
		emits: ['click'],
		template: '<svg data-test="arrow-icon" v-bind="$attrs" @click="$emit(\'click\')"><path /></svg>',
	},
}))

vi.mock('@/assets/img/icons/eye.svg', () => ({
	default: {
		name: 'EyeIcon',
		emits: ['click'],
		template: '<button type="button" data-test="eye-icon" @click="$emit(\'click\')" />',
	},
}))

vi.mock('@/assets/img/icons/eye-close.svg', () => ({
	default: {
		name: 'EyeClosedIcon',
		emits: ['click'],
		template: '<button type="button" data-test="eye-closed-icon" @click="$emit(\'click\')" />',
	},
}))

describe('Streamer Campaigns AdsetInfo Creative SpecialProject', () => {
	const buildAdset = (overrides: Record<string, any> = {}) => {
		const base = structuredClone(specialProjectAdsetInfo as any)

		const ad1 = structuredClone(base.ads[0])
		ad1.id = 1
		ad1.slug = 'ad-creative-1'
		ad1.chatbotText = 'Creative Chat 1'
		ad1.productUrl = 'https://example.test/product-1'

		const ad2 = structuredClone(base.ads[0])
		ad2.id = 2
		ad2.slug = 'ad-creative-2'
		ad2.chatbotText = 'Creative Chat 2'
		ad2.productUrl = 'https://example.test/product-2'

		base.ads = [ad1, ad2]

		return {
			...base,
			...overrides,
		}
	}

	const mountWithAdset = (adset: any) => {
		return mount(SpecialProject, {
			global: {
				plugins: [i18n],
				stubs: {
					Preview: {
						name: 'Preview',
						props: ['slug'],
						template: '<div data-test="preview">{{ slug }}</div>',
					},
					CopyLink: {
						name: 'CopyLink',
						props: ['link'],
						template: '<div data-test="copy-link">{{ link }}</div>',
					},
					TextLink: {
						name: 'TextLink',
						props: ['href'],
						template: '<a data-test="download-link" :href="href"><slot /></a>',
					},
					Collapse: {
						name: 'Collapse',
						props: ['label', 'collapsed'],
						template: `
							<div data-test="collapse">
								<div data-test="collapse-label">{{ label }}</div>
								<div v-if="!collapsed" data-test="collapse-content"><slot /></div>
							</div>
						`,
					},
				},
			},
			props: {
				adset,
			},
		})
	}

	it('renders initial slide chat + widget/file sections when data exists', async () => {
		const adset = buildAdset({
			widgetUrl: 'https://example.test/widget-url',
		})

		const wrapper = mountWithAdset(adset)
		await nextTick()

		expect(wrapper.text()).toContain('campaignSidebar.creativePreview')
		expect(wrapper.text()).toContain('Creative Chat 1')
		expect(wrapper.text()).toContain('https://example.test/widget-url')
		expect(wrapper.text()).toContain('campaignSidebar.specialProject.optionWidget')
		expect(wrapper.text()).toContain('campaignSidebar.specialProject.optionFile')
	})

	it('navigates to next slide (arrow click) and updates chat + product link', async () => {
		const adset = buildAdset({
			widgetUrl: 'https://example.test/widget-url',
		})

		const wrapper = mountWithAdset(adset)
		await nextTick()

		const arrows = wrapper.findAll('[data-test="arrow-icon"]')
		expect(arrows).toHaveLength(2)
		expect(arrows[1].classes().join(' ')).toContain('rotate-180')

		await arrows[1].trigger('click')
		await nextTick()

		expect(wrapper.text()).toContain('Creative Chat 2')
		const copyLinks = wrapper.findAll('[data-test="copy-link"]')
		expect(copyLinks.some(el => el.text().includes('https://example.test/product-2'))).toBe(true)
	})

	it('navigates to previous slide (cycles from first to last)', async () => {
		const adset = buildAdset({
			widgetUrl: 'https://example.test/widget-url',
		})

		const wrapper = mountWithAdset(adset)
		await nextTick()

		const arrows = wrapper.findAll('[data-test="arrow-icon"]')

		// On first slide, prev should cycle to last slide.
		await arrows[0].trigger('click')
		await nextTick()

		expect(wrapper.text()).toContain('Creative Chat 2')
	})

	it('switches slide by clicking dot', async () => {
		const adset = buildAdset({
			widgetUrl: 'https://example.test/widget-url',
		})

		const wrapper = mountWithAdset(adset)
		await nextTick()

		const dots = wrapper
			.findAll('span')
			.filter(el => el.classes().includes('h-2') && el.classes().includes('w-2'))
		expect(dots).toHaveLength(2)

		await dots[1].trigger('click')
		await nextTick()

		expect(wrapper.text()).toContain('Creative Chat 2')
	})

	it('toggles widget blur state by clicking the eye icon', async () => {
		const adset = buildAdset({
			widgetUrl: 'https://example.test/widget-url',
		})

		const wrapper = mountWithAdset(adset)
		await nextTick()

		const widgetTextEls = wrapper.findAll('div.whitespace-nowrap')
		const widgetTextEl = widgetTextEls.find(el => el.text().includes('https://example.test/widget-url'))
		expect(widgetTextEl).toBeTruthy()

		expect(widgetTextEl!.classes()).toContain('blur-sm')
		expect(wrapper.find('[data-test="eye-icon"]').exists()).toBe(true)

		await wrapper.find('[data-test="eye-icon"]').trigger('click')
		await nextTick()

		expect(wrapper.find('[data-test="eye-icon"]').exists()).toBe(false)
		expect(wrapper.find('[data-test="eye-closed-icon"]').exists()).toBe(true)
		expect(widgetTextEl!.classes()).not.toContain('blur-sm')
	})

	it('does not render optionFile collapse when no downloadable attachments exist', async () => {
		const adset = buildAdset()
		adset.ads[0].attachments.zip = null
		adset.ads[1].attachments.zip = null
		adset.ads[0].attachments.unit = null
		adset.ads[1].attachments.unit = null
		adset.ads[0].attachments.video = null
		adset.ads[1].attachments.video = null

		const wrapper = mountWithAdset(adset)
		await nextTick()

		expect(wrapper.text()).toContain('campaignSidebar.specialProject.optionWidget')
		expect(wrapper.text()).not.toContain('campaignSidebar.specialProject.optionFile')
	})
})

