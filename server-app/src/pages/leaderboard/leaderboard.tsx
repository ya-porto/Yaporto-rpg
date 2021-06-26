import React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {RootState} from '../../redux/types';
import {LeaderboardComp, ILeaderboardComp} from '../../components/leaderboard';
import {Menu} from '../../components/menu/menu';

import './style.css';

interface LeaderboardProps {
	user: RootState;
	dispatch: Dispatch;
}
class Leaderboard extends React.Component<LeaderboardProps> {
	state: ILeaderboardComp = {
		leaderboardData: [],
	};


	render() {
		const {leaderboardData} = this.state;
		return (
			
			<div className={`${this.props.user.theme} page page-leaderboard d-flex flex-column justify-center align-center`}>
				<Menu />
				<div className="card shadow d-flex flex-column justify-start align-center px-10 py-8">
					<h1 className="title mt-5">Leaderboard</h1>
					<LeaderboardComp leaderboardData={leaderboardData} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: RootState) => ({
	user: state.user
});

export default connect(mapStateToProps)(Leaderboard);
