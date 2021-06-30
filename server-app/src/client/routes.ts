import {Navigation} from './constants'

export const ROUTES = {
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
		INDEX: Navigation.Game,
		AUTH: true
	},
	LEADERBOARD: {
		NAME: 'Лидерборд',
		INDEX: Navigation.Leaderboard,
		AUTH: true
	},
};
