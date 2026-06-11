import { TREE_LINK_LOGO_SRC } from '../TreeLinkLogo';

export const Footer = () => {
	return (
		<footer className='app-footer mt-auto'>
			<div className='container py-6'>
				<p className='text-center text-sm text-muted-foreground'>
					&copy; {new Date().getFullYear()} TreeLink. Todos los derechos reservados.
				</p>
			</div>
		</footer>
	);
};

export const PublicFooter = () => {
	return (
		<div className='public-footer mt-10'>
			<img
				src={TREE_LINK_LOGO_SRC}
				alt='TreeLink'
				className='mx-auto mb-2 h-6 w-6 rounded-full object-cover'
			/>
			<p className='text-center text-xs text-muted-foreground'>
				Creado con <span className='font-semibold text-primary'>TreeLink</span>
			</p>
		</div>
	);
};
