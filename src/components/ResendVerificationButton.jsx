import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Mail } from 'lucide-react';

import { resendVerification } from '../redux';
import { Button } from '@/components/ui/button';

export const ResendVerificationButton = ({ email, className, variant = 'outline' }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [remaining, setRemaining] = useState(null);

	const handleResend = async () => {
		if (!email?.trim()) return;

		setLoading(true);
		const result = await dispatch(resendVerification({ email: email.trim() }));
		if (typeof result?.remaining === 'number') {
			setRemaining(result.remaining);
		}
		setLoading(false);
	};

	const disabled = loading || !email?.trim() || remaining === 0;

	return (
		<div className={className}>
			<Button
				type='button'
				variant={variant}
				className='w-full h-11'
				disabled={disabled}
				onClick={handleResend}
			>
				<Mail className='mr-2 h-4 w-4' />
				{loading ? 'Reenviando...' : 'Reenviar correo de verificación'}
			</Button>
			{remaining !== null && (
				<p className='mt-2 text-xs text-muted-foreground text-center'>
					{remaining > 0
						? `Te quedan ${remaining} reenvío${remaining === 1 ? '' : 's'} hoy (máx. 5).`
						: 'Límite diario alcanzado. Podrás reenviar mañana.'}
				</p>
			)}
		</div>
	);
};
