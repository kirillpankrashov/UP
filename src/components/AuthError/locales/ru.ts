import { default as baseDict } from './en'

const dict: typeof baseDict = {
	errors: {
		accountBlocked: 'Aккаунт заблокирован. Если это ошибка, ',
		twitchAuthError: 'Ошибка авторизации. Повторите попытку или',
		youtubeAuthError: 'Ошибка авторизации Youtube. Повторите попытку или',
		trovoAuthError: 'Ошибка авторизации Trovo. Повторите попытку или',
		vkplayAuthError: 'Ошибка авторизации VK Play. Повторите попытку или',
		tiktokAuthError: 'Ошибка авторизации TikTok. Повторите попытку или',
		discordAuthError: 'Ошибка авторизации Discord. Повторите попытку или',
		accountAlreadyExists: 'Вы пытаетесь подключить платформу, привязанную к другому профилю.',
		contactSupport: 'напишите в поддержку',
		user: 'Не&nbsp;удалось получить данные о&nbsp;пользователе. Если у&nbsp;вас нет канала то&nbsp;создайте его и&nbsp;повторите снова.',
	},
}

export default dict
