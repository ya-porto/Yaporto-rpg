import {ILeaderboardCompItem} from './leaderboardItem/index';

interface ILeaderboardComp {
  leaderboardData: {
    data: ILeaderboardCompItem
  }[]
}

export {ILeaderboardComp};
