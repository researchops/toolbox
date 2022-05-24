import { session } from '$app/stores';
import { state } from './ui.store';

const init = ($session) => {
	if (!Array.isArray($session.filters)) {
		$session.filters = [];
	}
};

const add = (config) =>
	session.update(($session) => {
		init($session);
		const idx = $session.filters.findIndex(
			(f) =>
				config.field_name === f.field_name && config.value === f.value
		);
		if (idx < 0) {
			$session.filters.push(config);
			state.set('loading');
		}
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
			state.set('loading');
		}
		return $session;
	});

const clear = () =>
	session.update(($session) => {
		state.set('loading');
		return {
			...$session,
			filters: []
		};
	});

export { add, remove, clear };
