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
		<div className='w-full h-screen bg-gray-200'>
			<div className='h-full mx-auto max-w-xl flex flex-col justify-center'>
				<div className='shadow-lg p-5 rounded-lg bg-gray-50'>
					<h1 className='font-bold text-step-3 text-blue-600 text-center uppercase'>
						Registrarse
					</h1>
					<p className='font-semibold text-step-0 text-gray-500 text-center mt-2 mb-5'>
						Treelink es una plataforma que te permite crear y compartir tus redes de contactos
					</p>
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
									className='bg-blue-600 text-white font-semibold py-2 px-2 rounded-lg w-full mt-4 hover:bg-blue-700 disabled:bg-blue-500 transition-colors duration-300'
								>
									Registrarse
								</button>
							</form>
						)}
					</Formik>
					<Link className='text-gray-500 underline flex justify-center mt-3' to='/auth/login'>
						Ya tienes una cuenta?
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Register;
