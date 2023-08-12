import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';

import { register } from '../redux';
import { CheckboxFormik, InputFormik, Spinner } from '../components';
import { registerSchema } from '../schemas';

const INITIAL_VALUES = {
	username: '',
	name: '',
	email: '',
	password: '',
	password2: '',
	terms: false,
};

const Register = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const { checking } = useSelector((state) => state.auth);

	const handleRegister = async (values) => {
		await dispatch(register(values));
		navigate('/auth/login');
	};

	if (checking) {
		return <Spinner />;
	}

	return (
		<div className='h-screen w-full flex items-center'>
			<div className='container max-w-md mx-auto xl:max-w-4xl flex bg-white rounded-lg shadow overflow-hidden'>
				<div className='relative hidden xl:block xl:w-1/2 h-full'>
					<img
						className='absolute h-auto w-full object-cover object-center bg-no-repeat bg-cover bg-center'
						src='https://images.unsplash.com/photo-1541233349642-6e425fe6190e'
						alt='my zomato'
					/>
				</div>
				<div className='w-full xl:w-1/2 p-8'>
					<h1 className=' text-2xl font-bold'>Registrarse</h1>
					<div className='flex items-center gap-2'>
						<span className='text-gray-600 text-sm'>¿Ya tienes una cuenta?</span>
						<Link className='text-gray-700 text-sm font-semibold underline' to='/auth/login'>
							Inicia sesion
						</Link>
					</div>
					<Formik
						initialValues={INITIAL_VALUES}
						onSubmit={async (values, { setSubmitting }) => {
							await handleRegister(values);
							setSubmitting(false);
						}}
						validationSchema={registerSchema}
					>
						{({ handleSubmit, isSubmitting }) => (
							<form onSubmit={handleSubmit}>
								<div className='mb-2 mt-4'>
									<InputFormik
										text='Nombre de usuario'
										name='username'
										type='text'
										placeholder='Ingrese su nombre de usuario'
										classNameInput={`text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10`}
										classNameText={`block text-gray-700 text-sm font-semibold mb-2`}
									/>
								</div>
								<div className='mb-2'>
									<InputFormik
										text='Nombre completo'
										name='name'
										type='text'
										placeholder='Ingrese su nombre completo'
										classNameInput={`text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10`}
										classNameText={`block text-gray-700 text-sm font-semibold mb-2`}
									/>
								</div>
								<div className='mb-2'>
									<InputFormik
										text='Email'
										name='email'
										type='email'
										placeholder='Ingrese su correo electronico'
										classNameInput={`text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10`}
										classNameText={`block text-gray-700 text-sm font-semibold mb-2`}
									/>
								</div>
								<div className='mb-2'>
									<InputFormik
										text='Contraseña'
										name='password'
										type='password'
										placeholder='Ingrese su contraseña'
										classNameInput={`text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10`}
										classNameText={`block text-gray-700 text-sm font-semibold mb-2`}
									/>
								</div>
								<div className='mb-2'>
									<InputFormik
										text='Confirmar Contraseña'
										name='password2'
										type='password'
										placeholder='Confirme su contraseña'
										classNameInput={`text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10`}
										classNameText={`block text-gray-700 text-sm font-semibold mb-2`}
									/>
								</div>

								<CheckboxFormik
									label='Acepto los Términos del servicio y la Política de Privacidad'
									name='terms'
								/>
								<div className='flex w-full mt-4'>
									<button
										disabled={isSubmitting}
										className='w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10 disabled:opacity-50'
										type='submit'
									>
										Registrarse
									</button>
								</div>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default Register;
