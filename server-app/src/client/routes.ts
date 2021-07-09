enum ENUMROUTES {
	MAIN,
	PROFILE,
	SIGNIN,
	SIGNUP,
	GAME,
	FORUM,
	THREAD,
	LEADERBOARD
}
type IROUTES = {
	[key in keyof typeof ENUMROUTES]: {
		NAME: string;
		INDEX: string;
		AUTH?: boolean;
	};
};
export const ROUTES: IROUTES = {
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
