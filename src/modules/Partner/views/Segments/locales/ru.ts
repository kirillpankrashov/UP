import { default as baseDict } from './en'

const dict: typeof baseDict = {
	segments: {
		title: 'Audience',
		searchInput: 'Search by segment name',
		createBtn: 'New Segment',
		table: {
			columns: {
				title: 'Segment',
				date: 'Date',
				streamers: 'Creators',
			},
		},
		form: {
			title: 'New Segment',
			fields: {
				title: {
					label: 'Segment Name',
					placeholder: '',
				},
				streamers: {
					label: 'Add new creators',
					placeholder: '',
				},
			},
			saveBtn: 'Save',
			table: {
				columns: {
					streamer: 'Creator',
					lastDayOfActivity: 'Last day of activity',
				},
				deleteBtn: 'Delete',
			},
		},
	},
}

export default dict
