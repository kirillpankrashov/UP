import type { ILogEvent } from '../types/log-event'

interface CachedWidget {
	updated: number
	log: { compressed: string; keys: Record<string, string> }
}

export class CachedLog {
	static lifespan = 14 * 24 * 60 * 60 * 1000

	private static escapeRegExp(str: string): string {
		return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
	}

	private compress(data: Array<ILogEvent>) {
		const stringifyedData = JSON.stringify(data)
		const splitted = stringifyedData.split('"')

		const overlaps: Record<string, number> = {}

		splitted.forEach(item => {
			if (overlaps[item]) {
				overlaps[item]++
			}
			else {
				overlaps[item] = 1
			}
		})
		const sortedOverlaps = Object.keys(overlaps).sort((a, b) => b.length - a.length)

		let compressed = stringifyedData

		const keys: Record<string, string> = {}

		sortedOverlaps.forEach((overlap, i) => {
			const isShortAndFrequent = overlaps[overlap] > 1 && overlap.length > 5
			const isLongAndRare = overlaps[overlap] > 3 && overlap.length > 2

			if (isShortAndFrequent || isLongAndRare) {
				const key = `{${i}}`
				compressed = compressed.replace(new RegExp(CachedLog.escapeRegExp(overlap), 'g'), key)
				keys[key] = overlap
			}
		})

		return {
			compressed,
			keys,
		}
	}

	private decompress({ compressed, keys }: { compressed: string; keys: Record<string, string> }) {
		let result = compressed

		for (const key in keys) {
			result = result.replace(new RegExp(CachedLog.escapeRegExp(key), 'g'), keys[key])
		}

		return JSON.parse(result)
	}

	save(slug: string, log: Array<ILogEvent>): void {
		const widgets = this.getCachedWidgets() || {}

		widgets[slug] = {
			updated: new Date().getTime(),
			log: this.compress(log.slice(-200)),
		}

		this.cacheWidgets(widgets)
	}

	delete(slug: string): void {
		const widgets = this.getCachedWidgets()

		if (widgets) {
			delete widgets[slug]
			this.cacheWidgets(widgets)
		}
	}

	get(slug: string): Array<ILogEvent> {
		const widgets = this.getCachedWidgets()

		if (!widgets?.[slug]) return []

		return this.decompress(widgets[slug].log)
	}

	getCachedWidgets(): Record<string, CachedWidget> | null {
		if (!localStorage.getItem('debug-widgets')) return null

		return JSON.parse(localStorage.getItem('debug-widgets')!)
	}

	private cacheWidgets(widgets: Record<string, CachedWidget>): void {
		localStorage.setItem('debug-widgets', JSON.stringify(widgets))
	}

	clearExpired(): void {
		if (!localStorage.getItem('debug-widgets')) return

		const widgets = JSON.parse(localStorage.getItem('debug-widgets')!)

		for (const slug in widgets) {
			const expired = widgets[slug].updated + CachedLog.lifespan
			const now = new Date().getTime()
			if (now > expired) {
				this.delete(slug)
			}
		}
	}
}
