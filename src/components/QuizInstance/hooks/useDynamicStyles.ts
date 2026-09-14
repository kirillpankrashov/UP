import { onMounted, onUnmounted } from 'vue'

export function useDynamicStyle(css: string, id?: string) {
	let styleEl: HTMLStyleElement | null = null

	onMounted(() => {
		styleEl = document.createElement('style')
		styleEl.type = 'text/css'
		styleEl.textContent = css
		if (id) styleEl.id = id
		document.head.appendChild(styleEl)
	})

	onUnmounted(() => {
		if (styleEl && styleEl.parentNode) {
			styleEl.parentNode.removeChild(styleEl)
		}
	})
}
