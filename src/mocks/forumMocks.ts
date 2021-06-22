import {ThreadProps} from '../pages/forum/thread.type';

export const forumMock: ThreadProps[] = [{
	id: 1,
	data: '05.07.2020',
	theme: 'Привет мир',
	message: 'Первое сообщение',
	commentsQuantity: '5'
},
{
	id: 2,
	data: '05.07.2020',
	theme: 'Привет мир',
	message: 'Первое сообщение',
	commentsQuantity: '5'
}];

export const threadMock: ThreadProps = {
	id: 3,
	data: '05.07.2020',
	theme: 'Привет мир',
	message: 'Первое сообщение',
	commentsQuantity: '5',
	threadStarter: {
		avatar: '',
		login: 'Топикстартер'
	},
	comments: [
		{
			commentMessage: 'Первый',
			commentator: {
				avatar: '',
				login: 'Вася Пупкин'
			}
		},
		{
			commentMessage: 'Второй',
			commentator: {
				avatar: '',
				login: 'Пупа Васькин'
			}
		}
	]
};
