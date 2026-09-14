export const CACHE_PREFIX = 'uplify-cache:'

export enum CacheTTL {
	ONE_DAY = 1000 * 60 * 60 * 24,
	ONE_HOUR = 1000 * 60 * 60,
	ONE_MINUTE = 1000 * 60,
	ONE_SECOND = 1000,
}