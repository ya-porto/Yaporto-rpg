import React from 'react';
import {LeaderboardComp} from '../../components/leaderboard/index';
import {ILeaderboardCompItem} from '../../components/leaderboard/leaderboardItem/index';
import {Menu} from '../../components/menu/menu';
import {leaderboardController} from '../../controllers/leaderboard';
import './style.css';

interface IMain {
	leaderboardData: {
		data: ILeaderboardCompItem
	}[]
}
class Main extends React.Component {
	state: Readonly<IMain> = {
		leaderboardData: []
	};

	componentDidMount() {
		this.getLeaderboardData();
	}

	getLeaderboardData = () => {
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
			<div className="page page-main d-flex justify-center">
				<Menu />
				<div className="container d-flex justify-center">
					<div className="left pa-2 d-flex flex-column">

						<div className="info mt-5">
							<p>Здесь будет невероятное описание нашей фантастически крутой (нет) игры</p>
						</div>
					</div>
					<div className="right pa-2">
						<h2>Leaderboard</h2>
						<LeaderboardComp data={leaderboardData}></LeaderboardComp>
					</div>
				</div>
			</div>
		);
	}
}

export {Main};
