import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { Menu, LogOut, User, Home, Plus, Eye } from 'lucide-react';
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
	{ to: '/', label: 'Enlaces', icon: Home },
	{ to: '/preview', label: 'Vista previa', icon: Eye },
];

export const Navbar = () => {
	const dispatch = useDispatch();
	const { menuMobile } = useSelector((state) => state.ui);
	const { name, email, imageURL } = useSelector((state) => state.auth.user);

	return (
		<nav className='sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-lg'>
			<div className='container flex h-16 items-center justify-between gap-4'>
				<Link to='/' className='flex items-center gap-2.5 font-bold text-lg shrink-0'>
					<span className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm'>T</span>
					<span className='hidden sm:inline'>TreeLink</span>
				</Link>

				<div className='hidden md:flex items-center gap-1 bg-secondary/80 rounded-full p-1'>
					{navLinks.map(({ to, label, icon: Icon }) => (
						<NavLink
							key={to}
							to={to}
							className={({ isActive }) =>
								cn(
									'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all',
									isActive
										? 'bg-background text-foreground shadow-sm'
										: 'text-muted-foreground hover:text-foreground'
								)
							}
						>
							<Icon className='h-4 w-4' />
							{label}
						</NavLink>
					))}
				</div>

				<div className='flex items-center gap-2'>
					<Button asChild size='sm' className='hidden sm:inline-flex'>
						<Link to='/new-link'>
							<Plus className='h-4 w-4' />
							Añadir link
						</Link>
					</Button>
					<ThemeToggle />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='ghost' className='relative h-10 w-10 rounded-full p-0'>
								<Avatar className='h-9 w-9 ring-2 ring-border'>
									<AvatarImage src={imageURL} alt={name} />
									<AvatarFallback>{name?.charAt(0)?.toUpperCase()}</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end' className='w-56 rounded-2xl'>
							<DropdownMenuLabel>
								<p className='font-semibold'>{name}</p>
								<p className='text-xs text-muted-foreground font-normal truncate'>{email}</p>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => dispatch(openProfile())} className='rounded-xl'>
								<User className='mr-2 h-4 w-4' />
								Configuración
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => dispatch(logoutUser())} className='rounded-xl'>
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
				<div className='md:hidden border-t px-4 py-3 space-y-1 bg-background'>
					{navLinks.map(({ to, label, icon: Icon }) => (
						<NavLink
							key={to}
							to={to}
							onClick={() => dispatch(changeStateMenuMobile())}
							className={({ isActive }) =>
								cn(
									'flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium',
									isActive ? 'bg-secondary text-foreground' : 'text-muted-foreground'
								)
							}
						>
							<Icon className='h-4 w-4' />
							{label}
						</NavLink>
					))}
					<NavLink
						to='/new-link'
						onClick={() => dispatch(changeStateMenuMobile())}
						className='flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-primary'
					>
						<Plus className='h-4 w-4' />
						Añadir link
					</NavLink>
				</div>
			)}

			<ModalProfile />
		</nav>
	);
};
