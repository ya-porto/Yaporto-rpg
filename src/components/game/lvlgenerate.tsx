const sprite1 = new Image()
sprite1.src = '/public/images/sprite1.png'
sprite1.width = 65;
sprite1.height = 50;

const lvlGenerate = (mass: Array<Array<Array<string>>>, x_size: number, y_size: number, canvas_id: string):void => {
    const canv = document.getElementById(canvas_id) as HTMLCanvasElement;
    const ctx = canv.getContext('2d')
    for(let i = 0; i < mass.length; i++){
        for(let j = 0; j < mass[i].length; j++){
            if(mass[i][j][0] == '*' && ctx){
                ctx.beginPath();
                ctx.drawImage(sprite1, j * x_size, i * y_size + 7, sprite1.width, sprite1.height)
                ctx.closePath()
            }
        }
    }
}
export default lvlGenerate