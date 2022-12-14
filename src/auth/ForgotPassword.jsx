import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { InputFormik } from '../components';
import { forgotPassword } from '../redux';
import { forgotPasswordSchema } from '../schemas';

const INITIAL_VALUES = {
	email: '',
};

const ForgotPassword = () => {
	const dispatch = useDispatch();

	const handleForgotPassword = async (values) => {
		await dispatch(forgotPassword(values));
	};

	return (
		<div className='w-full h-screen flex items-center mx-auto'>
			<div className='w-full px-5'>
				<div className='max-w-4xl mx-auto text-center shadow-lg rounded-lg p-10 bg-white text-step--1'>
					<h1 className='font-bold text-step-3 mb-3'>Recupera tu contraseña</h1>
					<span className='text-step-0 text-gray-500'>
						Ingresa tu correo electronico y te enviaremos un link para recuperar tu contraseña
					</span>

					<Formik
						initialValues={INITIAL_VALUES}
						onSubmit={async (values, { setSubmitting }) => {
							await handleForgotPassword(values);
							setSubmitting(false);
						}}
						validationSchema={forgotPasswordSchema}
					>
						{({ handleSubmit, isSubmitting }) => (
							<form className='mt-5' onSubmit={handleSubmit} noValidate>
								<InputFormik
									type='email'
									placeholder='Ingrese su correo electronico'
									name='email'
								/>

								<button
									disabled={isSubmitting}
									type='submit'
									className='w-full bg-blue-700 rounded-lg py-2 text-white font-semibold hover:bg-blue-600 disabled:bg-blue-400 transition-colors duration-300'
								>
									{isSubmitting ? 'Enviando...' : 'Enviar'}
								</button>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
