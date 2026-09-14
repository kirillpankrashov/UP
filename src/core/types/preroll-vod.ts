import type { PrerollAdsetStatus } from './adset-status'

export interface IPrerollVod {
	id: number
	video: string
	status: PrerollAdsetStatus
}
