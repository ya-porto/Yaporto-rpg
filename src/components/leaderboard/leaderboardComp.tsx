import React from 'react';
import {ILeaderboardComp} from './leaderboardComp.type';
import {LeaderboardCompItem} from './leaderboardItem/index';
import './style.css';

class LeaderboardComp extends React.Component<ILeaderboardComp> {
	render() {
		const {data} = this.props;
		return (
			<ul className="leaderboard">
				{
					data.map(({name, avatar, score}, i) => {
						return <li className="pointer" key={i}>
							<LeaderboardCompItem
								name={name}
								avatar={avatar}
								score={score}
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
