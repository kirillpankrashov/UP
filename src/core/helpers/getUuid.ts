import random from 'lodash/random'

const getOffset = (key: string, string: string) => {
	let result = ''
	const keyLength = string.length

	for (let i = 0; i < keyLength; i++) {
		const idx1 = key.charAt(i)
		const idx2 = key.charAt(i + 1)

		if (idx2) {
			const pos = parseInt(idx1 + idx2)

			if (string.charAt(pos)) {
				result += string.charAt(pos)
			}
		}
	}

	return result
}

export const getUuid = (
	params: { number?: number; string?: string; length?: number } = {},
) => {
	const number = params.number || new Date().getTime()
	const string =
    params.string ||
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const length = params.length || 10

	let key = Math.floor(number * random(string.length))
		.toString()
		.split('')
		.sort(() => 0.5 - Math.random())
		.join('')

	for (let i = string.length; i > key.length;) {
		key += random(string.length - 1)
	}

	return getOffset(key, string).substr(0, length)
}
