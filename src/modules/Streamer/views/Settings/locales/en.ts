export default {
	settings: {
		header: {
			title: 'Settings',
			widget: 'Widget',
			chatbot: 'Chatbot',
			extension: 'Extension',
			stream: 'Livestream',
			disabled: 'OFF',
			enabled: 'ON',
		},
		widgetPlatform: {
			title: 'Monetization platform',
			description: 'Choose the platform where you will work withg sponsors, collect statistics and monetize. The choice of a platform will affect the available campaigns and widget modules.',
		},
		widgetLink: {
			title: 'Widget link',
			description: 'Widget for OBS or other broadcast software.',
			optionDrag: {
				label: 'Option 1: Drag and Drop into OBS',
				helpWithSetup: 'Step-by-step guide',
				warn: 'Drag and Drop into OBS will not work if OBS is running as Administrator.',
				btn: 'Drag and Drop into OBS',
			},
			optionLink: {
				label: 'Option 2: Setup widget from scratch',
				helpWithSetup: 'Step-by-step guide',
				warn: 'Make sure the widget is set to the entire visible area in your broadcast software and in the top layer, and the correct settings selected. Check the guide.',
			},
			optionWithSocket: {
				label: 'Option 3: Automatic setup via OBS WebSocket',
				helpWithSetup: 'Step-by-step guide',
				obsSocketPassPlaceholder: 'OBS WebSocket Pass',
				obsSocketPortPlaceholder: 'OBS WebSocket Port',
				warn: 'Make sure your OBS version is 28.0.0 and above. For correct operation, the WebSocket version must be 5.0.0 and above.',
			},
			preview: 'Display test animation in broadcast software.',
		},
		widgetDelay: {
			title: 'Broadcast Delay',
			new: 'new',
			description: 'Set the broadcast delay time for the correct operation of the service and chatbot notifications.',
			howItWorks: 'How it works',
			fieldLabel: 'Delay time (0 to 1800 s)',
		},
		chatbot: {
			title: 'Chatbot setup',
			description: 'The chatbot is used to send messages and surveys.',
			surveyDescription: 'Can\'t setup Nightbot or you’re working with another bot?',
			wantAnotherChatbot: 'I want another chatbot',
			shareChatbotSetup: 'Please share with us your experience about chatbot setup',
			goThroughTheSurvey: 'Go through the survey',
			helpWithSetup: 'Step-by-step guide',
			connectNightbot: 'Connect Nightbot',
			disconnectNightbot: 'Disable Nightbot',
			checkChatbot: 'Check Nightbot',
			sendMessage: 'Message preview',
			messageSent: 'Message sent',
			error: 'Before connecting the bot, please <a href="https://nightbot.tv/dashboard" target="_blank">visit nightbot website</a> and end the game session.',
		},
		advertSettings: {
			title: 'Campaigns manager',
			description: 'Select the frequency and placement mode.',
			moreAboutFormats: 'Learn more about formats',
			bannerTimeout: 'Frequency',
			adPlaybackMode: 'Placement mode',
			playbackModeManual: 'Manual',
			playbackModeAuto: 'Auto',
			manualPlaybackTitle: 'Campaign launch',
			pictureInPicturePosition: 'Picture-in-Picture location',
			leaderboardPosition: 'Wide banner location',
			adsBlocksCountTitle: 'Number of placement',
			adsBlocksCountDuration: 'Duration: {seconds} sec',
			advice: {
				title: 'Manual campaigns launch',
				firstString: 'You can run campaigns manually when the widget, extension and chatbot are active.',
				secondString: 'As soon as the campaigns is available, the button is unlocked.',
			},
		},
		panel: {
			title: 'Remote Campaigns manager',
			mobileVersion: {
				title: 'Mobile Campaigns manager',
				description: 'Scan the QR code to open the Campaigns Manager on your phone. Do not show this code to anyone.',
			},
			obsVersion: {
				title: 'Campaigns Manager for OBS',
				description: 'Campaigns Manager can be added to OBS. Copy the link and paste it under View → Docks → Custom Browser Docks. Do not show this link to anyone.',
			},
		},
		ignoreCategories: {
			title: 'Categories to ignore',
			description: 'Campaigns from the selected categories will be automatically disabled for display in the Campaigns section.',
		},
		attention: {
			title: 'Widget and chatbot setup',
			widgetDisabled: {
				title: 'Widget disabled',
				reasons: {
					title: 'The following reasons are possible:',
					broadcast: 'Broadcast program is disabled',
					notSetUp: 'The widget is not setup in the broadcast program.',
				},
			},
			chatbotDisabled: {
				title: 'Chatbot disabled',
				reasons: {
					toBeConnected: 'Chatbot has to be connected for the channel',
					addChatbotAsModerator: 'Need to add Nightbot as a moderator',
				},
			},
		},
		twitchExtension: {
			title: 'Twitch Extension',
			description: 'Setup an extension for Twitch to get special sponsorship campaigns in Extension format.',
			status: 'Extension status',
			btns: {
				setup: 'Setup extension',
				check: 'Check the extension',
			},
		},
		ssp: {
			title: 'Partners campaigns',
			description: 'Manage external sponsorship campaigns from Uplify partners. ',
			moreAbout: {
				text: 'Learn more about Partners campaigns',
				link: '',
			},
			instream: {
				title: 'InStream sponsorships',
				label: 'Allow in-stream sponsorships',
				hint: 'Include integration with an external partner network, the system will automatically request external integrations and strive to fill all available slots in the widget.',
			},
			text: {
				title: 'Sponsored messages in chat',
				label: 'Allow сhat-bot sponsored messages',
				hint: 'Include integration with an external partner network, the system will automatically send a sponsorship message to the chat every 10 minutes.',
				frequency: {
					label: 'Sponsored messages every 15 minutes',
					options: {
						every15min: 'Once per 15 min',
						every30min: 'Once per 30 min',
					},
				},
			},
			advice: {
				title: 'Integration of external partner networks',
				lines: 'Our service provides access to&nbsp;the sponsorship campaigns from Uplify.In addition, you can increase your income by&nbsp;allowing other partner networks to&nbsp;place your campaigns with Uplify in&nbsp;your content and chat through sponsorship messages.',
			},
		},
		adultOnly: {
			title: 'Age restrictions',
			description: 'Allow the integration of advertising campaigns that have age restrictions within local laws. For example, action film trailers, energy drinks and other types of products intended for adults only.',
			label: 'Allow adults campaigns',
			hint: 'Allow in-stream sponsorships',
		},
		youtubeText: {
			title: 'YouTube Text',
			description: 'Manage YouTube text sponsored messages.',
			link: {
				text: 'Learn more about YouTube text campaigns',
				href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
			},
			allow: {
				label: 'Allow YouTube description ads',
			},
			blacklist: {
				label: 'Videos to ignore',
				hint: 'Videos to ignore',
				errors: {
					invalidLink: 'One or more link is invalid',
					notYoutube: 'One or more link is not a youtube link',
				},
			},
		},
	},
}
