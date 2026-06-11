import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { InputFormik } from '../components';
import { resetPassword } from '../redux';
import { resetPasswordSchema } from '../schemas';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '@/components/ui/button';

const INITIAL_VALUES = { password: '', password2: '' };

const ResetPassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { token } = useParams();

	const handleResetPassword = async (values) => {
		if (!token) return { ok: false };

		const result = await dispatch(resetPassword(token, values));

		if (result?.ok) {
			navigate('/auth/login', { replace: true });
		}
	};

	if (!token) {
		return (
			<AuthLayout
				title='Enlace no válido'
				subtitle='Usa el código de 6 dígitos que recibiste por correo o solicita uno nuevo.'
				footer={
					<Link className='font-semibold text-primary hover:underline' to='/auth/forgot-password'>
						Solicitar código
					</Link>
				}
			/>
		);
	}

	return (
		<AuthLayout
			title='Restablecer contraseña'
			subtitle='Ingresa y confirma tu nueva contraseña'
			footer={
				<Link className='font-semibold text-primary hover:underline' to='/auth/forgot-password'>
					Usar código de verificación
				</Link>
			}
		>
			<Formik
				initialValues={INITIAL_VALUES}
				onSubmit={async (values, { setSubmitting }) => {
					await handleResetPassword(values);
					setSubmitting(false);
				}}
				validationSchema={resetPasswordSchema}
			>
				{({ handleSubmit, isSubmitting }) => (
					<motion.form onSubmit={handleSubmit} noValidate className='space-y-4'>
						<InputFormik text='Nueva contraseña' type='password' placeholder='••••••••' name='password' />
						<InputFormik
							text='Confirmar contraseña'
							type='password'
							placeholder='••••••••'
							name='password2'
						/>
						<Button disabled={isSubmitting} className='w-full h-12' type='submit'>
							{isSubmitting ? 'Restableciendo...' : 'Restablecer contraseña'}
						</Button>
					</motion.form>
				)}
			</Formik>
		</AuthLayout>
	);
};

export default ResetPassword;
