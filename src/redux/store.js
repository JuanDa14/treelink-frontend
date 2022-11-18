import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { authSlice, linkSlice, uiSlice } from './slices';

export const store = configureStore({
	reducer: {
		auth: authSlice,
		link: linkSlice,
		ui: uiSlice,
	},

	middleware: [thunk],
});
