import React from 'react';
import {ILeaderboardComp} from './leaderboardComp.type';
import {LeaderboardCompItem} from './leaderboardItem/index';
import './style.css';

class LeaderboardComp extends React.Component<ILeaderboardComp> {
	state = {
		sortedData: this.props.data.sort((a, b) => parseInt(b.score) - parseInt(a.score))
	}

	render() {
		const {sortedData} = this.state;
		return (
			<ul className="leaderboard">
				{
					sortedData.map(({name, avatar, score}, i) => {
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
