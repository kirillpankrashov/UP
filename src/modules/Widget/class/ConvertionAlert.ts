import { ref } from 'vue'

import { Widget } from '@/modules/Widget/class/Widget'
import { CONVERSION_ALERT_DURATION_MAX } from '@/modules/Widget/constants/delays'
import type { IConversionAlert } from '@/modules/Widget/types'
import { preloadVideo } from '@/modules/Widget/utils/preload-utils'

export class ConvertionAlert {
	widget: Widget

	isShowing = ref(false)
	currentAlert = ref<IConversionAlert | null>(null)
	alertTimeout = ref<NodeJS.Timeout | null>(null)

	constructor (widget: Widget) {
		this.widget = widget
	}

	async showAlert (alert: IConversionAlert) {
		if (this.widget.creativesManager.showWrapper.value || this.isShowing.value) return

		await preloadVideo(alert.animation.path)

		this.currentAlert.value = alert
		this.isShowing.value = true

		this.alertTimeout.value = setTimeout(() => {
			this.hideAlert()
		}, CONVERSION_ALERT_DURATION_MAX)
	}

	hideAlert () {
		this.currentAlert.value = null
		this.isShowing.value = false
	}

	clearAlertTimeout () {
		if (this.alertTimeout.value) {
			clearTimeout(this.alertTimeout.value)
			this.alertTimeout.value = null
		}
	}
}
