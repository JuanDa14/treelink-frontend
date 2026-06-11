import { ExternalLink, GripVertical, Pencil, Star, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LinkThumbnail } from './LinkThumbnail';
import { cn } from '@/lib/utils';

const stopAndRun = (handler) => (event) => {
	event.preventDefault();
	event.stopPropagation();
	handler();
};

export const DashboardLinkRow = ({
	imageURL,
	icon,
	name,
	url,
	description,
	featured,
	isActive,
	isDragging = false,
	dragHandleProps,
	onToggleFeatured,
	onToggleActive,
	onEdit,
	onDelete,
	onOpen,
}) => {
	const isHidden = isActive === false;
	const isFeatured = featured === true;

	return (
		<div
			className={cn(
				'link-pill-dashboard group',
				isFeatured && 'link-pill-dashboard-featured',
				isHidden && 'link-pill-dashboard-hidden',
				isDragging && 'link-pill-dashboard-dragging'
			)}
		>
			<button
				type='button'
				className='link-drag-handle'
				aria-label='Arrastrar para reordenar'
				{...dragHandleProps}
			>
				<GripVertical className='h-4 w-4' />
			</button>
			<LinkThumbnail imageURL={imageURL} icon={icon} name={name} className='h-10 w-10' iconClassName='h-5 w-5' />
			<div className='min-w-0 flex-1'>
				<div className='flex items-center gap-1.5'>
					<p className='font-semibold capitalize truncate'>{name}</p>
					{isFeatured && <Star className='h-3.5 w-3.5 fill-primary text-primary shrink-0' />}
					{isHidden && <span className='badge-muted shrink-0'>Oculto</span>}
				</div>
				{description ? (
					<p className='text-xs text-muted-foreground truncate'>{description}</p>
				) : (
					<p className='text-xs text-muted-foreground truncate'>{url}</p>
				)}
			</div>
			<div className='link-actions' onPointerDown={(e) => e.stopPropagation()}>
				<Button
					variant='ghost'
					size='icon'
					className={cn('link-action-btn', isFeatured && 'link-action-btn-active')}
					title={isFeatured ? 'Quitar destacado' : 'Destacar'}
					type='button'
					onClick={stopAndRun(onToggleFeatured)}
				>
					<Star className={cn('h-4 w-4', isFeatured && 'fill-primary')} />
				</Button>
				<Button
					variant='ghost'
					size='icon'
					className={cn('link-action-btn', isHidden && 'link-action-btn-active')}
					title={isHidden ? 'Mostrar enlace' : 'Ocultar enlace'}
					type='button'
					onClick={stopAndRun(onToggleActive)}
				>
					{isHidden ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
				</Button>
				<Button variant='ghost' size='icon' className='link-action-btn' title='Editar' type='button' onClick={stopAndRun(onEdit)}>
					<Pencil className='h-4 w-4' />
				</Button>
				<Button
					variant='ghost'
					size='icon'
					className='link-action-btn link-action-btn-danger'
					title='Eliminar'
					type='button'
					onClick={stopAndRun(onDelete)}
				>
					<Trash2 className='h-4 w-4' />
				</Button>
				<Button variant='ghost' size='icon' className='link-action-btn' title='Abrir' type='button' onClick={stopAndRun(onOpen)}>
					<ExternalLink className='h-4 w-4' />
				</Button>
			</div>
		</div>
	);
};
