import {isCross} from './isCross'
import {isEnemyCross} from './isEnemyCross'
import {numberAnimate} from './numberAnimate'
import {objPersonaj} from './game.objPersonaj'

export class Character{
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
    canvasMatrix:  Array<Array<objPersonaj | null>>;
    x_position: number;
    y_position: number;
    isDead: boolean;
    numberId: number;
    isEnemy: boolean;
    enemy: Character;
    attackInterval: number;

    constructor(start_x:number, start_y:number, image:HTMLImageElement, canvas_id:string, attackMass: Array<HTMLImageElement>, deathMass:  Array<HTMLImageElement> = [], hp: number = 100, attack: number = 10, armor: number = 0,  canvasMatrix: Array<Array<objPersonaj | null>>, x_size: number, y_size: number, isEnemy: boolean){
        this.hp = hp;
        this.isDead = false;
        this.canvasMatrix = canvasMatrix;
        this.x_size = x_size;
        this.y_size = y_size;
        this.deathMass = deathMass
        this.attack = attack;
        this.armor = armor;
        this.isEnemy = isEnemy;
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

    addEnemy(obj: Character){
        this.enemy = obj

        if(this.isEnemy){
            this.attackHero()
        }
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
        this.hp = this.hp - (dmg - this.armor)
        if(this.hp <= 0){
            if(!this.isDead){
                this.isDead = true
                this.hp = 0;
                let time = performance.now();
                this.deathCharacter(time, 400)
                console.log('die')
            }
            return 
        }

        if(this.ctx){
            this.ctx.beginPath();
            this.ctx.clearRect(this.prev_x, this.prev_y, this.image.width, this.image.height)
            this.ctx.strokeText(this.hp.toString(), this.prev_x + 25, this.prev_y + 10);
            this.ctx.drawImage(this.attackMass[this.attackFrame], this.prev_x, this.prev_y, this.image.width, this.image.height);
            this.ctx.closePath();
        }

    }

    deathCharacter(startTime: number, animationTime: number){
        this.startTime = startTime;
        this.animationTime = animationTime;
        this.attackId = window.setInterval(() => {
            this.deathAnimate()
        }, animationTime / (this.deathMass.length - 1))

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
                clearInterval(this.attackInterval)
                this.attackFrame = 0;
            }
        }
    }

    attackHero(){
        this.attackInterval = window.setInterval(()=>{
            if(!this.isDead){
                let char = isEnemyCross(this.getPosition(), this.canvasMatrix)
                if(char){
                    this.startTime = performance.now();;
                    this.animationTime = 500;
                    this.attackId = window.setInterval(() => {
                        this.attackAnimate()
                    }, this.animationTime / (this.attackMass.length - 1))
                    setTimeout(()=>{
                        this.enemy.getDamage(this.getParams()['attack'])
                        new numberAnimate(this.enemy.getPosition()[1] * this.x_size, this.enemy.getPosition()[0] * this.y_size, this.getParams()['attack'], 'canvas', 600, 70, 60)
                    }, 600)
                }
            }
        }, 2000)
    }

    moveCharacter(direction:string, images:HTMLImageElement | null = null){
        if(!this.isDead){

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
                if(this.canvasMatrix[this.prev_y / this.y_size][this.prev_x / this.x_size] == null){
                    this.x_position = this.prev_x / this.x_size;
                    this.y_position = this.prev_y / this.y_size;
                    console.log( this.x_position,  this.y_position)
                    this.ctx.clearRect(clear_x, clear_y, this.image.width, this.image.height)
                    this.ctx.beginPath();
                    this.ctx.strokeText(this.hp.toString(), this.prev_x + 25, this.prev_y + 10);
                    this.ctx.drawImage(this.image, this.prev_x, this.prev_y, this.image.width, this.image.height)
                    this.ctx.closePath();
                    this.canvasMatrix[this.y_position][this.x_position] = this.canvasMatrix[clear_y / this.y_size][clear_x / this.x_size]
                    this.canvasMatrix[clear_y / this.y_size][clear_x / this.x_size] = null;

                }else{
                    this.prev_x = clear_x;
                    this.prev_y = clear_y
                }
            }
        }
    }

    attackCharacter(startTime: number, animationTime: number, y_pos: number, x_pos: number, characters: Array<Character>){
        if(!this.isDead){

            this.startTime = startTime;
            this.animationTime = animationTime;
            this.attackId = window.setInterval(() => {
                this.attackAnimate()
            }, animationTime / (this.attackMass.length - 1))
            let coord = this.getPosition()
            let clickCoord = [y_pos, x_pos]
            let char = this.canvasMatrix[y_pos][x_pos]

            if(isCross(coord, clickCoord)){
                if(char && char.type != '*' && char != null ){
                    setTimeout(()=>{
                        characters[char.type].getDamage(characters['C'].getParams()['attack'])
                        new numberAnimate(x_pos * this.x_size, y_pos * this.y_size, characters['C'].getParams()['attack'], 'canvas', 600, 70, 60)
                    }, 400)
                }
            }
        }	
    }

    attackAnimate(){
        if(!this.isDead){

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
}

