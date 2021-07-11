import React from 'react';
import {ILeaderboardComp} from './leaderboardComp.type';
import {LeaderboardCompItem} from './leaderboardItem/index';
import './style.css';

class LeaderboardComp extends React.Component<ILeaderboardComp> {
	render() {
		const {leaderboardData} = this.props;
		return (
			<ul className="leaderboard">
				{
					leaderboardData.map((item, i) => {
						return <li className="pointer" key={i}>
							<LeaderboardCompItem
								name={item.data.name}
								avatar={item.data.avatar}
								portoTime={item.data.portoTime}
								place={i + 1}
							/>
						</li>;
					})
				}
			</ul>
		);
	}
}

export {LeaderboardComp};
