import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	status: 'not-authenticated',
	checking: false,
	verified: false,
	verificationError: null,
	verificationHint: null,
	user: {},
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginUser: (state, action) => {
			state.status = 'authenticated';
			state.verified = false;
			state.verificationHint = null;
			state.user = action.payload;
		},
		verifiedUser: (state) => {
			state.verified = true;
			state.verificationError = null;
		},
		verificationFailed: (state, action) => {
			state.verified = false;
			state.verificationError = action.payload;
		},
		setVerificationHint: (state, action) => {
			state.verificationHint = action.payload;
		},
		clearVerificationHint: (state) => {
			state.verificationHint = null;
		},

		logout: (state) => {
			state.status = 'not-authenticated';
			state.checking = false;
			state.verified = false;
			state.verificationError = null;
			state.verificationHint = null;
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

export const {
	loginUser,
	verifiedUser,
	verificationFailed,
	setVerificationHint,
	clearVerificationHint,
	logout,
	startChecking,
	finishChecking,
} = authSlice.actions;

export default authSlice.reducer;
