export const isCross = (mass1: Array<number>, mass2: Array<number>) => {
	if ((mass1[0] + 1 === mass2[0] && mass1[1] === mass2[1]) || (mass1[0] - 1 === mass2[0] && mass1[1] === mass2[1]) ||
	(mass1[0] === mass2[0] && mass1[1] + 1 === mass2[1]) || (mass1[0] === mass2[0] && mass1[1] - 1 === mass2[1])) {
		return true;
	}

	return false;
};
