import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ExternalLink, GripVertical, Pencil, Star, Trash2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

import { toggleLinkField } from '../redux';
import { getLinkById } from '../redux/slices/linkSlice';
import { openAlert, openModal } from '../redux/slices/uiSlice';
import { Button } from '@/components/ui/button';
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
				transition,
				zIndex: isDragging ? 10 : undefined,
			}
		: undefined;

	const openLink = () => {
		window.open(url, '_blank', 'noopener,noreferrer');
	};

	if (isDashboard) {
		return (
			<motion.div
				ref={setNodeRef}
				style={style}
				whileHover={{ y: isDragging ? 0 : -1 }}
				className={cn(
					'link-pill-dashboard group',
					featured && 'ring-2 ring-primary/30',
					isActive === false && 'opacity-60',
					isDragging && 'shadow-lg scale-[1.01]'
				)}
			>
				<button
					type='button'
					className='cursor-grab active:cursor-grabbing touch-none p-1 -ml-1 text-muted-foreground hover:text-foreground'
					aria-label='Arrastrar para reordenar'
					{...attributes}
					{...listeners}
				>
					<GripVertical className='h-4 w-4' />
				</button>
				<img src={imageURL} alt={name} className='h-10 w-10 shrink-0 rounded-full object-cover' loading='lazy' />
				<div className='min-w-0 flex-1'>
					<div className='flex items-center gap-1.5'>
						<p className='font-semibold capitalize truncate'>{name}</p>
						{featured && <Star className='h-3.5 w-3.5 fill-primary text-primary shrink-0' />}
						{isActive === false && (
							<span className='text-[10px] font-semibold uppercase tracking-wide text-muted-foreground bg-secondary px-1.5 py-0.5 rounded-full shrink-0'>
								Oculto
							</span>
						)}
					</div>
					{description ? (
						<p className='text-xs text-muted-foreground truncate'>{description}</p>
					) : (
						<p className='text-xs text-muted-foreground truncate'>{url}</p>
					)}
				</div>
				<div className='flex items-center gap-0.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity'>
					<Button
						variant='ghost'
						size='icon'
						className={cn('h-8 w-8 rounded-full', featured && 'text-primary')}
						title={featured ? 'Quitar destacado' : 'Destacar'}
						type='button'
						onClick={() => dispatch(toggleLinkField(_id, 'featured', !featured))}
					>
						<Star className={cn('h-4 w-4', featured && 'fill-primary')} />
					</Button>
					<Button
						variant='ghost'
						size='icon'
						className='h-8 w-8 rounded-full'
						title={isActive === false ? 'Mostrar enlace' : 'Ocultar enlace'}
						type='button'
						onClick={() => dispatch(toggleLinkField(_id, 'isActive', isActive === false))}
					>
						{isActive === false ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
					</Button>
					<Button
						variant='ghost'
						size='icon'
						className='h-8 w-8 rounded-full'
						title='Editar'
						type='button'
						onClick={() => {
							dispatch(getLinkById(_id));
							dispatch(openModal());
						}}
					>
						<Pencil className='h-4 w-4' />
					</Button>
					<Button
						variant='ghost'
						size='icon'
						className='h-8 w-8 rounded-full text-destructive hover:text-destructive'
						title='Eliminar'
						type='button'
						onClick={() => {
							dispatch(openAlert());
							dispatch(getLinkById(_id));
						}}
					>
						<Trash2 className='h-4 w-4' />
					</Button>
					<Button variant='ghost' size='icon' className='h-8 w-8 rounded-full' title='Abrir' type='button' onClick={openLink}>
						<ExternalLink className='h-4 w-4' />
					</Button>
				</div>
			</motion.div>
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
