export const checkAdBlock = async (callback: () => void) => {
	setTimeout(() => {
		const path = window.location.pathname
		const bait = document.getElementById('ads-block')
		const isDisplayNone = getComputedStyle(bait as Element).display === 'none'

		if (/auth/.test(path)) return

		if (bait && isDisplayNone) {
			callback()
		}
	}, 1000)
}
