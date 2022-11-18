import * as yup from 'yup';

export const registerSchema = yup.object().shape({
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
	email: yup.string().trim().required('El email es requerido').email('El email no es válido'),
	password: yup
		.string()
		.trim()
		.required('La contraseña es requerida')
		.min(6, 'La contraseña debe tener al menos 6 caracteres'),
	password2: yup
		.string()
		.trim()
		.required('La confirmación de la contraseña es requerida')
		.min(6, 'La confirmación de la contraseña debe tener al menos 6 caracteres')
		.equals([yup.ref('password')], 'Las contraseñas no coinciden'),

	terms: yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones'),
});
