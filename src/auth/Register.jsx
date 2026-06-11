import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { motion } from 'framer-motion';

import { register } from '../redux';
import { CheckboxFormik, InputFormik, Spinner } from '../components';
import { registerSchema } from '../schemas';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '@/components/ui/button';

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
	const navigate = useNavigate();
	const { checking } = useSelector((state) => state.auth);

	const handleRegister = async (values) => {
		await dispatch(register(values));
		navigate('/auth/login');
	};

	if (checking) {
		return <Spinner />;
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
				{({ handleSubmit, isSubmitting }) => (
					<motion.form
						onSubmit={handleSubmit}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='space-y-3'
					>
						<InputFormik text='Nombre de usuario (sin espacios)' name='username' type='text' placeholder='juan-morales' />
						<InputFormik text='Nombre para mostrar' name='name' type='text' placeholder='Juan Morales' />
						<InputFormik text='Email' name='email' type='email' placeholder='tu@email.com' />
						<InputFormik text='Contraseña' name='password' type='password' placeholder='••••••••' />
						<InputFormik text='Confirmar contraseña' name='password2' type='password' placeholder='••••••••' />
						<CheckboxFormik label='Acepto los términos del servicio y la política de privacidad' name='terms' />
						<Button disabled={isSubmitting} className='w-full mt-2' type='submit'>
							{isSubmitting ? 'Registrando...' : 'Crear cuenta'}
						</Button>
					</motion.form>
				)}
			</Formik>
		</AuthLayout>
	);
};

export default Register;
