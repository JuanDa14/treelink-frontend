import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputFormik } from '../components';
import { resetPassword } from '../redux';
import { resetPasswordSchema } from '../schemas';
import ImageBackground from '../public/images/background.webp';

const INITIAL_VALUES = {
	password: '',
	password2: '',
};

const ResetPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { search } = useLocation();

	const handleResetPassword = async (values) => {
		const token = search.split('=')[1];
		await dispatch(resetPassword(token, values));
		navigate('/auth/login', { replace: true });
	};

	return (
		<div className='h-screen w-full flex items-center'>
			<div className='container max-w-md mx-auto xl:max-w-4xl flex flex-row-reverse bg-white rounded-lg shadow overflow-hidden'>
				<div className='relative hidden xl:block xl:w-1/2 h-full'>
					<img
						className='absolute h-auto w-full object-cover'
						src={ImageBackground}
						alt='imagen reset password'
					/>
				</div>
				<div className='w-full xl:w-1/2 p-8'>
					<h1 className=' text-2xl font-bold'>Restablecer contraseña</h1>
					<div className='flex items-center gap-2'>
						<span className='text-gray-600 text-sm'>
							Ingrese su nueva contraseña y confírmela para restablecerla en su cuenta.
						</span>
					</div>
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
								<div className='mb-2'>
									<InputFormik
										type='password'
										placeholder='Ingrese su nueva contraseña'
										name='password'
										classNameInput={`text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10`}
										classNameText={`block text-gray-700 text-sm font-semibold mb-2`}
									/>
								</div>

								<div className='mb-4'>
									<InputFormik
										type='password'
										placeholder='Confirme su nueva contraseña'
										name='password2'
										classNameInput={`text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10`}
										classNameText={`block text-gray-700 text-sm font-semibold mb-2`}
									/>
								</div>

								<button
									disabled={isSubmitting}
									type='submit'
									className='w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10 disabled:opacity-50'
								>
									{isSubmitting ? 'Restableciendo...' : 'Restablecer contraseña'}
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
