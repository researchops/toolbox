import { expect, test } from 'vitest';
import { clean } from './clean';

const test_data = [
	{
		expertise: ['User or design research'],
		experience: null,
		responsibilities: [
			'Generalist ',
			'Research libraries',
			'Recruitment',
			'Training and mentoring',
			'Finance and procurement',
			'Vendor management and tools',
			'Taxonomy',
			null,
			''
		]
	},
	{
		expertise: ['User or design research'],
		experience: '4 - 6 years',
		responsibilities: [
			'Training and mentoring',
			'Vendor management and tools',
			'',
		]
	},
	{
		expertise: ['User or design research'],
		experience: '',
		responsibilities: [
			'Training and mentoring',
			'Vendor management and tools',
			'Taxonomy'
		]
	}
];

test('remove empties / undefined from single choice charts', () => {
	const result = clean(test_data, 'experience');
	expect(result).toMatchSnapshot()
});

test('remove empties / undefined from multi-choice charts', () => {
	const result = clean(test_data, 'responsibilities');
	expect(result).toMatchSnapshot()
});

test('remove empties / undefined from multiple fields', () => {
	const result = clean(test_data, 'expertise', 'experience');
	expect(result).toMatchSnapshot()
});
