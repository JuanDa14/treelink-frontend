import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GripVertical, Plus, Star } from 'lucide-react';
import { useSelector } from 'react-redux';

import { LinkList, ModalAlerta, ModalForm } from '../components';
import { Layout } from '../layouts';
import { Button } from '@/components/ui/button';

export const HomePage = () => {
	const { links } = useSelector((state) => state.link);
	const featuredCount = links.filter((link) => link.featured).length;
	const hiddenCount = links.filter((link) => link.isActive === false).length;

	return (
		<Layout>
			<div className='container py-8 max-w-2xl'>
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-8'
				>
					<div className='flex items-center justify-between gap-4 mb-2'>
						<h1 className='text-3xl font-bold tracking-tight'>Tus enlaces</h1>
						<span className='rounded-full bg-secondary px-3 py-1 text-sm font-medium text-muted-foreground'>
							{links.length} {links.length === 1 ? 'link' : 'links'}
						</span>
					</div>
					<p className='text-muted-foreground'>
						Arrastra para reordenar, destaca los importantes y oculta los que no quieras mostrar.
					</p>
				</motion.div>

				{links.length > 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='flex flex-wrap gap-2 mb-6'
					>
						{featuredCount > 0 && (
							<span className='badge-primary'>
								<Star className='h-3 w-3 fill-primary' />
								{featuredCount} destacado{featuredCount > 1 ? 's' : ''}
							</span>
						)}
						{hiddenCount > 0 && (
							<span className='badge-muted'>
								{hiddenCount} oculto{hiddenCount > 1 ? 's' : ''}
							</span>
						)}
					</motion.div>
				)}

				<motion.div
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
				>
					<Button asChild className='w-full mb-6 h-12' size='lg'>
						<Link to='/new-link'>
							<Plus className='mr-2 h-5 w-5' />
							Añadir nuevo link
						</Link>
					</Button>
				</motion.div>

				{links.length > 0 && (
					<div className='flex items-center gap-2 text-sm text-muted-foreground mb-4'>
						<GripVertical className='h-4 w-4' />
						<span>Arrastra el icono para cambiar el orden de tus enlaces</span>
					</div>
				)}

				<LinkList sortable />
			</div>
			<ModalForm />
			<ModalAlerta />
		</Layout>
	);
};

export default HomePage;
