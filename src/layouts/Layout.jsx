import { motion } from 'framer-motion';
import { Navbar, Footer } from '../components';

export const Layout = ({ children, classNameMain }) => {
	return (
		<div className='flex min-h-screen flex-col bg-background'>
			<Navbar />
			<motion.main
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
				className={`flex-1 w-full mx-auto ${classNameMain || ''}`}
			>
				{children}
			</motion.main>
			<Footer />
		</div>
	);
};
