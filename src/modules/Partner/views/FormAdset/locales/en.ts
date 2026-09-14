export default {
	adset: {
		defaultName: 'Group Name',
		defaultNameNew: 'New Group',
		loading: 'Group loading ..',
		fetchError: {
			title: 'Failed to load group',
			description: 'An error occurred while loading the group or campaign data. Please try again later.',
			retry: 'Retry',
		},
		settings: {
			title: 'Group settings',
			description: 'Group your campaigns by parameters and set targeting to track each of them efficiently',
			form: {
				name: {
					title: 'Group name',
					label: 'The name is visible only to you',
					placeholder: 'Group',
				},
				description: {
					title: 'Description of the group',
					label: 'Description of the group',
					placeholder: 'Describe the group for the author',
				},
				externalId: {
					title: 'External ID',
					placeholder: 'For example, PF-CMP-1661693993',
				},
				altName: {
					addBtn: 'Add alternative name for streamers',
					label: 'Group name for streamers',
					placeholder: 'For example, Spring Promo',
				},
				platform: {
					title: 'Platform',
				},
				format: {
					title: 'Format',
					moreAbout: 'Learn more about creative formats',
					formats: {
						fullscreen: {
							label: 'Full screen video',
							description: 'Mid-roll placed in live stream on full screen',
						},
						smallVideo: {
							label: 'Video in a separate window',
							description: 'Mid-roll placed in live stream on 1/4 screen',
						},
						custom: {
							label: 'Customized solution',
							description: 'Multi-format creative in a live stream on any visible area of the screen',
						},
					},
				},
				formatSettings: {
					duration: {
						label: 'Duration, sec',
						tooltip: 'How long the creative is displayed on screen. For video creatives the video duration is used and this field is ignored — relevant for image creatives only.',
					},
					frequency: {
						label: 'Frequency, sec',
						tooltip: 'The interval after which the creative will be shown to the same viewer again. Leave empty to show constantly',
					},
				},
				schedule: {
					title: 'Schedule',
					startedAtLabel: 'Start date',
					endedAtLabel: 'Finish date',
				},
				viewTime: {
					label: 'Advertising time',
					from: 'From',
					to: 'To',
				},
				payType: {
					payPerImpression: 'Pay per impression',
					payPerAction: 'Pay per action',
				},
				budget: {
					title: 'Budget',
					costPerUnitLabel: 'Advertising cost per unit',
					impressionsLabel: 'Number of views',
					totalBudget: 'Total budget',
					costPerActionLabel: 'Const per action',
					budgetLabel: 'Budget',
					totalActions: 'Expected amount of actions:',
					bidCap: 'Cost per mile, CPM',
					impressions: 'Impressions',
					cpc: 'Click cost',
					clicks: 'Number of clicks',
					conversions: 'Number of conversions',
					margin: 'Uplify margin',
					agencyCommission: 'Agency commission',
					cpmPercent: 'Budget split, CPM',
					cpa: 'Conversion cost',
					creatorsPayout: 'Creators payout',
					conversion: 'Number of conversion',
					infoMessage: 'For internal usage only',
					dailyClickCap: 'Daily click cap',
					dailyConversionCap: 'Daily conversion cap',
					creatorsCPM: 'Paying creators for CPM',
					creatorsCPA: 'Paying creators for conversion',
				},
				targets: {
					title: 'Goals',
					ctrLabel: 'CTR Benchmark',
					evrLabel: 'EVR Benchmark',
					cpaLabel: 'CPA Benchmark',
				},
				frequency: {
					title: 'Frequency',
					standard: {
						label: 'Standard',
						description: 'Standard - Recommended frequency of views with optimal reach: Suitable for long-term campaigns',
					},
					accelerated: {
						label: 'Accelerated',
						description: 'Accelerated - Frequency of views with maximum reach: suitable for short-term campaigns',
					},
					customizable: {
						label: 'Customizable',
						description: 'Customizable - frequency of views based on specific reach parameters: suitable for non-standard campaigns',
					},
					impressionsCount: 'Number of insertions',
					period: 'Period',
				},
				streamerDayLimit: {
					label: 'Daily limit of inserts on creator',
					placeholder: '100',
				},
				status: {
					label: 'Status',
				},
				timezone: {
					label: 'Time zone',
					placeholder: 'Time zone',
				},
				formSendStatus: {
					updated: 'Group was updated',
				},
			},
		},
		alerts: {
			title: 'Alerts',
			description: {
				label: 'Alert description',
				placeholder: 'Installs {{current_actions}} / {{target_actions}}.\nInstall Opera GX and win iPhone\n',
			},
		},
		targeting: {
			title: 'Targeting by creators',
			addition: {
				onlySelected: 'only selected',
				exceptSelected: 'all, except selected',
				excludeSelected: 'Exclude selected categories from targeting',
			},
			evaluation: {
				label: 'Audience evaluation',
				description: 'Select a broadcast language to get a preliminary estimate on the audience',
				size: 'Size',
				reach: 'Reach',
				streamersNumber: 'Number of streamers',
				howCalculated: 'How are indicators calculated?',
			},
			form: {
				agencies: {
					label: 'Selection of network',
					placeholder: 'Select agency',
					warning: {
						title: 'Your value for CPM is lower than the network price',
						text: 'The entered value for CPM is&nbsp;lower than the cost that the partner network requires. You will be&nbsp;able to&nbsp;save the campaign, but it&nbsp;will not work until the value is&nbsp;corrected.',
					},
				},
				streamers: {
					label: 'Selection of creators',
					placeholder: 'Select creators',
					pricePlaceholder: 'Price',
					addBtn: 'Add',
					nameColumn: 'Creator',
					priceColumn: 'Price',
				},
				language: {
					label: 'Broadcast language',
					placeholder: 'Select language',
				},
				countries: {
					label: 'Countries',
					placeholder: 'Select country',
				},
				devices: {
					label: 'Devices',
					placeholder: 'Select device',
				},
				gender: {
					label: 'Gender',
					placeholder: 'Select gender',
				},
				age: {
					label: 'Creators age',
					fromPlaceholder: 'from',
					toPlaceholder: 'to',
				},
				ageRestrictions: {
					label: 'Creator has age restrictions enabled (18+)',
				},
				tags: {
					label: 'Tags',
					placeholder: 'Select tag',
				},
			},
		},
		targetingAudience: {
			title: 'Targeting by audience',
		},
		labels: {
			title: 'Sponsorship label<br/>(CIS market only)',
			fields: {
				chatbot: {
					label: 'Chatbot erid ID',
				},
				creative: {
					label: 'Creative erid ID',
				},
			},
		},
		chatBot: {
			title: 'Chatbot settings',
			form: {
				productUrl: {
					label: 'Product URL',
					placeholder: 'Enter link',
				},
				mobileProductUrl: {
					label: 'Mobile product URL (Deeplink)',
					placeholder: 'Enter link',
				},
				productUrlShort: {
					label: 'Short URL',
					placeholder: '',
				},
				chatBotText: {
					label: 'Chatbot text',
					placeholder: 'Enter text',
				},
			},
		},
		creative: {
			title: 'Data Creative',
			form: {
				productUrl: {
					label: 'Product URL',
					placeholder: 'Enter link',
				},
				mobileProductUrl: {
					label: 'Mobile product URL (Deeplink)',
					placeholder: 'Enter link',
				},
				videoDescriptionText: {
					label: 'Description text',
					placeholder: 'Enter text',
				},
			},
		},
		preview: {
			title: 'Data Creative',
			advice: {
				title: 'Requirements',
				requirements: 'Resolution: 1920 x 1080 px.<br/>Format: MP4<br/>Size: up to {size} MB',
			},
			errors: {
				unknown: 'Unknown error',
			},
		},
		messages: {
			groupUpdatedSuccesfully: 'Group updated succesfully',
		},
		analytics: {
			title: 'Pixels',
			pixelClicks: {
				label: 'IMG conversion pixel',
				placeholder: 'Enter link',
				addLabel: 'Add one more tracker',
			},
			pixelClicksScripts: {
				label: 'Javascript conversion pixel',
				placeholder: 'Enter code',
			},
			erid: {
				title: 'ERID (CIS market only)',
				label: 'erid ID',
				placeholder: '',
			},
		},
	},
}
