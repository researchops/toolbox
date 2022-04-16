import path from 'node:path';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					'~': path.resolve('./src')
				}
			}
		}
	}
};

export default config;
