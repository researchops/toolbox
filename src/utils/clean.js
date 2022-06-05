function is_valid_string(value) {
	return typeof value === 'string' && value.trim() !== '';
}

export function clean(data, ...field_names) {
	return data
		.map((item) => {
			let result = null;
			field_names.forEach((key) => {
				const values = item[key];
				if (Array.isArray(values)) {
					const filtered = values.filter(is_valid_string);
					if (filtered.length > 0) {
						result = { ...result, [key]: filtered };
					}
				}

				if (is_valid_string(values)) {
					result = { ...result, [key]: values };
				}
			});
			return result;
		})
		.filter(Boolean);
}
