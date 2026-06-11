import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TREE_LINK_LOGO_SRC } from '@/components/TreeLinkLogo';

const NotFoundPage = () => {
	return (
		<div className='min-h-screen flex items-center justify-center auth-gradient p-4'>
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				className='text-center space-y-5 max-w-md'
			>
				<div className='flex justify-center'>
					<img
						src={TREE_LINK_LOGO_SRC}
						alt='TreeLink'
						className='h-16 w-16 rounded-full object-cover shadow-lg'
					/>
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
