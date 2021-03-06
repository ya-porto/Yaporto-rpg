
import {http, AxiosError, AxiosResponse} from '../../modules/http';
import {IChangeUserInfo, IChangePassword} from './user.type';
import {serverUrl, yaBaseApiUrl} from '../../utils/baseUrls';
import {restEndpoints} from '../../utils/restEndpoints';

class Controller {
	changePassword(data: IChangePassword) {
		return http.put(`${yaBaseApiUrl}user/password`, data, {withCredentials: true})
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	changeUserInfo(data: IChangeUserInfo) {
		return http.put(`${yaBaseApiUrl}user/profile`, data, {withCredentials: true})
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	changeAvatar(data: FormData) {
		return http.put(`${yaBaseApiUrl}user/profile/avatar`, data, {withCredentials: true})
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	changeTheme(data: {}) {
		return http.post(`${serverUrl}${restEndpoints.changeTheme}`, data)
			.catch((e: AxiosError) => Promise.reject(e));
	}

	setTheme(data: {}) {
		return http.put(`${serverUrl}${restEndpoints.changeTheme}`, data)
			.catch((e: AxiosError) => Promise.reject(e));
	}

	getAllThemes() {
		return http.get(`${serverUrl}${restEndpoints.getAllThemes}`)
			.then((res: AxiosResponse) => res.data)
			.catch((e: AxiosError) => Promise.reject(e));
	}

	getUserTheme(id: number) {
		return http.get(`${serverUrl}${restEndpoints.getUserTheme}id=${id}`)
			.then((res: AxiosResponse) => res.data)
			.catch((e: AxiosError) => Promise.reject(e));
	}

	setUserInfo(data: {}) {
		return http.post(`${serverUrl}${restEndpoints.userInfo}`, data)
			.catch((e: AxiosError) => Promise.reject(e));
	}
}

const userController = new Controller();
export {userController, IChangePassword, IChangeUserInfo};
