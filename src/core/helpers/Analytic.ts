import get from 'lodash/get'

import type { TUser } from '@/core/types'

type Service = ((...args: unknown[]) => void) | undefined
type ServiceName = 'ga' | 'fbq' | 'VK.Goal' | 'dataLayer' | 'ym' | 'heap.track' | 'heap.identify' | 'heap.addUserProperties'

const callService = (serviceName: ServiceName, ...args: unknown[]) => {
	let callsCount = 0
	const interval = setInterval(() => {
		const service = get(window, serviceName) as Service

		if (typeof service === 'function') {
			service(...args)
			clearInterval(interval)
		}
		else if (callsCount > 60) {
			clearInterval(interval)
		}
		else {
			callsCount++
		}
	}, 1000)
}

export class Analytic {
	static ga (...args: unknown[]) {
		if (import.meta.env.NODE_ENV !== 'production') return
		callService('ga', ...args)
	}

	static fbq (...args: unknown[]) {
		if (import.meta.env.NODE_ENV !== 'production') return
		callService('fbq', ...args)
	}

	static vkgoal (...args: unknown[]) {
		if (import.meta.env.NODE_ENV !== 'production') return
		callService('VK.Goal', ...args)
	}

	static dataLayer (...args: unknown[]) {
		if (import.meta.env.NODE_ENV !== 'production') return
		callService('dataLayer', ...args)
	}

	static ym (...args: unknown[]) {
		if (import.meta.env.NODE_ENV !== 'production') return
		callService('ym', ...args)
	}

	static heapTrack (...args: unknown[]) {
		if (import.meta.env.NODE_ENV !== 'production') return
		callService('heap.track', ...args)
	}

	static heapIdentity (...args: unknown[]) {
		if (import.meta.env.NODE_ENV !== 'production') return
		callService('heap.identify', ...args)
	}

	static heapAddUserProperties (...args: unknown[]) {
		if (import.meta.env.NODE_ENV !== 'production') return
		callService('heap.addUserProperties', ...args)
	}

	static pushUserToDataLayer (user: TUser | null) {
		if (import.meta.env.NODE_ENV !== 'production' || !user) return

		window.dataLayer = window.dataLayer || []

		window.dataLayer.push({
			'event': 'userId',
			'user_id': user.userId,
		})

		if ('platforms' in user) {
			window.dataLayer.push({
				'intercom-name': user.name || '',
				'intercom-email': user.email || '',
				'intercom-signed_up': user.signedUp || '',
				'intercom-avatar': user.platforms.twitch?.avatar || '',
				'intercom-country': user.country || '',
				'intercom-lang': user.language || '',
				'intercom-nickname': user.username,
				'intercom-plan': '',
				'intercom-role': 'streamer',
				'intercom-user_id': user.userId || '',
				'intercom-twitch_id': user.platforms.twitch?.providerId || '',
				'intercom-user_hash': user.userHash || '',
			})
		}
		else {
			window.dataLayer.push({
				'intercom-name': '',
				'intercom-email': user.email || '',
				'intercom-signed_up': user.signedUp || '',
				'intercom-avatar': '',
				'intercom-country': '',
				'intercom-lang': '',
				'intercom-nickname': user.username,
				'intercom-plan': '',
				'intercom-role': 'partner',
				'intercom-user_id': user.userId || '',
				'intercom-twitch_id': '',
				'intercom-user_hash': user.userHash || '',
			})
		}
	}
}
