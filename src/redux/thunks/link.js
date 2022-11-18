import { toast } from 'react-toastify';

import { linkApi } from '../../api';
import { getCookie } from '../../utils';

import { createLink, deleteLink, getLinks, updateLink } from '../slices/linkSlice';

export const getUserLinks = () => {
	return async (dispatch) => {
		try {
			const accessToken = getCookie('accessToken');

			const { data } = await linkApi.get('/', {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (data.ok) {
				dispatch(getLinks(data.links));
			}
		} catch (error) {
			const { data } = error.response;
			const message = data.message || data.errors[0].message;
			toast.error(message);
		}
	};
};

export const updatedUserLink = (id, body) => {
	return async (dispatch) => {
		try {
			const accessToken = getCookie('accessToken');

			const formData = new FormData();

			formData.append('name', body.name);
			formData.append('url', body.url);
			formData.append('file', body.file);

			const { data } = await linkApi.put(`/${id}`, formData, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'multipart/form-data',
				},
			});

			if (data.ok) {
				dispatch(updateLink(data.link));
				toast.success('Hoja de arbol actualizada correctamente');
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
			const accessToken = getCookie('accessToken');

			const formData = new FormData();

			formData.append('name', body.name);
			formData.append('url', body.url);
			formData.append('file', body.file);

			const { data } = await linkApi.post('/', formData, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'multipart/form-data',
				},
			});

			if (data.ok) {
				dispatch(createLink(data.link));
				toast.success('Hoja de arbol creada correctamente');
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
			const accessToken = getCookie('accessToken');

			const { data } = await linkApi.delete(`/${id}`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			if (data.ok) {
				dispatch(deleteLink(id));
				toast.success('Hoja de arbol eliminada correctamente');
			}
		} catch (error) {
			console.log(error);
			const { data } = error.response;
			const message = data.message || data.errors[0].message;
			toast.error(message);
		}
	};
};
