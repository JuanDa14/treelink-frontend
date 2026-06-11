import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updatedUserLink } from '../../redux';
import { closeModal } from '../../redux/slices/uiSlice';
import { editLinkSchema } from '../../schemas';
import { InputFormik } from '../InputFormik';
import { LinkIconPicker } from '../LinkIconPicker';
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
		icon: 'link',
		file: null,
	});

	useEffect(() => {
		if (link?._id) {
			setInitialValues({
				name: link.name,
				url: link.url,
				description: link.description || '',
				featured: Boolean(link.featured),
				isActive: link.isActive !== false,
				icon: link.icon || (link.imageURL ? '' : 'link'),
				file: link.imageURL || null,
			});
		}
	}, [link]);

	const handleEditLink = async (values, { setSubmitting }) => {
		await dispatch(updatedUserLink(link._id, values));
		setSubmitting(false);
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
					onSubmit={handleEditLink}
					validationSchema={editLinkSchema}
				>
					{({ handleSubmit, isSubmitting }) => (
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
							<LinkIconPicker disable={isSubmitting} />
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
