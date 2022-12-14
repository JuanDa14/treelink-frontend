import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { InputFormik } from '../components';
import { resetPassword } from '../redux';
import { resetPasswordSchema } from '../schemas';

const INITIAL_VALUES = {
	password: '',
	password2: '',
};

const ResetPassword = () => {
	const dispatch = useDispatch();
	const { search } = useLocation();

	const handleResetPassword = async (values) => {
		const token = search.split('=')[1];
		await dispatch(resetPassword(token, values));
	};

	return (
		<div className='w-full h-screen flex items-center mx-auto'>
			<div className='w-full p-5'>
				<div className='max-w-4xl mx-auto text-center rounded-lg p-10 bg-white shadow-lg text-step--1'>
					<h1 className='font-bold text-step-3 mb-3'>Recupera tu contraseña</h1>
					<span className=' text-gray-500 text-step-0'>
						Restaure su contraseña y vuelva a ingresar a su cuenta
					</span>

					<Formik
						initialValues={INITIAL_VALUES}
						onSubmit={async (values, { setSubmitting }) => {
							await handleResetPassword(values);
							setSubmitting(false);
						}}
						validationSchema={resetPasswordSchema}
					>
						{({ handleSubmit, isSubmitting }) => (
							<form className='mt-5' onSubmit={handleSubmit} noValidate>
								<InputFormik
									type='password'
									placeholder='Ingrese su nueva contraseña'
									name='password'
								/>

								<InputFormik
									type='password'
									placeholder='Confirme su nueva contraseña'
									name='password2'
								/>

								<button
									disabled={isSubmitting}
									type='submit'
									className='w-full bg-blue-700 rounded-lg py-2  mt-2 text-white font-semibold disabled:bg-blue-400 hover:bg-blue-600 transition duration-300'
								>
									{isSubmitting ? 'Cargando...' : 'Recuperar contraseña'}
								</button>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
