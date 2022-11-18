import { Navigate, Outlet } from 'react-router-dom';
import { useAuthenticated } from '../hooks';

export const PublicRouter = () => {
	const { isAuthenticated } = useAuthenticated();

	return isAuthenticated ? <Navigate to='/' /> : <Outlet />;
};

export default PublicRouter;
