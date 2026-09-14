import { vi } from 'vitest'

import { brandAwarenessCampaign } from '@/modules/Partner/views/FormCampaign/api/getBrandAwarenessCampaign/fixtures/brandAwarenessCampaign'
import type { IBrandAwarenessCampaign } from '@/modules/Partner/views/FormCampaign/api/getBrandAwarenessCampaign/types'
import { brandAwarenessCampaignStructure } from '@/modules/Partner/views/FormCampaign/api/getBrandAwarenessCampaignStructure/fixtures/brandAwarenessCampaignStructure'
import type { IBrandAwarenessCampaignStructure } from '@/modules/Partner/views/FormCampaign/api/getBrandAwarenessCampaignStructure/types'
import { extensionCampaign } from '@/modules/Partner/views/FormCampaign/api/getExtensionCampaign/fixtures/extensionCampaign'
import type { IExtensionCampaign } from '@/modules/Partner/views/FormCampaign/api/getExtensionCampaign/types'
import { extensionCampaignStructure } from '@/modules/Partner/views/FormCampaign/api/getExtensionCampaignStructure/fixtures/extensionCampaignStructure'
import type { IExtensionCampaignStructure } from '@/modules/Partner/views/FormCampaign/api/getExtensionCampaignStructure/types'
import { performanceCampaign } from '@/modules/Partner/views/FormCampaign/api/getPerformanceCampaign/fixtures/performanceCampaign'
import type { IPerformanceCampaign } from '@/modules/Partner/views/FormCampaign/api/getPerformanceCampaign/types'
import { performanceCampaignStructure } from '@/modules/Partner/views/FormCampaign/api/getPerformanceCampaignStructure/fixtures/performanceCampaignStructure'
import type { IPerformanceCampaignStructure } from '@/modules/Partner/views/FormCampaign/api/getPerformanceCampaignStructure/types'
import { prerollCampaign } from '@/modules/Partner/views/FormCampaign/api/getPrerollCampaign/fixtures/prerollCampaign'
import type { IPrerollCampaign } from '@/modules/Partner/views/FormCampaign/api/getPrerollCampaign/types'
import { prerollCampaignStructure } from '@/modules/Partner/views/FormCampaign/api/getPrerollCampaignStructure/fixtures/prerollCampaignStructure'
import type { IPrerollCampaignStructure } from '@/modules/Partner/views/FormCampaign/api/getPrerollCampaignStructure/types'
import { specialProjectCampaign } from '@/modules/Partner/views/FormCampaign/api/getSpecialProjectCampaign/fixtures/specialProjectCampaign'
import type { ISpecialProjectCampaign } from '@/modules/Partner/views/FormCampaign/api/getSpecialProjectCampaign/types'

export const createBrandAwarenessCampaign = vi.fn(async (): Promise<IBrandAwarenessCampaign> => {
	return new Promise(resolve => resolve(brandAwarenessCampaign))
})

export const updateBrandAwarenessCampaign = vi.fn(async (): Promise<IBrandAwarenessCampaign> => {
	return new Promise(resolve => resolve(brandAwarenessCampaign))
})

export const getBrandAwarenessCampaign = vi.fn(async (): Promise<IBrandAwarenessCampaign> => {
	return new Promise(resolve => resolve(brandAwarenessCampaign))
})

export const getBrandAwarenessCampaignStructure = vi.fn(async (): Promise<IBrandAwarenessCampaignStructure> => {
	return new Promise(resolve => resolve(brandAwarenessCampaignStructure))
})

export const createPerformanceCampaign = vi.fn(async (): Promise<IPerformanceCampaign> => {
	return new Promise(resolve => resolve(performanceCampaign))
})

export const updatePerformanceCampaign = vi.fn(async (): Promise<IPerformanceCampaign> => {
	return new Promise(resolve => resolve(performanceCampaign))
})

export const getPerformanceCampaign = vi.fn(async (): Promise<IPerformanceCampaign> => {
	return new Promise(resolve => resolve(performanceCampaign))
})

export const getPerformanceCampaignStructure = vi.fn(async (): Promise<IPerformanceCampaignStructure> => {
	return new Promise(resolve => resolve(performanceCampaignStructure))
})

export const createPrerollCampaign = vi.fn(async (): Promise<IPrerollCampaign> => {
	return new Promise(resolve => resolve(prerollCampaign))
})

export const updatePrerollCampaign = vi.fn(async (): Promise<IPrerollCampaign> => {
	return new Promise(resolve => resolve(prerollCampaign))
})

export const getPrerollCampaign = vi.fn(async (): Promise<IPrerollCampaign> => {
	return new Promise(resolve => resolve(prerollCampaign))
})

export const getPrerollCampaignStructure = vi.fn(async (): Promise<IPrerollCampaignStructure> => {
	return new Promise(resolve => resolve(prerollCampaignStructure))
})

export const createExtensionCampaign = vi.fn(async (): Promise<IExtensionCampaign> => {
	return new Promise(resolve => resolve(extensionCampaign))
})

export const updateExtensionCampaign = vi.fn(async (): Promise<IExtensionCampaign> => {
	return new Promise(resolve => resolve(extensionCampaign))
})

export const getExtensionCampaign = vi.fn(async (): Promise<IExtensionCampaign> => {
	return new Promise(resolve => resolve(extensionCampaign))
})

export const getExtensionCampaignStructure = vi.fn(async (): Promise<IExtensionCampaignStructure> => {
	return new Promise(resolve => resolve(extensionCampaignStructure))
})

export const createSpecialProjectCampaign = vi.fn(async (): Promise<ISpecialProjectCampaign> => {
	return new Promise(resolve => resolve(specialProjectCampaign))
})

export const updateSpecialProjectCampaign = vi.fn(async (): Promise<ISpecialProjectCampaign> => {
	return new Promise(resolve => resolve(specialProjectCampaign))
})

export const getSpecialProjectCampaign = vi.fn(async (): Promise<ISpecialProjectCampaign> => {
	return new Promise(resolve => resolve(specialProjectCampaign))
})
