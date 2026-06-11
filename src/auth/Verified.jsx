import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

import { verifiedEmail } from '../redux';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '@/components/ui/button';

const Verified = () => {
	const dispatch = useDispatch();
	const { verified } = useSelector((state) => state.auth);
	const { search } = useLocation();

	useEffect(() => {
		const token = search.split('=')[1];
		if (token) {
			dispatch(verifiedEmail(token));
		}
	}, [dispatch, search]);

	return (
		<AuthLayout title='Verificar cuenta'>
			<div className='flex flex-col items-center text-center gap-4 py-4'>
				{verified ? (
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						className='flex flex-col items-center gap-4'
					>
						<CheckCircle2 className='h-16 w-16 text-primary' />
						<p className='text-muted-foreground'>
							Tu cuenta ha sido verificada correctamente. Ya puedes iniciar sesión.
						</p>
						<Button asChild className='w-full'>
							<Link to='/auth/login'>Iniciar sesión</Link>
						</Button>
					</motion.div>
				) : (
					<div className='flex flex-col items-center gap-3'>
						<Loader2 className='h-10 w-10 animate-spin text-primary' />
						<p className='text-sm text-muted-foreground'>Verificando tu cuenta...</p>
					</div>
				)}
			</div>
		</AuthLayout>
	);
};

export default Verified;
