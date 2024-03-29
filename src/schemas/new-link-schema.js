import * as yup from 'yup';

export const newLinkSchema = yup.object().shape({
	name: yup.string().required('El nombre de su hoja de contacto es requerido').trim(),
	url: yup
		.string()
		.required('La url es de su hoja de contacto es requerido')
		.url('La url no es valida')
		.trim(),
	file: yup.mixed().required('La imagen es requerida'),
});
