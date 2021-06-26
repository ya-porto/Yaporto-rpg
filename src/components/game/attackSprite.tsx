import {getDocument} from 'ssr-window';
const document = getDocument();

const charImgAttack1 = document.createElement('img');
charImgAttack1.src = '/images/golem/Attack/Golem_01.png';
charImgAttack1.width = 63;
charImgAttack1.height = 64;

const charImgAttack2 = document.createElement('img');
charImgAttack2.src = '/images/golem/Attack/Golem_02.png';
charImgAttack2.width = 63;
charImgAttack2.height = 64;

const charImgAttack3 = document.createElement('img');
charImgAttack3.src = '/images/golem/Attack/Golem_03.png';
charImgAttack3.width = 63;
charImgAttack3.height = 64;

const charImgAttack4 = document.createElement('img');
charImgAttack4.src = '/images/golem/Attack/Golem_04.png';
charImgAttack4.width = 63;
charImgAttack4.height = 64;

const charImgAttack5 = document.createElement('img');
charImgAttack5.src = '/images/golem/Attack/Golem_05.png';
charImgAttack5.width = 63;
charImgAttack5.height = 64;

const charImgAttack6 = document.createElement('img');
charImgAttack6.src = '/images/golem/Attack/Golem_06.png';
charImgAttack6.width = 63;
charImgAttack6.height = 64;

const charImgAttack7 = document.createElement('img');
charImgAttack7.src = '/images/golem/Attack/Golem_07.png';
charImgAttack7.width = 63;
charImgAttack7.height = 64;

const charImgAttack8 = document.createElement('img');
charImgAttack8.src = '/images/golem/Attack/Golem_08.png';
charImgAttack8.width = 63;
charImgAttack8.height = 64;

const charImgAttack9 = document.createElement('img');
charImgAttack9.src = '/images/golem/Attack/Golem_09.png';
charImgAttack9.width = 63;
charImgAttack9.height = 64;

export const charAttack = [
	charImgAttack1, charImgAttack2, charImgAttack3, charImgAttack4, charImgAttack5, charImgAttack6, charImgAttack7, charImgAttack8, charImgAttack9
];
