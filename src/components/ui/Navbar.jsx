import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, LogOut, User, Home, Eye, ExternalLink, X } from 'lucide-react';
import { logoutUser } from '../../redux';
import { openProfile, changeStateMenuMobile } from '../../redux/slices/uiSlice';
import { ModalProfile } from '../modal';
import { TreeLinkLogo } from '../TreeLinkLogo';
import { MobileSidebar } from './MobileSidebar';
import { ThemeToggle } from './theme-toggle';
import { Button } from './button';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './dropdown-menu';
import { cn } from '@/lib/utils';
import { buildPublicUrl } from '../../utils';

const navLinks = [
	{ to: '/', label: 'Enlaces', icon: Home },
	{ to: '/preview', label: 'Vista previa', icon: Eye },
];

export const Navbar = () => {
	const dispatch = useDispatch();
	const { menuMobile } = useSelector((state) => state.ui);
	const { name, email, imageURL, username } = useSelector((state) => state.auth.user);
	const publicUrl = buildPublicUrl(username);

	return (
		<>
			<header className='app-header'>
				<div className='app-header-bar'>
					<TreeLinkLogo showText imageClassName='h-7 w-7' textClassName='hidden sm:inline text-base' />

					<nav className='app-header-nav' aria-label='Principal'>
						{navLinks.map(({ to, label, icon: Icon }) => (
							<NavLink
								key={to}
								to={to}
								className={({ isActive }) =>
									cn('app-header-link', isActive && 'app-header-link-active')
								}
							>
								<Icon className='h-3.5 w-3.5' />
								{label}
							</NavLink>
						))}
					</nav>

					<div className='flex items-center gap-1.5'>
						<div className='hidden sm:block'>
							<ThemeToggle />
						</div>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='ghost' className='relative h-9 w-9 rounded-full p-0'>
									<Avatar className='h-8 w-8 ring-1 ring-border'>
										<AvatarImage src={imageURL} alt={name} />
										<AvatarFallback className='text-xs font-semibold'>
											{name?.charAt(0)?.toUpperCase()}
										</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end' className='w-56 rounded-xl'>
								<DropdownMenuLabel>
									<p className='font-semibold'>{name}</p>
									<p className='truncate text-xs font-normal text-muted-foreground'>{email}</p>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild className='rounded-lg'>
									<a href={publicUrl} target='_blank' rel='noopener noreferrer'>
										<ExternalLink className='mr-2 h-4 w-4' />
										Abrir mi página
									</a>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => dispatch(openProfile())} className='rounded-lg'>
									<User className='mr-2 h-4 w-4' />
									Configuración
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => dispatch(logoutUser())} className='rounded-lg'>
									<LogOut className='mr-2 h-4 w-4' />
									Cerrar sesión
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<Button
							variant='ghost'
							size='icon'
							className='relative h-9 w-9 md:hidden'
							onClick={() => dispatch(changeStateMenuMobile())}
							aria-label={menuMobile ? 'Cerrar menú' : 'Abrir menú'}
						>
							<AnimatePresence mode='wait' initial={false}>
								<motion.span
									key={menuMobile ? 'close' : 'open'}
									initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
									animate={{ opacity: 1, rotate: 0, scale: 1 }}
									exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
									transition={{ duration: 0.18 }}
									className='inline-flex'
								>
									{menuMobile ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
								</motion.span>
							</AnimatePresence>
						</Button>
					</div>
				</div>

				<ModalProfile />
			</header>

			<MobileSidebar />
		</>
	);
};
