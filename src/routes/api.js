import query from '~/groq';
import chart_config from '~/chart_config';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
	const body = await request.json();
	const { chart_ids, filters } = body;

	const q_filter = filters.join(' && ');

	try {
		const tasks = chart_ids.map(async (id) => {
			const { field_name, transform, unit } = chart_config[id];
			const result = await query(
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
		console.error(err)
		return {
			status: 500
		};
	}
}
