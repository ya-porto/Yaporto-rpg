import {threadMocks} from '../../_mocks/forumMocks';
import { ThreadProps, ToggleLikeCommentProps, CreateThreadProps, CreateCommentProps } from './forum.type';

class Controller {
	async getAllThreads(): Promise<ThreadProps[]> {
		await setTimeout(() => {
			console.log('getting data');
		}, 1);
		return threadMocks;
	}

	async getThreadById(id: number): Promise<ThreadProps | undefined> {
		await setTimeout(() => {
			console.log('getting data');
		}, 1);
		return threadMocks.find(x => x.id === id);
	}

	async toggleLikeComment(data: ToggleLikeCommentProps) {
		console.log(data);
	}

	async createThread(data: CreateThreadProps) {
		console.log(data);
	}

	async createComment(data: CreateCommentProps) {
		console.log(data);
	}
}

const forumController = new Controller();
export {forumController};
