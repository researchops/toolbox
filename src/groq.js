import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { evaluate, parse } from 'groq-js';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file_data = path.join(__dirname, '/data/data.json');
const data = require(file_data);

function query(input) {
	const tree = parse(input);
	return evaluate(tree, { dataset: data });
}

export default query;
