import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
	return (
		<div className='min-h-screen flex items-center justify-center auth-gradient p-4'>
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				className='text-center space-y-5 max-w-md'
			>
				<div className='flex justify-center'>
					<div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
						<TreePine className='h-8 w-8 text-primary' />
					</div>
				</div>
				<p className='text-7xl font-bold' style={{ color: 'color-mix(in oklch, var(--primary) 25%, transparent)' }}>
					404
				</p>
				<h2 className='text-2xl font-bold tracking-tight'>Página no encontrada</h2>
				<p className='text-muted-foreground'>
					La ruta que buscas no existe o fue movida.
				</p>
				<Button asChild size='lg'>
					<Link to='/'>Volver al inicio</Link>
				</Button>
			</motion.div>
		</div>
	);
};

export default NotFoundPage;
