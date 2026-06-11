import { ExternalLink, GripVertical, Pencil, Star, Trash2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const DashboardLinkRow = ({
	imageURL,
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
	return (
		<div
			className={cn(
				'link-pill-dashboard group',
				featured && 'link-pill-dashboard-featured',
				isActive === false && 'link-pill-dashboard-hidden',
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
			<img src={imageURL} alt={name} className='h-10 w-10 shrink-0 rounded-full object-cover' loading='lazy' />
			<div className='min-w-0 flex-1'>
				<div className='flex items-center gap-1.5'>
					<p className='font-semibold capitalize truncate'>{name}</p>
					{featured && <Star className='h-3.5 w-3.5 fill-primary text-primary shrink-0' />}
					{isActive === false && <span className='badge-muted shrink-0'>Oculto</span>}
				</div>
				{description ? (
					<p className='text-xs text-muted-foreground truncate'>{description}</p>
				) : (
					<p className='text-xs text-muted-foreground truncate'>{url}</p>
				)}
			</div>
			<div className='link-actions'>
				<Button
					variant='ghost'
					size='icon'
					className={cn('link-action-btn', featured && 'link-action-btn-active')}
					title={featured ? 'Quitar destacado' : 'Destacar'}
					type='button'
					onClick={onToggleFeatured}
				>
					<Star className={cn('h-4 w-4', featured && 'fill-primary')} />
				</Button>
				<Button
					variant='ghost'
					size='icon'
					className='link-action-btn'
					title={isActive === false ? 'Mostrar enlace' : 'Ocultar enlace'}
					type='button'
					onClick={onToggleActive}
				>
					{isActive === false ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
				</Button>
				<Button variant='ghost' size='icon' className='link-action-btn' title='Editar' type='button' onClick={onEdit}>
					<Pencil className='h-4 w-4' />
				</Button>
				<Button
					variant='ghost'
					size='icon'
					className='link-action-btn link-action-btn-danger'
					title='Eliminar'
					type='button'
					onClick={onDelete}
				>
					<Trash2 className='h-4 w-4' />
				</Button>
				<Button variant='ghost' size='icon' className='link-action-btn' title='Abrir' type='button' onClick={onOpen}>
					<ExternalLink className='h-4 w-4' />
				</Button>
			</div>
		</div>
	);
};
