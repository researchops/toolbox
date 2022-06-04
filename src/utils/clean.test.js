import { test } from 'vitest';
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
            '',
		]
	},
	{
		expertise: ['User or design research'],
		experience: '4 - 6 years',
		responsibilities: [
			'Training and mentoring',
			'Vendor management and tools',
			'Taxonomy'
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
    console.log(result);
});
