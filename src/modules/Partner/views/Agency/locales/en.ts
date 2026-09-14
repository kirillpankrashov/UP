export default {
	creators: {
		header: {
			title: 'Creators',
		},
		tabs: {
			overview: 'Overview',
			history: 'Transaction history',
			campaignsActive: 'Campaigns',
			campaignsClosed: 'Closed',
			creators: 'Creators',
			billing: 'Billing',
		},
		invite: {
			title: 'Invite Creators',
			invited: 'Creators invited',
			amount: 'Amount to be paid',
			link: 'Invitation link',
			advice: {
				title: 'Get a share of revenue',
				description: 'Generate revenue share from your creators you refer for as long as their is active at Uplify.',
				link: {
					url: '/',
					label: 'How it works',
				},
			},
		},
		creatorsList: 'Creators list',
		billing: {
			companyInformation: {
				title: 'Company information',
				name: {
					label: 'Name',
					placeholder: 'Bussines name',
				},
				email: {
					label: 'E-mail',
					placeholder: 'email@email.com',
				},
				address: {
					label: 'Address',
					placeholder: 'Company address',
				},
				phone: {
					label: 'Phone',
					placeholder: '+1 (123) 456 789',
				},
			},
			paymentDetails: {
				title: 'Payment details',
				bankName: {
					label: 'Bank name',
					placeholder: '',
				},
				bankAccountName: {
					label: 'Bank account name',
					placeholder: '',
				},
				bankAccountHolderAddress: {
					label: 'Bank account holder address',
					placeholder: '',
				},
				bankAddress: {
					label: 'Bank address',
					placeholder: '',
				},
				bankAccountNumber: {
					label: 'Bank account number',
					placeholder: '',
				},
				BIC: {
					label: 'BIC / SWIFT code',
					placeholder: '',
				},
				routingNumber: {
					label: 'Routing number',
					placeholder: '',
				},
			},
			invoices: {
				title: 'Invoices',
				date: 'Date',
				amount: 'Amount',
				invoice: 'Invoice',
			},
		},
		history: {
			title: 'Transaction history',
			payments: 'Transaction for all time',
			none: 'There are no transaction',
			columns: {
				date: 'Date',
				payment: 'Payment per day',
				details: 'Details',
			},
			detailed: {
				title: 'Transaction detalisation',
				description: 'Creators who brought in money that day.',
			},
		},
		list: {
			title: 'Creators list',
			description: 'List of creators you invited. Payments for all time ',
			none: 'There are no creators',
			columns: {
				creator: 'Creator',
				lastActivity: 'Last day of activity',
				earnings: 'Earnings',
			},
		},
		creatorsPayout: {
			title: 'Creators payout',
			description: 'Please enter the amount that your creators should receive when they place sponsorship from your campaign. Please specify the cost per thousand views (CPM).',
			link: {
				text: 'More about creative formats',
				href: 'https://help.uplify.app/en/articles/5640856-in-stream-campaign-formats',
			},
			thirdParty: {
				checkbox: 'Allow third-party partners to place sponsorships',
				popover: {
					label: 'Tip',
					text: 'Enter the basic amount that include your commission and creators payout. Please specify the cost per thousand views (CPM).',
				},
			},
			comission: {
				label: 'Commission',
				popover: {
					label: 'Tip',
					text: 'Used for campaigns with individual agreements with sponsors or if creators payouts are not configured.',
				},
			},
			darkMarket: {
				checkbox: 'Enable increased rate for dark-market clients',
				popover: {
					label: 'Tip',
					text: 'Enter a base amount for clients from the dark-market category (gambling, casino, crypto, etc.) Please specify the cost per thousand views (CPM).',
				},
			},
			cpaLabel: 'Creators payout',
			darkMarketLabel: 'Third-party pricing (incl. fee)',
			fields: {
				video: 'Overlay 50%',
				custom: 'Custom',
				pip_video: 'Overlay 15%',
				interactive: 'Interactive',
				preroll: 'Pre-Roll',
				cpa: 'CPA cost',
				cpc: 'CPC cost',
			},
		},
		creatorsTable: {
			columns: {
				creators: 'Creator',
				lastActivity: 'Last activity',
				balance: 'Balance',
				campaign: 'Campaign',
			},
			status: {
				checkList: {
					label: 'Onboarding in progress',
					text: 'The streamer hasn’t yet completed the onboarding process.',
				},
				payable: {
					label: 'Check the payout settings',
					text: 'The streamer hasn’t yet setup the payout.',
				},
				lowCtr: {
					label: 'Low CTR',
					text: 'Issues with CTR across campaigns.',
				},
			},
			none: 'No data',
		},
		settings: {
			title: 'Settings',
			custom: {
				headline: 'Custom payout',
				descr: 'Please enter the custom amount that your creators should receive when they place sponsorship. Please specify the cost per thousand views (CPM).',
			},
			darkMarket: {
				headline: 'Rate for dark-market customers',
			},
			cpaLabel: 'Creator payout',
			darkMarketLabel: 'Third-party pricing (incl. fee)',
			fields: {
				video: 'Overlay 50%',
				custom: 'Custom',
				pip: 'Overlay 15%',
				interactive: 'Interactive',
			},
		},
		stats: {
			columns: {
				campaign: 'Campaign',
				creator: 'Creator',
				income: 'Income',
				views: 'Views',
				avgCtr: 'Avg. CTR',
				ctr: 'CTR',
				status: 'Status',
			},
			none: 'No data',
		},
		campaignCreators: {
			title: 'Campaign report: {title}',
		},
		creatorCampaigns: {
			title: '{streamer} campaigns',
		},
		categoriesStopList: {
			title: 'Categories stop list',
			description: 'Campaigns from the selected categories will be automatically disabled for display in the In-stream ads section for your creators.',
		},
		campaigns: {
			active: {
				title: 'Active campaigns',
				description: 'List of campaign available for your creators',
			},
			closed: {
				title: 'Closed campaigns',
				description: 'List of closed campaigns',
			},
			reportBtn: {
				full: 'Campaign report',
				short: 'Report',
			},
			none: 'Campaigns are coming soon',
		},
		campaignRow: {
			of: 'of',
			dailyActions: 'Daily actions',
			dailyLimit: 'Daily Views Left',
			dailyActionsLimit: 'Daily actions Left',
			dailyActionsLimitLabel: 'The total number of available actions for the entire community is displayed',
			dailyImpressions: 'Daily views',
			potentialIncome: 'Potential revenue',
			yourIncome: 'Your revenue',
			yourCTR: 'Your CTR',
			averageCTR: 'Average CTR',
			dateStart: 'Start date',
			dateEnd: 'End date',
			enable: 'Enable',
			disable: 'Disable',
			attended: 'Attended',
			toggling: 'Pending..',
			tags: {
				undefinedFormat: 'Unknown format',
				dailyLimitDepleted: 'Today\'s limit depleted',
				totalLimitDepleted: 'Today\'s limit depleted',
				setupExtension: 'Setup Extension',
				checkExtension: 'Check extension status',
				extension: 'Extension',
				actionBonus: 'Action Bonus',
				dailyActionsLimitDepleted: 'Action limit reached',
				performanceDailyDepleted: 'Today\'s limit depleted',
			},
			disabledUntil: 'Disabled until: {date}',
			reasons: {
				lowCTR: '🔥 Reason: low CTR',
				lowCTRLink: {
					text: 'How to improve my CTR?',
					href: 'https://help.uplify.app/en/articles/5640847-uplify-basics',
				},
				moderator: 'Reason: moderator\'s decision',
			},
			format: {
				fullscreen: 'Overlay 50%',
				pip: 'Overlay 15%',
			},
			totalImpressions: 'Available views',
		},
		campaignSidebar: {
			potentialRevenue: 'Potential revenue',
			totalRevenue: 'Your total revenue',
			revenue: 'Your revenue',
			estimatedRevenue: 'Estimated revenue',
			ctr: 'Your CTR',
			target_ctr: 'Target CTR',
			evr: 'Your conversions quality',
			clicks: 'Clicks',
			date: 'Days left',
			dateStart: 'Start date',
			dateEnd: 'End date',
			paymentType: 'Payment type',
			pricePerViews: 'Price per 1000 views',
			pricePerAction: 'Price per 1 action',
			pricePerClick: 'Price per 1 click',
			frequency: 'Frequency',
			adFormat: 'Format',
			advertiserCategory: 'Advertiser category',
			description: 'Campaign description',
			creativePreview: 'Creative preview',
			messageInDescription: 'Message in description',
			chatMessage: 'Message in chatbot',
			campaignOn: 'Campaign on',
			campaignOff: 'Campaign off',
			productLink: 'Product link',
			copyProductLink: 'Copy personal product link',
			deliveredAtions: 'Delivered actions',
			deliveredImpressions: 'Delivered views',
			deliveredDailyActions: 'Delivered actions',
			deliveredClicks: 'Delivered clicks',
			downloadCreative: 'Download creative',
			copyDescription: 'Copy description',
			videos: 'Video Link',
			addNewVideo: 'Add another video',
			howToIncreaseCtr: 'How to increase CTR?',
			howToIncreaseEvr: 'How to increase EVR?',
			evrList: 'EVR events',
			scale: {
				poor: 'Poor',
				fair: 'Fair',
				good: 'Good',
				veryGood: 'Very good',
				excellent: 'Excellent',
			},
		},
	},
}
