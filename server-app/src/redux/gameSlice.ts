import {createSlice} from '@reduxjs/toolkit';

export const gameSlice = createSlice({
	name: 'game',
	initialState: {
		time: {min: '00', sec: '00'},
		lvl: 1,
		timerId: null,
		isModalDeathShown: false,
		isModalWinShown: false,
		enemiesAmount: 0
	},
	reducers: {
		changeTime: (state: any, action: any) => {
			state.time = action.payload;
		},
		setTimerId: (state: any, action: any) => {
			state.timerId = action.payload
		},
		stopTimer: (state: any) => {
			clearInterval(state.timerId)
			state.timerId = null
		},
		toggleModalDeath: (state: any, action: any) => {
			state.isModalDeathShown = action.payload
		},
		toggleModalWin: (state: any, action: any) => {
			state.isModalWinShown = action.payload
		},
		setEnemiesAmount: (state: any, action: any) => {
			state.enemiesAmount = action.payload
		},
		decrimentEnemiesAmount: (state: any) => {
			state.enemiesAmount--
		},
	}
});

export const {changeTime, setTimerId, stopTimer, toggleModalDeath, toggleModalWin, setEnemiesAmount, decrimentEnemiesAmount} = gameSlice.actions;

export default gameSlice.reducer;
