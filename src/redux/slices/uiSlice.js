import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loading: false,
	modal: false,
	alert: false,
	profile: false,
	menu: false,
	menuMobile: false,
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		openModal: (state) => {
			state.modal = true;
		},

		closeModal: (state) => {
			state.modal = false;
		},

		openAlert: (state) => {
			state.alert = true;
		},

		closeAlert: (state) => {
			state.alert = false;
		},
		openProfile: (state) => {
			state.profile = true;
		},
		closeProfile: (state) => {
			state.profile = false;
		},
		startLoading: (state) => {
			state.loading = true;
		},
		finishLoading: (state) => {
			state.loading = false;
		},
		openMenu: (state) => {
			state.menu = true;
		},
		closeMenu: (state) => {
			state.menu = false;
		},
		openMenuMobile: (state) => {
			state.menuMobile = true;
		},
		closeMenuMobile: (state) => {
			state.menuMobile = false;
		},
		changeStateMenu: (state) => {
			state.menu = !state.menu;
		},
		changeStateMenuMobile: (state) => {
			state.menuMobile = !state.menuMobile;
		},
	},
});

export const {
	openModal,
	closeModal,
	openAlert,
	closeAlert,
	openProfile,
	closeProfile,
	startLoading,
	finishLoading,
	openMenu,
	closeMenu,
	openMenuMobile,
	closeMenuMobile,
	changeStateMenu,
	changeStateMenuMobile,
} = uiSlice.actions;

export default uiSlice.reducer;
