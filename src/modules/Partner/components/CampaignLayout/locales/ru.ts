import { default as baseDict } from './en'

const dict: typeof baseDict = {
	closeDialog: {
		heading: 'Данные не сохранены',
		text: 'Если вы закроете окно, то ранее введённые данные удаляться.',
		btnSave: 'Продолжить редактирование',
		btnContinue: 'Покинуть без сохранения',
	},
	sidebar: {
		newCampaign: 'Новая кампания',
		newGroup: 'Новая группа',
		newCreative: 'Новый креатив',
		group: 'Группа',
	},
}

export default dict
