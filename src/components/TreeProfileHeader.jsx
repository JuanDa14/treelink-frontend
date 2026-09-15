import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export const TreeProfileHeader = ({ imageURL, username, name, subtitle, compact = false }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
			className={cn('flex flex-col items-center text-center', compact ? 'mb-6' : 'mb-8')}
		>
			<div className={cn('profile-avatar-ring', compact ? 'mb-3.5' : 'mb-5')}>
				<Avatar
					className={cn(
						'border-4 border-background shadow-lift',
						compact ? 'h-20 w-20' : 'h-28 w-28'
					)}
				>
					<AvatarImage src={imageURL} alt={username} className='object-cover' />
					<AvatarFallback
						className={cn(
							'font-bold bg-secondary text-primary font-display',
							compact ? 'text-2xl' : 'text-3xl'
						)}
					>
						{username?.charAt(0)?.toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</div>
			<h1 className={cn('font-display font-bold tracking-tight', compact ? 'text-lg' : 'text-xl')}>
				{name || `@${username}`}
			</h1>
			{username && name && (
				<p className='mt-1 text-xs font-medium text-primary'>@{username}</p>
			)}
			{subtitle && (
				<p
					className={cn(
						'text-muted-foreground mt-2 max-w-xs leading-relaxed',
						compact ? 'text-xs' : 'text-sm'
					)}
				>
					{subtitle}
				</p>
			)}
		</motion.div>
	);
};
