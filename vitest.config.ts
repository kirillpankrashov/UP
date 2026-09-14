import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import svgLoader from 'vite-svg-loader'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [
		vue({
			script: {
				defineModel: true,
			},
		}),
		svgLoader({
			svgoConfig: {
				multipass: true,
			},
		}),
	],
	test: {
		maxWorkers: 1,
		testTimeout: 30000,
		// clearMocks: true,
		// restoreMocks: true,
		// mockReset: true,
		setupFiles: ['./src/test-setup.ts'],
	},
	assetsInclude: ['**/*.svg'],
	define: {
		'import.meta.env.VITE_APP_URL': JSON.stringify('http://localhost:3000'),
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
})
