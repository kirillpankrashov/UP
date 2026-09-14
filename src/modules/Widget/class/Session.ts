import FingerprintJS from '@fingerprintjs/fingerprintjs'
import DeviceDetector from 'device-detector-js'
import { v4 as uuidv4 } from 'uuid'

import { Logger } from '@/core/helpers'
import { Widget } from '@/modules/Widget/class/Widget'
import type { GeoResponse } from '@/modules/Widget/types'

export class Session {
	widget: Widget

	uuid: string = uuidv4()
	private fingerprint: string | null = null
	private ipData: GeoResponse | null = null
	private device: any = null

	constructor (widget: Widget) {
		this.widget = widget

		this.identifyFingerprint()
		this.identifyGeo()
		this.identifyDevice()
	}

	private async identifyFingerprint () {
		const fp = await FingerprintJS.load()
		const result = await fp.get()

		this.fingerprint = result.visitorId
	}

	private async identifyGeo () {
		try {
			const ipData = await fetch('https://get.geojs.io/v1/ip/geo.json')
				.then(res => res.json())
				.then(data => data as GeoResponse)

			this.ipData = ipData
		}
		catch (err) {
			Logger.warning('Error identifying client', false, { err })
		}
	}

	private identifyDevice () {
		const deviceDetector = new DeviceDetector()

		this.device = deviceDetector.parse(navigator.userAgent)
	}

	getData () {
		return {
			uuid: this.uuid,
			fingerprint: this.fingerprint,
			location: `${this.ipData?.city}, ${this.ipData?.country}, IP: ${this.ipData?.ip}`,
			browser: `${this.device?.client?.name} ${this.device?.client?.version}`,
			isObs: 'obsstudio' in window,
			device: `${this.device?.os?.name} ${this.device?.os?.version} ${this.device?.device?.type} ${this.device?.device?.brand} ${this.device?.device?.model}`,
		}
	}
}
