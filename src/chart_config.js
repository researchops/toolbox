import group_by from 'lodash-es/groupBy';

const group = (data) => {
	let total = data.length;
	let grouped = group_by(data, ({ field }) => field);
	let result = {};
	for (let key in grouped) {
		let count = grouped[key].length;
		let percent = Math.floor((count / total) * 10000) / 100;
		result[key] = {
			count,
			percent
		};
	}
	return result;
};

const group_in = (data) => {
	let total = data.length;

	const grouped = data.reduce((acc, cur) => {
		const { field } = cur;
		if (!field) return acc;

		field.forEach((value) => {
			if (acc[value] == undefined) {
				acc[value] = 1;
			} else {
				acc[value] += 1;
			}
		});
		return acc;
	}, {});

	let result = {};
	for (let key in grouped) {
		let count = grouped[key];
		let percent = Math.floor((count / total) * 10000) / 100;
		result[key] = {
			count,
			percent
		};
	}
	return result;
};

export const transform_map = {
	single: group,
	multiple: group_in
};

export const chart_config = {
	expertise: {
		type: 'single'
	},
	experience: {
		type: 'single'
	},
	company_type: {
		type: 'single'
	},
	maturity: {
		type: 'single'
	},
	researcher_count: {
		type: 'single'
	},
	business: {
		type: 'single'
	},
};
