import {http, AxiosError, AxiosResponse} from '../../modules/http';
import {IAddToLeaderboard, IGetLeaderboard, ILeaderBoardData, ILeaderBoardDataFields} from './leaderboard.type';

const baseUrl = 'https://ya-praktikum.tech/api/v2/';
const ratingFieldName = 'portoTime';

class Controller {
	addToLeaderBoard(data: IAddToLeaderboard) {
		return http.post(`${baseUrl}leaderboard`, {...data, ratingFieldName: data.ratingFieldName ? data.ratingFieldName : ratingFieldName}, {withCredentials: true})
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	getLeaderboard(data: IGetLeaderboard) {
		return http.post(`${baseUrl}leaderboard/all`, {...data, ratingFieldName: data.ratingFieldName ? data.ratingFieldName : ratingFieldName}, {withCredentials: true})
			.then((res: AxiosResponse): ILeaderBoardData => res.data)
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}
}

const leaderboardController = new Controller();
export {leaderboardController, IAddToLeaderboard, IGetLeaderboard, ILeaderBoardData, ILeaderBoardDataFields};
