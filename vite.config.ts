import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import eslint from 'vite-plugin-eslint'
import { createHtmlPlugin } from 'vite-plugin-html'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import svgLoader from 'vite-svg-loader'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(async () => ({
	server: {
		host: 'dashboard.uplify',
		port: 8080,
	},
	build: {
		sourcemap: true,
	},
	plugins: [
		nodePolyfills(),
		tsconfigPaths(),
		vue({
			script: {
				defineModel: true,
			},
		}),
		createHtmlPlugin({
			minify: true,
			inject: {
				data: {
					NODE_ENV: process.env.NODE_ENV,
				},
			},
		}),
		svgLoader({
			svgoConfig: {
				multipass: true,
			},
		}),
		checker({
			typescript: true,
		}),
		eslint(),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	define: {
		'APP_VERSION': JSON.stringify(process.env.npm_package_version),
	},
}))
