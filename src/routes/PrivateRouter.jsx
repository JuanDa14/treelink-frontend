import { Navigate, Outlet } from 'react-router-dom';
import { useAuthenticated } from '../hooks';

const PrivateRouter = () => {
	const { isAuthenticated } = useAuthenticated();

	return isAuthenticated ? <Outlet /> : <Navigate to='/auth/login' />;
};

export default PrivateRouter;
