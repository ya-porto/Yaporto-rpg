import React, {Component} from 'react';
import {GameCanvas} from './canvasGenerate';
import {lvlGenerate} from './lvlgenerate';
import { getDocument } from 'ssr-window';

const document = getDocument();

import '../App.css';
import { store } from '../../client';
import { setEnemiesAmount, toggleModalDeath } from '../../redux/gameSlice';
import { Modal } from '../modal';
import { Button } from '../button';
import { leaderboardController } from '../../controllers/leaderboardController';
import {CSSTransition} from 'react-transition-group'

const MOVEDELAY = 300;
const ATTACKDELAY = 800;
const xSize = 90;
const ySize = 90;

const canvasImg = document.createElement('img');
canvasImg.src = '/images/bg.jpeg';

const char1 = {
	type: 'C',
	hp: '100',
	attack: '10',
	armor: '0'
};
const char2 = {
	type: 'E',
	hp: '100',
	attack: '10',
	armor: '0'
};
const char3 = {
	type: 'E1',
	hp: '100',
	attack: '10',
	armor: '0'
};
const char4 = {
	type: 'E2',
	hp: '100',
	attack: '10',
	armor: '0'
};

const list = {
	type: '*'
};

const lvlMatrix = [
	[list, list, list, list, list, list, list, list, list, list, list, list, list],
	[list, list, list, list, list, null, null, null, null, null, null, null, list],
	[list, char1, null, null, null, null, null, null, null, null, null, null, list],
	[list, null, null, null, null, null, null, null, null, null, null, null, list],
	[list, null, null, null, null, char2, null, null, null, null, null, null, list],
	[list, list, null, char3, null, null, null, null, null, char4, null, null, list],
	[list, list, list, null, null, null, null, null, null, null, null, null, list],
	[list, list, list, list, list, list, list, list, list, list, list, list, list]
];

let isActive = false;

export class Game extends Component {
	state = {
		isModalDeathShown: false,
		isModalWinShown: false,
		isPause: false
	}

	toggleModalDeathState = () => {
		this.setState({ isModalDeathShown: this.state.isModalDeathShown })
		store.dispatch(toggleModalDeath(this.state.isModalDeathShown))
	}

	startAgain = () => {
		document.location.reload()
	}

	goHome = () => {
		document.location.href = '/'
	}

	saveAndGoHome = () => {
		const { name, avatar } = store.getState().user
		const points = this.getPoints()
		leaderboardController.addToLeaderBoard({ data: { name, avatar, portoTime: points } })
			.then(() => this.goHome())
			.catch((e) => {
				console.log(e);
			})
	}

	getPoints = (): string => {
		const { time } = store.getState().game
		const maxPoints = 600000 // == 0 секунд. 0 поинтов >= 10 мин

		let points = maxPoints - (parseInt(time.min) * 60000 + parseInt(time.sec) * 1000)
		return points < 0 ? '0' : points.toString()
	}

	render() {
		const {isModalDeathShown,isModalWinShown} = this.state
		return (
			<>
				<CSSTransition in={isModalDeathShown} timeout={1000} classNames="show-modal">
					<Modal show={isModalDeathShown}>
						<div className="relative pt-7 text-center">
							<h3 style={{color: 'red', fontSize: '50px'}}>YOU DIED</h3>
							<Button className="primary mt-5 mr-4" onClick={this.startAgain}>Повторить уровень</Button>
							<Button className="primary mt-5" onClick={this.goHome}>Домой</Button>
						</div>
					</Modal>
				</CSSTransition>
				
				<CSSTransition in={isModalWinShown} timeout={1000} classNames="show-modal">
					<Modal show={isModalWinShown}>
						<div className="relative pt-5 text-center">
							<h3>Вы прошли уровень, заработав {this.getPoints()} очков</h3>
							<div className="d-flex flex-column">
								<Button className="primary mt-5 mr-4" onClick={this.startAgain}>Повторить уровень (сброс результата)</Button>
								<Button className="primary mt-5" onClick={this.saveAndGoHome}>Домой (сохранить результат)</Button>
							</div>
						</div>
					</Modal>
				</CSSTransition>
				<GameCanvas xPosition={xSize * 13} yPosition={ySize * 8} image={canvasImg} />
			</>
		);
	}

	componentDidMount() {
		store.subscribe(() => {
			const { timerId, isModalDeathShown, isModalWinShown } = store.getState().game
			const isPause = timerId === null

			if (isPause !== this.state.isPause) {
				this.setState({isPause})
			}

			if (isModalDeathShown !== this.state.isModalDeathShown) {
				this.setState({isModalDeathShown})
			}
			if (isModalWinShown !== this.state.isModalWinShown) {
				this.setState({isModalWinShown})
			}
		})

		setTimeout(() => {			
			let Characters = lvlGenerate(lvlMatrix, xSize, ySize, 'canvas');
			let enemiesAmount = 0

			for (let key in Characters) {
				if (Object.prototype.hasOwnProperty.call(Characters, key)) {
					const obj = Characters[key];

					obj.addEnemy(Characters.C);
					if (obj.isEnemy) {
						enemiesAmount++
					}
				}
			}

			store.dispatch(setEnemiesAmount(enemiesAmount))

			document.addEventListener('keydown', (event) => {
				if (!isActive && !this.state.isPause) {
					isActive = true;
					switch (event.code) {
					case 'ArrowUp':
					case 'KeyW':
						Characters.C.moveCharacter('up');
						setTimeout(() => {
							isActive = false;
						}, MOVEDELAY);
						break;

					case 'ArrowDown':
					case 'KeyS':
						Characters.C.moveCharacter('down');
						setTimeout(() => {
							isActive = false;
						}, MOVEDELAY);
						break;

					case 'ArrowRight':
					case 'KeyD':
						Characters.C.moveCharacter('right');
						setTimeout(() => {
							isActive = false;
						}, MOVEDELAY);
						break;

					case 'ArrowLeft':
					case 'KeyA':
						Characters.C.moveCharacter('left');
						setTimeout(() => {
							isActive = false;
						}, MOVEDELAY);
						break;

					default:
						setTimeout(() => {
							isActive = false;
						}, MOVEDELAY);
						break;
					}
				}
			});

			let canvasListen = document.getElementById('canvas');
			if (canvasListen) {
				canvasListen.addEventListener('mousedown', (event) => {
					if (!isActive && !this.state.isPause) {
						isActive = true;
						let time = performance.now();
						setTimeout(() => {
							isActive = false;
						}, ATTACKDELAY);
						Characters.C.attackCharacter(time, 500, Math.floor(event.offsetY / ySize), Math.floor(event.offsetX / xSize), Characters);
					}
				});
			}
		}, 200);
	}
}

