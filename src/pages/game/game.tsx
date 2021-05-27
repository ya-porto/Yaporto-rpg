import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '../../components/button/index';
import './style.css';
import {store, changeTime} from '../../redux/storeGame';
import {Game as GameCanvas} from '../../components/game/index';

interface IGame {
	time: { min: string, sec: string, id: number | null },
	lvl: number,
	exp: { now: number, max: number }
}
class Game extends React.Component {
	state: Readonly<IGame> = {
		time: {
			min: '00',
			sec: '00',
			id: null
		},
		lvl: 2,
		exp: {
			now: 5,
			max: 10
		}
	};

	componentDidMount() {
		this.timerStart();
	}

	timerStart = () => {
		let timer = setInterval(() => {
			const secNum = (Number(this.state.time.sec) + 1);
			let sec = `${secNum < 10 ? '0' : ''}${secNum.toString()}`;
			let min = this.state.time.min;

			if (Number(this.state.time.sec) === 59) {
				min = (Number(this.state.time.min) + 1).toString();
				sec = '00';
			}

			store.dispatch(changeTime({min: min, sec: sec}));
			this.setState({
				time: {
					min,
					sec,
					id: timer
				}
			});
		}, 1000);
	}

	timerPause = () => {
		if (this.state.time.id) {
			clearInterval(this.state.time.id);
			this.setState({
				time: {
					min: this.state.time.min,
					sec: this.state.time.sec,
					id: null
				}
			});
		}
	}

	getExpPercent = (): string => ((this.state.exp.now * 100) / this.state.exp.max).toString() + '%';

	showShopMenu = () => console.log('Показываем модалку магазина');
	showCharacterMenu = () => console.log('Показываем модалку персонажа');

	render() {
		const {time, lvl} = this.state;
		const prevLvl = lvl - 1;
		const nextLvl = lvl + 1;
		const exp = this.getExpPercent();
		return (
			<div className="page page-game d-flex flex-column justify-start align-center">
				<header className="game-header d-flex justify-space-between align-center px-5">
					<div className="game-header__left d-flex justify-space-between align-center">
						<div className="time mr-4">{`${time.min}:${time.sec}`}</div>
						<div className="lvl d-flex justify-space-between align-center">
							<span className="mr-2">{prevLvl}</span>
							<div className="exp-bar__container">
								<div className="exp-bar pr-2" style={{width: exp}}>{ exp }</div>
							</div>
							<span className="ml-2">{nextLvl}</span>
						</div>
					</div>
					<div className="game-header__right d-flex justify-space-between align-center">
						<Button className="mr-3" onClick={this.timerPause}><i className="fas fa-pause"></i></Button>
						<Link to="/gameshop"><Button className="mr-3" onClick={this.showShopMenu}><i className="fas fa-store-alt"></i></Button></Link>
						<Link to="/profile"><Button onClick={this.showCharacterMenu}><i className="fas fa-user"></i></Button></Link>
					</div>
				</header>
				<div className="game">
					<GameCanvas></GameCanvas>
				</div>
			</div>

		);
	}
}

export {Game};
