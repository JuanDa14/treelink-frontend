import * as yup from 'yup';

export const profileSchema = yup.object().shape({
	username: yup
		.string()
		.trim()
		.min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
		.required('El nombre de usuario es requerido')
		.trim(),
	name: yup
		.string()
		.trim()
		.min(3, 'El nombre debe tener al menos 3 caracteres')
		.required('El nombre es requerido')
		.trim(),
	file: yup.mixed(),
});
