import { Logger } from '@/core/helpers'
import { type TProfileModel,updateProfile } from '@/components/StreamerSettingsForm'

export type TOnSubmitParams = {
	model: TProfileModel
	cb: () => void
}

export const handleSubmit = async ({ model, cb } : TOnSubmitParams) => {
	try {
		await updateProfile(model)
	}
	catch(err) {
		Logger.error('Error updating profile', true, err)
	}
	finally {
		cb()
	}
}
