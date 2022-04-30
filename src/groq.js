import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
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
