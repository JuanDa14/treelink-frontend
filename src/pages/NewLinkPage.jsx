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
		<Layout>
			<div className='container mt-5 text-step--1'>
				<h1 className='capitalize text-gray-500 font-bold text-step-1 mb-3 text-center'>
					Crear nueva hoja de contacto para <span className='text-blue-500'>mi arbol</span>
				</h1>
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
								placeholder='Ejemplo: Instagram'
							/>

							<InputFormik
								text='Url de su hoja de contacto'
								name='url'
								type='url'
								placeholder='Ejemplo: https://www.instagram.com'
							/>

							<InputFileFormik
								disable={isSubmitting}
								textButton='Subir imagen'
								label='Imagen de su hoja de contacto'
								name='file'
								setFieldValue={setFieldValue}
							/>

							<button
								disabled={isSubmitting}
								type='submit'
								className='text-white mt-4 bg-blue-700 hover:bg-blue-600 focus:outline-none font-semibold rounded-lg w-full px-2 py-2 text-center disabled:bg-blue-400 transition-colors duration-300'
							>
								{isSubmitting ? 'Creando...' : 'Crear hoja de contacto'}
							</button>
						</form>
					)}
				</Formik>
			</div>
		</Layout>
	);
};

export default NewLinkPage;
