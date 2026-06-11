import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import { userApi } from '../api';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '@/components/ui/button';
import { extractVerificationToken } from '../utils/verification';

const STATUS = {
	loading: 'loading',
	success: 'success',
	already: 'already',
	error: 'error',
	idle: 'idle',
};

const Verified = () => {
	const { search, hash } = useLocation();
	const { token: tokenParam } = useParams();
	const [status, setStatus] = useState(STATUS.loading);
	const [errorMessage, setErrorMessage] = useState('');
	const verifiedRef = useRef(false);

	useEffect(() => {
		if (verifiedRef.current) return;

		const token = extractVerificationToken({ tokenParam, search, hash });

		if (!token) {
			setStatus(STATUS.error);
			setErrorMessage('El enlace de verificación no es válido. Revisa el correo e inténtalo de nuevo.');
			return;
		}

		verifiedRef.current = true;

		userApi
			.get(`/verified/${encodeURIComponent(token)}`)
			.then(({ data }) => {
				if (data?.alreadyVerified) {
					setStatus(STATUS.already);
					return;
				}
				setStatus(STATUS.success);
			})
			.catch((error) => {
				const message =
					error.response?.data?.message ||
					error.response?.data?.errors?.[0]?.message ||
					'No se pudo verificar tu cuenta. El enlace puede haber expirado.';

				if (message.toLowerCase().includes('ya esta verificado')) {
					setStatus(STATUS.already);
					return;
				}

				setStatus(STATUS.error);
				setErrorMessage(message);
			});
	}, [tokenParam, search, hash]);

	const isLoading = status === STATUS.loading;

	return (
		<AuthLayout
			title='Verificación de cuenta'
			subtitle={isLoading ? 'Estamos confirmando tu correo electrónico' : 'Resultado de la verificación'}
		>
			<div className='flex flex-col items-center text-center gap-4 py-4'>
				{isLoading && (
					<div className='flex flex-col items-center gap-3'>
						<Loader2 className='h-10 w-10 animate-spin text-primary' />
						<p className='text-sm text-muted-foreground'>Verificando tu cuenta...</p>
					</div>
				)}

				{(status === STATUS.success || status === STATUS.already) && (
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className='flex flex-col items-center gap-4'
					>
						<CheckCircle2 className='h-16 w-16 text-primary' />
						<p className='text-muted-foreground leading-relaxed'>
							{status === STATUS.already
								? 'Tu cuenta ya estaba verificada. Puedes iniciar sesión con normalidad.'
								: 'Tu cuenta ha sido verificada correctamente. Ya puedes iniciar sesión y empezar a crear tu TreeLink.'}
						</p>
						<Button asChild className='w-full h-12'>
							<Link to='/auth/login'>Iniciar sesión</Link>
						</Button>
					</motion.div>
				)}

				{status === STATUS.error && (
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className='flex flex-col items-center gap-4'
					>
						<XCircle className='h-16 w-16 text-destructive' />
						<p className='text-muted-foreground leading-relaxed'>{errorMessage}</p>
						<div className='flex flex-col gap-2 w-full'>
							<Button asChild variant='outline' className='w-full h-12'>
								<Link to='/auth/register'>Crear cuenta</Link>
							</Button>
							<Button asChild className='w-full h-12'>
								<Link to='/auth/login'>Iniciar sesión</Link>
							</Button>
						</div>
					</motion.div>
				)}
			</div>
		</AuthLayout>
	);
};

export default Verified;
