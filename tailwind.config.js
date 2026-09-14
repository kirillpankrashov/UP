/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
	theme: {
		colors: {
			'gray': 'var(--el-color-gray)',
			'light-gray': 'var(--el-color-light-gray)',
			'lightest-gray': 'var(--el-color-lightest-gray)',
			'dark-gray': 'var(--el-color-dark-gray)',
			'background': 'var(--color-background)',
			'transparent': 'transparent',
			'white': 'var(--el-color-white)',
			'black': 'var(--el-color-black)',
			primary: {
				DEFAULT: 'var(--el-color-primary)',
				50: 'var(--el-color-primary-light-9)',
				100: 'var(--el-color-primary-light-8)',
				200: 'var(--el-color-primary-light-7)',
				300: 'var(--el-color-primary-light-5)',
				400: 'var(--el-color-primary-light-3)',
				500: 'var(--el-color-primary)',
				900: 'var(--el-color-primary-dark-2)',
			},
			success: {
				DEFAULT: 'var(--el-color-success)',
				50: 'var(--el-color-success-light-9)',
				100: 'var(--el-color-success-light-8)',
				200: 'var(--el-color-success-light-7)',
				300: 'var(--el-color-success-light-5)',
				400: 'var(--el-color-success-light-3)',
				500: 'var(--el-color-success)',
				900: 'var(--el-color-success-dark-2)',
			},
			warning: {
				DEFAULT: 'var(--el-color-warning)',
				50: 'var(--el-color-warning-light-9)',
				100: 'var(--el-color-warning-light-8)',
				200: 'var(--el-color-warning-light-7)',
				300: 'var(--el-color-warning-light-5)',
				400: 'var(--el-color-warning-light-3)',
				500: 'var(--el-color-warning)',
				900: 'var(--el-color-warning-dark-2)',
			},
			danger: {
				DEFAULT: 'var(--el-color-danger)',
				50: 'var(--el-color-danger-light-9)',
				100: 'var(--el-color-danger-light-8)',
				200: 'var(--el-color-danger-light-7)',
				300: 'var(--el-color-danger-light-5)',
				400: 'var(--el-color-danger-light-3)',
				500: 'var(--el-color-danger)',
				900: 'var(--el-color-danger-dark-2)',
			},
			'twitch': 'var(--color-twitch)',
			'youtube': 'var(--color-youtube)',
			'trovo': 'var(--color-trovo)',
		},
		extend: {
			transitionProperty: {
				'all': 'var(--el-transition-all)',
			},
		},
	},
	plugins: [],
}

