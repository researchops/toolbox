import query from '~/groq';
import { chart_config, transform_map } from '~/chart_config';
import { mode } from '$app/env';
import { clean } from '~/utils/clean';

function assemble_filter({ field_name, value }) {
	const { type = 'multiple' } = chart_config[field_name] || {};
	return `"${value}" ${type === 'single' ? '==' : 'in'}  ${field_name}`;
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(event) {
	const { request } = event;
	const body = await request.json();
	const { chart_ids = [], filters = [] } = body;

	let response;
	if (mode === 'production') {
		// lifted from https://developers.cloudflare.com/workers/examples/cache-post-request/
		/* eslint-disable-next-line no-inner-declarations */
		async function sha256(message) {
			// encode as UTF-8
			const msgBuffer = new TextEncoder().encode(message);

			// hash the message
			const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

			// convert ArrayBuffer to Array
			const hashArray = Array.from(new Uint8Array(hashBuffer));

			// convert bytes to hex string
			const hashHex = hashArray
				.map((b) => ('00' + b.toString(16)).slice(-2))
				.join('');
			return hashHex;
		}

		const hash = await sha256({ chart_ids, filters });
		const cache_url = new URL(request.url);
		cache_url.pathname = '/post/' + cache_url.pathname + hash;
		const cache_key = new Request(cache_url.toString(), {
			headers: request.headers,
			method: 'GET'
		});

		// @ts-expect-error Cloudflare cache
		let cache = caches.default;
		response = await cache.match(cache_key);
	}

	if (mode !== 'production' || !response) {
		let dataset;
		let participant_count;

		if (mode === 'production') {
			const url = import.meta.env.VITE_PREVIEW
				? 'http://localhost:3000'
				: import.meta.env.CF_PAGES_URL;
			dataset = await fetch(`${url}/data.json`).then((res) => res.json());
		} else {
			dataset = await import('../data/data-loader').then(
				(res) => res.default
			);
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
				const cleaned_filtered = clean(filtered, ...field_names);
				const transformed_filtered = transform(
					cleaned_filtered,
					...field_names
				);

				const cleaned_full = clean(full, ...field_names);
				const transformed_full = transform(
					cleaned_full,
					...field_names
				);

				let merged = {};

				if (type === 'sankey') {
					merged = {
						filtered: transformed_filtered,
						full: transformed_full
					};
				} else {
					Object.entries(transformed_full).forEach(
						([field, full]) => {
							const filtered = transformed_filtered[field] || {
								count: 0,
								percent: 0.0
							};
							merged[field] = {
								full,
								filtered
							};
						}
					);
				}
				data[id] = {
					field_name: id,
					type,
					completion_percentage:
						Math.round(
							(cleaned_full.length / full.length) * 10000
						) / 100,
					data: merged
				};
			});

			const body = JSON.stringify({
				data,
				meta: {
					participant_count
				}
			});
			response = new Response(body, {
				status: 200
			});

			response.headers.append('Cache-Control', 'max-age=86400');

			if (mode === 'production') {
				event.waitUntil(cache.put(request, response.clone()));
			}
		} catch (err) {
			console.error(err);
			return {
				body: JSON.stringify(err),
				status: 500
			};
		}
	}

	return response;
}
