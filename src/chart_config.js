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
		const { field } = cur
		if (!field) return acc

		field.forEach(value => {
			if (acc[value] == undefined) {
				acc[value] = 1
			} else {
				acc[value] += 1
			}
		})
		return acc
	}, {})

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

export default {
	expertise: {
		unit: 'census participants',
		filter: {
			type: 'equal'
		},
		transform: group
	},
	experience: {
		unit: 'census participants',
		filter: {
			type: 'equal'
		},
		transform: group
	},
	company_type: {
		unit: 'companies',
		filter: {
			type: 'equal'
		},
		transform: group
	},
	industry: {
		unit: 'companies',
		filter: {
			type: 'in'
		},
		transform: group_in
	},
	maturity: {
		unit: 'companies',
		filter: {
			type: 'equal'
		},
		transform: group
	},
	project_management: {
		unit: 'census participants',
		filter: {
			type: 'in'
		},
		transform: group_in
	},
	responsibilities: {
		field_type: 'multichoice',
		transform: group_in
	}
};
