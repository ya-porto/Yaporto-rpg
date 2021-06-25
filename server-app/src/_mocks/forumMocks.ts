import {ThreadProps} from '../controllers/forum/forum.type';

export const threadMocks: ThreadProps[] = [{
	id: 3,
	title: 'Tread TITLE',
	text: 'Tread text',
	author: {
		avatar: 'https://cdn.britannica.com/22/206222-131-E921E1FB/Domestic-feline-tabby-cat.jpg',
		id: 334,
		name: 'My name'
	},
	comments: [
		{
			id: 3,
			author: {
				avatar: 'https://cdn.britannica.com/22/206222-131-E921E1FB/Domestic-feline-tabby-cat.jpg',
				id: 3364,
				name: 'My name 2'
			},
			text: 'Comment text',
			likes: []
		},
		{
			id: 7,
			author: {
				avatar: 'https://cdn.britannica.com/22/206222-131-E921E1FB/Domestic-feline-tabby-cat.jpg',
				id: 334,
				name: 'My NAMER 44'
			},
			text: 'Comment text 242',
			likes: [33, 34]
		}
	]
}];
