import query from '~/groq';
import chart_config from '~/chart_config';
import { mode } from '$app/env';

function assemble_filter({ field_name, value }) {
	const filter_config = chart_config[field_name].filter;
	if (!filter_config || !filter_config.type) return null;
	return `"${value}" ${
		filter_config.type === 'equal' ? '==' : 'in'
	}  ${field_name}`;
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
	const body = await request.json();
	const { chart_ids, filters } = body;

	let dataset;
	if (mode === 'production') {
		dataset = await fetch(
			'https://toolbox-8w7.pages.dev/data.json'
		).then((res) => res.json());
	} else {
		dataset = await import('~/data/data-loader').then(res => res.default);
	}

	const q_filter = filters
		.map((_filter) => assemble_filter(_filter))
		.filter((v) => v)
		.join(' && ');

	try {
		const tasks = chart_ids.map(async (id) => {
			const { field_name, transform, unit } = chart_config[id];
			const result = await query(
				dataset,
				`*[${q_filter}] { "field": ${field_name} }`
			);
			const raw = await result.get();

			return {
				field_name,
				data: transform(raw),
				unit
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
