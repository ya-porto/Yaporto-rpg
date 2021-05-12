import React from 'react';
import {LeaderboardComp} from '../../components/leaderboard/index';
import {ILeaderboardCompItem} from '../../components/leaderboard/leaderboardItem/index';
import {mocks} from '../leaderboard/mocks';
import {Menu} from '../../components/menu/menu';
import './style.css';


interface IMain {
	
	data: ILeaderboardCompItem[]
}
class Main extends React.Component {
	state: Readonly<IMain> = {
		data: mocks
	};

	render() {
		const {data} = this.state;
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
						<LeaderboardComp data={data}></LeaderboardComp>
					</div>
				</div>
			</div>			
		);
	}
}

export {Main};
