import { Dialog, Transition } from '@headlessui/react';
import { Formik } from 'formik';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatedUserLink } from '../../redux';

import { closeModal } from '../../redux/slices/uiSlice';
import { newLinkSchema } from '../../schemas';
import { InputFileFormik } from '../InputFileFormik';
import { InputFormik } from '../InputFormik';

export const ModalForm = () => {
	const dispatch = useDispatch();

	const { modal } = useSelector((state) => state.ui);
	const { link } = useSelector((state) => state.link);

	const [initialValues, setInitialValues] = useState({
		name: '',
		url: '',
		file: null,
	});

	useEffect(() => {
		if (link) {
			setInitialValues({
				name: link.name,
				url: link.url,
				file: null,
			});
		}
	}, [link]);

	const handleEditLink = async (values) => {
		await dispatch(updatedUserLink(link._id, values));
		dispatch(closeModal());
	};

	return (
		<Transition.Root show={modal} as={Fragment}>
			<Dialog
				as='div'
				className='fixed z-10 inset-0 overflow-y-auto'
				onClose={() => dispatch(closeModal())}
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
									onClick={() => dispatch(closeModal())}
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
								Editar hoja de contacto
							</Dialog.Title>

							<Formik
								initialValues={initialValues}
								onSubmit={async (values, { setSubmitting }) => {
									await handleEditLink(values);
									setSubmitting(false);
								}}
								validationSchema={newLinkSchema}
							>
								{({ handleSubmit, setFieldValue, isSubmitting }) => (
									<form onSubmit={handleSubmit} noValidate>
										<InputFormik
											text='Nombre de su hoja de contacto'
											name='name'
											type='text'
											placeholder='Ejemplo: Instagram'
										/>

										<InputFormik
											text='Url de su hoja de contacto'
											name='url'
											type='url'
											placeholder='Ejemplo: https://www.instagram.com'
										/>

										<InputFileFormik
											label='Imagen de su hoja de contacto'
											name='file'
											setFieldValue={setFieldValue}
											textButton='Subir imagen'
										/>

										<button
											disabled={isSubmitting}
											type='submit'
											className='mt-3 block text-white bg-blue-600 hover:bg-blue-700  focus:outline-none font-medium rounded-lg w-full px-2 py-2 text-center disabled:bg-blue-500 transition-colors duration-300'
										>
											Guardar
										</button>
									</form>
								)}
							</Formik>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
};
