/**
 * Data model for the current user
 */

export interface User {
	id: number;
	name: string;
	likes: string[];
}

export const USERS: User[] = [
	{
		id:    1,
		name:  'Yassine',
		likes: []
		// likes: ['-KYNmflI8q-ZvvxUNlLv', '-KYmlLg0IVIK6ZluWBZj']
	}
];
