import * as yup from 'yup';
import { usernameField } from './username.schema';

export const profileSchema = yup.object().shape({
	username: usernameField,
	name: yup
		.string()
		.trim()
		.min(3, 'El nombre debe tener al menos 3 caracteres')
		.required('El nombre es requerido'),
	bio: yup.string().max(160, 'Máximo 160 caracteres').trim(),
	showBranding: yup.boolean(),
	file: yup.mixed().nullable().notRequired(),
});
