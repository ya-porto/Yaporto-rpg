import {http, AxiosError, AxiosResponse} from '../../modules/http';
import {yaBaseApiUrl} from '../../utils/baseUrls';
import {IAddToLeaderboard, IGetLeaderboard, ILeaderBoardData, ILeaderBoardDataFields} from './leaderboard.type';

const ratingFieldName = 'portoTime';

class Controller {
	addToLeaderBoard(data: IAddToLeaderboard) {
		return http.post(`${yaBaseApiUrl}leaderboard`, {...data, ratingFieldName: data.ratingFieldName ? data.ratingFieldName : ratingFieldName}, {withCredentials: true})
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}

	getLeaderboard(data: IGetLeaderboard) {
		return http.post(`${yaBaseApiUrl}leaderboard/all`, {...data, ratingFieldName: data.ratingFieldName ? data.ratingFieldName : ratingFieldName}, {withCredentials: true})
			.then((res: AxiosResponse): ILeaderBoardData => res.data)
			.catch((e: AxiosError) => Promise.reject(e.response?.data.reason));
	}
}

const leaderboardController = new Controller();
export {leaderboardController, IAddToLeaderboard, IGetLeaderboard, ILeaderBoardData, ILeaderBoardDataFields};
