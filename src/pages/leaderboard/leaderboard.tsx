import React from 'react';
import {LeaderboardComp} from '../../components/leaderboard/index';
import {ILeaderboardCompItem} from '../../components/leaderboard/leaderboardItem/index';
import {ErrorBoundary} from '../../components/errorBoundary/errorBoundary';
import {mocks} from './mocks';
import './style.css';

interface ILeaderboard {
	data: ILeaderboardCompItem[]
}
class Leaderboard extends React.Component {
	state: Readonly<ILeaderboard> = {
		data: mocks
	};

	render() {
		const {data} = this.state;
		return (
			<ErrorBoundary>
			<div className="page page-leaderboard d-flex flex-column justify-center align-center">
				<div className="card shadow d-flex flex-column justify-start align-center px-10 py-8">
					<h3 className="title mt-5">Leaderboard</h3>
					<LeaderboardComp data={data} />
				</div>
			</div>
			</ErrorBoundary>
			
		);
	}
}

export {Leaderboard};
