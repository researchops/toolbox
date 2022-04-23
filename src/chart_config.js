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

export default {
	expertise: {
		field_name: 'fld0henkYkb5lIuxj',
		unit: 'census participants',
		filter: {
			type: 'equal'
		},
		transform: group
	},
	company: {
		field_name: 'fldhpi9Odq5km10pT',
		unit: 'companies',
		filter: {
			type: 'equal'
		},
		transform: group
	}
};
