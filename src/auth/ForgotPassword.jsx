import { useState } from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { InputFormik, PasswordResetFlow } from '../components';
import { forgotPasswordSchema } from '../schemas';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '@/components/ui/button';

const ForgotPassword = () => {
	const { status, user } = useSelector((state) => state.auth);
	const isLoggedIn = status === 'authenticated';
	const userEmail = user?.email || '';
	const [email, setEmail] = useState(userEmail);
	const [showResetFlow, setShowResetFlow] = useState(Boolean(userEmail));

	return (
		<AuthLayout
			title={isLoggedIn ? 'Cambiar contraseña' : 'Recuperar cuenta'}
			subtitle='Te enviaremos un código de 6 dígitos para restablecer tu contraseña'
			footer={
				isLoggedIn ? (
					<Link className='font-semibold text-primary hover:underline' to='/'>
						Volver al inicio
					</Link>
				) : (
					<Link className='font-semibold text-primary hover:underline' to='/auth/login'>
						Volver al inicio de sesión
					</Link>
				)
			}
		>
			{showResetFlow ? (
				<PasswordResetFlow email={email} authenticated={isLoggedIn} />
			) : (
				<Formik
					initialValues={{ email: '' }}
					onSubmit={async (values, { setSubmitting }) => {
						setEmail(values.email.trim());
						setShowResetFlow(true);
						setSubmitting(false);
					}}
					validationSchema={forgotPasswordSchema}
				>
					{({ handleSubmit, isSubmitting }) => (
						<motion.form onSubmit={handleSubmit} noValidate className='space-y-4'>
							<InputFormik text='Email' type='email' placeholder='tu@email.com' name='email' />
							<Button disabled={isSubmitting} className='w-full h-12' type='submit'>
								Continuar
							</Button>
						</motion.form>
					)}
				</Formik>
			)}
		</AuthLayout>
	);
};

export default ForgotPassword;
