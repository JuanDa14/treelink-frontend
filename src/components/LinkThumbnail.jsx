import { getLinkIconOption } from '../constants/link-icons';
import { cn } from '@/lib/utils';

export const LinkThumbnail = ({ imageURL, icon, name, className, iconClassName }) => {
	const { Icon } = getLinkIconOption(icon || 'link');

	if (icon) {
		return (
			<span
				className={cn(
					'inline-flex items-center justify-center rounded-full shrink-0 badge-primary-icon',
					className
				)}
			>
				<Icon className={cn('text-primary', iconClassName || 'h-4 w-4')} />
			</span>
		);
	}

	if (imageURL) {
		return (
			<img
				src={imageURL}
				alt={name || ''}
				className={cn('rounded-full object-cover shrink-0', className)}
				loading='lazy'
			/>
		);
	}

	return (
		<span
			className={cn(
				'inline-flex items-center justify-center rounded-full shrink-0 badge-primary-icon',
				className
			)}
		>
			<Icon className={cn('text-primary', iconClassName || 'h-4 w-4')} />
		</span>
	);
};
