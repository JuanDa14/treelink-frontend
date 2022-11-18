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
		<div className='w-full h-screen flex items-center mx-auto bg-gray-700'>
			<div className='w-full'>
				<div className='max-w-4xl mx-auto text-center rounded-lg p-10 text-white'>
					<h1 className='font-bold text-step-3'>Recupera tu contraseña</h1>
					<span className=' text-step-1 flex flex-col gap-3 mt-5 capitalize'>
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
									classNameInput='w-full bg-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
								/>

								<InputFormik
									type='password'
									placeholder='Confirme su nueva contraseña'
									name='password2'
									classNameInput='w-full bg-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
								/>

								<button
									disabled={isSubmitting}
									type='submit'
									className='w-full bg-blue-600 rounded-lg p-3 mt-5 text-white font-semibold uppercase disabled:bg-blue-400'
								>
									Restablecer contraseña
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
