import {getDocument} from 'ssr-window';
const document = getDocument();

export class NumberAnimate {
	xPos: number;
	yPos: number;
	number: number;
	ctx: CanvasRenderingContext2D | null;
	time: number;
	animationTime: number;
	yPlus: number;
	numberId: number;
	xPlus: number;

	constructor(xPos: number, yPos: number, number: number, canvasId: string, animationTime: number, xPlus: number, yPlus: number) {
		this.xPos = xPos;
		this.yPos = yPos - 10;
		this.xPlus = xPlus;
		this.yPlus = yPlus;
		this.number = number;
		this.yPlus = 30;
		this.animationTime = animationTime;
		const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

		if (canvas) {
			this.ctx = canvas.getContext('2d');
		}

		this.time = performance.now();
		this.numberId = window.setInterval(() => {
			this.numberStart();
		}, animationTime / 6);
	}

	numberStart() {
		if (this.ctx) {
			this.ctx.beginPath();
			this.ctx.clearRect(this.xPos + this.xPlus, this.yPos + this.yPlus, 12, 12);
			const time = performance.now();
			const shiftTime = time - this.time;
			const multiply = shiftTime / this.animationTime;
			this.ctx.fillStyle = '#FFF';
			this.ctx.strokeStyle = '#FFF';
			this.ctx.strokeText(this.number.toString(), this.xPos + this.xPlus, this.yPos + this.yPlus);
			this.ctx.closePath();

			if (multiply < 1) {
				this.yPlus -= 5;
			} else {
				clearInterval(this.numberId);
				this.ctx.clearRect(this.xPos + this.xPlus, this.yPos + this.yPlus - 10, 12, 12);
			}
		}
	}
}
