import type { FormItemRule } from 'element-plus'

import { i18n } from '@/core/i18n'
import { Trigger } from '@/core/validators/consts/types'

export const inn: FormItemRule = {
	validator: (rule: any, value: any, callback: (error?: string | Error | undefined) => void) => {
		let result = false
		if (/[^0-9]/.test(value)) {
			// callback(new Error('ИНН может состоять только из цифр'))
			callback(new Error(i18n.global.t('validator.inn')))
		}
		else if ([10, 12].indexOf(value.length) === -1) {
			// callback(new Error('ИНН может состоять только из 10 или 12 цифр'))
			callback(new Error(i18n.global.t('validator.inn')))
		}
		else {
			const checkDigit = function (inn: string, coefficients: number[]) {
				let n = 0
				for (const i in coefficients) {
					n += coefficients[i] * +inn.split('')[i]
				}
				return Math.floor(n % 11 % 10)
			}
			switch (value.length) {
				case 10: {
					const n10 = checkDigit(value, [2, 4, 10, 3, 5, 9, 4, 6, 8])
					if (n10 === parseInt(value[9])) {
						result = true
					}
					break
				}
				case 12: {
					const n11 = checkDigit(value, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8])
					const n12 = checkDigit(value, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8])
					if ((n11 === parseInt(value[10])) && (n12 === parseInt(value[11]))) {
						result = true
					}
					break
				}
			}
			if (!result) {
				// callback(new Error('Неправильное контрольное число'))
				callback(new Error(i18n.global.t('validator.inn')))
			}
		}

		callback()
	},
	trigger: [Trigger.Blur],
}
