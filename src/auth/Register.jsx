import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';

import { register } from '../redux';
import { CheckboxFormik, InputFormik } from '../components';
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

	const handleRegister = async (values) => {
		await dispatch(register(values));
		navigate('/auth/login');
	};

	return (
		<div className='w-full h-screen'>
			<div className='h-full p-5 mx-auto max-w-xl flex flex-col justify-center text-step--1 md:p-0'>
				<div className='shadow-lg p-5 rounded-lg bg-white'>
					<h1 className='font-bold text-step-3 text-center'>Registrarse</h1>

					<span className='font-semibold text-gray-500 flex justify-center text-center mb-3 text-step-0'>
						TreeLink te permite crear tu arbol de contactos y poder compartirlo{' '}
					</span>

					<Formik
						initialValues={INITIAL_VALUES}
						onSubmit={async (values, { setSubmitting }) => {
							await handleRegister(values);
							setSubmitting(false);
						}}
						validationSchema={registerSchema}
					>
						{({ handleSubmit, isSubmitting }) => (
							<form onSubmit={handleSubmit} noValidate>
								<InputFormik
									text='Nombre de usuario'
									name='username'
									type='text'
									placeholder='Ingrese su nombre de usuario para su arbol'
								/>

								<InputFormik
									text='Nombre'
									name='name'
									type='text'
									placeholder='Ingrese su nombre'
								/>
								<InputFormik
									text='Email'
									name='email'
									type='email'
									placeholder='Ingrese su correo electronico'
								/>
								<InputFormik
									text='Password'
									name='password'
									type='password'
									placeholder='Ingrese su contraseña'
								/>
								<InputFormik
									text='Confirmar Password'
									name='password2'
									type='password'
									placeholder='Ingrese su contraseña'
								/>
								<CheckboxFormik
									label='Acepto los Términos del servicio y la Política de Privacidad'
									name='terms'
								/>
								<button
									disabled={isSubmitting}
									type='submit'
									className='bg-blue-700 text-white font-semibold py-2 px-2 rounded-lg w-full mt-4 hover:bg-blue-600 disabled:bg-blue-400 transition-colors duration-300'
								>
									Registrarse
								</button>
							</form>
						)}
					</Formik>
					<p className='font-semibold text-step-0 text-center mt-2 mb-5 text-gray-500'>
						¿Ya tienes una cuenta?{' '}
						<Link to='/auth/login' className='underline'>
							Inicia sesión
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
