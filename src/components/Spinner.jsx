import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Spinner = ({ className = '', label = 'Cargando...' }) => {
	return (
		<div className={cn('w-full min-h-[50vh] flex flex-col justify-center items-center gap-3', className)}>
			<Loader2 className='h-10 w-10 animate-spin text-primary' aria-hidden='true' />
			<span className='sr-only'>{label}</span>
			<p className='text-sm text-muted-foreground'>{label}</p>
		</div>
	);
};
