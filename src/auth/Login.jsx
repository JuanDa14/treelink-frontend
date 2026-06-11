import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { GoogleLogin } from '@react-oauth/google';
import { FacebookLoginButton } from '../components/FacebookLoginButton';
import { motion } from 'framer-motion';

import { loginSchema } from '../schemas';
import { InputFormik, Spinner } from '../components';
import { login, loginWithFacebook, loginWithGoogle } from '../redux/thunks/auth';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '@/components/ui/button';
import { parseGoogleCredential } from '@/lib/jwt';

const INITIAL_VALUES = {
	email: '',
	password: '',
};

const Login = () => {
	const [loadingGoogle, setLoadingGoogle] = useState(false);
	const dispatch = useDispatch();
	const { checking } = useSelector((state) => state.auth);

	const handleLogin = async (values) => {
		await dispatch(login(values));
	};

	const handleLoginSuccess = (credentialResponse) => {
		const { credential } = credentialResponse;
		const { email } = parseGoogleCredential(credential);
		dispatch(loginWithGoogle({ email, tokenId: credential }));
		setLoadingGoogle(false);
	};

	const handleLoginFacebook = ({ picture, email, name }) => {
		dispatch(loginWithFacebook({ picture, email, name }));
	};

	if (checking) {
		return <Spinner />;
	}

	return (
		<AuthLayout
			title='Bienvenido de vuelta'
			subtitle='Inicia sesión para gestionar tu árbol de enlaces'
			footer={
				<span>
					¿No tienes cuenta?{' '}
					<Link className='font-semibold text-primary hover:underline' to='/auth/register'>
						Regístrate
					</Link>
				</span>
			}
		>
			<Formik
				initialValues={INITIAL_VALUES}
				onSubmit={async (values, { setSubmitting }) => {
					await handleLogin(values);
					setSubmitting(false);
				}}
				validationSchema={loginSchema}
			>
				{({ handleSubmit, isSubmitting }) => (
					<motion.form
						onSubmit={handleSubmit}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.1 }}
						className='space-y-4'
					>
						<InputFormik
							text='Email'
							name='email'
							type='email'
							placeholder='tu@email.com'
						/>
						<InputFormik
							text='Contraseña'
							name='password'
							type='password'
							placeholder='••••••••'
						/>
						<Link
							className='text-sm text-muted-foreground hover:text-primary transition-colors inline-block'
							to='/auth/forgot-password'
						>
							¿Olvidaste tu contraseña?
						</Link>
						<Button disabled={isSubmitting} className='w-full' type='submit'>
							{isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
						</Button>
					</motion.form>
				)}
			</Formik>

			<div className='relative my-6'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-card px-2 text-muted-foreground'>O continúa con</span>
				</div>
			</div>

			<div className='flex flex-col gap-3'>
				<div className='flex justify-center'>
					<GoogleLogin
						onSuccess={handleLoginSuccess}
						onError={() => setLoadingGoogle(false)}
						useOneTap={false}
						theme='outline'
						size='large'
						text='signin_with'
						shape='rectangular'
						width='100%'
						locale='es'
					/>
				</div>
				<FacebookLoginButton onSuccess={handleLoginFacebook} disabled={loadingGoogle} />
			</div>
		</AuthLayout>
	);
};

export default Login;
