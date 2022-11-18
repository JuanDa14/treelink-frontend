import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const PublicRouter = lazy(() => import('./PublicRouter'));
const Login = lazy(() => import('../auth/Login'));
const Register = lazy(() => import('../auth/Register'));
const ForgotPassword = lazy(() => import('../auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../auth/ResetPassword'));
const Verified = lazy(() => import('../auth/Verified'));

const PrivateRouter = lazy(() => import('./PrivateRouter'));
const HomePage = lazy(() => import('../pages/HomePage'));
const NotFoundPage = lazy(() => import('../pages/404'));
const NewLinkPage = lazy(() => import('../pages/NewLinkPage'));
const PreviewPage = lazy(() => import('../pages/PreviewPage'));

const TreePage = lazy(() => import('../pages/TreePage'));

export const router = createBrowserRouter([
	{
		path: 'auth',
		element: <PublicRouter />,
		errorElement: <NotFoundPage />,
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Register />,
			},
			{
				path: 'verified',
				element: <Verified />,
			},
			{
				path: 'forgot-password',
				element: <ForgotPassword />,
			},
			{
				path: 'reset-password',
				element: <ResetPassword />,
			},
			{
				path: '*',
				element: <Login />,
			},
		],
	},
	{
		path: '/',
		element: <PrivateRouter />,
		errorElement: <NotFoundPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'new-link',
				element: <NewLinkPage />,
			},
			{
				path: 'preview',
				element: <PreviewPage />,
			},
			{
				path: ':id',
				element: <TreePage />,
			},
			{
				path: '*',
				element: <HomePage />,
			},
		],
	},
	{
		path: 'user/:username',
		element: <TreePage />,
		errorElement: <NotFoundPage />,
	},
]);
