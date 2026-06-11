import { motion } from 'framer-motion';
import { LinkList, ModalAlerta, ModalForm } from '../components';
import { Layout } from '../layouts';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
	return (
		<Layout>
			<div className='container py-8'>
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'
				>
					<div>
						<h1 className='text-2xl font-bold tracking-tight'>Mis hojas</h1>
						<p className='text-sm text-muted-foreground mt-1'>
							Gestiona y organiza todos tus enlaces de contacto
						</p>
					</div>
					<Button asChild>
						<Link to='/new-link'>
							<Plus className='mr-2 h-4 w-4' />
							Nueva hoja
						</Link>
					</Button>
				</motion.div>
				<LinkList />
			</div>
			<ModalForm />
			<ModalAlerta />
		</Layout>
	);
};

export default HomePage;
