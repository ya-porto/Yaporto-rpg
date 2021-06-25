/* eslint-disable camelcase */
import {yaBaseApiUrl} from 'client/constants';
import {http, AxiosError, AxiosResponse} from '../../modules/http';
import {ISigninData, ISignupData, IUserInfoData, IYaOauthData} from './auth.type';

class Controller {
	signup(data: ISignupData) {
		return http.post(`${yaBaseApiUrl}auth/signup`, data)
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	signin(data: ISigninData) {
		return http.post(`${yaBaseApiUrl}auth/signin`, data, {withCredentials: true})
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	getOauthId(redirect_uri: string) {
		return http.get(`${yaBaseApiUrl}oauth/yandex/service-id?redirect_uri=${redirect_uri}`, {withCredentials: true})
			.then((res: AxiosResponse): {service_id: string} => res.data)
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	yaOauth(data: IYaOauthData) {
		return http.post(`${yaBaseApiUrl}oauth/yandex`, data, {withCredentials: true})
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	logout() {
		return http.post(`${yaBaseApiUrl}auth/logout`, {}, {withCredentials: true})
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	getUserInfo() {
		return http.get(`${yaBaseApiUrl}auth/user`, {withCredentials: true})
			.then((res: AxiosResponse): IUserInfoData => res.data)
			.catch((e: AxiosError) => Promise.reject(e));
	}
}

const authController = new Controller();
export {authController, ISigninData, ISignupData, IUserInfoData, IYaOauthData};
