import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { motion } from 'framer-motion';
import { MailCheck } from 'lucide-react';

import { register, loginWithFacebook, loginWithGoogle } from '../redux';
import {
	CheckboxFormik,
	InputFormik,
	Spinner,
	UsernameField,
	UsernameSubmitButton,
	AuthSocialSection,
} from '../components';
import { registerSchema } from '../schemas';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '@/components/ui/button';
import { parseGoogleCredential } from '@/lib/jwt';

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
	const { checking } = useSelector((state) => state.auth);
	const [loadingSocial, setLoadingSocial] = useState(false);
	const [pendingEmail, setPendingEmail] = useState(null);

	const handleRegister = async (values) => {
		const result = await dispatch(register(values));
		if (result?.ok) {
			setPendingEmail(values.email);
		}
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

	if (pendingEmail) {
		return (
			<AuthLayout
				title='Revisa tu correo'
				subtitle='Te enviamos un enlace para activar tu cuenta'
			>
				<div className='flex flex-col items-center text-center gap-4 py-2'>
					<div className='flex h-16 w-16 items-center justify-center rounded-full bg-secondary'>
						<MailCheck className='h-8 w-8 text-primary' />
					</div>
					<p className='text-sm text-muted-foreground leading-relaxed'>
						Enviamos un correo a{' '}
						<strong className='text-foreground'>{pendingEmail}</strong>. Abre el enlace de verificación
						para activar tu cuenta y luego inicia sesión.
					</p>
					<Button asChild className='w-full h-12'>
						<Link to='/auth/login'>Ir a iniciar sesión</Link>
					</Button>
				</div>
			</AuthLayout>
		);
	}

	return (
		<AuthLayout
			title='Crea tu cuenta'
			subtitle='Empieza a construir tu árbol de enlaces en minutos'
			footer={
				<span>
					¿Ya tienes cuenta?{' '}
					<Link className='font-semibold text-primary hover:underline' to='/auth/login'>
						Inicia sesión
					</Link>
				</span>
			}
		>
			<Formik
				initialValues={INITIAL_VALUES}
				onSubmit={async (values, { setSubmitting }) => {
					await handleRegister(values);
					setSubmitting(false);
				}}
				validationSchema={registerSchema}
			>
				{({ handleSubmit }) => (
					<motion.form
						onSubmit={handleSubmit}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='space-y-3'
					>
						<UsernameField text='Nombre de usuario (sin espacios)' />
						<InputFormik text='Nombre para mostrar' name='name' type='text' placeholder='Juan Morales' />
						<InputFormik text='Email' name='email' type='email' placeholder='tu@email.com' />
						<InputFormik text='Contraseña' name='password' type='password' placeholder='••••••••' />
						<InputFormik text='Confirmar contraseña' name='password2' type='password' placeholder='••••••••' />
						<CheckboxFormik label='Acepto los términos del servicio y la política de privacidad' name='terms' />
						<UsernameSubmitButton loadingLabel='Registrando...' className='w-full mt-2 h-12'>
							Crear cuenta
						</UsernameSubmitButton>
					</motion.form>
				)}
			</Formik>

			<AuthSocialSection
				variant='register'
				socialDisabled={loadingSocial}
				onGoogleSuccess={handleLoginSuccess}
				onGoogleError={() => setLoadingSocial(false)}
				onFacebookSuccess={handleLoginFacebook}
			/>

			<p className='mt-4 text-center text-sm text-muted-foreground'>
				<Link className='font-medium text-primary hover:underline' to='/auth/forgot-password'>
					¿Olvidaste tu contraseña?
				</Link>
			</p>
		</AuthLayout>
	);
};

export default Register;
