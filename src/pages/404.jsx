import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trees } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
	return (
		<div className='min-h-screen flex items-center justify-center auth-gradient p-4'>
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				className='text-center space-y-4'
			>
				<div className='flex justify-center'>
					<Trees className='h-12 w-12 text-primary' />
				</div>
				<h1 className='text-8xl font-bold text-primary/20'>404</h1>
				<h2 className='text-2xl font-semibold'>Página no encontrada</h2>
				<p className='text-muted-foreground max-w-sm'>
					La ruta que buscas no existe o fue movida.
				</p>
				<Button asChild>
					<Link to='/'>Volver al inicio</Link>
				</Button>
			</motion.div>
		</div>
	);
};

export default NotFoundPage;
