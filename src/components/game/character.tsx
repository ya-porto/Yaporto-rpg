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
    hp: number;
    attack: number;
    armor: number;
    deathMass: Array<HTMLImageElement>;
    x_size: number;
    y_size: number;
    canvasMatrix:  Array<Array<Array<string>>>;
    x_position: number;
    y_position: number;
    isDead: boolean;
    numberId: number;

    constructor(start_x:number, start_y:number, image:HTMLImageElement, canvas_id:string, attackMass: Array<HTMLImageElement>, deathMass:  Array<HTMLImageElement> = [], hp: number = 100, attack: number = 10, armor: number = 0,  canvasMatrix: Array<Array<Array<string>>>, x_size: number, y_size: number,){
        this.hp = hp;
        this.isDead = false;
        this.canvasMatrix = canvasMatrix;
        this.x_size = x_size;
        this.y_size = y_size;
        this.deathMass = deathMass
        this.attack = attack;
        this.armor = armor;
        this.attackFrame = 0;
        const canvas = document.getElementById(canvas_id) as HTMLCanvasElement;
        if(canvas){
            this.ctx = canvas.getContext('2d')
        }
        this.attackMass = attackMass
        this.image = image
        this.prev_x = start_x;
        this.prev_y = start_y;
        this.y_position = this.prev_y / this.y_size
        this.x_position = this.prev_x / this.x_size

        setTimeout(() => {
            if(this.ctx){
                this.ctx.beginPath();
                this.ctx.fillStyle = "#FFF";
                this.ctx.strokeStyle = "#FFF";
                this.ctx.strokeText(this.hp.toString(), start_x + 25, start_y + 10);
                this.ctx.drawImage(image, start_x, start_y, this.image.width, this.image.height)
                this.ctx.closePath();
            }
        }, 10)
    }

    updateCharacter( hp: number = this.hp, attack: number = this.attack, armor: number = this.armor){
        this.hp = hp;
        this.attack = attack;
        this.armor = armor;  
    }

    getPosition(){
        return [this.y_position, this.x_position ]
    }

    getParams(){
        return {
            'hp': this.hp,
            'attack': this.attack,
            'armor': this.armor
        }
    }

    getDamage(dmg: number){
        if(!this.isDead){
            this.hp = this.hp - (dmg - this.armor)
            if(this.hp <= 0){
                this.isDead = true
                this.hp = 0;
                let time = performance.now();
                this.deathCharacter(time, 700)
                return 'die'
            }
    
            if(this.ctx){
                this.ctx.beginPath();
                this.ctx.clearRect(this.prev_x, this.prev_y, this.image.width, this.image.height)
                this.ctx.strokeText(this.hp.toString(), this.prev_x + 25, this.prev_y + 10);
                this.ctx.drawImage(this.attackMass[this.attackFrame], this.prev_x, this.prev_y, this.image.width, this.image.height);
                this.ctx.closePath();
            }
        }
    }

    deathCharacter(startTime: number, animationTime: number){
        this.startTime = startTime;
        this.animationTime = animationTime;
        this.attackId = window.setInterval(() => {
            this.deathAnimate()
        }, animationTime / 14)
    }

    deathAnimate(){
        if(this.ctx){
            this.ctx.beginPath();
            this.ctx.clearRect(this.prev_x, this.prev_y, this.image.width, this.image.height)
            const time = performance.now();
            const shiftTime = time - this.startTime;
            const multiply = shiftTime / this.animationTime;
            this.ctx.drawImage(this.deathMass[this.attackFrame], this.prev_x, this.prev_y, this.image.width, this.image.height);
            this.ctx.closePath();

            if(multiply < 1){
                this.attackFrame++;
                this.attackAnimate;
            }else{
                clearInterval(this.attackId)
                this.attackFrame = 0;
            }
        }
    }


    moveCharacter(direction:string, images:HTMLImageElement | null = null){
        if(this.ctx){
            let clear_x = this.prev_x;
            let clear_y = this.prev_y
           
            switch(direction){
                case 'up':
                    this.prev_y -= this.y_size;
                    break;
    
                case 'down':
                    this.prev_y += this.y_size;
                    break;
    
                case 'right':
                    this.prev_x += this.x_size;
                    break;
    
                
                case 'left':
                    this.prev_x -= this.x_size;
                    break;
            }
    
            if(images != null){
                this.image = images
            }
            if(this.canvasMatrix[this.prev_y / this.y_size][this.prev_x / this.x_size][0] == undefined){
                this.x_position = this.prev_x / this.x_size;
                this.y_position = this.prev_y / this.y_size;
                this.ctx.clearRect(clear_x, clear_y, this.image.width, this.image.height)
                this.ctx.beginPath();
                this.ctx.strokeText(this.hp.toString(), this.prev_x + 25, this.prev_y + 10);
                this.ctx.drawImage(this.image, this.prev_x, this.prev_y, this.image.width, this.image.height)
                this.ctx.closePath();
                this.canvasMatrix[clear_y / this.y_size][clear_x / this.x_size].splice(0, this.canvasMatrix[clear_y / this.y_size][clear_x / this.x_size].length)
                this.canvasMatrix[this.y_position][this.x_position][0] = 'C'

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
            this.ctx.strokeText(this.hp.toString(), this.prev_x + 25, this.prev_y + 10);

            this.ctx.drawImage(this.attackMass[this.attackFrame], this.prev_x, this.prev_y, this.image.width, this.image.height);
            this.ctx.closePath();

            if(multiply < 1){
                this.attackFrame++;
                this.attackAnimate;
            }else{
                clearInterval(this.attackId)
                this.attackFrame = 0;
                this.ctx.beginPath();
                this.ctx.clearRect(this.prev_x, this.prev_y, this.image.width, this.image.height)
                this.ctx.strokeText(this.hp.toString(), this.prev_x + 25, this.prev_y + 10);
                this.ctx.drawImage(this.attackMass[this.attackFrame], this.prev_x, this.prev_y, this.image.width, this.image.height);
                this.ctx.closePath();
            }
        }
 
    }
}

