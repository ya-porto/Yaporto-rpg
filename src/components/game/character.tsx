
export default class Character{
    ctx: CanvasRenderingContext2D | null;
    image:HTMLImageElement;
    prev_x:number;
    prev_y:number;
    attackMass: Array<HTMLImageElement>;
    attackFrame: number;
    startTime: number; 
    animationTime: number;
    attackId: number;

    constructor(start_x:number, start_y:number, image:HTMLImageElement, canvas_id:string, attackMass: Array<HTMLImageElement>){
        this.attackFrame = 0;
        const canvas = document.getElementById(canvas_id) as HTMLCanvasElement;
        if(canvas){
            this.ctx = canvas.getContext('2d')
        }
        this.attackMass = attackMass
        this.image = image
        this.prev_x = start_x;
        this.prev_y = start_y;

        setTimeout(() => {
            if(this.ctx){
                this.ctx.beginPath();
                this.ctx.drawImage(image, start_x, start_y, this.image.width, this.image.height)
                this.ctx.closePath();
            }
        }, 10)
    }

    moveCharacter(direction:string, mass: Array<Array<Array<string>>>, x_size: number, y_size: number, images:HTMLImageElement | null = null){
        if(this.ctx){
            let clear_x = this.prev_x;
            let clear_y = this.prev_y
           
            switch(direction){
                case 'up':
                    this.prev_y -= 64;
                    break;
    
                case 'down':
                    this.prev_y += 64;
                    break;
    
                case 'right':
                    this.prev_x += 65;
                    break;
    
                
                case 'left':
                    this.prev_x -= 65;
                    break;
            }
    
            if(images != null){
                this.image = images
            }
            if(mass[this.prev_y / y_size][this.prev_x / x_size][0] == undefined){
                this.ctx.clearRect(clear_x, clear_y, this.image.width, this.image.height)
                this.ctx.beginPath();
                this.ctx.drawImage(this.image, this.prev_x, this.prev_y, this.image.width, this.image.height)
                this.ctx.closePath();
                mass[clear_y / y_size][clear_x / x_size].splice(0, 1)
                mass[this.prev_y / y_size][this.prev_x / x_size][0] = 'C'
                console.log(mass)
            }else{
                this.prev_x = clear_x;
                this.prev_y = clear_y
            }
        }
    }

    attackCharacter(startTime: number, animationTime: number){
        this.startTime = startTime;
        this.animationTime = animationTime;
        this.attackId = window.setInterval(() => {
            this.attackAnimate()
        }, animationTime / 8)
        
    }

    attackAnimate(){
        if(this.ctx){
            this.ctx.beginPath();
            this.ctx.clearRect(this.prev_x, this.prev_y, this.image.width, this.image.height)
            const time = performance.now();
            const shiftTime = time - this.startTime;
            const multiply = shiftTime / this.animationTime;
            this.ctx.drawImage(this.attackMass[this.attackFrame], this.prev_x, this.prev_y, this.image.width, this.image.height);
            console.log(this.attackMass[this.attackFrame])
            this.ctx.closePath();

            if(multiply < 1){
                this.attackFrame++;
                this.attackAnimate;
            }else{
                clearInterval(this.attackId)
                this.attackFrame = 0;
                this.ctx.beginPath();
                this.ctx.clearRect(this.prev_x, this.prev_y, this.image.width, this.image.height)
                this.ctx.drawImage(this.attackMass[this.attackFrame], this.prev_x, this.prev_y, this.image.width, this.image.height);
                this.ctx.closePath();
            }
        }
 
    }
}

