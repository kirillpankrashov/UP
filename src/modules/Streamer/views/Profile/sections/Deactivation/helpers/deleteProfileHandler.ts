import { Logger } from '@/core/helpers'
import { deleteProfile } from '@/modules/Streamer/views/Profile/api'

export const deleteProfileHandler = async () => {
	try {
		const res = await deleteProfile()

		if (res.status) {
			window.location.reload()
		}
	}
	catch (err) {
		Logger.error('Error sending deactivation request', false, err)
	}
}
