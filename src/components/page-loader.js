import { browser } from '$app/env';
import { state, participant_count } from "~/ui.store";

export const create_loader =
	(chart_ids) =>
	async ({ fetch, session }) => {
		const res = await fetch('/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				filters: session.filters || [],
				chart_ids
			})
		});

		const props = await res.json();

		if (browser) {
			state.set('idle');
			participant_count.set(props.meta.participant_count);
		}

		return {
			status: res.status,
			props
		};
	};
