import React from 'react';
import {LeaderboardComp, ILeaderboardComp} from '../../components/leaderboard';
import {Menu} from '../../components/menu/menu';
import './style.css';
import {leaderboardController} from '../../controllers/leaderboardController';

class Leaderboard extends React.Component {
	state: Readonly<ILeaderboardComp> = {
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
			
			<div className='page page-leaderboard d-flex flex-column justify-center align-center'>
				<Menu />
				<div className="card shadow d-flex flex-column justify-start align-center px-10 py-8">
					<h1 className="title mt-5">Leaderboard</h1>
					<LeaderboardComp leaderboardData={leaderboardData} />
				</div>
			</div>
		);
	}
}

export {Leaderboard};
