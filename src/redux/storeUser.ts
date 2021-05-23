import { createAsyncThunk, createSlice, configureStore } from '@reduxjs/toolkit'
import {authController} from '../controllers/auth'

export const fetchUserBy: any = createAsyncThunk(
    'users/getFullInfo',
    async (thunkAPI) => {
        const response = await authController.getUserInfo()
        return response
    }
)

const counterSlice = createSlice({
	name: 'User',
	initialState: {
		user:{
			mail: null,
			login: null,
			name: null,
			secondName: null,
			nameInChat: null,
            phone: null,
		},
	},
    reducers:{

    },
	extraReducers: {
		[fetchUserBy.fulfilled]: (state, action) => {
            state.user = action.payload
        }
	}
  })
  
  export const store = configureStore({
	  reducer: counterSlice.reducer
  })