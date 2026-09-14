import { DomainName, type IDomain } from '@/core/types'

export const setFavicon = (domain: IDomain | null) => {
	if (!domain) {
		return
	}

	const baseUrl = domain.baseUrl as string
	let favBaseUrl = baseUrl

	if (domain.name === DomainName.STREAMO) {
		favBaseUrl = `${baseUrl}/fav_streamo/`
	}

	const defaultFav = `
		<link rel="icon" href="${favBaseUrl}/favicon.ico">
		<link rel="apple-touch-icon" sizes="180x180" href="${favBaseUrl}/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="512x512" href="${favBaseUrl}/favicon-512x512.png">
		<link rel="icon" type="image/png" sizes="192x192" href="${favBaseUrl}/favicon-192x192.png">
		<link rel="icon" type="image/png" sizes="32x32" href="${favBaseUrl}/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="${favBaseUrl}/favicon-16x16.png">
		<link rel="mask-icon" href="${favBaseUrl}/safari-pinned-tab.svg" color="#266ffe">`

	document.head.insertAdjacentHTML('beforeend', defaultFav)
}
