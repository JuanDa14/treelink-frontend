import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getPublicUserLinks } from '../redux';

export const useGetLinksUser = () => {
	const { imageURL, username: userNameInDB } = useSelector((state) => state.auth.user);

	const dispatch = useDispatch();

	const { username } = useParams();

	useEffect(() => {
		if (username) {
			dispatch(getPublicUserLinks(username));
		}
	}, []);

	return {
		imageURL,
		username: userNameInDB,
	};
};
