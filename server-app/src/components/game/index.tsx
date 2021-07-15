import React, { Component } from 'react';
import { GameCanvas } from './canvasGenerate';
import { lvlGenerate } from './lvlgenerate';
import { getDocument } from 'ssr-window';

const document = getDocument();

import { store } from '../../client';
import { setEnemiesAmount } from '../../redux/gameSlice';

import '../App.css';

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
	[list, null, null, null, null, null, null, null, null, null, null, null, list],
	[list, list, null, null, null, null, null, null, null, char4, null, null, list],
	[list, list, list, null, null, null, null, null, null, null, null, null, list],
	[list, list, list, list, list, list, list, list, list, list, list, list, list]
];

let isActive = false;

export class Game extends Component {
	render() {
		return (
			<GameCanvas xPosition={xSize * 13} yPosition={ySize * 8} image={canvasImg} />
		);
	}

	componentDidMount() {
		setTimeout(() => {
			let Characters = lvlGenerate(lvlMatrix, xSize, ySize, 'canvas');
			let enemiesAmount = 0

			for (let key in Characters) {
				if (Object.prototype.hasOwnProperty.call(Characters, key)) {
					const obj = Characters[key];

					obj.addEnemy(Characters.C);
					if (obj.isEnemy) {
						enemiesAmount++
						console.log(enemiesAmount)
					}
				}
			}

			store.dispatch(setEnemiesAmount(enemiesAmount))
			console.log(store.getState())

			document.addEventListener('keydown', (event) => {
				if (!isActive && !store.getState().game.isPause) {
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
					if (!isActive && !store.getState().game.isPause) {
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

