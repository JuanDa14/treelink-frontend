import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Check, Copy, Share2 } from 'lucide-react';

import { LinkList, TreeProfileHeader } from '../components';
import { Layout } from '../layouts';
import { Button } from '@/components/ui/button';

const PreviewPage = () => {
	const { imageURL, username } = useSelector((state) => state.auth.user);
	const [copied, setCopied] = useState(false);

	const publicUrl = `${import.meta.env.VITE_APP_LOCAL_URL}/user/${username}`;

	const handleCopyLink = () => {
		navigator.clipboard.writeText(publicUrl);
		toast.success('Enlace copiado al portapapeles');
		setCopied(true);
	};

	useEffect(() => {
		if (!copied) return;
		const timer = setTimeout(() => setCopied(false), 2000);
		return () => clearTimeout(timer);
	}, [copied]);

	return (
		<Layout>
			<div className='container py-8 max-w-4xl'>
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8'
				>
					<div>
						<h1 className='text-3xl font-bold tracking-tight'>Vista previa</h1>
						<p className='text-muted-foreground mt-1'>Así verán tu página los visitantes</p>
					</div>
					<Button onClick={handleCopyLink} variant='outline' size='lg'>
						{copied ? <Check className='mr-2 h-4 w-4 text-primary' /> : <Copy className='mr-2 h-4 w-4' />}
						{copied ? '¡Copiado!' : 'Copiar mi link'}
					</Button>
				</motion.div>

				<div className='grid lg:grid-cols-2 gap-10 items-start'>
					<div className='phone-mockup'>
						<div className='phone-mockup-notch' />
						<div className='tree-page-bg min-h-[520px] rounded-b-[2rem] px-5 py-8'>
							<TreeProfileHeader imageURL={imageURL} username={username} subtitle='Toca un enlace para visitarlo' />
							<LinkList />
						</div>
					</div>

					<div className='space-y-6'>
						<div className='rounded-2xl border-2 border-border bg-card p-6'>
							<div className='flex items-start gap-3'>
								<Share2 className='h-5 w-5 text-primary shrink-0 mt-0.5' />
								<div>
									<h3 className='font-semibold'>Comparte tu TreeLink</h3>
									<p className='text-sm text-muted-foreground mt-1'>
										Añade este enlace a tu bio de Instagram, TikTok, YouTube o donde tengas audiencia.
									</p>
									<p className='mt-3 text-sm font-mono bg-secondary rounded-xl px-3 py-2 break-all'>{publicUrl}</p>
								</div>
							</div>
						</div>
						<div className='rounded-2xl border-2 border-dashed border-border bg-secondary/50 p-6 text-center'>
							<p className='text-sm text-muted-foreground'>
								¿Quieres cambiar algo? Edita tus enlaces desde la pestaña <strong>Enlaces</strong>.
							</p>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default PreviewPage;
