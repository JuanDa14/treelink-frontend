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
		<div className='w-full h-screen flex items-center mx-auto bg-gray-700'>
			<div className='w-full'>
				<div className='max-w-4xl mx-auto text-center rounded-lg p-10 text-white'>
					<h1 className='font-bold text-step-3'>Recupera tu contraseña</h1>
					<span className=' text-step-1 flex flex-col gap-3 mt-5 capitalize'>
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
									classNameInput='w-full bg-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
								/>

								<button
									disabled={isSubmitting}
									type='submit'
									className='w-full bg-blue-600 rounded-lg p-3 mt-5 text-white font-semibold uppercase disabled:bg-blue-400 disabled:cursor-not-allowed'
								>
									Recuperar contraseña
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
