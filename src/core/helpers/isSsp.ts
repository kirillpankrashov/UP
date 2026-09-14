import { AdFormat } from '@/core/types'

export const isSspFormat = (format: AdFormat) => {
	return [AdFormat.YANDEX_FS, AdFormat.YANDEX_PF, AdFormat.YANDEX_TEXT].includes(format)
}

export const isSspMediaFormat = (format: AdFormat) => {
	return [AdFormat.YANDEX_FS, AdFormat.YANDEX_PF].includes(format)
}

export const isSspTextFormat = (format: AdFormat) => {
	return [AdFormat.YANDEX_TEXT].includes(format)
}

export const isExternalFormat = (format: AdFormat) => {
	return isSspFormat(format) || format === AdFormat.CPMSTAR_BANNER
}

export const isExternalMediaFormat = (format: AdFormat) => {
	return isSspMediaFormat(format) || format === AdFormat.CPMSTAR_BANNER
}
