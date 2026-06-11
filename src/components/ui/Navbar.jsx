import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Trees, LogOut, User, Home, Plus, Eye } from 'lucide-react';
import { logoutUser } from '../../redux';
import { openProfile, changeStateMenuMobile } from '../../redux/slices/uiSlice';
import { ModalProfile } from '../modal';
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

const navLinks = [
	{ to: '/', label: 'Inicio', icon: Home },
	{ to: '/new-link', label: 'Nuevo', icon: Plus },
	{ to: '/preview', label: 'Vista previa', icon: Eye },
];

export const Navbar = () => {
	const dispatch = useDispatch();
	const { menuMobile } = useSelector((state) => state.ui);
	const { name, email, imageURL } = useSelector((state) => state.auth.user);

	return (
		<nav className='sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md'>
			<div className='container flex h-16 items-center justify-between'>
				<Link to='/' className='flex items-center gap-2 font-semibold text-primary transition-opacity hover:opacity-80'>
					<Trees className='h-5 w-5' />
					<span>TreeLink</span>
				</Link>

				<div className='hidden md:flex items-center gap-1'>
					{navLinks.map(({ to, label, icon: Icon }) => (
						<NavLink
							key={to}
							to={to}
							className={({ isActive }) =>
								cn(
									'flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
									isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
								)
							}
						>
							<Icon className='h-4 w-4' />
							{label}
						</NavLink>
					))}
				</div>

				<div className='flex items-center gap-2'>
					<ThemeToggle />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className='relative h-10 w-10 rounded-full p-0'>
								<Avatar className='h-10 w-10'>
									<AvatarImage src={imageURL} alt={name} />
									<AvatarFallback>{name?.charAt(0)?.toUpperCase()}</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className='w-56'>
							<DropdownMenuLabel>
								<p className='font-medium'>{name}</p>
								<p className='text-xs text-muted-foreground font-normal truncate'>{email}</p>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => dispatch(openProfile())}>
								<User className='mr-2 h-4 w-4' />
								Perfil
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => dispatch(logoutUser())}>
								<LogOut className='mr-2 h-4 w-4' />
								Cerrar sesión
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<Button
						variant='ghost'
						size='icon'
						className='md:hidden'
						onClick={() => dispatch(changeStateMenuMobile())}
						aria-label='Abrir menú'
					>
						<Menu className='h-5 w-5' />
					</Button>
				</div>
			</div>

			{menuMobile && (
				<div className='md:hidden border-t px-4 py-3 space-y-1'>
					{navLinks.map(({ to, label, icon: Icon }) => (
						<NavLink
							key={to}
							to={to}
							onClick={() => dispatch(changeStateMenuMobile())}
							className={({ isActive }) =>
								cn(
									'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium',
									isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-muted'
								)
							}
						>
							<Icon className='h-4 w-4' />
							{label}
						</NavLink>
					))}
				</div>
			)}

			<ModalProfile />
		</nav>
	);
};
