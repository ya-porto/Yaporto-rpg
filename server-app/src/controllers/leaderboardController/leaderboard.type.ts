interface ILeaderBoardDataFields {
  name: string,
  avatar: string,
  portoTime: string
}

interface ILeaderBoardData {
  data: ILeaderBoardDataFields
}

interface IAddToLeaderboard extends ILeaderBoardData {
  ratingFieldName?: string
}

interface IGetLeaderboard {
  ratingFieldName?: string,
  cursor: number,
  limit: number
}

export {IAddToLeaderboard, IGetLeaderboard, ILeaderBoardData, ILeaderBoardDataFields};
