import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { InputFormik } from '../components';
import { forgotPassword } from '../redux';
import { forgotPasswordSchema } from '../schemas';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '@/components/ui/button';

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const { status, user } = useSelector((state) => state.auth);
	const isLoggedIn = status === 'authenticated';
	const userEmail = user?.email || '';

	const handleForgotPassword = async (values) => {
		await dispatch(forgotPassword(values));
	};

	return (
		<AuthLayout
			title={isLoggedIn ? 'Cambiar contraseña' : 'Recuperar cuenta'}
			subtitle='Te enviaremos un enlace a tu correo para restablecer tu contraseña'
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
			<Formik
				initialValues={{ email: userEmail }}
				enableReinitialize
				onSubmit={async (values, { setSubmitting }) => {
					await handleForgotPassword(values);
					setSubmitting(false);
				}}
				validationSchema={forgotPasswordSchema}
			>
				{({ handleSubmit, isSubmitting }) => (
					<motion.form onSubmit={handleSubmit} noValidate className='space-y-4'>
						<InputFormik
							text='Email'
							type='email'
							placeholder='tu@email.com'
							name='email'
						/>
						<Button disabled={isSubmitting} className='w-full h-12' type='submit'>
							{isSubmitting ? 'Enviando...' : 'Enviar enlace de restablecimiento'}
						</Button>
					</motion.form>
				)}
			</Formik>
		</AuthLayout>
	);
};

export default ForgotPassword;
