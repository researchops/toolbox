import query from '~/groq';
import { chart_config, transform_map } from '~/chart_config';
import { mode } from '$app/env';

function assemble_filter({ field_name, value }) {
	const { type = 'multiple' } = chart_config[field_name] || {};
	return `"${value}" ${type === 'single' ? '==' : 'in'}  ${field_name}`;
}

function remove_empties(data, ...field_names) {
	return data.map((item) =>
		field_names.reduce((acc, key) => {
			const field_value = item[key];
			let qualified = false;
			if (Array.isArray(field_value)) {
				qualified =
					field_value.length > 0 &&
					!field_value.every((item) => item.trim() === '');
			} else {
				qualified = field_value !== null;
			}
			if (qualified) {
				acc[key] = field_value;
			}
			return acc;
		}, {})
	);
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
	const body = await request.json();
	const { chart_ids = [], filters = [] } = body;

	let dataset;
	let participant_count;

	if (mode === 'production') {
		dataset = await fetch('https://toolbox-8w7.pages.dev/data.json').then(
			(res) => res.json()
		);
	} else {
		dataset = await import('~/data/data-loader').then((res) => res.default);
	}

	const query_part_filters = filters
		.map((_filter) => assemble_filter(_filter))
		.filter((v) => v)
		.join(' && ');

	// normalize all fields
	const fields = new Set();
	chart_ids.forEach((id) => {
		const { field_names = [id] } = chart_config[id] || {};
		field_names.forEach((field_name) => fields.add(field_name));
	});

	const query_part_fields = [...fields].join(', ');
	const query_joined = /* groq */ `
		{
			"full": *[] { ${query_part_fields} },
			"filtered": *[ ${query_part_filters} ] { ${query_part_fields} }
		}
	`;

	try {
		const result = await query(dataset, query_joined);
		const { filtered, full } = await result.get();
		participant_count = filtered?.length;

		let data = {};
		chart_ids.forEach((id) => {
			const { type = 'multiple', field_names = [id] } =
				chart_config[id] || {};

			const transform = transform_map[type];
			const cleaned_filtered = remove_empties(filtered, ...field_names);
			const transformed_filtered = transform(
				cleaned_filtered,
				...field_names
			);

			const cleaned_full = remove_empties(full, ...field_names);
			const transformed_full = transform(cleaned_full, ...field_names);

			const merged = {};
			Object.entries(transformed_full).forEach(([field, full]) => {
				const filtered = transformed_filtered[field] || {
					count: 0,
					percent: 0.0
				};
				merged[field] = {
					full,
					filtered
				};
			});
			data[id] = {
				field_name: id,
				completion_percentage:
					Math.round((cleaned_full.length / full.length) * 10000) /
					100,
				data: merged
			};
		});

		return {
			body: {
				data,
				meta: {
					participant_count
				}
			},
			status: 200
		};
	} catch (err) {
		console.error(err);
		return {
			status: 500
		};
	}

	// try {
	// 	const tasks = chart_ids.map(async (id) => {
	// 		const { type = 'multiple', field_names = [id] } =
	// 			chart_config[id] || {};
	// 		const transform = transform_map[type];
	// 		const result = await query(
	// 			dataset,
	// 			`*[${query_part_filters}] { ${field_names
	// 				.map((field, i) => `"field_${i}": ${field}`)
	// 				.join(',')} }`
	// 		);
	// 		const raw = await result.get();

	// 		// only need to set this once
	// 		if (!participant_count) participant_count = raw.length;
	// 		const cleaned = remove_empties(raw);
	// 		const transformed = transform(cleaned);

	// 		return {
	// 			field_name: id,
	// 			data: transformed,
	// 			completion_percentage:
	// 				Math.round((cleaned.length / raw.length) * 10000) / 100
	// 		};
	// 	});
	// 	const data = await Promise.all(tasks);
	// 	let result = {};

	// 	chart_ids.forEach((id, i) => {
	// 		result[id] = data[i];
	// 	});

	// 	return {
	// 		// @ts-expect-error
	// 		body: {
	// 			meta: {
	// 				participant_count
	// 			},
	// 			data: result
	// 		}
	// 	};
	// } catch (err) {
	// 	console.error(err);
	// 	return {
	// 		status: 500
	// 	};
	// }
}
