import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';

import { gapi } from 'gapi-script';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
// import TwitterLogin from 'react-twitter-login';

import { loginSchema } from '../schemas';
import { InputFormik } from '../components';
import { login, loginWithFacebook, loginWithGoogle } from '../redux/thunks/auth';

const INITIAL_VALUES = {
	email: 'jgamesterror@gmail.com',
	password: '123456',
};

const Login = () => {
	const [loadingGoogle, setLoadingGoogle] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		const initClient = () => {
			gapi.client.init({
				clientId: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
				scope: '',
			});
		};
		gapi.load('client:auth2', initClient);
	});

	const handleLogin = async (values) => {
		await dispatch(login(values));
	};

	const handleLoginSuccess = ({ profileObj }) => {
		const { email, name, imageUrl } = profileObj;

		dispatch(loginWithGoogle({ email, name, imageURL: imageUrl }));
	};

	const handleLoginFailure = () => {
		setLoadingGoogle(false);
	};

	const handleRequest = () => {
		setLoadingGoogle(true);
	};

	const handleAutoLoadFinished = () => {
		setLoadingGoogle(false);
	};

	const handleLoginFacebook = ({ picture, email, name }) => {
		dispatch(loginWithFacebook({ picture, email, name }));
	};

	const handleLoginTwitter = (err, data) => {
		// TODO falta login con twiter
		console.log(err, data);
	};

	return (
		<div className='w-full h-screen bg-gray-200'>
			<div className='h-full mx-auto max-w-xl flex flex-col justify-center'>
				<div className='shadow-lg p-5 rounded-md bg-gray-50'>
					<h1 className='font-bold text-step-3 text-blue-600 text-center uppercase'>
						Bienvenido
					</h1>
					<p className='font-semibold text-step-0 text-gray-500 text-center mb-5'>
						Seleccina un metodo de autenticacion
					</p>
					<Formik
						initialValues={INITIAL_VALUES}
						onSubmit={async (values, { setSubmitting }) => {
							handleLogin(values);
							setSubmitting(false);
						}}
						validationSchema={loginSchema}
					>
						{({ handleSubmit, isSubmitting }) => (
							<form onSubmit={handleSubmit}>
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

								<div>
									<Link
										className='text-gray-500 font-semibold underline'
										to='/auth/forgot-password'
									>
										¿Olvidaste tu contraseña?
									</Link>
								</div>

								<button
									disabled={isSubmitting}
									type='submit'
									className='bg-blue-600 text-white font-semibold py-2 px-2 rounded-lg w-full mt-5 hover:bg-blue-700 disabled:bg-blue-500 transition-colors duration-300'
								>
									Iniciar sesion
								</button>
							</form>
						)}
					</Formik>

					<div className='flex flex-col gap-3 justify-center items-center'>
						<span className='font-semibold text-gray-600 mt-4 capitalize'>
							Otros metodos de autenticacion
						</span>

						<GoogleLogin
							clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}
							buttonText='Google'
							onSuccess={handleLoginSuccess}
							onFailure={handleLoginFailure}
							onRequest={handleRequest}
							onAutoLoadFinished={handleAutoLoadFinished}
							cookiePolicy={'single_host_origin'}
							icon={false}
							className='btn btn-google'
							disabled={loadingGoogle}
						/>

						<FacebookLogin
							appId={import.meta.env.VITE_APP_FACEBOOK_CLIENT_ID}
							callback={handleLoginFacebook}
							autoLoad={false}
							fields='name,email,picture'
							textButton='Facebook'
							cssClass='btn btn-facebook'
							containerStyle={{ width: '100%' }}
						/>

						{/* //TODO falta hacer el login con twitter */}
						{/* <TwitterLogin
						authCallback={handleLoginTwitter}
						consumerKey={import.meta.env.VITE_APP_TWITER_CLIENT_ID}
						consumerSecret={import.meta.env.VITE_APP_TWITER_SECRET}
						children={<span>Twitter</span>}
						className='btn btn-twiter'
					/> */}
						<Link className='text-gray-500 underline' to='/auth/register'>
							No tienes una cuenta?
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
