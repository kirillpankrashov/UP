/**
 * Column components stubbed across Partner campaigns table tests (union of all table column imports).
 */
export const partnerCampaignsTableColumnStubs = [
	'ColumnId',
	'ColumnName',
	'ColumnStatus',
	'ColumnModeration',
	'ColumnPlatform',
	'ColumnBudget',
	'ColumnImpressions',
	'ColumnDaysRemaining',
	'ColumnFormat',
	'ColumnRelatedCampaign',
	'ColumnRelatedAdset',
].reduce<Record<string, { name: string, template: string }>>((acc, name) => {
	acc[name] = {
		name,
		template: `<div data-test="stub-${name}"></div>`,
	}

	return acc
}, {})
