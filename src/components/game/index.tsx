import React, {Component} from 'react';
import {GameCanvas} from './canvasGenerate'
import {lvlGenerate} from './lvlgenerate'

import '../App.css';

const MOVEDELAY = 300
const ATTACKDELAY = 800
const x_size = 90;
const y_size = 90;

const canvasImg = new Image();
canvasImg.src = '/images/bg.jpeg'

const char1 = {
	type: 'C',
	hp: '100',
	attack: '10',
	armor: '0'
}
const char2 = {
	type: 'E',
	hp: '100',
	attack: '10',
	armor: '0'
}
const char3 = {
	type: 'E1',
	hp: '100',
	attack: '10',
	armor: '0'
}
const char4 = {
	type: 'E2',
	hp: '100',
	attack: '10',
	armor: '0'
}

const list = {
	type: '*'
}

const lvlMatrix = [
	[list,list,list,list,list,list,list,list,list,list,list,list,list],
	[list,list,list,list,list,null,null,null,null,null,null,null,list],
	[list,char1,null,null,null,null,null,null,null,null,null,null,list],
	[list,null,null,null,null,null,null,null,null,null,null,null,list],
	[list,null,null,null,null,char2,null,null,null,null,null,null,list],
	[list,list,null,char3,null,null,null,null,null,char4,null,null,list],
	[list,list,list,null,null,null,null,null,null,null,null,null,list],
	[list,list,list,list,list,list,list,list,list,list,list,list,list]
]


let isActive = false

class Game extends Component {
	render() {
		return (
			<GameCanvas xPosition={x_size * 13} yPosition={y_size * 8} image={canvasImg}/>
		);
	}
}

setTimeout(()=>{
	let Characters  = lvlGenerate(lvlMatrix, x_size, y_size, 'canvas')

	for(let key in Characters){
		if(Characters.hasOwnProperty(key)){
			Characters[key].addEnemy(Characters['C'])
		}
	}
	

	document.addEventListener('keydown', function(event){
			if(!isActive){
				isActive = true

				switch(event.code){
					case 'ArrowUp':
					case 'KeyW':
						Characters['C'].moveCharacter('up')
						setTimeout(()=>{
							isActive = false
						}, MOVEDELAY)
						break;
				
					case 'ArrowDown':
					case 'KeyS':
						Characters['C'].moveCharacter('down')
						setTimeout(()=>{
							isActive = false
						}, MOVEDELAY)
						break;

					case 'ArrowRight':
					case 'KeyD':
						Characters['C'].moveCharacter('right')
						setTimeout(()=>{
							isActive = false
						}, MOVEDELAY)
						break;

					case 'ArrowLeft':
					case 'KeyA':
						Characters['C'].moveCharacter('left')
						setTimeout(()=>{
							isActive = false
						}, MOVEDELAY)
						break;

					default: 
						setTimeout(()=>{
							isActive = false
						}, MOVEDELAY)
						break;
	
				}

			}else{
				return
			}
			
    })

	document.addEventListener('mousedown', function(event){
		if(!isActive){
			isActive = true
			let time = performance.now();
			setTimeout(()=>{
				isActive = false
			}, ATTACKDELAY)
			Characters['C'].attackCharacter(time, 500, Math.floor(event.pageY / y_size),  Math.floor(event.pageX / x_size), Characters)
			
		}
	
	})
}, 400)
export default Game;
