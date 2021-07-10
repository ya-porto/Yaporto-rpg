import {http, AxiosError, AxiosResponse} from '../../modules/http';
import {serverUrl} from '../../utils/baseUrls';
import {restEndpoints} from '../../utils/restEndpoints';
import {threadMocks} from '../../_mocks/forumMocks';
import { ThreadProps } from './forum.type';

class Controller {
	async getAllThreads() {
		return http.get(`${serverUrl}${restEndpoints.forumThread}`)
			.then((res: AxiosResponse) => res.data)
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	async getThreadById(id: number): Promise<ThreadProps | undefined> {
		await setTimeout(() => {
			console.log('getting data');
		}, 1);
		return threadMocks.find(x => x.id === id);
	}

	async postThread(data: {}) {
		return http.post(`${serverUrl}${restEndpoints.forumThread}`, data)
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	async postComment(data: {}) {
		return http.post(`${serverUrl}${restEndpoints.forumComment}`, data)
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	async postLike(data: {}) {
		return http.post(`${serverUrl}${restEndpoints.forumLike}`, data)
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}
}

const forumController = new Controller();
export {forumController};
