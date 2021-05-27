import {objPersonaj} from './game.objPersonaj';

export const isEnemyCross = (mass1: Array<number>, mass2: Array<Array<objPersonaj | null>>) => {
	let y = mass1[0];
	let x = mass1[1];
	// Идет проверка наличия персонажа в пределах "Креста", т.е если наш персонаж нахожится в точке с координатами [Y,X], то крест это 4 точки:
	// [Y - 1, X], [Y, X - 1], [Y + 1, X], [Y, X + 1]
	if (mass2[y - 1][x] !== null && mass2[y - 1][x].type === 'C') {
		return mass2[y - 1][x];
	}

	if (mass2[y][x - 1] !== null && mass2[y][x - 1].type === 'C') {
		return mass2[y][x - 1];
	}

	if (mass2[y + 1][x] !== null && mass2[y + 1][x].type === 'C') {
		return mass2[y + 1][x];
	}

	if (mass2[y][x + 1] !== null && mass2[y][x + 1].type === 'C') {
		return mass2[y][x + 1];
	}

	return false;
};
