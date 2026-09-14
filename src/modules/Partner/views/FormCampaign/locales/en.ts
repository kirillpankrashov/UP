export default {
	campaign: {
		defaultName: 'Campaign Name',
		defaultNameNew: 'New Campaign',
		group: 'Group',
		loading: 'Campaign loading ..',
		fetchError: {
			title: 'Failed to load campaign',
			description: 'An error occurred while loading the campaign. Please try again later.',
			retry: 'Retry',
		},
		type: {
			title: 'Campaign type',
			description: 'Choose the type of campaign that suits your marketing goals.',
			comingSoon: 'Coming Soon',
		},
		types: {
			awareness: {
				title: 'Sponsorship',
				description: 'Fixed ad cost based on the CPM model',
			},
			brandLift: {
				title: 'Brand Lift',
				description: 'Research that measures the level of brand or product perception',
			},
			task: {
				title: 'Task',
				description: 'Assignment with an individual cost and direct involvement of the streamer',
			},
			performance: {
				title: 'Interactive',
				description: 'Flexible ad cost based on the CPA model',
			},
		},
		settings: {
			title: 'Campaign settings',
			advice: {
				title: 'What is this data?',
				name: {
					title: 'Campaign name',
					description: 'which will appear differently to streamers during broadcast.',
				},
				currency: {
					title: 'The currency',
					description: 'in which the placement of your campaign will be charged.',
				},
			},
			form: {
				name: {
					label: 'Campaign name',
					placeholder: 'Spring promo, for example',
				},
				externalId: {
					label: 'External ID',
					placeholder: 'For example PF-CMP-1661693993',
				},
				description: {
					label: 'Campaign description',
					placeholder: 'Describe campaign',
				},
				category: {
					label: 'Campaign category',
					placeholder: 'Select category',
					noData: 'No categories',
				},
				currency: {
					label: 'Currency',
					placeholder: 'Select currency',
				},
				schedule: {
					startedAtLabel: 'Start date',
					endedAtLabel: 'Finish date',
				},
				holding: {
					label: 'Advertiser holding',
					placeholder: 'Select holding',
				},
				advertiser: {
					label: 'Advertiser',
					placeholder: 'Select advertiser',
					noData: 'No data',
				},
				mediaAgency: {
					label: 'Media Agency',
					placeholder: 'Select media agency',
					noData: 'No data',
				},
				ordMarkup: {
					label: 'ORD markup',
					placeholder: '',
				},
				status: {
					label: 'Status',
				},
				awareness: {
					description: {
						label: 'Awareness',
						placeholder: 'Describe campaign for streamers',
					},
				},
				brandlift: {
					description: {
						label: 'Brand Lift',
						placeholder: 'Describe campaign for streamers',
					},
				},
				timezone: {
					label: 'Time zone',
					placeholder: 'Time zone',
				},
				formSendStatus: {
					updated: 'Campaign was updated',
				},
			},
		},
		affiliateNetworks: {
			title: 'Affiliate networks',
			description: 'Integration and setup with external affiliate networks.',
			field: {
				label: 'Network',
				notSelected: 'No integrations',
			},
		},
		urlParams: {
			title: 'GET parameters builder',
			description: 'Additional parameters for the URL that allow you to track the performance of your campaigns.',
			field: {
				paramBlock: 'Parameter',
				param: 'Parameter',
				name: 'Value',
				addParam: 'Add another parameter',
				deleteParam: 'Delete parameter',
			},
		},
		pixel: {
			title: 'Uplify Pixel',
			description: 'Uplify Pixel helps you track user activity on advertiser\'s site to deliver ads effectively.',
			field: {
				label: 'Uplify Pixel',
				btn: 'Copy pixel link',
			},
		},
	},
}
