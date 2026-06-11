import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { motion } from 'framer-motion';
import { loginSchema } from '../schemas';
import { InputFormik, Spinner, AuthSocialSection } from '../components';
import { login, loginWithFacebook, loginWithGoogle } from '../redux/thunks/auth';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '@/components/ui/button';
import { parseGoogleCredential } from '@/lib/jwt';

const INITIAL_VALUES = {
	email: '',
	password: '',
};

const Login = () => {
	const [loadingSocial, setLoadingSocial] = useState(false);
	const dispatch = useDispatch();
	const { checking, verificationHint } = useSelector((state) => state.auth);

	const handleLogin = async (values) => {
		await dispatch(login(values));
	};

	const handleLoginSuccess = (credentialResponse) => {
		const { credential } = credentialResponse;
		const { email } = parseGoogleCredential(credential);
		dispatch(loginWithGoogle({ email, tokenId: credential }));
		setLoadingSocial(false);
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
						Regístrate gratis
					</Link>
				</span>
			}
		>
			{verificationHint && (
				<div className='mb-4 rounded-2xl border-2 border-primary/30 bg-secondary px-4 py-3 text-sm'>
					<p className='font-medium text-foreground'>Verifica tu cuenta</p>
					<p className='text-muted-foreground mt-1'>{verificationHint}</p>
				</div>
			)}

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
						<div className='space-y-2'>
							<InputFormik
								text='Contraseña'
								name='password'
								type='password'
								placeholder='••••••••'
							/>
							<div className='flex justify-end'>
								<Link
									className='text-sm font-medium text-primary hover:underline'
									to='/auth/forgot-password'
								>
									¿Olvidaste tu contraseña?
								</Link>
							</div>
						</div>
						<Button disabled={isSubmitting} className='w-full h-12' type='submit'>
							{isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
						</Button>
					</motion.form>
				)}
			</Formik>

			<AuthSocialSection
				variant='login'
				socialDisabled={loadingSocial}
				onGoogleSuccess={handleLoginSuccess}
				onGoogleError={() => setLoadingSocial(false)}
				onFacebookSuccess={handleLoginFacebook}
			/>
		</AuthLayout>
	);
};

export default Login;
