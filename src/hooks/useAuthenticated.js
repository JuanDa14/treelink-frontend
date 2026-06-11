import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser, logoutUser } from '../redux';
import { getCookie } from '../utils';

export const useAuthenticated = ({ skipRefresh = false } = {}) => {
	const dispatch = useDispatch();

	const { status } = useSelector((state) => state.auth);

	const isAuthenticated = useMemo(() => status === 'authenticated', [status]);

	const refreshToken = getCookie('refreshToken');

	useEffect(() => {
		if (skipRefresh) return;
		if (refreshToken && !isAuthenticated) {
			dispatch(refreshUser(refreshToken));
		}
	}, [dispatch, isAuthenticated, refreshToken, skipRefresh]);

	return { isAuthenticated };
};
