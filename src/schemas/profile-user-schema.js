import * as yup from 'yup';

export const profileSchema = yup.object().shape({
	username: yup
		.string()
		.trim()
		.min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
		.required('El nombre de usuario es requerido'),
	name: yup
		.string()
		.trim()
		.min(3, 'El nombre debe tener al menos 3 caracteres')
		.required('El nombre es requerido'),
	bio: yup.string().max(160, 'Máximo 160 caracteres').trim(),
	showBranding: yup.boolean(),
	file: yup.mixed(),
});
