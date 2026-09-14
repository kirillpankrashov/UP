import type { TStreamer } from '@/core/types'
import { Analytic, Logger } from '@/core/helpers'
import { type TProfileModel, updateProfile } from '@/components/StreamerSettingsForm'

export type TOnSubmitParams = {
	streamer: TStreamer
	model: TProfileModel
	cb: () => void
}

export const handleSubmit = async ({ streamer, model, cb } : TOnSubmitParams) => {
	try {
		const res = await updateProfile(model)

		if (!res.status) {
			return
		}

		localStorage.removeItem('saved-streamer-data')
		localStorage.removeItem('registration-params')

		Analytic.vkgoal('complete_registration', { value: streamer.username })
		Analytic.fbq('track', 'CompleteRegistration')

		window.location.href = '/'
	}
	catch(err) {
		Logger.error('Error updating profile', true, err)
	}
	finally {
		cb()
	}
}
