import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	links: [],
	link: {},
	loading: false,
	reordering: false,
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
			state.links = [...state.links, action.payload];
		},

		deleteLink: (state, action) => {
			state.links = state.links.filter((link) => link._id !== action.payload);
		},

		updateLink: (state, action) => {
			state.links = state.links.map((link) =>
				link._id === action.payload._id ? action.payload : link
			);
		},

		reorderLinks: (state, action) => {
			state.links = [...action.payload];
		},

		startLoading: (state) => {
			state.loading = true;
		},

		finishLoading: (state) => {
			state.loading = false;
		},

		startReordering: (state) => {
			state.reordering = true;
		},

		finishReordering: (state) => {
			state.reordering = false;
		},
	},
});

export const {
	getLinks,
	createLink,
	deleteLink,
	getLinkById,
	updateLink,
	reorderLinks,
	startLoading,
	finishLoading,
	startReordering,
	finishReordering,
} = linkSlice.actions;

export default linkSlice.reducer;
