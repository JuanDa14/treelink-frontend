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

	const { name, imageURL, username } = useSelector((state) => state.auth.user);

	const { profile } = useSelector((state) => state.ui);

	const handleUpdatedProfile = async (values) => {
		await dispatch(updatedProfile(values));
		dispatch(closeProfile());
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
							<div className='hidden sm:block absolute top-0 right-0 pt-4 pr-4'>
								<button
									onClick={() => dispatch(closeProfile())}
									type='button'
									className='bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
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

							<Dialog.Title className='capitalize text-gray-500 font-semibold text-step-0 mb-5'>
								Perfil de contacto
							</Dialog.Title>

							<div className='w-full flex flex-col items-center justify-center'>
								<img
									className='max-w-lg max-h-24 rounded-full hover:cursor-pointer hover:opacity-90'
									src={imageURL}
									alt={name}
									onClick={() => imageRef.current.click()}
								/>
								<span className='mt-3 mb-3 capitalize font-bold text-gray-500 text-step-1'>
									{name}
								</span>
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
									{({ handleSubmit, isSubmitting, setFieldValue, values, }) => (
										<form onSubmit={handleSubmit} noValidate>
											{values.file && (
												<div className='flex justify-center items-center gap-3'>
													<span className='mt-3 mb-3 font-semibold text-red-500 capitalize text-step--1'>
														La imagen sera cambiada
													</span>
													<button
														onClick={() => setFieldValue('file', null)}
														className='flex items-center bg-red-500 text-white text-sm font-semibold px-2 py-2 rounded-md hover:bg-red-600'
													>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															fill='none'
															viewBox='0 0 24 24'
															strokeWidth='1.5'
															stroke='currentColor'
															className='w-5 h-5'
														>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																d='M6 18L18 6M6 6l12 12'
															/>
														</svg>
														Cancelar
													</button>
												</div>
											)}

											<input
												type='file'
												className='hidden'
												ref={imageRef}
												name='file'
												onChange={(e) => setFieldValue('file', e.target.files[0])}
											/>
											<InputFormik
												name='username'
												text='Nombre de usuario'
												placeholder='Ingrese su nombre de usuario'
												type='text'
											/>

											<InputFormik
												name='name'
												text='Nombre'
												placeholder='Ingrese su nombre'
												type='text'
											/>

											<button
												type='submit'
												disabled={isSubmitting}
												className='text-white mt-4 bg-gray-700 hover:bg-gray-800 focus:outline-none font-medium rounded-lg w-full px-2 py-2 text-center disabled:bg-gray-500 transition-colors duration-300'
											>
												Guardar
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
