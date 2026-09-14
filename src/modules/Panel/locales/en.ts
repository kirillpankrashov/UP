export default {
	panel: {
		tabs: {
			widget: 'Settings',
			campaigns: 'Campaigns',
		},
		states: {
			title: 'Status of modules',
		},
		statuses: {
			chatbot: 'Chatbot',
			extension: 'Widget',
			stream: 'Livestream',
		},
		params: {
			title: 'Campaign display options',
			previewCaption: 'Sponsorship preview in broadcast',
			locationCaption: 'Location on the broadcast',
		},
		campaigns: {
			title: 'Available campaigns',
			none: 'No campaigns available',
			comeBack: 'All campaigns are over today.<br>Come back tomorrow!',
		},
		error: {
			title: 'The link is out of date',
			text: 'Go to your personal cabinet for a new link',
		},
		statusesMustBeOn: 'To run campaigns, all modules must be on',
		logger: {
			copy: 'Copy log',
			copied: 'Log copied!',
		},
		settings: {
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
		},
	},
}
