import { motion } from 'framer-motion';
import { Link2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const EmptyState = ({
	title = 'Tu página está vacía',
	description,
	actionLabel = 'Añadir tu primer link',
	actionTo = '/new-link',
	secondaryLabel,
	onSecondaryAction,
	secondaryLoading = false,
	className,
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			className={cn(
				'flex w-full flex-col items-center justify-center gap-5 px-6 py-10 text-center',
				className
			)}
		>
			<div className='badge-primary-icon flex h-14 w-14 items-center justify-center rounded-xl'>
				<Link2 className='h-7 w-7 text-primary' />
			</div>
			<div className='max-w-sm space-y-2'>
				<h3 className='font-display text-lg font-bold tracking-tight'>{title}</h3>
				<p className='text-sm leading-relaxed text-muted-foreground'>
					{description ||
						'Añade enlaces a tus redes, portfolio, tienda o cualquier contenido que quieras compartir.'}
				</p>
			</div>
			<div className='flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:justify-center'>
				<Button asChild size='lg' className='flex-1'>
					<Link to={actionTo}>{actionLabel}</Link>
				</Button>
				{onSecondaryAction && (
					<Button
						type='button'
						variant='outline'
						size='lg'
						className='flex-1'
						disabled={secondaryLoading}
						onClick={onSecondaryAction}
					>
						<Sparkles className='mr-2 h-4 w-4' />
						{secondaryLoading ? 'Creando...' : secondaryLabel}
					</Button>
				)}
			</div>
		</motion.div>
	);
};
