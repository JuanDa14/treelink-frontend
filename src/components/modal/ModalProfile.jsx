import { useRef } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Camera } from 'lucide-react';

import { InputFormik } from '../index';
import { closeProfile } from '../../redux/slices/uiSlice';
import { profileSchema } from '../../schemas';
import { updatedProfile } from '../../redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const ModalProfile = () => {
	const dispatch = useDispatch();
	const imageRef = useRef(null);
	const profileImageRef = useRef(null);

	const { name, imageURL, username } = useSelector((state) => state.auth.user);
	const { profile } = useSelector((state) => state.ui);

	const handleUpdatedProfile = async (values) => {
		await dispatch(updatedProfile(values));
		dispatch(closeProfile());
	};

	const handleChangeImage = (file) => {
		if (!file) return;
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			if (profileImageRef.current) {
				profileImageRef.current.src = reader.result;
			}
		};
	};

	return (
		<Dialog open={profile} onOpenChange={(open) => !open && dispatch(closeProfile())}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Mi perfil</DialogTitle>
				</DialogHeader>

				<div className='flex flex-col items-center gap-3 py-2'>
					<button type='button' className='relative group' onClick={() => imageRef.current?.click()}>
						<img
							ref={profileImageRef}
							src={imageURL}
							alt={name}
							className='h-24 w-24 rounded-full object-cover ring-4 ring-primary/10'
						/>
						<span className='absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity'>
							<Camera className='h-6 w-6 text-white' />
						</span>
					</button>
					<p className='font-medium text-muted-foreground'>{name}</p>
				</div>

				<Formik
					initialValues={{ name, username, file: null }}
					enableReinitialize
					onSubmit={async (values, { setSubmitting }) => {
						await handleUpdatedProfile(values);
						setSubmitting(false);
					}}
					validationSchema={profileSchema}
				>
					{({ handleSubmit, isSubmitting, setFieldValue }) => (
						<form onSubmit={handleSubmit} noValidate className='space-y-4'>
							<input
								type='file'
								className='hidden'
								ref={imageRef}
								accept='image/*'
								onChange={(e) => {
									setFieldValue('file', e.target.files[0]);
									handleChangeImage(e.target.files[0]);
								}}
							/>
							<InputFormik name='username' text='Nombre de usuario' placeholder='juancode' type='text' />
							<InputFormik name='name' text='Nombre' placeholder='Tu nombre' type='text' />
							<Button type='submit' disabled={isSubmitting} className='w-full'>
								{isSubmitting ? 'Actualizando...' : 'Actualizar perfil'}
							</Button>
						</form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	);
};
