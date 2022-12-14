import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	status: 'not-authenticated',
	checking: false,
	verified: false,
	user: {},
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginUser: (state, action) => {
			state.status = 'authenticated';
			state.verified = false;
			state.user = action.payload;
		},
		verifiedUser: (state) => {
			state.verified = true;
		},

		logout: (state) => {
			state.status = 'not-authenticated';
			state.checking = false;
			state.verified = false;
			state.user = null;
		},
		startChecking: (state) => {
			state.checking = true;
		},
		finishChecking: (state) => {
			state.checking = false;
		},
	},
});

export const { loginUser, verifiedUser, logout, startChecking, finishChecking } = authSlice.actions;

export default authSlice.reducer;
