import * as yup from 'yup';
import { withLinkMediaValidation } from './link-media.schema';

export const newLinkSchema = withLinkMediaValidation(
	yup.object().shape({
		name: yup.string().required('El nombre del enlace es requerido').trim(),
		url: yup.string().required('La URL es requerida').url('La URL no es válida').trim(),
		description: yup.string().max(120, 'Máximo 120 caracteres').trim(),
		featured: yup.boolean(),
		isActive: yup.boolean(),
		icon: yup.string().trim(),
		file: yup.mixed().nullable(),
	})
);
