import { default as baseDict } from './en'

const dict: typeof baseDict = {
	closeDialog: {
		heading: 'Dados não salvos',
		text: 'Se você fechar a janela, os dados inseridos anteriormente serão excluídos.',
		btnSave: 'Continuar editando',
		btnContinue: 'Sair sem salvar',
	},
	sidebar: {
		newCampaign: 'Nova campanha',
		newGroup: 'Novo grupo',
		newCreative: 'Novo creativo',
		group: 'Grupo',
	},
}

export default dict
