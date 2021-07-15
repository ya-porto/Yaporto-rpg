
import {isCross} from './isCross';
import {isEnemyCross} from './isEnemyCross';
import {NumberAnimate} from './numberAnimate';
import {objPersonaj} from './game.objPersonaj';
import {getDocument} from 'ssr-window';
import { store } from '../../client';
import {changeCurrentHp} from '../../redux/characterSlice';
import { decrimentEnemiesAmount, setDeath, setWin, stopTimer } from '../../redux/gameSlice';
const document = getDocument();

export class Character {
	ctx: CanvasRenderingContext2D | null;
	image: HTMLImageElement;
	prevX: number;
	prevY: number;
	attackMass: Array<HTMLImageElement>;
	attackFrame: number;
	startTime: number;
	animationTime: number;
	attackId: number;
	hp: number;
	attack: number;
	armor: number;
	deathMass: Array<HTMLImageElement>;
	xSize: number;
	ySize: number;
	canvasMatrix: Array<Array<objPersonaj | null>>;
	xPosition: number;
	yPosition: number;
	isDead: boolean;
	numberId: number;
	isEnemy: boolean;
	enemy: Character;
	attackInterval: number;

	constructor(startX: number, startY: number, image: HTMLImageElement, canvasId: string, attackMass: Array<HTMLImageElement>,
		deathMass: Array<HTMLImageElement> = [], hp: number = 100, attack: number = 10, armor: number = 0, canvasMatrix: Array<Array<objPersonaj | null>>,
		xSize: number, ySize: number, isEnemy: boolean) {
		this.isDead = false;
		this.canvasMatrix = canvasMatrix;
		this.xSize = xSize;
		this.ySize = ySize;
		this.deathMass = deathMass;
		this.isEnemy = isEnemy;
		this.attackFrame = 0;
		const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
		if (canvas) {
			this.ctx = canvas.getContext('2d');
		}

		this.attackMass = attackMass;
		this.image = image;
		this.prevX = startX;
		this.prevY = startY;
		this.yPosition = this.prevY / this.ySize;
		this.xPosition = this.prevX / this.xSize;

		if(!isEnemy){
			this.attack = store.getState().character.startedDps;
			this.armor = store.getState().character.startedArmor;
			this.hp = store.getState().character.startedHp;
		}else{
			this.attack = attack;
			this.armor = armor;
			this.hp = hp;
		}

		store.subscribe(() => {
			if(!isEnemy){
				this.attack = store.getState().character.startedDps;
				this.armor = store.getState().character.startedArmor;
				this.hp = store.getState().character.startedHp;
			}
	
		})

		setTimeout(() => {
			if (this.ctx) {
				this.ctx.beginPath();
				this.ctx.fillStyle = '#FFF';
				this.ctx.strokeStyle = '#FFF';
				this.ctx.strokeText(this.hp.toString(), startX + 25, startY + 10);
				this.ctx.drawImage(image, startX, startY, this.image.width, this.image.height);
				this.ctx.closePath();
			}
		}, 10);
	}

	addEnemy(obj: Character) {
		this.enemy = obj;

		if (this.isEnemy) {
			this.attackHero();
		}
	}

	updateCharacter(hp: number = this.hp, attack: number = this.attack, armor: number = this.armor) {
		this.hp = hp;
		this.attack = attack;
		this.armor = armor;
	}

	getPosition() {
		return [this.yPosition, this.xPosition];
	}

	getParams() {
		return {
			hp: this.hp,
			attack: this.attack,
			armor: this.armor
		};
	}

	getDamage(dmg: number) {
		this.hp -= (dmg - this.armor);
		if(!this.isEnemy){
			store.dispatch(changeCurrentHp(this.hp))
		}

		if (this.hp <= 0) {
			if (!this.isDead) {
				this.isDead = true;
				this.hp = 0;
				let time = performance.now();
				this.deathCharacter(time, 400);
				
				if (this.isEnemy) {
					store.dispatch(decrimentEnemiesAmount())
					if (store.getState().game.enemiesAmount <= 0) {
						store.dispatch(stopTimer())
						store.dispatch(setWin())
					}
				} else {
					store.dispatch(stopTimer())
					store.dispatch(setDeath())
				}
			}

			return;
		}

		if (this.ctx) {
			this.ctx.beginPath();
			this.ctx.clearRect(this.prevX, this.prevY, this.image.width, this.image.height);
			this.ctx.strokeText(this.hp.toString(), this.prevX + 25, this.prevY + 10);
			this.ctx.drawImage(this.attackMass[this.attackFrame], this.prevX, this.prevY, this.image.width, this.image.height);
			this.ctx.closePath();
		}
	}

	deathCharacter(startTime: number, animationTime: number) {
		this.startTime = startTime;
		this.animationTime = animationTime;
		this.attackId = window.setInterval(() => {
			this.deathAnimate();
		}, animationTime / (this.deathMass.length - 2));
	}

