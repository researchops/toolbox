import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

import 'dotenv/config';
import Airtable from 'airtable';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir_data = path.join(__dirname, '../src/data');
const file_data = path.join(dir_data, 'data.json');

const fields = require(path.join(dir_data, 'fields.json'));
const data = [];

Airtable.configure({
	apiKey: process.env.ATBL_KEY,
	endpointUrl: 'https://api.airtable.com'
});

const client = Airtable.base(process.env.ATBL_BASE)(process.env.ATBL_SHEET);

function swap_fields(fields, record) {
	const new_field = {};
	Object.entries(fields).forEach(([field_id, field_value]) => {
		const value = record[field_value];
		if (typeof value === 'undefined') return;
		new_field[field_id] = value;
	});

	return new_field;
}

function page(records, next) {
	records.forEach((record) => {
		const raw = record._rawJson.fields;
		const swapped = swap_fields(fields, raw);
		const id = record.id;
		console.log(`pushed ${id}`);
		swapped.id = id;
		data.push(swapped);
	});
	next();
}

async function done(err) {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	console.log(`fetched ${data.length} rows. Writing...`);
	await fs.writeFile(file_data, JSON.stringify(data), 'utf-8');
	console.log(`write ${data.length} rows to ${file_data}`);
}

client.select().eachPage(page, done);
