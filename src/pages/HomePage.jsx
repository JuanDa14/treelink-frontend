import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GripVertical, Plus } from 'lucide-react';
import { useSelector } from 'react-redux';

import { FeaturedBadge, LinkList, ModalAlerta, ModalForm, ShareTreeLinkPanel, TreeProfileHeader } from '../components';
import { Layout } from '../layouts';
import { Button } from '@/components/ui/button';
import { buildPublicUrl } from '../utils';
import { cn } from '@/lib/utils';

export const HomePage = () => {
	const { links, loading } = useSelector((state) => state.link);
	const { imageURL, username, name, bio } = useSelector((state) => state.auth.user);
	const featuredCount = links.filter((link) => link.featured).length;
	const hiddenCount = links.filter((link) => link.isActive === false).length;
	const publicUrl = buildPublicUrl(username);
	const isIdle = loading || links.length === 0;

	return (
		<Layout>
			<div className='container max-w-6xl py-8 lg:py-10'>
				<div className='dashboard-shell'>
					<div
						className={cn(
							'min-w-0',
							isIdle && 'flex min-h-[calc(100dvh-6.5rem)] flex-col'
						)}
					>
						{!isIdle && (
							<>
								<motion.header
									initial={{ opacity: 0, y: -8 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
									className='page-header'
								>
									<div className='flex flex-wrap items-end justify-between gap-4'>
										<div className='min-w-0'>
											<p className='mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary'>
												Dashboard
											</p>
											<h1 className='page-header-title'>Tus enlaces</h1>
											<p className='page-header-subtitle'>
												Arrastra para reordenar, destaca lo importante y mira el resultado en vivo.
											</p>
										</div>
										<Button asChild className='shrink-0'>
											<Link to='/new-link'>
												<Plus className='h-4 w-4' />
												Añadir enlace
											</Link>
										</Button>
									</div>

									<div className='mt-4 flex flex-wrap items-center gap-2'>
										<span className='rounded-full border border-border/80 bg-card/80 px-3 py-1 text-sm font-medium text-muted-foreground'>
											{links.length} {links.length === 1 ? 'link' : 'links'}
										</span>
										<FeaturedBadge count={featuredCount} />
										{hiddenCount > 0 && (
											<span className='badge-muted'>
												{hiddenCount} oculto{hiddenCount > 1 ? 's' : ''}
											</span>
										)}
									</div>
								</motion.header>

								<div className='mb-4 flex items-center gap-2 text-sm text-muted-foreground'>
									<GripVertical className='h-4 w-4 shrink-0' />
									<span>Arrastra el icono para cambiar el orden</span>
								</div>
							</>
						)}

						<div
							className={cn(
								isIdle && 'flex flex-1 flex-col items-center justify-center'
							)}
						>
							<LinkList sortable />
						</div>

						{!isIdle && (
							<div className='mt-8 lg:hidden'>
								<ShareTreeLinkPanel publicUrl={publicUrl} username={username} compact />
							</div>
						)}
					</div>

					<aside className='dashboard-preview'>
						<motion.div
							className='dashboard-preview-sticky'
							initial={{ opacity: 0, x: 16 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.12, duration: 0.45 }}
						>
							<p className='text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground'>
								Vista previa
							</p>
							<div className='phone-mockup'>
								<div className='tree-page-bg tree-page-bg--contained phone-mockup-screen'>
									<div className='w-full'>
										<TreeProfileHeader
											imageURL={imageURL}
											username={username}
											name={name}
											subtitle={bio || 'Toca un enlace para visitarlo'}
											compact
										/>
										<LinkList publicView />
									</div>
								</div>
							</div>
							<a
								href={publicUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='max-w-[320px] truncate text-center text-sm font-medium text-primary hover:underline'
							>
								{publicUrl}
							</a>
						</motion.div>
					</aside>
				</div>
			</div>
			<ModalForm />
			<ModalAlerta />
		</Layout>
	);
};

export default HomePage;
