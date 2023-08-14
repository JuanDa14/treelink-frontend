import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';

import { gapi } from 'gapi-script';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
// import TwitterLogin from 'react-twitter-login';

import { loginSchema } from '../schemas';
import { InputFormik, Spinner } from '../components';
import { login, loginWithFacebook, loginWithGoogle } from '../redux/thunks/auth';
import ImageBackground from '../public/images/background.webp';

const INITIAL_VALUES = {
	email: '',
	password: '',
};

const Login = () => {
	const [loadingGoogle, setLoadingGoogle] = useState(false);

	const dispatch = useDispatch();

	const { checking } = useSelector((state) => state.auth);

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

	const handleLoginSuccess = ({ tokenId, profileObj }) => {
		const { email } = profileObj;
		dispatch(loginWithGoogle({ email, tokenId }));
		setLoadingGoogle(false);
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

	const handleLoginFailureFacebook = (response) => {
		console.log(response);
	};

	const handleLoginTwitter = (err, data) => {
		// TODO falta login con twiter
		console.log(err, data);
	};

	if (checking) {
		return <Spinner />;
	}

	return (
		<div className='h-screen w-full flex items-center'>
			<div className='container max-w-md mx-auto xl:max-w-4xl flex bg-white rounded-lg shadow overflow-hidden'>
				<div className='relative hidden xl:block xl:w-1/2 h-full'>
					<img
						className='absolute h-auto w-full object-cover'
						src={ImageBackground}
						alt='imagen login'
					/>
				</div>
				<div className='w-full xl:w-1/2 p-8'>
					<h2 className=' text-2xl font-bold'>Bienvenido</h2>
					<div className='flex items-center gap-2'>
						<span className='text-gray-600 text-sm'>¿No tienes una cuenta?</span>
						<Link
							className='text-gray-700 text-sm font-semibold underline'
							to='/auth/register'
						>
							Registrate
						</Link>
					</div>
					<Formik
						initialValues={INITIAL_VALUES}
						onSubmit={async (values, { setSubmitting }) => {
							await handleLogin(values);
							setSubmitting(false);
						}}
						validationSchema={loginSchema}
					>
						{({ handleSubmit, isSubmitting }) => (
							<form onSubmit={handleSubmit}>
								<div className='mb-2 mt-4'>
									<InputFormik
										text='Email'
										name='email'
										type='email'
										placeholder='Ingrese su correo electronico'
										classNameInput={`text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10`}
										classNameText={`block text-gray-700 text-sm font-semibold mb-2`}
									/>
								</div>
								<div className='mb-2 mt-4'>
									<InputFormik
										text='Password'
										name='password'
										type='password'
										placeholder='Ingrese su contraseña'
										classNameInput={`text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10`}
										classNameText={`block text-gray-700 text-sm font-semibold mb-2`}
									/>
								</div>
								<Link
									className='text-sm text-gray-600 hover:text-gray-800 mt-2 underline'
									to='/auth/forgot-password'
									title='Olvidaste tu contraseña?'
								>
									Olvidaste tu contraseña?
								</Link>
								<div className='flex w-full mt-4'>
									<button
										disabled={isSubmitting}
										className='w-full bg-gray-800 hover:bg-grey-900 text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10 disabled:opacity-50'
										type='submit'
									>
										Iniciar sesion
									</button>
								</div>
							</form>
						)}
					</Formik>

					<div className='flex flex-col gap-3 justify-center items-center '>
						<span className='w-full mt-4 border-t border-b-gray-500'></span>
						<GoogleLogin
							clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}
							buttonText='Iniciar sesion con Google'
							onSuccess={handleLoginSuccess}
							onFailure={handleLoginFailure}
							onRequest={handleRequest}
							onAutoLoadFinished={handleAutoLoadFinished}
							cookiePolicy={'single_host_origin'}
							icon={false}
							className={`btn btn-google`}
							disabled={loadingGoogle}
						/>
						<FacebookLogin
							appId={import.meta.env.VITE_APP_FACEBOOK_CLIENT_ID}
							callback={handleLoginFacebook}
							autoLoad={false}
							fields='name,email,picture'
							textButton='Iniciar sesion con Facebook'
							cssClass='btn btn-facebook'
							containerStyle={{ width: '100%' }}
							onFailure={handleLoginFailureFacebook}
							tag='button'
						/>
					</div>
				</div>
			</div>
		</div>

		// 				{/* //TODO falta hacer el login con twitter */}
		// 				{/* <TwitterLogin
		// 				authCallback={handleLoginTwitter}
		// 				consumerKey={import.meta.env.VITE_APP_TWITER_CLIENT_ID}
		// 				consumerSecret={import.meta.env.VITE_APP_TWITER_SECRET}
		// 				children={<span>Twitter</span>}
		// 				className='btn btn-twiter'
		// 			/> */}
	);
};

export default Login;
