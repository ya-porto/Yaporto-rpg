import {http, AxiosError} from '../../modules/http';
import {IChangeUserInfo, IChangePassword} from './user.type';

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
}

const userController = new Controller();
export {userController, IChangePassword, IChangeUserInfo};
