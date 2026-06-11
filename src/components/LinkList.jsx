import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ItemLink } from './ItemLink';
import { Spinner } from './Spinner';
import { EmptyState } from './EmptyState';

export const LinkList = () => {
	const { links, loading } = useSelector((state) => state.link);

	if (loading) {
		return <Spinner className='min-h-[30vh]' label='Cargando enlaces...' />;
	}

	if (links.length === 0) {
		return <EmptyState />;
	}

	return (
		<ul className='space-y-3 w-full'>
			{links.map((link, index) => (
				<motion.li
					key={link._id}
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3, delay: index * 0.06 }}
				>
					<ItemLink {...link} />
				</motion.li>
			))}
		</ul>
	);
};
