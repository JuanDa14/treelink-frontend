import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export const LinkPreviewCard = ({ name, url, description, imageURL, featured, isActive }) => {
	const previewImage = typeof imageURL === 'string' ? imageURL : imageURL ? URL.createObjectURL(imageURL) : null;

	return (
		<div className='rounded-3xl border-2 border-border bg-card p-6 shadow-sm sticky top-24'>
			<p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4'>Vista previa</p>
			<div className='tree-page-bg rounded-2xl px-4 py-6 min-h-[200px]'>
				<button
					type='button'
					className={cn(
						'link-pill w-full pointer-events-none',
						featured && 'link-pill-featured',
						isActive === false && 'opacity-50'
					)}
				>
					{previewImage ? (
						<img src={previewImage} alt='' className='h-8 w-8 shrink-0 rounded-full object-cover' />
					) : (
						<div className='h-8 w-8 shrink-0 rounded-full bg-secondary' />
					)}
					<span className='flex flex-col items-start min-w-0 text-left'>
						<span className='flex items-center gap-1.5 font-semibold capitalize truncate w-full'>
							{name || 'Nombre del enlace'}
							{featured && <Star className='h-3.5 w-3.5 fill-primary text-primary shrink-0' />}
						</span>
						{description && (
							<span className='text-xs text-muted-foreground font-normal truncate w-full'>{description}</span>
						)}
					</span>
				</button>
				{isActive === false && (
					<p className='text-center text-xs text-muted-foreground mt-3'>Oculto en tu página pública</p>
				)}
				{url && <p className='text-center text-[10px] text-muted-foreground mt-2 truncate'>{url}</p>}
			</div>
		</div>
	);
};
