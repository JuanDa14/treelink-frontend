import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Spinner, ToastContainerThemed } from './components';
import { ThemeProvider } from './providers/theme-provider';
import { store } from './redux';
import { router } from './routes';

import './styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider defaultTheme='system' storageKey='treelink-theme'>
				<GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
					<Suspense fallback={<Spinner />}>
						<RouterProvider router={router} />
					</Suspense>
					<ToastContainerThemed />
				</GoogleOAuthProvider>
			</ThemeProvider>
		</Provider>
	);
};
