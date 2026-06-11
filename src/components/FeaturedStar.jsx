import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export const FeaturedStar = ({ className, size = 'sm' }) => {
	const sizeClass = size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5';

	return (
		<motion.span
			className={cn('inline-flex shrink-0 featured-star', className)}
			animate={{
				scale: [1, 1.18, 1],
				rotate: [0, 8, -8, 0],
			}}
			transition={{
				duration: 2.8,
				repeat: Infinity,
				ease: 'easeInOut',
			}}
		>
			<Star className={cn(sizeClass, 'fill-primary text-primary')} />
		</motion.span>
	);
};
