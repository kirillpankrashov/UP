import type { FormItemRule } from 'element-plus'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

import { i18n } from '@/core/i18n'
import { Trigger } from '@/core/validators/consts/types'

export const phone: FormItemRule = {
	validator: (rule: any, value: any, callback: (error?: string | Error | undefined) => void) => {
		// Преобразуем число в строку
		if (typeof value === 'number') {
			value = value.toString()
		}

		// Проверяем, если значение пустое
		if (!value) {
			return callback(new Error(i18n.global.t('validator.required')))
		}

		// Пытаемся распарсить номер телефона
		try {
			const phoneNumber = parsePhoneNumberFromString(value)

			// Проверяем, является ли номер валидным
			if (!phoneNumber || !phoneNumber.isValid()) {
				return callback(new Error(i18n.global.t('validator.invalidPhoneNumber')))
			}

			// Если все в порядке, вызываем callback без ошибки
			callback()
		}
		catch (error) {
			// В случае ошибки парсинга возвращаем ошибку валидации
			callback(new Error(i18n.global.t('validator.invalidPhoneNumber')))
		}
	},
	trigger: [Trigger.Change, Trigger.Blur],
}
