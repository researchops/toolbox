export function clean(data, ...field_names) {
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
	)
}
