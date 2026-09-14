import { ElMessage } from 'element-plus'

import { Client } from '@/core/client/client'
import { getFirstErrorCode } from '@/core/client/getFirstErrorCode'
import { getFirstErrorMessage } from '@/core/client/getFirstErrorMessage'
import type {
	CacheOptionsType,
	CacheUpdateValue,
	CatchedErrorType,
	ErrorType,
	MethodType,
	ResponseType,
} from '@/core/client/types'
import { Logger } from '@/core/helpers/Logger'

import { removeToken } from '../helpers/authToken'

import { CACHE_PREFIX } from './consts'

type OptionsType = {
  showMessage?: boolean
  throwOnStatusFalse?: boolean
  cache?: CacheOptionsType
}

const defaultOptions: OptionsType = {
	showMessage: true,
}

export class Api {
	static client = Client.getInstance()
	static apiUrl = import.meta.env.VITE_APP_API_URL

	static get<ResponseData> (
		path: string,
		data?: unknown,
		options?: OptionsType,
	) {
		return this.request<ResponseData>('get', path, data, options)
	}

	static post<ResponseData> (
		path: string,
		data?: unknown,
		options?: OptionsType,
	) {
		return this.request<ResponseData>('post', path, data, options)
	}

	static patch<ResponseData> (
		path: string,
		data?: unknown,
		options?: OptionsType,
	) {
		return this.request<ResponseData>('patch', path, data, options)
	}

	static delete<ResponseData> (
		path: string,
		data?: unknown,
		options?: OptionsType,
	) {
		return this.request<ResponseData>('delete', path, data, options)
	}

	/**
	 * Invalidate cache by request ID
	 * @param requestId - request ID for invalidation
	 */
	static async invalidateCache(requestId: string): Promise<void> {
		await this.client.axios.storage.remove(requestId)
	}

	/**
	 * Invalidate cache by URL (removes cache for automatically generated ID)
	 * @param method - HTTP method
	 * @param path - path of request
	 * @param params - parameters (only for GET requests)
	 */
	static async invalidateCacheByUrl(method: 'GET' | 'POST', path: string, params?: unknown): Promise<void> {
		const id = this.generateRequestId(method, path, params)
		await this.invalidateCache(id)
	}

	/**
	 * Invalidate cache for specific endpoint regardless of parameters
	 * @param method - HTTP method
	 * @param path - path of request
	 */
	static async invalidateCacheByEndpoint(method: 'GET' | 'POST', path: string): Promise<void> {
		const cleanPath = path.replace(/^\/+/, '').replace(/\/+$/, '')
		const prefix = `${method.toLowerCase()}-${cleanPath.replace(/\//g, '-')}`
		await this.invalidateCacheByPrefix(prefix)
	}

	/**
	 * Invalidate all cache keys starting with a specific prefix
	 * @param prefix - prefix to search for keys
	 */
	static async invalidateCacheByPrefix(prefix: string): Promise<void> {
		const keys = await this.findCacheKeys(key => key.startsWith(prefix))
		await Promise.all(keys.map(key => this.invalidateCache(key)))
	}

	/**
	 * Invalidate cache by regular expression
	 * @param pattern - regular expression to search for keys
	 */
	static async invalidateCacheByPattern(pattern: RegExp): Promise<void> {
		const keys = await this.findCacheKeys(key => pattern.test(key))
		await Promise.all(keys.map(key => this.invalidateCache(key)))
	}

	/**
	 * Get all cache keys (for debugging)
	 */
	static async getAllCacheKeys(): Promise<string[]> {
		try {
			// Use internal method storage to get all keys
			const storage = this.client.axios.storage

			if (typeof storage.find === 'function') {
				// If storage supports find
				return await storage.find(() => true)
			}
			else if (typeof storage.buildId === 'function' && storage.data) {
				// For built-in storage - get keys from data
				return Object.keys(storage.data)
			}
			else {
				// Fallback for localStorage
				const keys: string[] = []
				for (let i = 0; i < localStorage.length; i++) {
					const key = localStorage.key(i)
					if (key && key.startsWith(CACHE_PREFIX)) {
						keys.push(key.replace(CACHE_PREFIX, ''))
					}
				}
				return keys
			}
		}
		catch (error) {
			Logger.error('Failed to get cache keys', false, error)
			return []
		}
	}

	/**
	 * Find cache keys by condition
	 * @param predicate - function to filter keys
	 */
	static async findCacheKeys(predicate: (key: string) => boolean): Promise<string[]> {
		const allKeys = await this.getAllCacheKeys()
		return allKeys.filter(predicate)
	}

	/**
	 * Clear all cache
	 */
	static async clearCache(): Promise<void> {
		try {
			const keysToRemove: string[] = []

			for (let i = 0; i < localStorage.length; i++) {
				const key = localStorage.key(i)
				if (key && key.startsWith(CACHE_PREFIX)) {
					keysToRemove.push(key)
				}
			}

			keysToRemove.forEach(key => localStorage.removeItem(key))

			Logger.info(`Cache cleared: removed ${keysToRemove.length} keys`)
		}
		catch (error) {
			Logger.error('Error clearing cache', false, error)
		}
	}

	/**
	 * GET request with automatically generated ID based on URL and parameters
	 */
	static getWithId<ResponseData>(
		path: string,
		data?: unknown,
		options?: Omit<OptionsType, 'cache'> & { cache?: Omit<CacheOptionsType, 'id'> },
	) {
		const id = this.generateRequestId('GET', path, data)
		return this.get<ResponseData>(path, data, {
			...options,
			cache: {
				...options?.cache,
				id,
			},
		})
	}

