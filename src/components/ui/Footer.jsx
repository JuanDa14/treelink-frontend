import { TREE_LINK_LOGO_SRC } from '../TreeLinkLogo';

/** Branding en la página pública (no el footer del dashboard). */
export const PublicFooter = () => {
	return (
		<div className='public-footer mt-10'>
			<img
				src={TREE_LINK_LOGO_SRC}
				alt='TreeLink'
				className='mx-auto mb-2 h-6 w-6 rounded-full object-cover ring-2 ring-primary/25'
			/>
			<p className='text-center text-xs text-muted-foreground'>
				Creado con{' '}
				<span className='font-display font-semibold text-primary'>TreeLink</span>
			</p>
		</div>
	);
};
