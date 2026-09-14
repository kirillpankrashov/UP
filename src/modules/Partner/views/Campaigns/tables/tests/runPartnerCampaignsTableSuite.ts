import type { Component } from 'vue'
import { nextTick } from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { i18n } from '@/core/i18n'
import { ElLoadingDirective } from '@/components/element-plus'
import type { RouteName } from '@/modules/Partner/router'
import { useCampaignsStore } from '@/modules/Partner/views/Campaigns/store'

import { partnerCampaignsTableColumnStubs } from './partnerCampaignsTableColumnStubs'

const EMPTY_COPY = 'You have no campaigns'

export type PartnerCampaignsTableSuiteConfig = {
	describeTitle: string
	Component: Component
	defaultRouteName: RouteName
	collectionKey: 'adsets' | 'campaigns' | 'creatives'
	skeletonStubName: string
	skeletonDataTest: string
	fixtureItem: unknown
	mockPush: ReturnType<typeof vi.fn>
	routeQueryRef: { current: Record<string, string | string[]> }
	routeNameRef: { current: RouteName }
}

export function runPartnerCampaignsTableSuite(config: PartnerCampaignsTableSuiteConfig) {
	const {
		Component,
		collectionKey,
		defaultRouteName,
		describeTitle,
		fixtureItem,
		mockPush,
		routeNameRef,
		routeQueryRef,
		skeletonDataTest,
		skeletonStubName,
	} = config

	describe(describeTitle, () => {
		const factory = async (props: Record<string, unknown> = {}, overrides: Record<string, unknown> = {}) => {
			const wrapper = mount(Component, {
				directives: {
					loading: ElLoadingDirective,
				},
				global: {
					plugins: [
						i18n,
						createTestingPinia({
							createSpy: vi.fn,
							initialState: {
								'partner-campaigns': {
									[collectionKey]: {
										bootstrapped: false,
										loading: false,
										items: [],
										perPage: 10,
										total: 0,
										sidebarPage: 1,
										...overrides,
									},
								},
							},
						}),
					],
					stubs: {
						[skeletonStubName]: {
							name: skeletonStubName,
							template: `<div data-test="${skeletonDataTest}"></div>`,
							props: ['columns'],
						},
						...partnerCampaignsTableColumnStubs,
						Actions: {
							name: 'Actions',
							template: '<div data-test="stub-actions"></div>',
							props: ['modelValue'],
						},
					},
				},
				props,
			})

			const campaignsStore = useCampaignsStore()
			await nextTick()

			return { wrapper, campaignsStore }
		}

		beforeEach(() => {
			vi.clearAllMocks()
			routeQueryRef.current = {}
			routeNameRef.current = defaultRouteName
			mockPush.mockResolvedValue(undefined)
			vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)
		})

		it('calls fetchCollection on mount', async () => {
			const { campaignsStore } = await factory()

			expect(campaignsStore.fetchCollection).toHaveBeenCalled()
		})

		it('shows skeleton when isFetching is true', async () => {
			const { wrapper } = await factory({ isFetching: true })

			expect(wrapper.find(`[data-test="${skeletonDataTest}"]`).exists()).toBe(true)
			expect(wrapper.findComponent({ name: 'ElTable' }).exists()).toBe(false)
		})

		it('shows table when collection is loaded with items', async () => {
			const { wrapper } = await factory({}, {
				bootstrapped: true,
				loading: false,
				items: [fixtureItem],
				total: 1,
			})

			expect(wrapper.find(`[data-test="${skeletonDataTest}"]`).exists()).toBe(false)
			expect(wrapper.findComponent({ name: 'ElTable' }).exists()).toBe(true)
		})

		it('shows empty state when there are no items', async () => {
			const { wrapper } = await factory({}, {
				bootstrapped: true,
				loading: false,
				items: [],
			})

			await nextTick()

			expect(wrapper.text()).toContain(EMPTY_COPY)
			expect(wrapper.findComponent({ name: 'ElTable' }).exists()).toBe(false)
		})

		it('shows pagination when bootstrapped and items exist', async () => {
			const { wrapper } = await factory({}, {
				bootstrapped: true,
				loading: false,
				items: [fixtureItem],
				total: 25,
				perPage: 10,
			})

			const pagination = wrapper.findComponent({ name: 'ElPagination' })
			expect(pagination.exists()).toBe(true)
			expect(pagination.props('total')).toBe(25)
		})

		it('pushes page query and refetches when pagination page changes', async () => {
			routeQueryRef.current = { foo: 'bar' }

			const { wrapper, campaignsStore } = await factory({}, {
				bootstrapped: true,
				loading: false,
				items: [fixtureItem],
				total: 30,
			})

			vi.mocked(campaignsStore.fetchCollection).mockClear()

			const pagination = wrapper.findComponent({ name: 'ElPagination' })
			await pagination.vm.$emit('current-change', 3)

			expect(mockPush).toHaveBeenCalledWith({ query: { foo: 'bar', page: 3 } })
			expect(campaignsStore.fetchCollection).toHaveBeenCalledTimes(1)
		})

		it('uses current page from route query', async () => {
			routeQueryRef.current = { page: '4' }

			const { wrapper } = await factory({}, {
				bootstrapped: true,
				loading: false,
				items: [fixtureItem],
				total: 50,
			})

			expect(wrapper.findComponent({ name: 'ElPagination' }).props('currentPage')).toBe(4)
		})
	})
}
