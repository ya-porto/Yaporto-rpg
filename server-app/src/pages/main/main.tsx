import {authController} from 'controllers/auth';
import React from 'react';
import {parseQueryString} from 'utils/parseQueryString';
import {LeaderboardComp, ILeaderboardComp} from '../../components/leaderboard';
import {Menu} from '../../components/menu/menu';
import {leaderboardController} from '../../controllers/leaderboardController';
import './style.css';

class Main extends React.Component {
	state: Readonly<ILeaderboardComp> = {
		leaderboardData: []
	};

	componentDidMount() {
		this.getLeaderboardData();
		this.continueOauth();
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

	continueOauth = () => {
		const searchParams = window.location.search;
		if (searchParams !== '') {
			const params = parseQueryString(searchParams.substring(1));

			if (params.code) {
				// eslint-disable-next-line camelcase
				authController.yaOauth({code: params.code, redirect_uri: window.location.origin})
					.then(() => {
						// eslint-disable-next-line no-warning-comments
						// TODO нужно выводить оповещалку, что залогинился (или не нужно)
						console.log('Done');
					})
					.catch(e => {
						console.log(e);
					});
			}
		}
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
						<LeaderboardComp leaderboardData={leaderboardData}></LeaderboardComp>
					</div>
				</div>
			</div>
		);
	}
}

export {Main};
