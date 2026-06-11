import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updatedUserLink } from '../../redux';
import { closeModal } from '../../redux/slices/uiSlice';
import { editLinkSchema } from '../../schemas';
import { InputFileFormik } from '../InputFileFormik';
import { InputFormik } from '../InputFormik';
import { SwitchFormik } from '../SwitchFormik';
import { TextareaFormik } from '../TextareaFormik';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const ModalForm = () => {
	const dispatch = useDispatch();
	const { modal } = useSelector((state) => state.ui);
	const { link } = useSelector((state) => state.link);

	const [initialValues, setInitialValues] = useState({
		name: '',
		url: '',
		description: '',
		featured: false,
		isActive: true,
		file: null,
	});

	useEffect(() => {
		if (link) {
			setInitialValues({
				name: link.name,
				url: link.url,
				description: link.description || '',
				featured: Boolean(link.featured),
				isActive: link.isActive !== false,
				file: link.imageURL,
			});
		}
	}, [link]);

	const handleEditLink = async (values) => {
		await dispatch(updatedUserLink(link._id, values));
		dispatch(closeModal());
	};

	return (
		<Dialog open={modal} onOpenChange={(open) => !open && dispatch(closeModal())}>
			<DialogContent className='max-h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>Editar enlace</DialogTitle>
				</DialogHeader>
				<Formik
					initialValues={initialValues}
					enableReinitialize
					onSubmit={async (values, { setSubmitting }) => {
						await handleEditLink(values);
						setSubmitting(false);
					}}
					validationSchema={editLinkSchema}
				>
					{({ handleSubmit, setFieldValue, isSubmitting }) => (
						<form onSubmit={handleSubmit} noValidate className='space-y-4'>
							<InputFormik
								text='Nombre'
								name='name'
								type='text'
								placeholder='Instagram, LinkedIn...'
							/>
							<InputFormik
								text='URL'
								name='url'
								type='url'
								placeholder='https://instagram.com/username'
							/>
							<TextareaFormik
								text='Descripción (opcional)'
								name='description'
								placeholder='Texto breve bajo el nombre del enlace'
							/>
							<InputFileFormik
								value={initialValues.file}
								disable={isSubmitting}
								label='Imagen'
								name='file'
								setFieldValue={setFieldValue}
								textButton='Cambiar imagen'
							/>
							<div className='space-y-3'>
								<SwitchFormik
									name='featured'
									label='Destacar enlace'
									description='Resalta este enlace en tu página pública.'
								/>
								<SwitchFormik
									name='isActive'
									label='Visible en página pública'
									description='Desactívalo para ocultarlo sin borrarlo.'
								/>
							</div>
							<Button disabled={isSubmitting} className='w-full' type='submit'>
								{isSubmitting ? 'Guardando...' : 'Guardar cambios'}
							</Button>
						</form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	);
};
