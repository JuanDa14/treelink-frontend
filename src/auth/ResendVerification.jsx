import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as yup from 'yup';

import { InputFormik, ResendVerificationButton } from '../components';
import { AuthLayout } from '../layouts/AuthLayout';

const schema = yup.object({
	email: yup.string().email('Email inválido').required('El email es requerido'),
});

const ResendVerification = () => (
	<AuthLayout
		title='Reenviar verificación'
		subtitle='Te enviaremos un nuevo enlace (máximo 5 reenvíos por día)'
		footer={
			<Link className='font-semibold text-primary hover:underline' to='/auth/login'>
				Volver al inicio de sesión
			</Link>
		}
	>
		<Formik
			initialValues={{ email: '' }}
			validationSchema={schema}
			onSubmit={() => {}}
		>
			{({ values }) => (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className='space-y-4'
				>
					<InputFormik
						name='email'
						text='Email de tu cuenta'
						type='email'
						placeholder='tu@email.com'
					/>
					<ResendVerificationButton email={values.email} />
				</motion.div>
			)}
		</Formik>
	</AuthLayout>
);

export default ResendVerification;
