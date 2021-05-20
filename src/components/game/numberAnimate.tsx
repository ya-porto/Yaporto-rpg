export class numberAnimate{
    x_pos: number;
    y_pos: number;
    number: number;
    ctx: CanvasRenderingContext2D | null;
    time: number;
    animationTime: number;
    y_plus: number;
    numberId: number;
    x_plus: number;

    constructor(x_pos: number, y_pos: number, number: number, canvasId: string, animationTime: number, x_plus: number, y_plus: number){
        this.x_pos = x_pos
        this.y_pos = y_pos - 10;
        this.x_plus = x_plus
        this.y_plus = y_plus
        this.number = number;
        this.y_plus = 30;
        this.animationTime = animationTime
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

        if(canvas){
            this.ctx = canvas.getContext('2d')
        }

        this.time = performance.now()
        this.numberId = window.setInterval(()=>{
            this.numberStart()
        }, animationTime / 6)
        
    }

    numberStart(){
        if(this.ctx){
            this.ctx.beginPath();
            this.ctx.clearRect(this.x_pos + this.x_plus, this.y_pos + this.y_plus, 12, 12)
            const time = performance.now();
            const shiftTime = time - this.time;
            const multiply = shiftTime / this.animationTime;
            this.ctx.fillStyle = "#FFF";
            this.ctx.strokeStyle = "#FFF";
            this.ctx.strokeText(this.number.toString(), this.x_pos + this.x_plus, this.y_pos + this.y_plus);
            this.ctx.closePath();

            if(multiply < 1){
                this.y_plus -= 5;
                this.numberStart;
            }else{
                clearInterval(this.numberId)
                this.ctx.clearRect(this.x_pos + this.x_plus, this.y_pos + this.y_plus - 10, 12, 12)
            }
        }
    }
}