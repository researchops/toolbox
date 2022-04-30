import { evaluate, parse } from 'groq-js';

function query(dataset, input) {
	const tree = parse(input);
	return evaluate(tree, { dataset });
}

export default query;
