import React, {Component} from 'react';
import GameCanvas from './game/canvasGenerate'
import Character from './game/character'
import lvlGenerate from './game/lvlgenerate'

import './App.css';
const canvasImg = new Image();
canvasImg.src = '/public/images/bg.jpeg'

const charImg = new Image()
charImg.src = '/public/images/golem/Golem_01.png'
charImg.width = 63;
charImg.height = 64;

const charImgA1 = new Image()
charImgA1.src = '/public/images/golem/Golem_01.png'
charImgA1.width = 63;
charImgA1.height = 64;

const charImgA2 = new Image()
charImgA2.src = '/public/images/golem/Golem_02.png'
charImgA2.width = 63;
charImgA2.height = 64;

const charImgA3 = new Image()
charImgA3.src = '/public/images/golem/Golem_03.png'
charImgA3.width = 63;
charImgA3.height = 64;

const charImgA4 = new Image()
charImgA4.src = '/public/images/golem/Golem_04.png'
charImgA4.width = 63;
charImgA4.height = 64;

const charImgA5 = new Image()
charImgA5.src = '/public/images/golem/Golem_05.png'
charImgA5.width = 63;
charImgA5.height = 64;

const charImgA6 = new Image()
charImgA6.src = '/public/images/golem/Golem_06.png'
charImgA6.width = 63;
charImgA6.height = 64;

const charImgA7 = new Image()
charImgA7.src = '/public/images/golem/Golem_07.png'
charImgA7.width = 63;
charImgA7.height = 64;

const charImgA8 = new Image()
charImgA8.src = '/public/images/golem/Golem_08.png'
charImgA8.width = 63;
charImgA8.height = 64;

const charImgA9 = new Image()
charImgA9.src = '/public/images/golem/Golem_09.png'
charImgA9.width = 63;
charImgA9.height = 64;



const lvlMatrix = [
	[['C'],['*'],['*'],['*'],['*'],['*'],['*'],['*'],['*'],['*'],['*'],['*'],['*']],
	[[],['*'],['*'],['*'],['*'],[],[],[],[],[],[],[],[]],
	[[],[],[],[],[],[],[],[],[],[],[],[],[]],
	[[],[],[],[],[],[],[],[],[],[],[],[],[]],
	[['*'],[],[],[],[],[],[],[],[],[],[],[],[]],
	[['*'],['*'],[],[],[],[],[],[],[],[],[],[],[]],
	[['*'],['*'],['*'],[],[],[],[],[],[],[],[],[],[]],
	[['*'],['*'],['*'],['*'],['*'],['*'],['*'],['*'],['*'],[],[],[],[]]
]

let isActive = false

class App extends Component {
	render() {
		return (
			<GameCanvas x_p={828} y_p={508} image={canvasImg} mass={[]}/>
		);
	}
}
setTimeout(()=>{
	lvlGenerate(lvlMatrix, 65, 64, 'canvas')
	const charAttack = [
		charImgA1, charImgA2, charImgA3, charImgA4, charImgA5, charImgA6, charImgA7, charImgA8, charImgA9
	]
	console.log(charImgA1)
	const char1 = new Character(0, 0, charImg, 'canvas', charAttack)
	document.addEventListener('keydown', function(event){
			if(!isActive){

				isActive = true

				setTimeout(()=>{
					isActive = false
				}, 600)

				if(event.code == 'ArrowUp' || event.code == 'KeyW'){
					char1.moveCharacter('up', lvlMatrix, 65, 64)
			
					return;
				}
			
				if(event.code == 'ArrowDown' || event.code == 'KeyS'){
					char1.moveCharacter('down', lvlMatrix, 65, 64)
					return;
				}
			
				if(event.code == 'ArrowRight' || event.code == 'KeyD'){
					char1.moveCharacter('right', lvlMatrix, 65, 64)
					return;
				}
			
				if(event.code == 'ArrowLeft' || event.code == 'KeyA'){
					char1.moveCharacter('left', lvlMatrix, 65, 64)
					return;
				}
		
				if(event.code == 'KeyX'){
					let time = performance.now();
					char1.attackCharacter(time, 500)
					return;
				}

			}else{
				return
			}
			
    })
}, 100)
export default App;