	deathAnimate() {
		if (this.ctx) {
			this.ctx.beginPath();
			this.ctx.clearRect(this.prevX, this.prevY, this.image.width, this.image.height);
			const time = performance.now();
			const shiftTime = time - this.startTime;
			const multiply = shiftTime / this.animationTime;
			this.ctx.drawImage(this.deathMass[this.attackFrame], this.prevX, this.prevY, this.image.width, this.image.height);
			this.ctx.closePath();

			if (multiply < 1) {
				this.attackFrame++;
			} else {
				clearInterval(this.attackId);
				clearInterval(this.attackInterval);
				this.attackFrame = 0;
			}
		}
	}

	attackHero() {
		this.attackInterval = window.setInterval(() => {
			if (!this.isDead && !store.getState().game.isPause) {
				let char = isEnemyCross(this.getPosition(), this.canvasMatrix);
				if (char) {
					this.startTime = performance.now();
					this.animationTime = 500;
					this.attackId = window.setInterval(() => {
						this.attackAnimate();
					}, this.animationTime / (this.attackMass.length - 1));
					setTimeout(() => {
						this.enemy.getDamage(this.getParams().attack);
						new NumberAnimate(this.enemy.getPosition()[1] * this.xSize, this.enemy.getPosition()[0] * this.ySize, this.getParams().attack, 'canvas', 600, 70, 60);
					}, 600);
				}
			}
		}, 2000);
	}

	moveCharacter(direction: string, images: HTMLImageElement | null = null) {
		if (!this.isDead) {
			if (this.ctx) {
				let clearX = this.prevX;
				let clearY = this.prevY;

				switch (direction) {
				case 'up':
					this.prevY -= this.ySize;
					break;

				case 'down':
					this.prevY += this.ySize;
					break;

				case 'right':
					this.prevX += this.xSize;
					break;

				case 'left':
					this.prevX -= this.xSize;
					break;

				default:
					break;
				}

				if (images !== null) {
					this.image = images;
				}

				if (this.canvasMatrix[this.prevY / this.ySize][this.prevX / this.xSize] === null) {
					this.xPosition = this.prevX / this.xSize;
					this.yPosition = this.prevY / this.ySize;
					
					this.ctx.clearRect(clearX, clearY, this.image.width, this.image.height);
					this.ctx.beginPath();
					this.ctx.strokeText(this.hp.toString(), this.prevX + 25, this.prevY + 10);
					this.ctx.drawImage(this.image, this.prevX, this.prevY, this.image.width, this.image.height);
					this.ctx.closePath();
					this.canvasMatrix[this.yPosition][this.xPosition] = this.canvasMatrix[clearY / this.ySize][clearX / this.xSize];
					this.canvasMatrix[clearY / this.ySize][clearX / this.xSize] = null;
				} else {
					this.prevX = clearX;
					this.prevY = clearY;
				}
			}
		}
	}

	attackCharacter(startTime: number, animationTime: number, yPos: number, xPos: number, characters: Array<Character>) {
		if (!this.isDead) {
			this.startTime = startTime;
			this.animationTime = animationTime;
			this.attackId = window.setInterval(() => {
				this.attackAnimate();
			}, animationTime / (this.attackMass.length - 1));
			let coord = this.getPosition();
			let clickCoord = [yPos, xPos];
			let char = this.canvasMatrix[yPos][xPos];

			if (isCross(coord, clickCoord)) {
				if (char && char.type !== '*' && char !== null) {
					setTimeout(() => {
						characters[char.type].getDamage(characters.C.getParams().attack);
						new NumberAnimate(xPos * this.xSize, yPos * this.ySize, characters.C.getParams().attack, 'canvas', 600, 70, 60);
					}, 400);
				}
			}
		}
	}

	attackAnimate() {
		if (!this.isDead) {
			if (this.ctx) {
				this.ctx.beginPath();
				this.ctx.clearRect(this.prevX, this.prevY, this.image.width, this.image.height);
				const time = performance.now();
				const shiftTime = time - this.startTime;
				const multiply = shiftTime / this.animationTime;
				this.ctx.strokeText(this.hp.toString(), this.prevX + 25, this.prevY + 10);

				this.ctx.drawImage(this.attackMass[this.attackFrame], this.prevX, this.prevY, this.image.width, this.image.height);
				this.ctx.closePath();

				if (multiply < 1) {
					this.attackFrame++;
				} else {
					clearInterval(this.attackId);
					this.attackFrame = 0;
					this.ctx.beginPath();
					this.ctx.clearRect(this.prevX, this.prevY, this.image.width, this.image.height);
					this.ctx.strokeText(this.hp.toString(), this.prevX + 25, this.prevY + 10);
					this.ctx.drawImage(this.attackMass[this.attackFrame], this.prevX, this.prevY, this.image.width, this.image.height);
					this.ctx.closePath();
				}
			}
		}
	}
}

