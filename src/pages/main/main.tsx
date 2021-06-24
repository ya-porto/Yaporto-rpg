import React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {RootState} from '../../redux/types';
import {authController} from '../../controllers/auth';
import {parseQueryString} from '../../utils/parseQueryString';
import {Menu} from '../../components/menu/menu';
import {leaderboardController} from '../../controllers/leaderboardController';
import './style.css';


interface MainProps {
	user: RootState;
	dispatch: Dispatch;
}
class Main extends React.Component<MainProps> {

	componentDidMount() {
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
		return (
			
			<div className={this.props.user.lightTheme ? 'page page-main d-flex justify-center' : 'page_dark page-main d-flex justify-center'}>
				<Menu />
				<div className="card_big container d-flex flex-column align-center justify-center">
						<p>Здесь будет невероятное описание нашей фантастически крутой (нет) игры</p>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: RootState) => ({
	user: state.user
});

export default connect(mapStateToProps)(Main);
