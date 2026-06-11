import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

import { verifiedEmail } from '../redux';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '@/components/ui/button';

const Verified = () => {
	const dispatch = useDispatch();
	const { verified, verificationError, checking } = useSelector((state) => state.auth);
	const { search } = useLocation();
	const { token: tokenParam } = useParams();

	useEffect(() => {
		const token =
			tokenParam || new URLSearchParams(search).get('token') || search.split('token=')[1]?.split('&')[0];

		if (token) {
			dispatch(verifiedEmail(token));
		}
	}, [dispatch, search, tokenParam]);

	const isLoading = checking && !verified && !verificationError;

	return (
		<AuthLayout title='Verificación de cuenta' subtitle='Estamos confirmando tu correo electrónico'>
			<div className='flex flex-col items-center text-center gap-4 py-4'>
				{isLoading && (
					<div className='flex flex-col items-center gap-3'>
						<Loader2 className='h-10 w-10 animate-spin text-primary' />
						<p className='text-sm text-muted-foreground'>Verificando tu cuenta...</p>
					</div>
				)}

				{verified && (
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className='flex flex-col items-center gap-4'
					>
						<CheckCircle2 className='h-16 w-16 text-primary' />
						<p className='text-muted-foreground leading-relaxed'>
							Tu cuenta ha sido verificada correctamente. Ya puedes iniciar sesión y empezar a crear tu
							TreeLink.
						</p>
						<Button asChild className='w-full h-12'>
							<Link to='/auth/login'>Iniciar sesión</Link>
						</Button>
					</motion.div>
				)}

				{verificationError && !isLoading && (
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						className='flex flex-col items-center gap-4'
					>
						<XCircle className='h-16 w-16 text-destructive' />
						<p className='text-muted-foreground leading-relaxed'>{verificationError}</p>
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
