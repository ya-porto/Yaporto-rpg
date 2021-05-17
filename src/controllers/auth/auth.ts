import {http, AxiosError, AxiosResponse} from '../../modules/http';
import {ISigninData, ISignupData, IUserInfoData} from './auth.type';

const baseUrl = 'https://ya-praktikum.tech/api/v2/';

class Controller {
	signup(data: ISignupData) {
		return http.post(`${baseUrl}auth/signup`, data)
			.then(() => null)
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	signin(data: ISigninData) {
		return http.post(`${baseUrl}auth/signin`, data, {withCredentials: true})
			.then(() => null)
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	logout() {
		return http.post(`${baseUrl}auth/logout`, {}, {withCredentials: true})
			.then(() => null)
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	getUserInfo() {
		return http.get(`${baseUrl}auth/user`, {withCredentials: true})
			.then((res: AxiosResponse): IUserInfoData => res.data)
			.catch((e: AxiosError) => Promise.reject(e));
	}
}

const authController = new Controller();
export {authController, ISigninData, ISignupData, IUserInfoData};
