export enum Navigation {
  Main = '/',
  Signin = '/signin',
  Signup = '/signup',
  Profile = '/profile',
  Game = '/game',
  Leaderboard = '/leaderboard'
}

export function getOauthUrlRedirect(serviceId: string, url: string = window.location.origin) {
	return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${url}`;
}
