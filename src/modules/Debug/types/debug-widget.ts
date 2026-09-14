import type { IWidget } from '@/modules/Widget/types'

export type IDebugWidget = IWidget & {
	subscribes?: {
		status: boolean
		application_name: string
		subscribes: string[]
		obsstudio: {
			widget_width: number
			widget_height: number
		}
		reason?: string
	}
}
