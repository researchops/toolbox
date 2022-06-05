import { groupBy as group_by } from 'lodash-es';

const group = (data, field_name = 'field_0') => {
	let total = data.length;
	let grouped = group_by(data, (item) => item[field_name]);
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

const group_in = (data, field_name = 'field_0') => {
	let total = data.length;

	const grouped = data.reduce((acc, cur) => {
		const field_values = cur[field_name];
		if (!field_values) return acc;

		field_values.forEach((value) => {
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

const sankey = (data, from_name = 'field_0', to_name = 'field_1') => {
	const separator = '::::';
	let result = {};
	data.forEach((entry) => {
		const from = entry[from_name];
		const to = entry[to_name];
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
