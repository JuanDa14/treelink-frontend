import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Link2 } from 'lucide-react';
import { useSelector } from 'react-redux';

import { LinkList, ModalAlerta, ModalForm } from '../components';
import { Layout } from '../layouts';
import { Button } from '@/components/ui/button';

export const HomePage = () => {
	const { links } = useSelector((state) => state.link);

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
						Organiza y personaliza los enlaces de tu página pública.
					</p>
				</motion.div>

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
						<Link2 className='h-4 w-4' />
						<span>Arrastra mentalmente, edita o elimina cada enlace</span>
					</div>
				)}

				<LinkList />
			</div>
			<ModalForm />
			<ModalAlerta />
		</Layout>
	);
};

export default HomePage;
