
import {http, AxiosError} from '../../modules/http';
import {IChangeUserInfo, IChangePassword} from './user.type';
import {serverUrl} from '../../utils/baseUrls';
import {restEndpoints} from '../../utils/restEndpoints';

const baseUrl = 'https://ya-praktikum.tech/api/v2/';

class Controller {
	changePassword(data: IChangePassword) {
		return http.put(`${baseUrl}user/password`, data, {withCredentials: true})
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	changeUserInfo(data: IChangeUserInfo) {
		return http.put(`${baseUrl}user/profile`, data, {withCredentials: true})
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	changeAvatar(data: FormData) {
		return http.put(`${baseUrl}user/profile/avatar`, data, {withCredentials: true})
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	changeTheme(data: {}) {
		return http.put(`${serverUrl}${restEndpoints.changeTheme}`, data)
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}
}

const userController = new Controller();
export {userController, IChangePassword, IChangeUserInfo};
