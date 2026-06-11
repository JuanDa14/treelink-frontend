import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ExternalLink, GripVertical, Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

import { getLinkById } from '../redux/slices/linkSlice';
import { openAlert, openModal } from '../redux/slices/uiSlice';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const ItemLink = ({ imageURL, name, url, _id }) => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const isDashboard = pathname === '/';

	const openLink = () => {
		window.open(url, '_blank', 'noopener,noreferrer');
	};

	if (isDashboard) {
		return (
			<motion.div
				whileHover={{ y: -1 }}
				className='link-pill-dashboard group'
			>
				<GripVertical className='h-4 w-4 shrink-0 text-muted-foreground/50' aria-hidden='true' />
				<img src={imageURL} alt={name} className='h-10 w-10 shrink-0 rounded-full object-cover' loading='lazy' />
				<div className='min-w-0 flex-1'>
					<p className='font-semibold capitalize truncate'>{name}</p>
					<p className='text-xs text-muted-foreground truncate'>{url}</p>
				</div>
				<div className='flex items-center gap-0.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity'>
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
			className='link-pill w-full'
		>
			<img src={imageURL} alt='' className='h-8 w-8 shrink-0 rounded-full object-cover' loading='lazy' />
			<span className='font-semibold capitalize truncate'>{name}</span>
		</motion.button>
	);
};
