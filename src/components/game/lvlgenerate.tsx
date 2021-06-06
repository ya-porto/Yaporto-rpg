import {Character} from './character';
import {charDie} from './deathSprite';
import {charAttack} from './attackSprite';
import {objPersonaj} from './game.objPersonaj';
import {getDocument} from 'ssr-window';
const document = getDocument();

const picturePadding: number = 7;

const sprite1 = document.createElement('img');
sprite1.src = '/images/sprite1.png';
sprite1.width = 90;
sprite1.height = 70;

const charImg = document.createElement('img');
charImg.src = '/images/golem/Attack/Golem_01.png';
charImg.width = 90;
charImg.height = 90;

export const lvlGenerate = (mass: Array<Array<objPersonaj | null>>, xSize: number, ySize: number, canvasId: string): object => {
	const canv = document.getElementById(canvasId) as HTMLCanvasElement;
	const obj = {};
	const ctx = canv.getContext('2d');
	for (let i = 0; i < mass.length; i++) {
		for (let j = 0; j < mass[i].length; j++) {
			let a = mass[i][j];
			if (a !== null) {
				if (a.type === '*' && ctx) {
					ctx.beginPath();
					ctx.drawImage(sprite1, j * xSize, (i * ySize) + picturePadding, sprite1.width, sprite1.height);
					ctx.closePath();
				} else if (a.hp && a.armor && a.attack) {
					let bool = a.type !== 'C';
					obj[a.type] = new Character(xSize * j, ySize * i, charImg, 'canvas', charAttack, charDie, parseInt(a.hp), parseInt(a.attack), parseInt(a.armor), mass, xSize, ySize, bool);
				}
			}
		}
	}

	return obj;
};
