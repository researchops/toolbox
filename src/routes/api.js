import query from '~/groq';
import { chart_config, transform_map } from '~/chart_config';
import { mode } from '$app/env';

function assemble_filter({ field_name, value }) {
	const { type = 'multiple' } = chart_config[field_name] || {};
	return `"${value}" ${type === 'single' ? '==' : 'in'}  ${field_name}`;
}

function remove_empties(data) {
	return data.filter(({ field }) => {
		if (Array.isArray(field)) {
			return (
				field.length > 0 && !field.every((item) => item.trim() === '')
			);
		} else {
			return field !== null;
		}
	});
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
	const body = await request.json();
	const { chart_ids, filters } = body;

	let dataset;
	if (mode === 'production') {
		dataset = await fetch('https://toolbox-8w7.pages.dev/data.json').then(
			(res) => res.json()
		);
	} else {
		dataset = await import('~/data/data-loader').then((res) => res.default);
	}

	const q_filter = filters
		.map((_filter) => assemble_filter(_filter))
		.filter((v) => v)
		.join(' && ');

	try {
		const tasks = chart_ids.map(async (id) => {
			const { type = 'multiple' } = chart_config[id] || {};
			const transform = transform_map[type];
			const result = await query(
				dataset,
				`*[${q_filter}] { "field": ${id} }`
			);
			const raw = await result.get();
			const cleaned = remove_empties(raw);
			const transformed = transform(cleaned);

			return {
				field_name: id,
				data: transformed,
				completion_percentage:
					Math.round((cleaned.length / raw.length) * 10000) / 100
			};
		});
		const data = await Promise.all(tasks);
		let result = {};

		chart_ids.forEach((id, i) => {
			result[id] = data[i];
		});

		return {
			// @ts-expect-error
			body: result
		};
	} catch (err) {
		console.error(err);
		return {
			status: 500
		};
	}
}