	/**
	 * POST request with automatically generated ID based on URL and parameters
	 */
	static postWithId<ResponseData>(
		path: string,
		data?: unknown,
		options?: Omit<OptionsType, 'cache'> & { cache?: Omit<CacheOptionsType, 'id'> },
	) {
		const id = this.generateRequestId('POST', path)
		return this.post<ResponseData>(path, data, {
			...options,
			cache: {
				...options?.cache,
				id,
			},
		})
	}

	/**
	 * Generate unique ID for request based on method, path and parameters
	 */
	private static generateRequestId(method: string, path: string, params?: unknown): string {
		const cleanPath = path.replace(/^\/+/, '').replace(/\/+$/, '')
		let id = `${method.toLowerCase()}-${cleanPath.replace(/\//g, '-')}`

		if (params && method === 'GET') {
			const paramString = typeof params === 'object' ? JSON.stringify(params) : String(params)
			const paramHash = btoa(paramString).slice(0, 8)
			id += `-${paramHash}`
		}

		return id
	}

	/**
	 * Cache invalidation
	 */
	private static async executeComplexUpdates(
		complexUpdates: Array<{ key: string; operation: CacheUpdateValue }>,
	): Promise<void> {
		for (const { operation } of complexUpdates) {
			try {
				if (typeof operation === 'object' && operation.type) {
					switch (operation.type) {
						case 'deletePrefix':
							await this.invalidateCacheByPrefix(operation.value)
							break
						case 'deletePattern':
							await this.invalidateCacheByPattern(operation.value)
							break
						case 'deleteEndpoint':
							await this.invalidateCacheByEndpoint(operation.method, operation.path)
							break
					}
				}
			}
			catch (error) {
				Logger.warning('Error executing complex cache invalidation', false, error)
			}
		}
	}

	private static async request<ResponseData> (
		method: MethodType,
		path: string,
		data?: unknown,
		options?: OptionsType,
	): Promise<ResponseData> {
		const url = `${this.apiUrl}${path}`

		const requestConfig: any = {}

		if (method === 'get' && data) {
			requestConfig.params = data
		}
		else if (data) {
			requestConfig.data = data
		}

		const simpleUpdates: Record<string, 'delete' | ((cache: any, response: any) => any | 'ignore')> = {}
		const complexUpdates: Array<{ key: string; operation: CacheUpdateValue }> = []

		// Add cache configuration ONLY if TTL is specified
		if (options?.cache && options.cache.ttl && options.cache.ttl > 0) {
			requestConfig.cache = {
				ttl: options.cache.ttl,
				interpretHeader: options.cache.interpretHeader ?? false,
			}

			// Process update parameter for cache invalidation
			if (options.cache.update) {
				for (const [key, value] of Object.entries(options.cache.update)) {
					if (value === 'delete' || typeof value === 'function') {
						// Simple operations - send to axios
						simpleUpdates[key] = value
					}
					else {
						// Complex operations - execute asynchronously after request
						complexUpdates.push({ key, operation: value })
					}
				}

				// Send only simple operations to axios
				if (Object.keys(simpleUpdates).length > 0) {
					requestConfig.cache.update = simpleUpdates
				}
			}

			// Add ID for request (used for invalidation)
			if (options.cache.id) {
				requestConfig.id = options.cache.id
			}
		}
		else {
			// Explicitly disable cache for requests without TTL or with cache=false
			requestConfig.cache = false

			// Execute complex cache invalidation if there are any
			if (options?.cache?.update) {
				for (const [key, value] of Object.entries(options.cache.update)) {
					if (typeof value === 'object' && value.type) {
						complexUpdates.push({ key, operation: value })
					}
				}
			}
		}

		try {
			// Send correct configuration
			let res: ResponseType<ResponseData>

			switch (method) {
				case 'get':
					res = await this.client.axios.get(url, requestConfig)
					break
				case 'post':
					res = await this.client.axios.post(url, requestConfig.data, requestConfig)
					break
				case 'patch':
					res = await this.client.axios.patch(url, requestConfig.data, requestConfig)
					break
				case 'delete':
					res = await this.client.axios.delete(url, requestConfig.data)
					break
			}

			// Execute complex cache invalidation after successful request
			if (complexUpdates.length > 0) {
				await this.executeComplexUpdates(complexUpdates)
			}

			if (!('status' in res.data)) {
				return res as ResponseData
			}
			if ('status' in res.data && res.data.status) {
				return res.data
			}
			else if (res.data.status === false) {
				if (!options?.throwOnStatusFalse && !res.data.message && !res.data.messages) {
					return res.data as ResponseData
				}
				else {
					throw this.catchError(res.data as ErrorType, options)
				}
			}

			throw new Error('Unexpected response structure')
		}
		catch (err) {
			throw this.catchError(err as Error, options)
		}
	}

	private static catchError (
		error: ErrorType,
		options: OptionsType = defaultOptions,
	): CatchedErrorType {
		const message = getFirstErrorMessage(error)
		const code = getFirstErrorCode(error)

		if (message === 'DEMO_REQUEST') {
			ElMessage('This functionality is not available for demo')
		}
		else if (options.showMessage) {
			ElMessage.error({ message, appendTo: document.getElementById('app-root') as HTMLElement })
		}
		return {
			message,
			origin: error,
			code,
		}
	}
}
