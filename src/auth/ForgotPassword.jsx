import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import { InputFormik } from '../components';
import { forgotPassword } from '../redux';
import { forgotPasswordSchema } from '../schemas';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '@/components/ui/button';

const INITIAL_VALUES = { email: '' };

const ForgotPassword = () => {
	const dispatch = useDispatch();

	const handleForgotPassword = async (values) => {
		await dispatch(forgotPassword(values));
	};

	return (
		<AuthLayout
			title='Recuperar cuenta'
			subtitle='Te enviaremos un enlace a tu correo para restablecer tu contraseña'
			footer={
				<Link className='font-semibold text-primary hover:underline' to='/auth/login'>
					Volver al inicio de sesión
				</Link>
			}
		>
			<Formik
				initialValues={INITIAL_VALUES}
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
						<Button disabled={isSubmitting} className='w-full' type='submit'>
							{isSubmitting ? 'Enviando...' : 'Enviar enlace'}
						</Button>
					</motion.form>
				)}
			</Formik>
		</AuthLayout>
	);
};

export default ForgotPassword;
