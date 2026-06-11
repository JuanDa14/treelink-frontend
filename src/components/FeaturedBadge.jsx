import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export const FeaturedBadge = ({ count }) => {
	if (!count) return null;

	return (
		<motion.span
			className='badge-primary featured-badge-glow relative overflow-hidden'
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ type: 'spring', stiffness: 420, damping: 22 }}
		>
			<motion.span
				className='featured-badge-shine pointer-events-none absolute inset-0'
				animate={{ x: ['-120%', '120%'] }}
				transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }}
				aria-hidden
			/>
			<Star className='relative z-10 h-3 w-3 fill-primary' />
			<span className='relative z-10'>
				{count} destacado{count > 1 ? 's' : ''}
			</span>
		</motion.span>
	);
};
