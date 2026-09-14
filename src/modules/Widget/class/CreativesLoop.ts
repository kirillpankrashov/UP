import { Widget } from '@/modules/Widget/class/Widget'
import { CREATIVES_LOOP_TICK, REQUEST_INTERVAL, TIME_BEFORE_PRELOAD } from '@/modules/Widget/constants/delays'
import type { ICreative, IDemoCreative, IPromoCreative, IQueueCreative } from '@/modules/Widget/types'

export class CreativesLoop {
	widget: Widget
	queue: Array<IQueueCreative<ICreative | IPromoCreative>> = []
	demo: Array<IDemoCreative> = []

	constructor (widget: Widget) {
		this.widget = widget
	}

	get isPaused () {
		const isCreativePreloading = this.widget.creativesManager.isPreloading.value
		const isCreativePlaying = this.widget.creativesManager.isPlaying.value
		const isCreativeIntro = this.widget.creativesManager.isIntro.value
		return isCreativePlaying || isCreativeIntro || isCreativePreloading
	}

	init () {
		setInterval(async () => {
			await this.check()
		}, CREATIVES_LOOP_TICK)
	}

	async check () {
		if (this.isPaused) return
		if (this.demo.length) {
			await this.startDemo()
		}
		else if (this.queue.length && !this.widget.isManual) {
			const now = new Date().getTime()
			const isTimeToPreload = this.queue[0].whenDisplay < now - TIME_BEFORE_PRELOAD

			if (isTimeToPreload) {
				await this.startAd()
			}
		}
	}

	addAd (adSet: ICreative[] | IPromoCreative[], _whenDisplay?: number) {
		if (this.widget.isManual) {
			this.queue = [{
				whenDisplay: new Date().getTime(),
				adSet,
			}]
		}
		else {
			const lastAd = this.queue[this.queue.length - 1]
			const whenDisplay = lastAd ? lastAd.whenDisplay + REQUEST_INTERVAL : new Date().getTime()

			this.queue.push({
				whenDisplay: _whenDisplay || whenDisplay,
				adSet,
			})
		}
	}

	addDemo (adSet: IDemoCreative[]) {
		this.demo = adSet
	}

	async startDemo () {
		const adSet = this.demo
		this.demo = []
		const { preloaded } = await this.widget.creativesManager.preload<IDemoCreative>(adSet)
		await this.widget.creativesManager.displayDemo(preloaded)
	}

	async startAd () {
		const { adSet, whenDisplay } = this.queue.shift() as IQueueCreative<ICreative>
		const { preloaded } = await this.widget.creativesManager.preload<ICreative>(adSet)
		await this.widget.creativesManager.displayAd(preloaded, whenDisplay)
	}
}
