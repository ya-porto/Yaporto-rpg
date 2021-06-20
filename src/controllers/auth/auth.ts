/* eslint-disable camelcase */
import {http, AxiosError, AxiosResponse} from '../../modules/http';
import {ISigninData, ISignupData, IUserInfoData, IYaOauthData} from './auth.type';

const baseUrl = 'https://ya-praktikum.tech/api/v2/';

class Controller {
	signup(data: ISignupData) {
		return http.post(`${baseUrl}auth/signup`, data)
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	signin(data: ISigninData) {
		return http.post(`${baseUrl}auth/signin`, data, {withCredentials: true})
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	getOauthId(redirect_uri: string) {
		return http.get(`${baseUrl}oauth/yandex/service-id?redirect_uri=${redirect_uri}`, {withCredentials: true})
			.then((res: AxiosResponse): {service_id: string} => res.data)
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	yaOauth(data: IYaOauthData) {
		return http.post(`${baseUrl}oauth/yandex`, data, {withCredentials: true})
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	logout() {
		return http.post(`${baseUrl}auth/logout`, {}, {withCredentials: true})
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	// Убрать
	getUserInfo() {
		return http.get(`${baseUrl}auth/user`, {withCredentials: true})
			.then((res: AxiosResponse): IUserInfoData => res.data)
			.catch((e: AxiosError) => Promise.reject(e));
	}
}

const authController = new Controller();
export {authController, ISigninData, ISignupData, IUserInfoData, IYaOauthData};
