import {Navigation} from './constants'

enum ENUMROUTES {
	MAIN,
	PROFILE,
	SIGNIN,
	SIGNUP,
	GAME,
	FORUM,
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
		INDEX: Navigation.Main
	},
	PROFILE: {
		NAME: 'Профиль',
		INDEX: Navigation.Profile,
		AUTH: true
	},
	SIGNIN: {
		NAME: 'Войти',
		INDEX: Navigation.Signin,
		AUTH: false
	},
	SIGNUP: {
		NAME: 'Регистрация',
		INDEX: Navigation.Signup,
		AUTH: false
	},
	GAME: {
		NAME: 'Играть',
		INDEX: Navigation.Game,
		AUTH: true
	},
	FORUM: {
		NAME: 'Форум',
		INDEX: Navigation.Forum,
		AUTH: true
	},
	LEADERBOARD: {
		NAME: 'Лидерборд',
		INDEX: Navigation.Leaderboard,
		AUTH: true
	},
};
