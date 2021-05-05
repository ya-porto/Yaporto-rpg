import {ThreadProps} from '../pages/forum/thread.type';

export const forumMock: ThreadProps[] = [{
	data: '05.07.2020',
	theme: 'Привет мир',
	message: 'Первое сообщение',
	commentsQuantity: '5'
},
{
	data: '05.07.2020',
	theme: 'Привет мир',
	message: 'Первое сообщение',
	commentsQuantity: '5'
}];

export const threadMock: ThreadProps = {
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
