import {ILeaderBoardDataFields} from '../../../controllers/leaderboard';

interface ILeaderboardCompItem extends ILeaderBoardDataFields {
  place?: number
}

export {ILeaderboardCompItem};
