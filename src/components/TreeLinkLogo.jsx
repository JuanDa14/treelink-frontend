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
				className={cn('rounded-full object-cover', imageClassName)}
			/>
			{showText && (
				<span className={cn('font-bold text-lg tracking-tight', textClassName)}>TreeLink</span>
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
