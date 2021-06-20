import {ILeaderBoardDataFields} from '../../../controllers/leaderboardController';

interface ILeaderboardCompItem extends ILeaderBoardDataFields {
  place?: number
}

export {ILeaderboardCompItem};
