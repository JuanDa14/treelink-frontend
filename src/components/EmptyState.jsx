import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const EmptyState = ({ title = 'Sin hojas todavía', description, actionLabel = 'Crear primera hoja', actionTo = '/new-link' }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
			className='flex flex-col items-center justify-center gap-4 py-16 px-6 text-center'
		>
			<div className='flex h-16 w-16 items-center justify-center rounded-full bg-accent'>
				<Leaf className='h-8 w-8 text-primary' />
			</div>
			<div className='space-y-2'>
				<h3 className='text-lg font-semibold'>{title}</h3>
				<p className='text-sm text-muted-foreground max-w-sm'>
					{description || 'Crea tu primera hoja de contacto y comparte todos tus enlaces en un solo lugar.'}
				</p>
			</div>
			<Button asChild>
				<Link to={actionTo}>{actionLabel}</Link>
			</Button>
		</motion.div>
	);
};
