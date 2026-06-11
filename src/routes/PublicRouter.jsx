import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthenticated } from '../hooks';

const AUTH_ROUTES_WHEN_LOGGED_IN = [
	'/auth/verified',
	'/auth/forgot-password',
	'/auth/resend-verification',
	'/auth/reset-password',
];

const isAllowedWhenAuthenticated = (pathname) =>
	AUTH_ROUTES_WHEN_LOGGED_IN.some((route) => pathname.startsWith(route));

export const PublicRouter = () => {
	const location = useLocation();
	const skipRefresh = isAllowedWhenAuthenticated(location.pathname);
	const { isAuthenticated } = useAuthenticated({ skipRefresh });

	if (isAuthenticated && !skipRefresh) {
		return <Navigate to='/' />;
	}

	return <Outlet />;
};

export default PublicRouter;
