import * as yup from 'yup';

export const forgotPasswordSchema = yup.object().shape({
	email: yup.string().trim().required('El email es requerido').email('El email no es válido'),
});
export const passwordResetCodeSchema = yup.object().shape({
	code: yup
		.string()
		.trim()
		.required('El código es requerido')
		.matches(/^\d{6}$/, 'El código debe tener 6 dígitos'),
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
});

export const resetPasswordSchema = yup.object().shape({
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
});
