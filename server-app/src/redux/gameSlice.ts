import {createSlice} from '@reduxjs/toolkit';

export const gameSlice = createSlice({
	name: 'game',
	initialState: {
		time: {min: '00', sec: '00'},
		lvl: 1,
		exp: {
			now: 5,
			max: 10
		},
		timerId: null,
		isPause: false,
		isDead: false,
		isWin: false,
		enemiesAmount: 0
	},
	reducers: {
		changeTime: (state: any, action: any) => {
			state.time = action.payload;
		},
		setTimerId: (state: any, action: any) => {
			state.timerId = action.payload
			state.isPause = false
		},
		stopTimer: (state: any) => {
			clearInterval(state.timerId)
			state.timerId = null
			state.isPause = true
		},
		setDeath: (state: any) => {
			state.isDead = true
		},
		setWin: (state: any) => {
			state.isWin = true
		},
		setEnemiesAmount: (state: any, action: any) => {
			state.enemiesAmount = action.payload
		},
		decrimentEnemiesAmount: (state: any) => {
			state.enemiesAmount--
		},
	}
});

export const {changeTime, setTimerId, stopTimer, setDeath, setWin, setEnemiesAmount, decrimentEnemiesAmount} = gameSlice.actions;

export default gameSlice.reducer;
