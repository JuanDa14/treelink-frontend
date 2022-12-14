import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	links: [],
	link: {},
	loading: false,
};

export const linkSlice = createSlice({
	name: 'link',
	initialState,
	reducers: {
		getLinks: (state, action) => {
			state.links = [...action.payload];
		},

		getLinkById: (state, action) => {
			state.link = state.links.find((link) => link._id === action.payload);
		},

		createLink: (state, action) => {
			state.links = [action.payload, ...state.links];
		},

		deleteLink: (state, action) => {
			state.links = state.links.filter((link) => link._id !== action.payload);
		},

		updateLink: (state, action) => {
			state.links = state.links.map((link) =>
				link._id === action.payload._id ? action.payload : link
			);
		},
		startLoading: (state) => {
			state.loading = true;
		},
		finishLoading: (state) => {
			state.loading = false;
		},
	},
});

export const {
	getLinks,
	createLink,
	deleteLink,
	getLinkById,
	updateLink,
	startLoading,
	finishLoading,
} = linkSlice.actions;

export default linkSlice.reducer;
