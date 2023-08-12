import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Spinner } from './components';
import { store } from './redux';
import { router } from './routes';

import './styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
	return (
		<Provider store={store}>
			<Suspense fallback={<Spinner />}>
				<RouterProvider router={router} />
			</Suspense>
			<ToastContainer
				autoClose={3000}
				position='bottom-right'
				draggable
				pauseOnFocusLoss={false}
			/>
		</Provider>
	);
};
