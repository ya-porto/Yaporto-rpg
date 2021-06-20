import React from 'react';
import {ILeaderboardCompItem} from './leaderboardCompItem.type';

class LeaderboardCompItem extends React.Component<ILeaderboardCompItem> {
	render() {
		const {name, avatar, portoTime, place} = this.props;
		const isPrizePlace = place && place < 4;

		return (
			<div className="leaderboard-item d-flex justify-start align-center mt-2 pa-2 py-3">
				<div className="leaderboard-item__avatar">
					<img src={avatar} alt="User avatar" draggable="false" />
					{
						isPrizePlace ? <i className={`fas fa-crown prize prize_${place}`}></i> : null
					}
				</div>
				<div className="leaderboard-item__text d-flex flex-column align-item-left ml-3">
					<span className="name">{name}</span>
					<span className="score">Time: {portoTime}</span>
				</div>
				<div className="leaderboard-item__info align-self-end">
					Rank {place}
				</div>
			</div>
		);
	}
}

export {LeaderboardCompItem};
