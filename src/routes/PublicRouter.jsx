import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthenticated } from '../hooks';

export const PublicRouter = () => {
	const location = useLocation();
	const isVerificationRoute = location.pathname.startsWith('/auth/verified');
	const { isAuthenticated } = useAuthenticated({ skipRefresh: isVerificationRoute });

	if (isAuthenticated && !isVerificationRoute) {
		return <Navigate to='/' />;
	}

	return <Outlet />;
};

export default PublicRouter;
