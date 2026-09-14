export default {
	link: {
		title: 'Uplify Link',
		tabs: {
			setup: 'Widget setup',
			profile: 'Profile',
			alerts: 'Stream alerts',
			supporters: 'Analytics',
			posts: 'Posts',
		},
		posts: {
			addNewBtn: 'Add new post',
			post: {
				createdAt: 'Posted on',
				edit: 'Edit',
				remove: 'Remove',
			},
			sidebar: {
				title: {
					add: 'Add new post',
					edit: 'Editing post',
				},
				markdown: {
					label: 'Markdown text',
					hint: 'For example:<br><br>I just love **<b>bold text</b>**.<br>Also *<i>italic text</i>* is pretty cool.<br><br>My favorite link is [Uplify.link](https://uplify.link).',
				},
				embed: {
					label: 'Embed Link',
					hint: 'Some text',
				},
				btns: {
					post: 'Post',
					submit: 'Save',
				},
			},
		},
		setup: {
			link: {
				title: 'Your Uplify Link page',
				description: 'Add this link to your social media bios and share with your community. Earn more by sharing your link regularly.',
				errors: {
					unique: 'Creator with this name already exists',
					general: 'Invalid name',
				},
			},
			goal: {
				title: 'Set a goal ',
				description: 'Goals tend to attract more supporters. Add goal and let them be a part of your creative journey.',
				addGoal: 'Add goal',
				reachedOf: '100 of 2 000 reached!',
			},
			goalForm: {
				title: 'Create a new goal',
				editTitle: 'Edit goal',
				fields: {
					title: {
						caption: 'Goal title',
						placeholder: 'e.g. New webcam',
					},
					description: {
						caption: 'Goal description',
						placeholder: 'When I reach 200 points, I’ll buy a new webcam to move my livestreams to a new level.',
						hint: 'Give a short descrtiption of the reasons why you need to reach your goal.',
					},
					amount: {
						caption: 'Goal amount',
						hint: 'Set an amount without the currency sign e.g. 100. Goal progress will be shown as a percentage.',
					},
					progress: {
						caption: 'Progress so far',
						hint: 'Enter the amount that you have already raised towards this goal. Enter 0 if you’re starting from scratch.',
					},
					publicAmount: {
						caption: 'Show target amount publicly',
						hint: 'Show the total target amount on your personal page',
					},
				},
				statusMessage: {
					success: 'Goal was updated',
					fail: 'Error updating goal',
				},
			},
			poll: {
				title: 'Set a new poll',
				description: 'Polls help better engage your audience, which will simultaneously increase your engagement rate and earnings. Viewers should watch the ads before voting, and you\'ll get revenue from the ads you show.',
				addPoll: 'Add poll',
				duration: 'Duration',
				votes: 'Votes - {num} left',
			},
			pollForm: {
				title: 'Create a new poll',
				editTitle: 'Edit poll',
				responsesTitle: 'Answers',
				responsesTitleMin: '(minimum 2)',
				fields: {
					question: {
						caption: 'Question',
						placeholder: 'e.g. What game should I play next?',
					},
					answer: {
						caption: 'Answer',
					},
					condition: {
						caption: 'Poll mode',
						hint: 'Termination condition: by time or number of votes',
						duration: 'Minutes',
						maxVotes: 'Votes',
					},
					duration: {
						caption: 'Duration in minutes',
						hint: 'The validity time of your poll.',
					},
					maxVotes: {
						caption: 'Votes goal',
						hint: 'The poll will end when reach this number of votes',
					},
				},
				statusMessage: {
					success: 'Poll was updated',
					fail: 'Error updating poll',
				},
			},
		},
		profile: {
			telegram: {
				title: 'Auto reposter',
				description: 'Connect your social network and posts will automatically appear on&nbsp;your Uplify Link page.',
				input: {
					title: 'Telegram channel',
					description: '{\'Add a&nbsp;link to&nbsp;your channel with @ and assign our bot @UplifyBot as&nbsp;an&nbsp;admin.\'}',
					label: 'Link',
					placeholder: '{\'@my_channel\'}',
				},
				errors: {
					channelExists: 'There is no channel with the this name',
					invalidName: 'The wrong channel name',
				},
			},
			about: {
				title: 'Your bio',
				description: 'Add details for your profile',
				placeholder: 'Just a few words',
				preview: 'Preview:',
				advice: {
					label: 'HINT',
					title: 'You can use Markdown',
					description: 'For example:<br><br>I just love **<b>bold text</b>**.<br>Also *<i>italic text</i>* is pretty cool.<br><br>My favorite link is [Uplify.link](https://uplify.link).',
				},
				ai: {
					label: 'AI generated text for your profile',
					delete: 'Delete',
					edit: 'Edit',
					like: 'Like',
					suggestionFull: 'Here\'s what our AI thinks about {name}',
					suggestionEmptyMale: '{name} didn\'t write anything about himself, but here\'s what our AI can say',
					suggestionEmptyFemale: '{name} didn\'t write anything about herself, but here\'s what our AI can say',
				},
			},
			gear: {
				title: 'Gears and setup',
				description: 'Tell your audience what kind of&nbsp;streaming equipment you use',
				form: {
					addBlock: 'Add block',
					deleteBlock: 'Delete block',
					block: {
						title: 'Equipment',
						category: {
							label: 'Category',
							placeholder: 'Specify a category',
						},
						description: {
							label: 'Description',
							placeholder: 'Describe the equipment',
						},
						link: {
							label: 'Link',
							placeholder: 'Provide a link',
						},
						sku: {
							label: 'SKU',
							placeholder: '',
						},
					},
				},
				advice: {
					label: 'Hint',
					title: 'Yandex.Market widget',
					text: 'Check the availability of&nbsp;products on&nbsp;Yandex.Market. If&nbsp;at&nbsp;least one is&nbsp;missing, a&nbsp;widget with similar offers will be&nbsp;shown instead of&nbsp;your products.',
				},
			},
			social: {
				title: 'Social Links',
				description: 'Share social network links to your audience',
				form: {
					addBlock: 'Add block',
					deleteBlock: 'Delete block',
					block: {
						title: 'Link',
						category: {
							label: 'Social network',
							placeholder: 'Select social network',
						},
						description: {
							label: 'URL',
							placeholder: 'Paste link',
						},
					},
				},
			},
			theme: {
				title: 'Color theme',
				description: 'Choose a color theme for your Uplify Link page',
				select: {
					label: 'Color theme',
					options: {
						light: 'Light',
						dark: 'Dark',
					},
				},
			},
			banner: {
				title: 'Profile banner',
				description: 'Customize your profile banner on personal page',
				label: 'Upload a PNG, JPG under 5MB. Image size should be at least 1376x300 px.',
			},
		},
		alerts: {
			supportAlert: 'Support alert',
			goalAlert: 'Goal alert',
			pollAlert: 'Poll alert',
			chatAlert: 'Chat alert',
			preview: 'Preview',
			alertPreview: {
				title: 'Alert preview',
				description: 'Setup your widget in your OBS software (OBS Studio, Twitch Studio, or Xsplit) and test alerts before livestream.',
				sendTest: 'Send preview',
			},
			chatBotReminder: 'Requires setting up a chat bot',
			fields: {
				messageDuration: {
					caption: 'Alert display time',
					hint: 'How long an alert will be displayed on the live stream.',
				},
				supportAlertPosition: {
					caption: 'Support alert position',
					hint: 'Specifies where on the screen alert will be displayed.',
				},
				goalAlertPosition: {
					caption: 'Goal alert position',
					hint: 'Specifies where on the screen alert will be displayed.',
				},
				pollAlertPosition: {
					caption: 'Poll alert position',
					hint: 'Specifies where on the screen alert will be displayed.',
				},
				chatAlert: {
					caption: 'Enable chat alerts',
					hint: 'Specifies whether or not to show interactive notifications during a live broadcast.',
				},
			},
			statusMessage: {
				success: 'As configurações foram atualizadas',
				fail: 'Erro ao atualizar as configurações',
			},
		},
		supporters: {
			stats: {
				supporters: 'Monthly supporters',
				revenueDay: 'Today estimated revenue',
				revenueMonth: 'Monthly estimated revenue',
				cpm: 'Avg. price per 1.000 views (CPM)',
				impressions: 'Delivered impressions',
				points: 'Monthly points',
			},
			history: {
				supporters: 'Supporters',
				supportedYou: 'supported you!',
				noSupportersTitle: 'You don’t have any supporters yet',
				noSupportersMessage: 'Encourage your viewers visit your page to get first supports',
				impressions: '{imps} ad views',
				targets: {
					today: 'Today',
					yesterday: 'Yesterday',
					week: 'This week',
					month: 'This month',
					allTime: 'All time',
					startDate: 'Start date',
					endDate: 'End date',
				},
				columns: {
					id: '#',
					name: 'Name',
					contribution: 'Points',
				},
				cacheTimeLeft: 'This rating will be updated in {min} min.',
			},
		},
		widgetPosition: {
			leftTop: 'Left top corner',
			rightTop: 'Right top corner',
			leftBottom: 'Left bottom corner',
			rightBottom: 'Right bottom corner',
			disabled: 'OFF',
		},
		chatbotMsgInterval: {
			every15mins: 'Every 15 minutes',
			every30mins: 'Every 30 minutes',
			everyHour: 'Every hour',
			disabled: 'OFF',
		},
	},
}
