import {http, AxiosError, AxiosResponse} from '../../modules/http';
import {serverUrl} from '../../utils/baseUrls';
import {restEndpoints} from '../../utils/restEndpoints';
import {threadMocks} from '../../_mocks/forumMocks';
import { ThreadProps } from './forum.type';

class Controller {
	async getAllThreads() {
		return http.get(`${serverUrl}${restEndpoints.getALlThreads}`)
			.then((res: AxiosResponse) => res.data)
			.catch((e: AxiosError) => Promise.reject(e));
	}

	async getThreadById(id: number, user_id: number) {
		return http.get(`${serverUrl}${restEndpoints.forumThread}?id=${id}&user_id=${user_id}`)
			.then((res: AxiosResponse) => res.data)
			.catch((e: AxiosError) => Promise.reject(e));
	}

	async postThread(data: {}) {
		return http.post(`${serverUrl}${restEndpoints.forumThread}`, data)
			.catch((e: AxiosError) => Promise.reject(e));
	}

	async postComment(data: {}) {
		return http.post(`${serverUrl}${restEndpoints.forumComment}`, data)
			.catch((e: AxiosError) => Promise.reject(e));
	}

	async postLike(data: {}) {
		return http.post(`${serverUrl}${restEndpoints.forumLike}`, data)
			.catch((e: AxiosError) => Promise.reject(e));
	}
}

const forumController = new Controller();
export {forumController};
