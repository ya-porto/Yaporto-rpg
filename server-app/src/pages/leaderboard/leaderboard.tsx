import React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {leaderboardController} from '../../controllers/leaderboardController';
import {RootState} from '../../redux/types';
import {LeaderboardComp, ILeaderboardComp} from '../../components/leaderboard';
import {Menu} from '../../components/menu/menu';

import './style.css';

interface ILeadreboard extends ILeaderboardComp {
	lightTheme: boolean;
}

interface LeaderboardProps {
	user: RootState;
	dispatch: Dispatch;
}
class Leaderboard extends React.Component<LeaderboardProps> {
	state: ILeadreboard = {
		lightTheme: true,
		leaderboardData: [],
	};

	componentDidMount() {
		leaderboardController.getLeaderboard({cursor: 0, limit: 50})
			.then(data => {
				this.setState({leaderboardData: data});
			})
			.catch(e => {
				console.log(e);
			});
	}

	render() {
		const {leaderboardData} = this.state;
		return (
			
			<div className={this.props.user.lightTheme ? 'page page-leaderboard d-flex flex-column justify-center align-center' : 'page_dark page-leaderboard d-flex flex-column justify-center align-center'}>
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
