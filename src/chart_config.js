import group_by from 'lodash-es/groupBy';

const group = (data) => {
	let total = data.length;
	let grouped = group_by(data, ({ field_0 }) => field_0);
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
		const { field_0 } = cur;
		if (!field_0) return acc;

		field_0.forEach((value) => {
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

const sankey = (data) => {
	const separator = '::::';
	let result = {};
	data.forEach((entry) => {
		const { field_0: from, field_1: to } = entry;
		if (!from || !to) return;
		from.forEach((source) => {
			to.forEach((target) => {
				const key = `${source}${separator}${target}`;
				let value = 1;
				if (result[key]) {
					value = result[key] + 1;
				}
				result[key] = value;
			});
		});
	});

	const processed = Object.entries(result)
		.filter(([_, v]) => v > 1)
		.map(([k, v]) => {
			const [from, to] = k.split(separator);
			return { source: from + '_f', target: to + '_t', value: v };
		});

	return processed;
};

export const transform_map = {
	single: group,
	multiple: group_in,
	sankey
};

export const chart_config = {
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
	research_sankey: {
		type: 'sankey',
		field_names: ['research_countries_from', 'research_countries_in'],
		transform: sankey
	}
};
