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
			<div className='container py-8 max-w-5xl'>
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-8'
				>
					<h1 className='text-3xl font-bold tracking-tight'>Vista previa</h1>
					<p className='text-muted-foreground mt-1'>Así verán tu página los visitantes</p>
				</motion.div>

				<div className='grid lg:grid-cols-2 gap-10 lg:gap-12 items-start'>
					<div className='flex justify-center w-full'>
						<div className='phone-mockup'>
							<div className='phone-mockup-notch' />
							<div className='tree-page-bg tree-page-bg--contained min-h-[520px] rounded-b-[2rem] px-5 py-8'>
								<div className='relative z-10 mx-auto w-full max-w-[280px]'>
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
					</div>

					<div className='space-y-6 w-full'>
						<ShareTreeLinkPanel publicUrl={publicUrl} username={username} />
						<div className='rounded-2xl border-2 border-dashed border-border bg-secondary p-6 text-center'>
							<p className='text-sm text-muted-foreground'>
								¿Quieres cambiar algo? Edita tus enlaces desde <strong>Enlaces</strong> o ajusta tu perfil en{' '}
								<strong>Configuración</strong>.
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default PreviewPage;
