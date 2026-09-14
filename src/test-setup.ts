import { config } from '@vue/test-utils'
import { ElLoadingDirective } from 'element-plus'
import { beforeEach, vi } from 'vitest'

config.global.directives = {
	loading: ElLoadingDirective,
}

// Mock import.meta.env
Object.defineProperty(import.meta, 'env', {
	value: {
		BASE_URL: '/',
		VITE_APP_URL: 'http://localhost:3000',
	},
	writable: true,
})

// Мок для SVG файлов
vi.mock('*.svg', () => ({
	default: 'svg-mock',
}))

// Мок для статических файлов
vi.mock('@/assets/**/*.svg', () => ({
	default: 'svg-mock',
}))

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation(query => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
})

// Mock ResizeObserver
const ResizeObserverMock = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}))

global.ResizeObserver = ResizeObserverMock
;(window as any).ResizeObserver = ResizeObserverMock

// Mock IntersectionObserver
const IntersectionObserverMock = vi.fn().mockImplementation(() => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}))

global.IntersectionObserver = IntersectionObserverMock
;(window as any).IntersectionObserver = IntersectionObserverMock

// Silence jsdom "Not implemented: HTMLCanvasElement's getContext() method" noise.
// We don't rely on real canvas rendering in unit tests, so a minimal stub is enough.
if (typeof HTMLCanvasElement !== 'undefined') {
	;(HTMLCanvasElement.prototype as any).getContext = vi.fn(() => ({
		fillRect: vi.fn(),
		clearRect: vi.fn(),
		drawImage: vi.fn(),
		getImageData: vi.fn(() => ({
			data: new Uint8ClampedArray(0),
			width: 0,
			height: 0,
		})),
		putImageData: vi.fn(),
		measureText: vi.fn(() => ({ width: 0 })),
	}))
}

;(window as any).videojs = vi.fn(() => ({
	controls: vi.fn(),
	dispose: vi.fn(),
	on: vi.fn(),
	off: vi.fn(),
	play: vi.fn(),
	pause: vi.fn(),
	ready: vi.fn(),
}))

Object.assign(navigator, {
	clipboard: {
		writeText: vi.fn(),
	},
})

// Mock localStorage
const localStorageMock = (() => {
	let store: Record<string, string> = {}

	return {
		getItem: vi.fn((key: string) => store[key] || null),
		setItem: vi.fn((key: string, value: string) => {
			store[key] = value
		}),
		removeItem: vi.fn((key: string) => {
			delete store[key]
		}),
		clear: vi.fn(() => {
			store = {}
		}),
		length: 0,
		key: vi.fn(),
	}
})()

Object.defineProperty(window, 'localStorage', {
	value: localStorageMock,
	writable: true,
})

// Clear mocks before each test
beforeEach(() => {
	vi.clearAllMocks()
})

// Mock Sentry
// vi.mock('@sentry/vue', () => ({
// 	init: vi.fn(),
// 	captureException: vi.fn(),
// 	captureMessage: vi.fn(),
// 	addIntegration: vi.fn(),
// 	isInitialized: vi.fn(() => true),
// 	captureConsoleIntegration: vi.fn(),
// 	browserTracingIntegration: vi.fn(),
// 	createSentryPiniaPlugin: vi.fn(() => () => {}),
// }))

// Mock Vue Router
vi.mock('@/core/router', () => ({
	router: {
		push: vi.fn(),
		replace: vi.fn(),
		go: vi.fn(),
		back: vi.fn(),
		forward: vi.fn(),
		resolve: vi.fn(() => ({ href: '/', route: {} })),
		getRoutes: vi.fn(() => []),
		hasRoute: vi.fn(() => false),
		getRecordMatcher: vi.fn(),
		options: {
			history: {
				base: '/',
			},
		},
	},
	RouteName: {
		WIDGET: 'widget',
		OBS_DOCK: 'obs-dock',
		PUBLIC_CAMPAIGN_ANALYTICS: 'public-campaign-analytics',
		NOT_FOUND: '404',
		DEBUG: 'debug',
	},
	routesMap: new Map(),
}))
