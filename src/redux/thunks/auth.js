import { toast } from 'react-toastify';

import { userApi } from '../../api';
import { getUserLinks } from './link';
import {
	loginUser,
	verifiedUser,
	logout,
	startChecking,
	finishChecking,
} from '../slices/authSlice';
import { getLinks } from '../slices/linkSlice';
import { setCookie, getCookie, removeCookie } from '../../utils';
import { errorIsTrue } from '../slices/uiSlice';

export const login = (body) => {
	return async (dispatch) => {
		dispatch(startChecking());
		try {
			const { data } = await userApi.post('/login', body);

			if (data.ok) {
				await dispatch(loginUser(data.user));

				setCookie(['accessToken', 'refreshToken'], [data.accessToken, data.refreshToken]);

				dispatch(getUserLinks());
			}
		} catch (error) {
			const { data } = error.response;
			const message = data.message || data.errors[0].message;
			toast.error(message);
			dispatch(logoutUser());
		} finally {
			dispatch(finishChecking());
		}
	};
};

export const refreshUser = (refreshToken) => {
	return async (dispatch) => {
		dispatch(startChecking());
		try {
			const { data } = await userApi.get('/refresh', {
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
			});

			if (data.ok) {
				await dispatch(loginUser(data.user));
				setCookie(['accessToken', 'refreshToken'], [data.accessToken, data.refreshToken]);
				dispatch(getUserLinks());
			}
		} catch (error) {
			const { data } = error.response;
			const message = data.message || data.errors[0].message;
			toast.error(message);
			dispatch(logoutUser());
		} finally {
			dispatch(finishChecking());
		}
	};
};

export const register = (body) => {
	return async () => {
		dispatch(startChecking());
		try {
			const { data } = await userApi.post('/register', body);

			if (data.ok) {
				return toast.success(data.message);
			}
		} catch (error) {
			const { data } = error.response;
			const message = data.message || data.errors[0].message;
			toast.error(message);
		} finally {
			dispatch(finishChecking());
		}
	};
};

export const loginWithGoogle = ({ tokenId, email }) => {
	return async (dispatch) => {
		dispatch(startChecking());

		try {
			const { data } = await userApi.post(
				'/google',
				{
					email,
					username: email.split('@')[0],
				},
				{
					headers: {
						Authorization: `Bearer ${tokenId}`,
					},
				}
			);

			if (data.ok && !data.user) return toast.success(data.message);

			if (data.ok && data.user) {
				await dispatch(loginUser(data.user));

				setCookie(['accessToken', 'refreshToken'], [data.accessToken, data.refreshToken]);

				dispatch(getUserLinks());
			}
		} catch (error) {
			const { data } = error.response;
			const message = data.message || data.errors[0].message;
			toast.error(message);
		} finally {
			dispatch(finishChecking());
		}
	};
};

export const loginWithFacebook = (formValues) => {
	return async (dispatch) => {
		dispatch(startChecking());

		try {
			const { picture, name, email } = formValues;

			const body = {
				imageURL: picture.data.url,
				name,
				email,
				username: email.split('@')[0],
			};

			const { data } = await userApi.post('/facebook', body);

			if (data.ok) {
				await dispatch(loginUser(data.user));

				setCookie(['accessToken', 'refreshToken'], [data.accessToken, data.refreshToken]);

				dispatch(getUserLinks());
			}

			// const url = `debug_token?input_token=${token}&access_token=${token}`;
			// const {
			// 	data: { is_valid },
			// } = await fetchNotToken(url, 'GET');
		} catch (error) {
			const { data } = error.response;
			const message = data.message || data.errors[0].message;
			toast.error(message);
		} finally {
			dispatch(finishChecking());
		}
	};
};

export const verifiedEmail = (token) => {
	return async (dispatch) => {
		dispatch(startChecking());

		try {
			const { data } = await userApi.get(`/verified/${token}`);

			if (data.ok) {
				dispatch(verifiedUser());
			}
		} catch (error) {
			const { data } = error.response;
			const message = data.message || data.errors[0].message;
			toast.error(message);
		} finally {
			dispatch(finishChecking());
		}
	};
};

export const forgotPassword = (email) => {
	return async () => {
		dispatch(startChecking());
		try {
			const { data } = await userApi.post('/forgot-password', email);

			if (data.ok) {
				return toast.success(data.message);
			}
		} catch (error) {
			console.log(error.response);
			const { data } = error.response;
			const message = data.message || data.errors[0].message;
			toast.error(message);
		} finally {
			dispatch(finishChecking());
		}
	};
};

export const resetPassword = (token, body) => {
	return async () => {
		dispatch(startChecking());
		try {
			const { data } = await userApi.post(`/reset-password/${token}`, body);

			if (data.ok) {
				return toast.success(data.message);
			}
		} catch (error) {
			const { data } = error.response;
			const message = data.message || data.errors[0].message;
			toast.error(message);
		} finally {
			dispatch(finishChecking());
		}
	};
};

export const updatedProfile = (body) => {
	return async (dispatch) => {
		dispatch(startChecking());

		try {
			const accessToken = getCookie('accessToken');

			const formData = new FormData();
			formData.append('username', body.username);
			formData.append('name', body.name);
			formData.append('email', body.email);
			formData.append('file', body.file);

			const { data } = await userApi.post('/profile', formData, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'multipart/form-data',
				},
			});

			if (data.ok) {
				dispatch(loginUser(data.user));
				return toast.success('Perfil actualizado');
			}
		} catch (error) {
			const { data } = error.response;
			const message = data.message || data.errors[0].message;
			toast.error(message);
		} finally {
			dispatch(finishChecking());
		}
	};
};

export const getPublicUserLinks = (username) => {
	return async (dispatch) => {
		dispatch(startChecking());
		try {
			const { data } = await userApi.get(`/${username}`);

			if (data.ok) {
				dispatch(loginUser(data.user));
				dispatch(getLinks(data.user.links));
			}
		} catch (error) {
			dispatch(errorIsTrue());
			const { data } = error.response;
			const message = data.message || data.errors[0].message;
			toast.error(message);
		} finally {
			dispatch(finishChecking());
		}
	};
};

export const logoutUser = () => {
	return (dispatch) => {
		removeCookie(['accessToken', 'refreshToken']);
		dispatch(logout());
	};
};
