import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
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
	const { search } = useLocation();

	const handleResetPassword = async (values) => {
		const token = search.split('=')[1];
		await dispatch(resetPassword(token, values));
		navigate('/auth/login', { replace: true });
	};

	return (
		<AuthLayout
			title='Restablecer contraseña'
			subtitle='Ingresa y confirma tu nueva contraseña'
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
						<InputFormik text='Confirmar contraseña' type='password' placeholder='••••••••' name='password2' />
						<Button disabled={isSubmitting} className='w-full' type='submit'>
							{isSubmitting ? 'Restableciendo...' : 'Restablecer contraseña'}
						</Button>
					</motion.form>
				)}
			</Formik>
		</AuthLayout>
	);
};

export default ResetPassword;
