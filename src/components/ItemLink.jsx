import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

import { toggleLinkField } from '../redux';
import { getLinkById } from '../redux/slices/linkSlice';
import { openAlert, openModal } from '../redux/slices/uiSlice';
import { DashboardLinkRow } from './DashboardLinkRow';
import { cn } from '@/lib/utils';

export const ItemLink = ({
	imageURL,
	name,
	url,
	description,
	featured,
	isActive,
	_id,
	sortable = false,
	publicView = false,
}) => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const isDashboard = pathname === '/' && !publicView;

	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: _id,
		disabled: !sortable,
	});

	const style = sortable
		? {
				transform: CSS.Transform.toString(transform),
				transition: isDragging ? undefined : transition,
				opacity: isDragging ? 0.35 : 1,
			}
		: undefined;

	const openLink = () => {
		window.open(url, '_blank', 'noopener,noreferrer');
	};

	if (isDashboard) {
		return (
			<div ref={setNodeRef} style={style}>
				<DashboardLinkRow
					imageURL={imageURL}
					name={name}
					url={url}
					description={description}
					featured={featured}
					isActive={isActive}
					isDragging={isDragging}
					dragHandleProps={{ ...attributes, ...listeners }}
					onToggleFeatured={() => dispatch(toggleLinkField(_id, 'featured', !featured))}
					onToggleActive={() => dispatch(toggleLinkField(_id, 'isActive', isActive === false))}
					onEdit={() => {
						dispatch(getLinkById(_id));
						dispatch(openModal());
					}}
					onDelete={() => {
						dispatch(openAlert());
						dispatch(getLinkById(_id));
					}}
					onOpen={openLink}
				/>
			</div>
		);
	}

	return (
		<motion.button
			type='button'
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			onClick={openLink}
			className={cn('link-pill w-full', featured && 'link-pill-featured')}
		>
			<img src={imageURL} alt='' className='h-8 w-8 shrink-0 rounded-full object-cover' loading='lazy' />
			<span className='flex flex-col items-center min-w-0 text-center'>
				<span className='flex items-center gap-1.5 font-semibold capitalize truncate w-full justify-center'>
					{name}
					{featured && <Star className='h-3.5 w-3.5 fill-primary text-primary shrink-0' />}
				</span>
				{description && (
					<span className='text-xs text-muted-foreground font-normal truncate w-full'>{description}</span>
				)}
			</span>
		</motion.button>
	);
};
