import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { LinkList, ShareTreeLinkPanel, TreeProfileHeader } from '../components';
import { Layout } from '../layouts';
import { buildPublicUrl } from '../utils';

const PreviewPage = () => {
	const { imageURL, username, name, bio } = useSelector((state) => state.auth.user);
	const publicUrl = buildPublicUrl(username);

	return (
		<Layout>
			<div className='container max-w-5xl py-8 lg:py-10'>
				<motion.header
					initial={{ opacity: 0, y: -8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
					className='page-header'
				>
					<p className='mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary'>
						Vista previa
					</p>
					<h1 className='page-header-title'>Así te ven</h1>
					<p className='page-header-subtitle'>
						Simula tu página pública y compártela en un clic.
					</p>
				</motion.header>

				<div className='grid items-start gap-10 lg:grid-cols-2 lg:gap-14'>
					<motion.div
						className='flex w-full justify-center'
						initial={{ opacity: 0, scale: 0.97 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.08, duration: 0.45 }}
					>
						<div className='phone-mockup'>
							<div className='tree-page-bg tree-page-bg--contained phone-mockup-screen'>
								<div className='w-full'>
									<TreeProfileHeader
										imageURL={imageURL}
										username={username}
										name={name}
										subtitle={bio || 'Toca un enlace para visitarlo'}
									/>
									<LinkList publicView />
								</div>
							</div>
						</div>
					</motion.div>

					<div className='w-full space-y-5'>
						<ShareTreeLinkPanel publicUrl={publicUrl} username={username} />
						<p className='px-1 text-center text-sm leading-relaxed text-muted-foreground lg:text-left'>
							¿Quieres cambiar algo? Edita tus enlaces desde{' '}
							<span className='font-semibold text-foreground'>Enlaces</span> o ajusta tu perfil en{' '}
							<span className='font-semibold text-foreground'>Configuración</span>.
						</p>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default PreviewPage;
