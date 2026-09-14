export default {
	wallet: {
		header: {
			title: 'Wallet',
		},
		tabs: {
			overview: 'Overview',
			history: 'Payout history',
		},
		balance: {
			heading: 'Your revenue',
			title: 'Balance',
			currentBalance: {
				label: 'Balance',
				popover: 'Verified income amount',
			},
			minimumPayout: 'Minimum payout amount',
			payoutAmount: 'Amount to payout',
			nearestDatePayout: 'Nearest payout date',
			howPayoutsWork: 'How do payouts work?',
			referralInfo: 'Congratulations! You have earned a referral bonus of {sum}. <br/><br/>Please be aware that in order to retain this bonus, the terms of the program require you to reach a certain number of views by {date}. <br/><br/>Views: {imps} / {impsTotal}.',
			estimatedEarnings: {
				label: 'Estimated earnings for&nbsp;{month}',
				popover: 'Income will be&nbsp;adjusted after checking for possible fraud',
			},
			auditedEarnings: {
				label: 'U.Link amount under review',
				popover: 'Amount to be verified',
			},
			cpaOnReview: {
				label: 'Pending CPA payouts',
			},
			nextPayout: 'Payout amount on {date}',
		},
		paymentServices: {
			all: {
				title: 'Payout services',
				loading: 'loading',
				active: 'Active for payouts',
				activate: 'Default method',
				learnMore: 'Learn more about commissions',
				paypal: 'PayPal',
				wireTransfer: 'Wire transfer',
				paypalData: 'Billings data',
				billingsData: 'Billings data',
				whyDoWeNeedThisData: 'Why do we need this data?',
				setUp: 'Set up payout',
			},
			razorPay: {
				title: 'Payout onboarding',
				loading: 'loading',
				learnMore: 'Learn more about commissions',
				setUp: 'Set up payout',
				statuses: {
					yourStatus: 'Your status',
					paymentMethod: 'Payment method',
					payable: 'Payable',
					notPayable: 'Not payable',
					notAdd: 'Not add',
				},
				form: {
					title: 'Billings data',
					whyDoWeNeedThisData: 'Why do we need this data?',
				},
			},
			tochkaBank: {
				title: 'Payout services',
				loading: 'loading',
				learnMore: 'Learn more about commissions',
				setUp: 'Set up payout',
				employment: {
					type: 'Employment type',
					physical: 'Individual',
					physicalShort: 'Individual',
					selfEmployed: 'Self-employed',
					taxHintSelf: 'The self-employed are required to pay taxes on income in the amount of 6% of the amount of remuneration. \n \n The self-employed person pays the tax himself on a receipt from the tax office.',
					taxHintPhysical: 'Individuals are required to pay taxes on income in the amount of 13% of the amount of remuneration. We will transfer this amount to the tax ourselves.',
					selfRegisterHint: 'To get started, connect the service partner “WinWork” and be sure to give Uplify permission to interact with the service. \n \n Integration with “WinWork” allows you to automatically make payments, generate checks, calculate and pay tax on the income.',
					formHint: '',
					status: 'Status',
					registered: 'Registered',
					notRegistered: 'Not registered',
					register: 'Connect',
				},
				statuses: {
					yourStatus: 'Your status',
					paymentMethod: 'Payment method',
					payable: 'Payable',
					notPayable: 'Not payable',
					notAdd: 'Not add',
				},
				form: {
					title: 'Account linking',
					whyDoWeNeedThisData: 'Why do we need this data?',
				},
				paymentStatus: {
					lastTransaction: 'Last payment',
					status: {
						inProgress: 'In progress',
						error: 'Error',
						success: 'Success',
					},
					fields: {
						amount: 'Amount',
						date: 'Date',
						status: 'Status',
						methods: 'Payment methods',
					},
				},
			},
		},
		analytics: {
			heading: 'Income analytics',
			categories: {
				awareness: 'Sponsorship formats',
				performance: 'Interactive formats',
				actions: 'Action bonus',
				freemium: 'Uplify Link',
				referrals: 'Referrals',
				youtube_text: 'Youtube Text',
				extension: 'Extension',
			},
			source: {
				title: 'Income source',
			},
		},
		payoutHistory: {
			title: 'Payout history',
			columns: {
				date: 'Date',
				amount: 'Amount',
				service: 'Payment method',
				invoice: 'Invoice',
			},
			loading: 'loading',
			noData: 'No payouts have been made yet.',
		},
		tipaltiAdvice: {
			title: 'Earn first {amount} to unlock set up withdrawals',
			description: 'The payout setting is only available to creators who have earned 80% of the minimum payout. ',
		},
		tochkaAdvice: {
			title: 'Connect one of the payout services',
			description: 'You don\'t have any connected payout services. Connect a prefer way to receive payouts.',
		},
	},
}
