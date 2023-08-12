import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { InputFileFormik, InputFormik } from '../components';
import { createUserLink } from '../redux';
import { Layout } from '../layouts';
import { newLinkSchema } from '../schemas';

const INITIAL_VALUES = {
	name: '',
	url: '',
	file: null,
};

const NewLinkPage = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleNewLink = async (values) => {
		await dispatch(createUserLink(values));
		navigate('/', { replace: true });
	};

	return (
		<Layout classNameMain={'bg-gray-100'}>
			<div className='container mt-10 mx-auto'>
				<div className='max-w-lg mx-auto'>
					<Formik
						initialValues={INITIAL_VALUES}
						onSubmit={async (values, { setSubmitting }) => {
							await handleNewLink(values);
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
									placeholder='Instagram, Facebook, Twitter...'
									classNameInput={`text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 border-2 leading-tight focus:outline-none focus:shadow-outline h-10`}
									classNameText={`block text-gray-700 text-sm font-semibold mb-2`}
								/>

								<InputFormik
									text='URL de su hoja de contacto'
									name='url'
									type='url'
									placeholder='https://instagram.com/username'
									classNameInput={`text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 border-2 leading-tight focus:outline-none focus:shadow-outline h-10`}
									classNameText={`block text-gray-700 text-sm font-semibold mb-2`}
								/>

								<InputFileFormik
									disable={isSubmitting}
									textButton='Subir imagen'
									label='Imagen de su hoja de contacto'
									name='file'
									setFieldValue={setFieldValue}
									classNameText={`block text-gray-700 text-sm font-semibold mb-2`}
									classNameButton={
										'text-white text-sm bg-black focus:outline-none font-semibold rounded'
									}
								/>

								<button
									disabled={isSubmitting}
									type='submit'
									className='text-white mt-4 bg-blue-500 hover:bg-blue-600 focus:outline-none font-semibold rounded w-full px-2 py-2 text-center disabled:bg-blue-200 transition-colors duration-300'
								>
									{isSubmitting ? 'Creando...' : 'Guardar'}
								</button>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</Layout>
	);
};

export default NewLinkPage;
