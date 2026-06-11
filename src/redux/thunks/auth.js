import { toast } from 'react-toastify';

import { userApi } from '../../api';
import { getUserLinks } from './link';
import {
	loginUser,
	verifiedUser,
	verificationFailed,
	setVerificationHint,
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
			const message =
				error.response?.data?.message ||
				error.response?.data?.errors?.[0]?.message ||
				'No se pudo iniciar sesión';

			if (message.toLowerCase().includes('verifica')) {
				dispatch(
					setVerificationHint(
						'Revisa tu bandeja de entrada y haz clic en el enlace de verificación. Si no lo encuentras, revisa spam.'
					)
				);
			}

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
	return async (dispatch) => {
		dispatch(startChecking());
		try {
			const { data } = await userApi.post('/register', body);

			if (data.ok) {
				toast.success('Revisa tu correo para verificar tu cuenta');
				return { ok: true, message: data.message };
			}

			return { ok: false };
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error.response?.data?.errors?.[0]?.message ||
				'No se pudo registrar la cuenta';
			toast.error(message);
			return { ok: false };
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
			const message =
				error.response?.data?.message ||
				error.response?.data?.errors?.[0]?.message ||
				'No se pudo iniciar sesión con Google';

			if (message.toLowerCase().includes('verifica')) {
				dispatch(
					setVerificationHint(
						'Revisa tu bandeja de entrada y haz clic en el enlace de verificación. Si no lo encuentras, revisa spam.'
					)
				);
			}

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
				toast.success('Cuenta verificada correctamente');
				return { ok: true };
			}

			dispatch(verificationFailed('No se pudo verificar la cuenta'));
			return { ok: false };
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error.response?.data?.errors?.[0]?.message ||
				'El enlace de verificación no es válido o ya expiró';
			dispatch(verificationFailed(message));
			toast.error(message);
			return { ok: false };
		} finally {
			dispatch(finishChecking());
		}
	};
};

export const resendVerification = (body) => {
	return async () => {
		try {
			const { data } = await userApi.post('/resend-verification', body);

			if (data.ok) {
				toast.success(data.message);
				return { ok: true, remaining: data.remaining };
			}

			return { ok: false };
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error.response?.data?.errors?.[0]?.message ||
				'No se pudo reenviar el correo';
			toast.error(message);
			return {
				ok: false,
				remaining: error.response?.data?.remaining,
			};
		}
	};
};

export const forgotPassword = (email) => {
	return async (dispatch) => {
		dispatch(startChecking());
		try {
			const { data } = await userApi.post('/forgot-password', email);

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

export const resetPassword = (token, body) => {
	return async (dispatch) => {
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
			const headers = { Authorization: `Bearer ${accessToken}` };
			const payload = {
				username: body.username,
				name: body.name,
				bio: body.bio || '',
				showBranding: body.showBranding !== false,
			};

			let data;

			if (body.file instanceof File) {
				const formData = new FormData();
				Object.entries(payload).forEach(([key, value]) => formData.append(key, String(value)));
				formData.append('file', body.file);
				({ data } = await userApi.post('/profile', formData, { headers }));
			} else {
				({ data } = await userApi.post('/profile', payload, { headers }));
			}

			if (data.ok) {
				dispatch(loginUser(data.user));
				toast.success('Perfil actualizado');
				return { ok: true };
			}

			return { ok: false };
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error.response?.data?.errors?.[0]?.message ||
				'No se pudo actualizar el perfil';
			toast.error(message);
			return { ok: false };
		} finally {
			dispatch(finishChecking());
		}
	};
};

export const getPublicUserLinks = (username) => {
	return async (dispatch) => {
		dispatch(startChecking());
		try {
			const { data } = await userApi.get(`/${encodeURIComponent(username)}`);

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
