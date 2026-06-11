import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const TreeProfileHeader = ({ imageURL, username, name, subtitle }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.45 }}
			className='flex flex-col items-center text-center mb-8'
		>
			<Avatar className='h-28 w-28 mb-4 border-4 border-background shadow-xl ring-2 ring-border'>
				<AvatarImage src={imageURL} alt={username} className='object-cover' />
				<AvatarFallback className='text-3xl font-bold bg-secondary text-primary'>
					{username?.charAt(0)?.toUpperCase()}
				</AvatarFallback>
			</Avatar>
			<h1 className='text-xl font-bold tracking-tight'>{name || `@${username}`}</h1>
			{subtitle && <p className='text-sm text-muted-foreground mt-1 max-w-xs'>{subtitle}</p>}
		</motion.div>
	);
};
