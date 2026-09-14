// eslint.config.js
import js from '@eslint/js'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import jestPlugin from 'eslint-plugin-jest'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import vuePlugin from 'eslint-plugin-vue'
import globals from 'globals'
import vueParser from 'vue-eslint-parser'

export default [
	// Globals
	{
		ignores: ['node_modules/**', 'dist/**'],
		plugins: {
			jest: jestPlugin,
			'simple-import-sort': simpleImportSort,
			vue: vuePlugin,
			'@typescript-eslint': typescriptPlugin,
		},
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: typescriptParser,
				ecmaVersion: 2021,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: false,
					globalReturn: false,
					impliedStrict: false,
				},
			},
			globals: {
				...globals.node,
				...jestPlugin.environments.globals.globals,
			},
		},
		rules: {
			'simple-import-sort/imports': 'error',
			'no-console': 'warn',
			'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
			'comma-dangle': ['error', 'always-multiline'],
			'brace-style': ['error', 'stroustrup'],
			'no-irregular-whitespace': 'off',
			'no-prototype-builtins': 'off',
			'no-unused-vars': 'off',
			'no-loss-of-precision': 'off',
			camelcase: 'off',
			'func-call-spacing': 'off',
			'no-extra-semi': 'off',
			'no-unused-expressions': 'off',
			indent: ['error', 'tab', { SwitchCase: 1 }],
			'linebreak-style': ['error', 'unix'],
			quotes: ['error', 'single'],
			semi: ['error', 'never'],

			// TypeScript
			'@typescript-eslint/no-unused-expressions': 'error',
			'@typescript-eslint/no-loss-of-precision': 'off',
			'@typescript-eslint/camelcase': 'off',
			// '@typescript-eslint/ban-ts-comment': 'warn',
			// '@typescript-eslint/member-delimiter-style': ['error', { multiline: { delimiter: 'none' } }],
		},
	},

	// --- Vue strongly recommended rules
	{
		files: ['**/*.vue'],
		rules: {
			...vuePlugin.configs['strongly-recommended'].rules,
			'vue/require-default-prop': 'off',
		},
	},

	// --- TypeScript recommended rules
	// {
	// 	files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
	// 	rules: {
	// 		...typescriptPlugin.configs.recommended.rules,
	// 	},
	// },

	// --- правила для Vue и TS файлов
	{
		files: ['**/*.vue', '**/*.ts'],
		languageOptions: {
			globals: {
				...globals.jest,
			},
		},
		rules: {
			'simple-import-sort/imports': [
				'warn',
				{
					groups: [
						// Style imports.
						['^.+\\.?(css)$'],
						// Packages `react` related packages come first.
						['^vue', '^@?\\w'],
						// Internal packages.
						['^@/core/types', '^@/core', '^@/components', '@/modules'],
						// Side effect imports.
						['^\\u0000'],
						// Parent imports. Put `..` last.
						['^\\.\\.(?!/?$)', '^\\.\\./?$'],
						// Other relative imports. Put same-folder imports and `.` last.
						['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],

					],
				},
			],
		},
	},
]
