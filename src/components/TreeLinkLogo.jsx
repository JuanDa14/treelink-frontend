import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const TREE_LINK_LOGO_SRC = '/tree-link.png';

export const TreeLinkLogo = ({
	to = '/',
	asLink = true,
	showText = false,
	className,
	imageClassName = 'h-8 w-8',
	textClassName,
}) => {
	const content = (
		<>
			<img
				src={TREE_LINK_LOGO_SRC}
				alt='TreeLink'
				className={cn('rounded-full object-cover ring-2 ring-primary/20 shadow-soft', imageClassName)}
			/>
			{showText && (
				<span
					className={cn(
						'font-display text-lg font-bold tracking-tight text-foreground',
						textClassName
					)}
				>
					Tree<span className='text-primary'>Link</span>
				</span>
			)}
		</>
	);

	const wrapperClass = cn('flex items-center gap-2.5 shrink-0', className);

	if (asLink && to) {
		return (
			<Link to={to} className={wrapperClass}>
				{content}
			</Link>
		);
	}

	return <div className={wrapperClass}>{content}</div>;
};
