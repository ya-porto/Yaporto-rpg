import Character from './character'
import charDie from './deathSprite'
import charAttack from './attackSprite'

const sprite1 = new Image()
sprite1.src = '/public/images/sprite1.png'
sprite1.width = 90;
sprite1.height = 70;

const charImg = new Image()
charImg.src = '/public/images/golem/Attack/Golem_01.png'
charImg.width = 90;
charImg.height = 90;

const lvlGenerate = (mass: Array<Array<Array<string>>>, x_size: number, y_size: number, canvas_id: string): object => {
    const canv = document.getElementById(canvas_id) as HTMLCanvasElement;
    const obj = {}
    const ctx = canv.getContext('2d')
    for(let i = 0; i < mass.length; i++){
        for(let j = 0; j < mass[i].length; j++){
            if(mass[i][j][0] == '*' && ctx){
                ctx.beginPath();
                ctx.drawImage(sprite1, j * x_size, i * y_size + 7, sprite1.width, sprite1.height)
                ctx.closePath()
            }else if(mass[i][j][0] != undefined && ctx){
                obj[mass[i][j][0]] =  new Character(x_size*j, y_size*i, charImg, 'canvas', charAttack, charDie, parseInt(mass[i][j][1]), parseInt(mass[i][j][2]), parseInt(mass[i][j][3]), mass, x_size, y_size)
            }
        }
    }

    return obj
}
export default lvlGenerate