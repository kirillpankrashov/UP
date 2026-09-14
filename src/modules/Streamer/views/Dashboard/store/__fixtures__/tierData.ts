export const tierData = {
	current: {
		level: 1,
		updated: {
			date: '09/01/22',
			text: 'Cycle update',
		},
		ctr: {
			title: 'CTR',
			value: 0,
		},
		impressions: {
			title: 'Impressions',
			value: 0,
		},
		referrals: {
			title: 'Referrals',
			value: 0,
		},
		daysOnPlatform: {
			title: 'Time on platform',
			value: 0,
		},
		discord: {
			title: 'Discord',
			value: false,
		},
		extension: {
			title: 'Extension',
			value: true,
		},
	},
	levels: [
		{
			level: 1,
			requirements: {
				level: 1,
				ctr: 0.2,
				impressions: 1000,
				referrals: 0,
				daysOnPlatform: 15,
				discord: true,
				extension: true,
			},
			benefits: [
				'CPM 2%',
				'Limits 20%',
			],
		},
		{
			level: 2,
			requirements: {
				level: 2,
				ctr: 0.3,
				impressions: 3000,
				referrals: 3,
				daysOnPlatform: 30,
				discord: true,
				extension: true,
			},
			benefits: [
				'CPM 4%',
				'Limits 40%',
				'Exclusive campaigns',
			],
		},
		{
			level: 3,
			requirements: {
				level: 3,
				ctr: 0.35,
				impressions: 7000,
				referrals: 3,
				daysOnPlatform: 45,
				discord: true,
				extension: true,
			},
			benefits: [
				'CPM 6%',
				'Limits 80%',
				'Exclusive campaigns',
				'Priority support',
			],
		},
		{
			level: 4,
			requirements: {
				level: 4,
				ctr: 0.35,
				impressions: 10000,
				referrals: 3,
				daysOnPlatform: 60,
				discord: true,
				extension: true,
			},
			benefits: [
				'CPM 10%',
				'Limits 120%',
				'Exclusive campaigns',
				'Guarantee payments',
			],
		},
		{
			level: 5,
			requirements: {
				level: 5,
				ctr: 0.35,
				impressions: 15000,
				referrals: 3,
				daysOnPlatform: 90,
				discord: true,
				extension: true,
			},
			benefits: [
				'CPM 15%',
				'Limits 200%',
				'Exclusive campaigns',
				'Guarantee payments',
				'Low commissions',
			],
		},
	],
}
