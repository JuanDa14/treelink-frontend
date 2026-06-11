import * as yup from 'yup';
import { slugifyUsername, USERNAME_REGEX } from '../utils/slug';

export const usernameField = yup
	.string()
	.trim()
	.required('El nombre de usuario es requerido')
	.transform((value) => slugifyUsername(value))
	.min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
	.max(30, 'Máximo 30 caracteres')
	.matches(USERNAME_REGEX, 'Solo letras minúsculas, números, guiones y guiones bajos (sin espacios)');
