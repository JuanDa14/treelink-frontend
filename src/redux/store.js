import { configureStore } from '@reduxjs/toolkit';

import { authSlice, linkSlice, uiSlice } from './slices';

export const store = configureStore({
	reducer: {
		auth: authSlice,
		link: linkSlice,
		ui: uiSlice,
	},
});
