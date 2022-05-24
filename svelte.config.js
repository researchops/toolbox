import path from 'node:path';
import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import { toc } from 'mdast-util-toc';
import { visitParents as visit } from 'unist-util-visit-parents';
import rehype_slug from 'rehype-slug';

function clean(tree) {
	let list = [];
	if (!tree) return list;

	visit(tree, 'link', (node, ancestors) => {
		const level =
			ancestors.filter(({ type }) => type === 'list').length - 1;
		const text_nodes = [];
		visit(node, 'text', ({ value }) => {
			text_nodes.push(value);
		});
		const text = text_nodes.join('');

		list.push({ level, url: node.url, text });
	});
	return list;
}

/**
 * [{ title: 'a', url: '#abc', children: [{  }] }]
 */

function get_toc() {
	return (tree, file) => {
		const table = toc(tree, { ordered: true });
		const list = clean(table.map);
		if (file.data.fm) {
			file.data.fm._toc = list;
		} else {
			file.data.fm = { _toc: list };
		}
	};
}

const svx_config = {
	extensions: ['.svx'],
	remarkPlugins: [get_toc],
	rehypePlugins: [rehype_slug],
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
			},
			envPrefix: ['VITE_', 'CF_PAGES_U']
		}
	}
};

export default config;
