import React, {Component} from 'react';
import GameCanvas from './game/canvasGenerate'
import lvlGenerate from './game/lvlgenerate'
import numberAnimate from './game/numberAnimate'

import './App.css';

const x_size = 90;
const y_size = 90;

const canvasImg = new Image();
canvasImg.src = '/public/images/bg.jpeg'



const lvlMatrix = [
	[['*'],['*'],['*'],['*'],['*'],['*'],['*'],['*'],['*'],['*'],['*'],['*'],['*']],
	[['*'],['*'],['*'],['*'],['*'],[],[],[],[],[],[],[],['*']],
	[['*'],['C', '100', '10', '0'],[],[],[],[],[],[],[],[],[],[],['*']],
	[['*'],[],[],[],[],[],[],[],[],[],[],[],['*']],
	[['*'],[],[],[],[],['E', '100', '10', '0'],[],[],[],[],[],[],['*']],
	[['*'],['*'],[],[],[],[],[],[],[],[],[],[],['*']],
	[['*'],['*'],['*'],[],[],[],[],[],[],[],[],[],['*']],
	[['*'],['*'],['*'],['*'],['*'],['*'],['*'],['*'],['*'],['*'],['*'],['*'],['*']]
]

let isActive = false

class App extends Component {
	render() {
		return (
			<div className="App">
			</div>
		);
	}
}
setTimeout(()=>{
	let Characters  = lvlGenerate(lvlMatrix, 90, 90, 'canvas')
	

	document.addEventListener('keydown', function(event){
			if(!isActive){

				isActive = true


				if(event.code == 'ArrowUp' || event.code == 'KeyW'){
					Characters['C'].moveCharacter('up')
					setTimeout(()=>{
						isActive = false
					}, 300)
					return;
				}
			
				if(event.code == 'ArrowDown' || event.code == 'KeyS'){
					Characters['C'].moveCharacter('down')
					setTimeout(()=>{
						isActive = false
					}, 300)
					return;
				}
			
				if(event.code == 'ArrowRight' || event.code == 'KeyD'){
					Characters['C'].moveCharacter('right')
					setTimeout(()=>{
						isActive = false
					}, 300)
					return;
				}
			
				if(event.code == 'ArrowLeft' || event.code == 'KeyA'){
					Characters['C'].moveCharacter('left')
					setTimeout(()=>{
						isActive = false
					}, 300)
					return;
				}

				if(event.code == 'KeyP'){
					let time = performance.now();
					setTimeout(()=>{
						isActive = false
					}, 700)
					Characters['C'].deathCharacter(time, 700)
					return;
				}
		
				if(event.code == 'KeyX'){
					let time = performance.now();
					setTimeout(()=>{
						isActive = false
					}, 600)
					Characters['C'].attackCharacter(time, 500)
					let coord = Characters['C'].getPosition()
					let char = lvlMatrix[coord[0]][coord[1] + 1][0]
					if( char != '*' && char != undefined ){
						setTimeout(()=>{
							Characters[char].getDamage(Characters['C'].getParams()['attack'])
							let number = new numberAnimate((coord[1] + 1) * x_size, coord[0] * y_size, Characters['C'].getParams()['attack'], 'canvas', 600, 70, 60)
						}, 400)
					}
					return;
				}

			}else{
				return
			}
			
    })
}, 200)
export default App;
