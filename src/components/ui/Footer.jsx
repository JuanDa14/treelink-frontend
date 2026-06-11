import { Link } from 'react-router-dom';
import { TreePine } from 'lucide-react';

export const Footer = () => {
	return (
		<footer className='app-footer mt-auto'>
			<div className='container py-8'>
				<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
					<div className='flex items-center gap-3'>
						<span className='footer-logo'>T</span>
						<div>
							<p className='font-bold text-foreground'>TreeLink</p>
							<p className='text-sm text-muted-foreground'>Tu link en bio, todo en un solo lugar.</p>
						</div>
					</div>
					<nav className='flex flex-wrap gap-4 text-sm'>
						<Link to='/' className='footer-link'>
							Mis enlaces
						</Link>
						<Link to='/preview' className='footer-link'>
							Vista previa
						</Link>
						<Link to='/new-link' className='footer-link'>
							Añadir link
						</Link>
					</nav>
				</div>
				<div className='footer-divider my-6' />
				<p className='text-center md:text-left text-sm text-muted-foreground'>
					&copy; {new Date().getFullYear()} TreeLink. Todos los derechos reservados.
				</p>
			</div>
		</footer>
	);
};

export const PublicFooter = () => {
	return (
		<div className='public-footer mt-10'>
			<TreePine className='h-4 w-4 text-primary mx-auto mb-2' />
			<p className='text-center text-xs text-muted-foreground'>
				Creado con <span className='font-semibold text-primary'>TreeLink</span>
			</p>
		</div>
	);
};
