import path from 'node:path';
import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';

const svx_config = {
	extensions: ['.svx'],
	layout: path.resolve('./src/layouts/page.svelte')
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx'],
	preprocess: [mdsvex(svx_config)],
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
