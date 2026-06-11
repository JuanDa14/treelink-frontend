import { useRef, useState } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Camera, Globe, User, Settings } from 'lucide-react';

import { InputFormik, SwitchFormik, TextareaFormik } from '../index';
import { closeProfile } from '../../redux/slices/uiSlice';
import { profileSchema } from '../../schemas';
import { updatedProfile } from '../../redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { buildPublicUrl, slugifyUsername } from '../../utils';

const TABS = [
	{ id: 'profile', label: 'Perfil', icon: User },
	{ id: 'page', label: 'Página pública', icon: Globe },
	{ id: 'account', label: 'Cuenta', icon: Settings },
];

export const ModalProfile = () => {
	const dispatch = useDispatch();
	const imageRef = useRef(null);
	const profileImageRef = useRef(null);
	const [activeTab, setActiveTab] = useState('profile');

	const { name, imageURL, username, email, bio, showBranding, google } = useSelector(
		(state) => state.auth.user
	);
	const { profile } = useSelector((state) => state.ui);

	const publicUrl = buildPublicUrl(username);

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
			<DialogContent className='max-w-lg max-h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>Configuración</DialogTitle>
				</DialogHeader>

				<div className='flex gap-1 p-1 rounded-full bg-secondary mb-4'>
					{TABS.map(({ id, label, icon: Icon }) => (
						<button
							key={id}
							type='button'
							onClick={() => setActiveTab(id)}
							className={cn(
								'flex-1 flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-all',
								activeTab === id
									? 'bg-background text-foreground shadow-sm'
									: 'text-muted-foreground hover:text-foreground'
							)}
						>
							<Icon className='h-3.5 w-3.5' />
							<span className='hidden sm:inline'>{label}</span>
						</button>
					))}
				</div>

				<Formik
					initialValues={{
						name: name || '',
						username: username || '',
						bio: bio || '',
						showBranding: showBranding !== false,
						file: null,
					}}
					enableReinitialize
					onSubmit={async (values, { setSubmitting }) => {
						await handleUpdatedProfile(values);
						setSubmitting(false);
					}}
					validationSchema={profileSchema}
				>
					{({ handleSubmit, isSubmitting, setFieldValue, values }) => (
						<form onSubmit={handleSubmit} noValidate className='space-y-4'>
							{activeTab === 'profile' && (
								<>
									<div className='flex flex-col items-center gap-3 py-2'>
										<button
											type='button'
											className='relative group'
											onClick={() => imageRef.current?.click()}
										>
											<img
												ref={profileImageRef}
												src={imageURL}
												alt={name}
												className='h-24 w-24 rounded-full object-cover ring-4 ring-border'
											/>
											<span className='profile-avatar-overlay'>
												<Camera className='h-6 w-6 text-primary-foreground' />
											</span>
										</button>
										<p className='font-medium text-muted-foreground'>{name}</p>
									</div>
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
									<InputFormik
										name='username'
										text='Nombre de usuario (URL pública)'
										placeholder='juan-morales'
										type='text'
										classNameContainer='space-y-1'
									/>
									<p className='text-xs text-muted-foreground -mt-2 mb-2'>
										Sin espacios. Tu link:{' '}
										<span className='font-mono text-primary'>
											{buildPublicUrl(values.username || slugifyUsername(username))}
										</span>
									</p>
									<InputFormik name='name' text='Nombre para mostrar' placeholder='Juan Morales' type='text' />
								</>
							)}

							{activeTab === 'page' && (
								<>
									<TextareaFormik
										name='bio'
										text='Bio de tu página'
										placeholder='Cuéntale a tus visitantes quién eres o qué haces'
										rows={3}
									/>
									<SwitchFormik
										name='showBranding'
										label='Mostrar "Creado con TreeLink"'
										description='Muestra el pie de página en tu link público.'
									/>
									<div className='rounded-2xl border-2 border-border bg-secondary px-4 py-3'>
										<p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1'>
											Vista previa de tu URL
										</p>
										<p className='text-sm font-mono break-all'>{publicUrl}</p>
									</div>
									<Button type='button' variant='outline' asChild className='w-full'>
										<Link to='/preview' onClick={() => dispatch(closeProfile())}>
											Ver vista previa completa
										</Link>
									</Button>
								</>
							)}

							{activeTab === 'account' && (
								<div className='space-y-4'>
									<div className='rounded-2xl border-2 border-border bg-secondary px-4 py-3'>
										<p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Email</p>
										<p className='text-sm font-medium mt-1'>{email}</p>
									</div>
									<div className='rounded-2xl border-2 border-border bg-secondary px-4 py-3'>
										<p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Tipo de cuenta</p>
										<p className='text-sm font-medium mt-1'>
											{google ? 'Google' : 'Email y contraseña'}
										</p>
									</div>
									{!google && (
										<Button type='button' variant='outline' asChild className='w-full'>
											<Link to='/auth/forgot-password' onClick={() => dispatch(closeProfile())}>
												Cambiar contraseña
											</Link>
										</Button>
									)}
								</div>
							)}

							{activeTab !== 'account' && (
								<Button type='submit' disabled={isSubmitting} className='w-full'>
									{isSubmitting ? 'Guardando...' : 'Guardar cambios'}
								</Button>
							)}
						</form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	);
};
