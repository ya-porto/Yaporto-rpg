import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import {CSSTransition} from 'react-transition-group'

import { changeTime, setTimerId, stopTimer } from '../../redux/gameSlice';
import { Game as GameCanvas } from '../../components/game/index';
import { Button } from '../../components/button/index';
import { RootState } from '../../redux/types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { leaderboardController } from '../../controllers/leaderboardController';
import { Modal } from '../../components/modal';

import './style.css';

interface IGameProps extends RouteComponentProps {
	game: RootState,
	user: RootState,
	dispatch: Dispatch
}
class Game extends React.Component<IGameProps> {
	componentDidMount() {
		this.timerStart();
	}

	timerStart = () => {
		let timer = setInterval(() => {
			const secNum = (Number(this.props.game.time.sec) + 1);
			let sec = `${secNum < 10 ? '0' : ''}${secNum.toString()}`;
			let min = this.props.game.time.min;

			if (Number(this.props.game.time.sec) === 59) {
				min = (Number(this.props.game.time.min) + 1).toString();
				sec = '00';
			}

			this.props.dispatch(changeTime({ min: min, sec: sec }));
			this.props.dispatch(setTimerId(timer))
		}, 1000);
	}

	toggleTimer = () => {
		if (this.props.game.timerId) {
			this.props.dispatch(stopTimer())
		} else {
			this.timerStart()
		}
	}

	getExpPercent = (): string => ((this.props.game.exp.now * 100) / this.props.game.exp.max).toString() + '%';

	showShopMenu = () => console.log('Показываем модалку магазина');
	showCharacterMenu = () => console.log('Показываем модалку персонажа');

	startAgain = () => {
		document.location.reload()
	}

	goHome = () => {
		document.location.href = '/'
	}

	saveAndGoHome = () => {
		const { name, avatar } = this.props.user
		const points = this.getPoints()
		leaderboardController.addToLeaderBoard({ data: { name, avatar, portoTime: points } })
			.then(() => this.goHome())
			.catch((e) => {
				console.log(e);
			})
	}

	getPoints = (): string => {
		const {time} = this.props.game
		const maxPoints = 600000 // == 0 секунд. 0 поинтов >= 10 мин

		let points = maxPoints - (parseInt(time.min) * 60000 + parseInt(time.sec) * 1000)
		return points < 0 ? '0' : points.toString()
	}

	render() {
		const { time, timerId, lvl, isDead, isWin } = this.props.game

		const prevLvl = lvl - 1;
		const nextLvl = lvl + 1;
		const exp = this.getExpPercent();
		return (
			<>
				<CSSTransition in={isDead} timeout={1000} classNames="show-modal">
					<Modal show={isDead}>
						<div className="relative pt-7 text-center">
							<h3 style={{ color: 'red', fontSize: '50px' }}>YOU DIED</h3>
							<Button className="primary mt-5 mr-4" onClick={this.startAgain}>Повторить уровень</Button>
							<Button className="primary mt-5" onClick={this.goHome}>Домой</Button>
						</div>
					</Modal>
				</CSSTransition>

				<CSSTransition in={isWin} timeout={1000} classNames="show-modal">
					<Modal show={isWin}>
						<div className="relative pt-5 text-center">
							<h3>Вы прошли уровень, заработав {this.getPoints()} очков</h3>
							<div className="d-flex flex-column">
								<Button className="primary mt-5 mr-4" onClick={this.startAgain}>Повторить уровень (сброс результата)</Button>
								<Button className="primary mt-5" onClick={this.saveAndGoHome}>Домой (сохранить результат)</Button>
							</div>
						</div>
					</Modal>
					
				</CSSTransition>
				<div className="page-game d-flex flex-column justify-start align-center">
					<header className="game-header d-flex justify-space-between align-center px-5">
						<div className="game-header__left d-flex justify-space-between align-center">
							<div className="time mr-4">{`${time.min}:${time.sec}`}</div>
							<div className="lvl d-flex justify-space-between align-center">
								<span className="mr-2">{prevLvl}</span>
								<div className="exp-bar__container">
									<div className="exp-bar pr-2" style={{ width: exp }}>{exp}</div>
								</div>
								<span className="ml-2">{nextLvl}</span>
							</div>
						</div>
						<div className="game-header__right d-flex justify-space-between align-center">
							<Button className="mr-3" onClick={this.toggleTimer}><i className={`fas fa-${timerId ? 'pause' : 'play'}`}></i></Button>
							<Link to="/gameshop"><Button className="mr-3" onClick={this.showShopMenu}><i className="fas fa-store-alt"></i></Button></Link>
							<Link to="/profile"><Button onClick={this.showCharacterMenu}><i className="fas fa-user"></i></Button></Link>
						</div>
					</header>
					<div className="game">
						<GameCanvas />
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state: RootState) => ({
	game: state.game,
	user: state.user
});

export default connect(mapStateToProps)(Game);
