import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

import { getLinkById } from '../redux/slices/linkSlice';
import { openAlert, openModal } from '../redux/slices/uiSlice';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export const ItemLink = ({ imageURL, name, url, _id }) => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const isDashboard = pathname === '/';

	const onNavigate = () => {
		if (!isDashboard) {
			window.open(url, '_blank', 'noopener,noreferrer');
		}
	};

	return (
		<Card
			onClick={onNavigate}
			className={cn(
				'group overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/30',
				!isDashboard && 'cursor-pointer hover:-translate-y-0.5'
			)}
		>
			<div className={cn('flex items-center gap-4 p-3', isDashboard ? 'justify-between' : 'justify-center')}>
				<div className='flex items-center gap-4 min-w-0'>
					<motion.img
						whileHover={{ scale: 1.05 }}
						src={imageURL}
						alt={name}
						className='h-16 w-16 shrink-0 rounded-lg object-cover'
						loading='lazy'
					/>
					<span className='font-semibold capitalize truncate'>{name}</span>
				</div>

				{isDashboard && (
					<div className='flex items-center gap-1 shrink-0'>
						<Button
							variant='ghost'
							size='icon'
							title='Editar'
							type='button'
							onClick={(e) => {
								e.stopPropagation();
								dispatch(getLinkById(_id));
								dispatch(openModal());
							}}
						>
							<Pencil className='h-4 w-4' />
						</Button>
						<Button
							variant='ghost'
							size='icon'
							title='Eliminar'
							type='button'
							className='text-destructive hover:text-destructive'
							onClick={(e) => {
								e.stopPropagation();
								dispatch(openAlert());
								dispatch(getLinkById(_id));
							}}
						>
							<Trash2 className='h-4 w-4' />
						</Button>
						<Button variant='ghost' size='icon' title='Abrir enlace' asChild>
							<a href={url} target='_blank' rel='noopener noreferrer' onClick={(e) => e.stopPropagation()}>
								<ExternalLink className='h-4 w-4' />
							</a>
						</Button>
					</div>
				)}
			</div>
		</Card>
	);
};
