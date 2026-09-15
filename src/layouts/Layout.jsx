import { motion } from 'framer-motion';
import { Navbar } from '../components';

export const Layout = ({ children, classNameMain }) => {
	return (
		<div className='app-shell flex min-h-screen flex-col'>
			<Navbar />
			<motion.main
				initial={{ opacity: 0, y: 6 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
				className={`mx-auto w-full flex-1 ${classNameMain || ''}`}
			>
				{children}
			</motion.main>
		</div>
	);
};
