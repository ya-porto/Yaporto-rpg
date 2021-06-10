import {createSlice, configureStore} from '@reduxjs/toolkit';
import {initialState} from './stateFromSSR';

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
