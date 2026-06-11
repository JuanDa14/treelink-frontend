import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
	ExternalLink,
	Eye,
	Home,
	LogOut,
	Plus,
	Settings,
	X,
} from 'lucide-react';

import { logoutUser } from '../../redux';
import { closeMenuMobile, openProfile } from '../../redux/slices/uiSlice';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Button } from './button';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/utils';
import { buildPublicUrl } from '../../utils';
import { TreeLinkLogo } from '../TreeLinkLogo';

const navLinks = [
	{ to: '/', label: 'Enlaces', icon: Home, description: 'Gestiona tus links' },
	{ to: '/preview', label: 'Vista previa', icon: Eye, description: 'Cómo te ven los demás' },
	{ to: '/new-link', label: 'Añadir link', icon: Plus, description: 'Nuevo enlace', accent: true },
];

const backdrop = {
	closed: { opacity: 0 },
	open: { opacity: 1 },
};

const panel = {
	closed: { x: '100%' },
	open: {
		x: 0,
		transition: { type: 'spring', stiffness: 340, damping: 34, mass: 0.8 },
	},
	exit: {
		x: '100%',
		transition: { type: 'spring', stiffness: 400, damping: 40 },
	},
};

const list = {
	closed: {},
	open: {
		transition: { staggerChildren: 0.06, delayChildren: 0.12 },
	},
};

const item = {
	closed: { opacity: 0, x: 28 },
	open: {
		opacity: 1,
		x: 0,
		transition: { type: 'spring', stiffness: 380, damping: 28 },
	},
};

export const MobileSidebar = () => {
	const dispatch = useDispatch();
	const { menuMobile } = useSelector((state) => state.ui);
	const { name, email, imageURL, username } = useSelector((state) => state.auth.user);
	const publicUrl = buildPublicUrl(username);

	const close = () => dispatch(closeMenuMobile());

	useEffect(() => {
		if (!menuMobile) return undefined;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';

		const onKeyDown = (event) => {
			if (event.key === 'Escape') close();
		};

		window.addEventListener('keydown', onKeyDown);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [menuMobile]);

	const handleProfile = () => {
		close();
		dispatch(openProfile());
	};

	const handleLogout = () => {
		close();
		dispatch(logoutUser());
	};

	return (
		<AnimatePresence>
			{menuMobile && (
				<div className='fixed inset-0 z-50 md:hidden'>
					<motion.button
						type='button'
						aria-label='Cerrar menú'
						className='absolute inset-0 bg-background/70 backdrop-blur-sm'
						variants={backdrop}
						initial='closed'
						animate='open'
						exit='closed'
						transition={{ duration: 0.22 }}
						onClick={close}
					/>

					<motion.aside
						className='mobile-sidebar-panel absolute right-0 top-0 flex h-full w-[min(88vw,320px)] flex-col'
						variants={panel}
						initial='closed'
						animate='open'
						exit='exit'
					>
						<div className='mobile-sidebar-glow pointer-events-none' aria-hidden />

						<div className='relative z-10 flex items-center justify-between px-5 pt-5 pb-3'>
							<TreeLinkLogo asLink={false} imageClassName='h-7 w-7' />
							<Button variant='ghost' size='icon' onClick={close} aria-label='Cerrar menú'>
								<X className='h-5 w-5' />
							</Button>
						</div>

						<div className='relative z-10 mx-4 mb-4 rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm'>
							<div className='flex items-center gap-3'>
								<Avatar className='h-12 w-12 ring-2 ring-primary/30'>
									<AvatarImage src={imageURL} alt={name} />
									<AvatarFallback>{name?.charAt(0)?.toUpperCase()}</AvatarFallback>
								</Avatar>
								<div className='min-w-0'>
									<p className='font-semibold truncate'>{name}</p>
									<p className='text-xs text-muted-foreground truncate'>@{username}</p>
									<p className='text-xs text-muted-foreground truncate'>{email}</p>
								</div>
							</div>
						</div>

						<motion.nav
							className='relative z-10 flex-1 space-y-1.5 overflow-y-auto px-3 pb-4'
							variants={list}
							initial='closed'
							animate='open'
						>
							{navLinks.map(({ to, label, icon: Icon, description, accent }) => (
								<motion.div key={to} variants={item}>
									<NavLink
										to={to}
										onClick={close}
										className={({ isActive }) =>
											cn(
												'mobile-sidebar-link group',
												accent && 'mobile-sidebar-link-accent',
												isActive && 'mobile-sidebar-link-active'
											)
										}
									>
										<span className='mobile-sidebar-link-icon'>
											<Icon className='h-5 w-5' />
										</span>
										<span className='min-w-0'>
											<span className='block font-semibold text-sm'>{label}</span>
											<span className='block text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors'>
												{description}
											</span>
										</span>
									</NavLink>
								</motion.div>
							))}

							<motion.div variants={item}>
								<a
									href={publicUrl}
									target='_blank'
									rel='noopener noreferrer'
									onClick={close}
									className='mobile-sidebar-link group'
								>
									<span className='mobile-sidebar-link-icon'>
										<ExternalLink className='h-5 w-5' />
									</span>
									<span className='min-w-0'>
										<span className='block font-semibold text-sm'>Abrir mi página</span>
										<span className='block text-xs text-muted-foreground'>Ver tu link público</span>
									</span>
								</a>
							</motion.div>

							<motion.div variants={item}>
								<button type='button' onClick={handleProfile} className='mobile-sidebar-link group w-full text-left'>
									<span className='mobile-sidebar-link-icon'>
										<Settings className='h-5 w-5' />
									</span>
									<span className='min-w-0'>
										<span className='block font-semibold text-sm'>Configuración</span>
										<span className='block text-xs text-muted-foreground'>Perfil y página pública</span>
									</span>
								</button>
							</motion.div>
						</motion.nav>

						<div className='relative z-10 mt-auto border-t border-border/80 p-4 space-y-3'>
							<div className='flex items-center justify-between rounded-2xl bg-secondary/60 px-4 py-3'>
								<span className='text-sm font-medium'>Tema</span>
								<ThemeToggle />
							</div>
							<Button
								variant='outline'
								className='w-full h-11 rounded-2xl text-destructive hover:text-destructive'
								onClick={handleLogout}
							>
								<LogOut className='mr-2 h-4 w-4' />
								Cerrar sesión
							</Button>
						</div>
					</motion.aside>
				</div>
			)}
		</AnimatePresence>
	);
};
