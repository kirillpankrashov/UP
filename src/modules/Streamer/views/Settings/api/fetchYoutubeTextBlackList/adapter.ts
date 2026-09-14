export const responseToData = (response: string): string => {
	if (typeof response === 'string' && response !== '') {
		return response.split(',').map(id => `https://www.youtube.com/watch?v=${id}`).join('\n')
	}

	return ''
}
