import { session } from '$app/stores';

const init = ($session) => {
	if (!Array.isArray($session.filters)) {
		$session.filters = [];
	}
};

const add = (config) =>
	session.update(($session) => {
		init($session);
		$session.filters.push(config);
		return $session;
	});

const remove = (config) =>
	session.update(($session) => {
		const idx = $session.filters.findIndex(
			(_config) =>
				_config.field_name === config.field_name &&
				_config.value === config.value
		);
		if (idx >= 0) {
			$session.filters.splice(idx, 1);
		}
		return $session;
	});

const clear = () =>
	session.update(($session) => ({
		...$session,
		filters: []
	}));

export { add, remove, clear };
