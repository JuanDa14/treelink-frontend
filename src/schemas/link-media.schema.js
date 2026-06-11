import * as yup from 'yup';

export const linkMediaFields = {
	icon: yup.string().trim(),
	file: yup.mixed().nullable(),
};

export const withLinkMediaValidation = (schema) =>
	schema.test('image-or-icon', 'Selecciona un icono o sube una imagen', (values) => {
		return Boolean(values?.icon) || Boolean(values?.file);
	});
