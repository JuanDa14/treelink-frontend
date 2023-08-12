import { Fragment, useRef } from 'react';
import { Formik } from 'formik';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';

import { InputFormik } from '../index';
import { closeProfile } from '../../redux/slices/uiSlice';
import { profileSchema } from '../../schemas';
import { updatedProfile } from '../../redux';

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
			profileImageRef.current.src = reader.result;
		};
	};

	return (
		<Transition.Root show={profile} as={Fragment}>
			<Dialog
				as='div'
				className='fixed z-10 inset-0 overflow-y-auto'
				onClose={() => dispatch(closeProfile())}
			>
				<div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
					</Transition.Child>

					<span
						className='hidden sm:inline-block sm:align-middle sm:h-screen'
						aria-hidden='true'
					>
						&#8203;
					</span>

					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						enterTo='opacity-100 translate-y-0 sm:scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 translate-y-0 sm:scale-100'
						leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
					>
						<div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
							<div className='flex items-center justify-between'>
								<p className='capitalize text-gray-700 font-medium text-step-0'>Perfil</p>
								<div className='hidden sm:block'>
									<button
										onClick={() => dispatch(closeProfile())}
										type='button'
										className='bg-white rounded-md text-gray-400 hover:text-gray-500 outline-none'
									>
										<span className='sr-only'>Cerrar</span>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-6 w-6'
											viewBox='0 0 20 20'
											fill='currentColor'
										>
											<path
												fillRule='evenodd'
												d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
												clipRule='evenodd'
											/>
										</svg>
									</button>
								</div>
							</div>

							<hr className='my-2' />

							<div className='w-full mt-5 flex flex-col items-center justify-center'>
								<img
									ref={profileImageRef}
									className='w-24 h-24 object-cover object-center rounded-full hover:cursor-pointer hover:opacity-50'
									src={imageURL}
									alt={name}
									onClick={() => imageRef.current.click()}
								/>
								<p className='mt-3 mb-3 font-medium text-gray-700 text-step-1'>{name}</p>
							</div>

							<div>
								<Formik
									initialValues={{
										name,
										username,
										file: null,
									}}
									onSubmit={async (values, { setSubmitting }) => {
										await handleUpdatedProfile(values);
										setSubmitting(false);
									}}
									validationSchema={profileSchema}
								>
									{({ handleSubmit, isSubmitting, setFieldValue, values }) => (
										<form onSubmit={handleSubmit} noValidate>
											<input
												type='file'
												className='hidden'
												ref={imageRef}
												name='file'
												onChange={(e) => {
													setFieldValue('file', e.target.files[0]);
													handleChangeImage(e.target.files[0]);
												}}
											/>
											<InputFormik
												name='username'
												text='Nombre de usuario'
												placeholder='Ingrese su nombre de usuario'
												type='text'
												classNameInput={`text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 border-2 leading-tight focus:outline-none focus:shadow-outline h-10`}
												classNameText={`block text-gray-700 text-sm font-semibold mb-2`}
											/>

											<InputFormik
												name='name'
												text='Nombre'
												placeholder='Ingrese su nombre'
												type='text'
												classNameInput={`text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 border-2 leading-tight focus:outline-none focus:shadow-outline h-10`}
												classNameText={`block text-gray-700 text-sm font-semibold mb-2`}
											/>

											<button
												type='submit'
												disabled={isSubmitting}
												className='text-white text-step--1 mt-4 bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded w-full px-2 py-2 text-center disabled:opacity-50 transition-colors duration-300'
											>
												{isSubmitting ? 'Actualizando...' : 'Actualizar'}
											</button>
										</form>
									)}
								</Formik>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
