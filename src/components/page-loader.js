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

		const data = await res.json();

		return {
			status: res.status,
			props: {
				data
			}
		};
	};
