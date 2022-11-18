import * as yup from 'yup';

export const loginSchema = yup.object().shape({
	email: yup.string().trim().required('El email es requerido').email('El email no es válido'),
	password: yup
		.string()
		.trim()
		.required('La contraseña es requerida')
		.min(6, 'La contraseña debe tener al menos 6 caracteres'),
});
