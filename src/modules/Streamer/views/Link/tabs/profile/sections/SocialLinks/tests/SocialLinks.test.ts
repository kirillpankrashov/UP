import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import type { ILinkProfile } from '@/core/types/link'
import { Logger } from '@/core/helpers'
import { i18n } from '@/core/i18n'
import { PlusButton } from '@/components'
import { ElForm } from '@/components/element-plus'
import { useLinkProfileStore } from '@/modules/Streamer/views/Link/store'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

import SocialLinkBlock from '../components/SocialLinkBlock/SocialLinkBlock.vue'
import SocialLinks from '../SocialLinks.vue'

vi.mock('@/core/helpers')

describe('Streamer Link Profile SocialLinks', () => {
	const factory = (props = {}) => {
		const wrapper = mount(SocialLinks, {
			global: {
				plugins: [i18n, createTestingPinia({ createSpy: vi.fn })],
			},
			props: {
				loading: false,
				...props,
			},
		})

		const profileStore = useLinkProfileStore()
		const streamerStore = useStreamerStore()

		return { wrapper, profileStore, streamerStore }
	}

	it('renders SocialLinkBlock for each item in model', async () => {
		const { wrapper } = factory()

		expect(wrapper.vm.model.socialLinks.length).toBe(1)

		await wrapper.vm.addBlock()
		await wrapper.vm.addBlock()

		await nextTick()

		const blocks = wrapper.findAllComponents(SocialLinkBlock)
		expect(blocks.length).toBe(3)
	})

	it('adds a new block when PlusButton is clicked', async () => {
		const { wrapper } = factory()

		expect(wrapper.vm.model.socialLinks.length).toBe(1)

		await wrapper.findComponent(PlusButton).trigger('click')
		expect(wrapper.vm.model.socialLinks.length).toBe(2)
	})

	it('adds block when store updates to empty', async () => {
		const { wrapper, profileStore } = factory()

		profileStore.profile = {
			socialLinks: [{ name: 'TEST', link: 'https://test.com' }],
		} as ILinkProfile
		await nextTick()
		expect(wrapper.vm.model.socialLinks.length).toBe(1)

		profileStore.profile!.socialLinks = []
		await nextTick()

		expect(wrapper.vm.model.socialLinks.length).toBe(0)
	})

	it('deletes a block when delete-block event is emitted', async () => {
		const { wrapper } = factory()

		expect(wrapper.vm.model.socialLinks.length).toBe(1)

		await wrapper.vm.addBlock()
		await wrapper.vm.addBlock()
		expect(wrapper.vm.model.socialLinks.length).toBe(3)

		const blocks = wrapper.findAllComponents(SocialLinkBlock)
		await blocks[1].vm.$emit('delete-block')
		await nextTick()

		expect(wrapper.vm.model.socialLinks.length).toBe(2)
	})

	it('updates a block when change-block event is emitted', async () => {
		const { wrapper } = factory()

		await wrapper.vm.addBlock()

		const updatedBlock = { name: 'INSTAGRAM', link: 'https://instagram.com' }
		await wrapper.findComponent(SocialLinkBlock).vm.$emit('change-block', updatedBlock)

		expect(wrapper.vm.model.socialLinks[0]).toEqual(updatedBlock)
	})

	it('calls onSubmit when form is submitted', async () => {
		const { wrapper, profileStore } = factory()

		await wrapper.vm.addBlock()
		const validateMock = vi.fn().mockResolvedValue(true)
		wrapper.vm.formRef = { validate: validateMock } as unknown as HTMLFormElement

		await wrapper.findComponent(ElForm).trigger('submit.prevent')

		expect(validateMock).toHaveBeenCalled()
		expect(profileStore.updateProfile).toHaveBeenCalledWith({ socialLinks: wrapper.vm.model.socialLinks }, true)
	})

	it('logs an error if form validation fails', async () => {
		const { wrapper } = factory()

		const validateMock = vi.fn().mockResolvedValue(false)
		wrapper.vm.formRef = { validate: validateMock } as unknown as HTMLFormElement

		await wrapper.findComponent(ElForm).trigger('submit.prevent')

		expect(Logger.error).toHaveBeenCalledWith('Validation error')
	})

	it('logs an error if form submission fails', async () => {
		const { wrapper, profileStore } = factory()

		const validateMock = vi.fn().mockResolvedValue(true)
		wrapper.vm.formRef = { validate: validateMock } as unknown as HTMLFormElement

		vi.mocked(profileStore.updateProfile).mockRejectedValue(new Error('Test error'))

		await wrapper.findComponent(ElForm).trigger('submit.prevent')

		// Wait for the async onSubmit to complete
		await new Promise(resolve => setTimeout(resolve, 0))

		expect(Logger.error).toHaveBeenCalled()
	})

	it('initializes model with blocks from store on mount', async () => {
		const { wrapper, profileStore } = factory()

		profileStore.profile = {
			socialLinks: [
				{ name: 'INSTAGRAM', link: 'https://instagram.com' },
				{ name: 'TWITTER', link: 'https://twitter.com' },
			],
		} as ILinkProfile

		await wrapper.vm.$options.mounted?.call(wrapper.vm)

		expect(wrapper.vm.model.socialLinks).toEqual(profileStore.profile.socialLinks)
	})
})
