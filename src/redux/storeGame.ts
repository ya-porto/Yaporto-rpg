import {createSlice, configureStore} from '@reduxjs/toolkit';
import {getWindow} from 'ssr-window';
import {isServer} from './rootStore';

const window = getWindow();

const initialState = isServer ? {} : window.__INITIAL_STATE__.router.initialState;
console.log(initialState);

const counterSlice = createSlice({
	name: 'Game',
	initialState: initialState.game,
	reducers: {
		changeTime: (state: any, action: any) => {
			state.time = action.payload;
		}
	}
});

export const {changeTime} = counterSlice.actions;

export const store = configureStore({
	reducer: counterSlice.reducer
});
