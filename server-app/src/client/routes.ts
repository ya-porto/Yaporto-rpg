export const ROUTES = {
	MAIN: {
		NAME: 'Домашяя',
		INDEX: '/'
	},
	PROFILE: {
		NAME: 'Профиль',
		INDEX: '/profile',
		AUTH: true
	},
	SIGNIN: {
		NAME: 'Войти',
		INDEX: '/signin',
		AUTH: false
	},
	SIGNUP: {
		NAME: 'Регистрация',
		INDEX: '/signup',
		AUTH: false
	},
	GAME: {
		NAME: 'Играть',
		INDEX: '/game',
		AUTH: true
	},
	FORUM: {
		NAME: 'Форум',
		INDEX: '/forum',
		AUTH: true
	},
	THREAD: {
		NAME: 'Тред',
		INDEX: '/thread',
		AUTH: true
	},
	LEADERBOARD: {
		NAME: 'Лидерборд',
		INDEX: '/leaderboard'
	}
};
