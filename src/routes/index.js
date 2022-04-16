import query from '~/groq';

export async function get() {
	try {
		const result = await query(/* groq */ `
            *[] {
                id,
                "expertise": fld0henkYkb5lIuxj
            }
        `);

        const data = await result.get()

		return {
			body: {
				data
			}
		};
	} catch (err) {
		return {
			status: 500
		};
	}
}
