import { vi } from 'vitest'

import type { TPartnerSignin, TPartnerSigninModel } from '../partnerSignin/types'

export const partnerSignin = vi.fn(async (_: TPartnerSigninModel): Promise<TPartnerSignin> => {
	return new Promise(resolve => resolve({
		token: '24705|LyXzIa9suGVq2zUWFi5ZLpGjxurwGLdaz2NPrOiWd3400346',
	}))
})
