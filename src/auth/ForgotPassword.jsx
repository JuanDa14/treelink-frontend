import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { InputFormik } from '../components';
import { forgotPassword } from '../redux';
import { forgotPasswordSchema } from '../schemas';
import ImageBackground from '../public/images/background.webp';

const INITIAL_VALUES = {
	email: '',
};

const ForgotPassword = () => {
	const dispatch = useDispatch();

	const handleForgotPassword = async (values) => {
		await dispatch(forgotPassword(values));
	};

	return (
		<div className='h-screen w-full flex items-center'>
			<div className='container max-w-md mx-auto xl:max-w-4xl flex flex-row-reverse bg-white rounded-lg shadow overflow-hidden'>
				<div className='relative hidden xl:block xl:w-1/2 h-full'>
					<img
						className='absolute h-auto w-full object-cover'
						src={ImageBackground}
						alt='imagen forgot password'
					/>
				</div>
				<div className='w-full xl:w-1/2 p-8'>
					<h1 className=' text-2xl font-bold'>Recuperar Cuenta</h1>
					<div className='flex items-center gap-2'>
						<span className='text-gray-600 text-sm'>
							Solo ingresa tu correo electrónico, te enviaremos un enlace para recuperar tu
							cuenta.
						</span>
					</div>
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
								<div className='mb-4'>
									<InputFormik
										type='email'
										placeholder='Ingrese su correo electrónico'
										name='email'
										classNameInput={`text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10`}
										classNameText={`block text-gray-700 text-sm font-semibold mb-2`}
									/>
								</div>
								<button
									disabled={isSubmitting}
									type='submit'
									className='w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10 disabled:opacity-50'
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
