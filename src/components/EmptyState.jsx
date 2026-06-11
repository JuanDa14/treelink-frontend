import { motion } from 'framer-motion';
import { Link2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const EmptyState = ({
	title = 'Tu página está vacía',
	description,
	actionLabel = 'Añadir tu primer link',
	actionTo = '/new-link',
	secondaryLabel,
	onSecondaryAction,
	secondaryLoading = false,
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			className='flex flex-col items-center justify-center gap-5 py-14 px-6 text-center rounded-3xl border-2 border-dashed border-border bg-secondary/30'
		>
			<div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
				<Link2 className='h-8 w-8 text-primary' />
			</div>
			<div className='space-y-2 max-w-sm'>
				<h3 className='text-lg font-bold'>{title}</h3>
				<p className='text-sm text-muted-foreground leading-relaxed'>
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
