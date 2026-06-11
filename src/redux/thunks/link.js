import { toast } from 'react-toastify';

import { linkApi } from '../../api';
import { getCookie } from '../../utils';

import {
	createLink,
	deleteLink,
	finishLoading,
	finishReordering,
	getLinks,
	reorderLinks,
	startLoading,
	startReordering,
	updateLink,
} from '../slices/linkSlice';
import { loginUser } from '../slices/authSlice';

const authHeaders = () => ({
	Authorization: `Bearer ${getCookie('accessToken')}`,
});

const appendLinkFields = (formData, body) => {
	formData.append('name', body.name);
	formData.append('url', body.url);
	formData.append('description', body.description || '');
	formData.append('featured', String(Boolean(body.featured)));
	formData.append('isActive', String(body.isActive !== false));
	if (body.file instanceof File) {
		formData.append('file', body.file);
		formData.append('icon', '');
	} else if (body.icon) {
		formData.append('icon', body.icon);
	}
};

export const getUserLinks = () => {
	return async (dispatch) => {
		dispatch(startLoading());

		try {
			const { data } = await linkApi.get('/', { headers: authHeaders() });

			if (data.ok) {
				dispatch(getLinks(data.links));
			}
		} catch (error) {
			const { data } = error.response;
			const message = data.message || data.errors[0].message;
			toast.error(message);
		} finally {
			dispatch(finishLoading());
		}
	};
};

export const updatedUserLink = (id, body) => {
	return async (dispatch) => {
		try {
			const formData = new FormData();
			appendLinkFields(formData, body);

			const { data } = await linkApi.put(`/${id}`, formData, {
				headers: authHeaders(),
			});

			if (data.ok) {
				dispatch(updateLink(data.link));
				toast.success('Enlace actualizado correctamente');
			}
		} catch (error) {
			const { data } = error.response;
			const message = data.message || data.errors[0].message;
			toast.error(message);
		}
	};
};

export const createUserLink = (body) => {
	return async (dispatch) => {
		try {
			const formData = new FormData();
			appendLinkFields(formData, body);

			const { data } = await linkApi.post('/', formData, {
				headers: authHeaders(),
			});

			if (data.ok) {
				dispatch(createLink(data.link));
				toast.success('Enlace creado correctamente');
			}
		} catch (error) {
			const { data } = error.response;
			const message = data.message || data.errors[0].message;
			toast.error(message);
		}
	};
};

export const deletedUserLink = (id) => {
	return async (dispatch) => {
		try {
			const { data } = await linkApi.delete(`/${id}`, { headers: authHeaders() });

			if (data.ok) {
				dispatch(deleteLink(id));
				toast.success('Enlace eliminado correctamente');
			}
		} catch (error) {
			const { data } = error.response;
			const message = data.message || data.errors[0].message;
			toast.error(message);
		}
	};
};

export const reorderUserLinks = (linkIds) => {
	return async (dispatch, getState) => {
		const previousLinks = getState().link.links;
		const optimisticLinks = linkIds
			.map((id) => previousLinks.find((link) => link._id === id))
			.filter(Boolean);

		dispatch(reorderLinks(optimisticLinks));
		dispatch(startReordering());

		try {
			const { data } = await linkApi.put(
				'/reorder',
				{ linkIds },
				{ headers: authHeaders() }
			);

			if (data.ok) {
				dispatch(reorderLinks(data.links));
			}
		} catch (error) {
			dispatch(reorderLinks(previousLinks));
			const { data } = error.response;
			const message = data?.message || data?.errors?.[0]?.message || 'No se pudo reordenar';
			toast.error(message);
		} finally {
			dispatch(finishReordering());
		}
	};
};

export const seedDefaultUserData = () => {
	return async (dispatch, getState) => {
		dispatch(startLoading());

		try {
			const { data } = await linkApi.post('/seed-defaults', {}, { headers: authHeaders() });

			if (data.ok) {
				dispatch(getLinks(data.links));

				if (data.user?.bio) {
					const currentUser = getState().auth.user;
					dispatch(loginUser({ ...currentUser, bio: data.user.bio }));
				}

				toast.success(data.message || 'Enlaces de ejemplo listos. ¡Personalízalos!');
				return { ok: true };
			}

			return { ok: false };
		} catch (error) {
			const message =
				error.response?.data?.message ||
				error.response?.data?.errors?.[0]?.message ||
				'No se pudieron crear los datos de ejemplo';
			toast.error(message);
			return { ok: false };
		} finally {
			dispatch(finishLoading());
		}
	};
};

export const toggleLinkField = (id, field, value) => {
	return async (dispatch, getState) => {
		const previousLinks = getState().link.links;
		const currentLink = previousLinks.find((link) => link._id === id);

		if (currentLink) {
			dispatch(updateLink({ ...currentLink, [field]: value }));
		}

		try {
			const { data } = await linkApi.patch(`/${id}`, { [field]: value }, { headers: authHeaders() });

			if (data.ok) {
				dispatch(updateLink(data.link));
				toast.success(field === 'featured' ? 'Destacado actualizado' : 'Visibilidad actualizada');
			}
		} catch (error) {
			if (currentLink) {
				dispatch(updateLink(currentLink));
			}
			const message =
				error.response?.data?.message ||
				error.response?.data?.errors?.[0]?.message ||
				'No se pudo actualizar';
			toast.error(message);
		}
	};
};
