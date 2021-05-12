
interface objNeed{
	type: string;
	hp?: string;
	attack?: string;
	armor?: string;
}

export const isEnemyCross = (mass1: Array<number>, mass2: Array<Array<objNeed | null>>) => {
    let y = mass1[0]
    let x = mass1[1]
	if(mass2[y - 1][x] !== null &&  mass2[y - 1][x].type == 'C'){
		return mass2[y - 1][x]
	}

    if(mass2[y][x - 1] !== null &&  mass2[y][x - 1].type == 'C'){
		return mass2[y][x - 1]
    }

    if(mass2[y + 1][x] !== null &&  mass2[y + 1][x].type == 'C'){
		return mass2[y + 1][x]
    }

    if(mass2[y][x + 1] !== null &&  mass2[y][x + 1].type == 'C'){
        return mass2[y][x + 1]
    }
   

	return false
}