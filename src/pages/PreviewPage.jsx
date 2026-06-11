import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';

import { LinkList } from '../components';
import { Layout } from '../layouts';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

const PreviewPage = () => {
	const { imageURL, username } = useSelector((state) => state.auth.user);
	const [copied, setCopied] = useState(false);

	const handleCopyLink = () => {
		const domain = import.meta.env.VITE_APP_LOCAL_URL;
		const link = `${domain}/user/${username}`;
		navigator.clipboard.writeText(link);
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
			<div className='container py-8 max-w-lg'>
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					className='text-center mb-6'
				>
					<h1 className='text-2xl font-bold'>Vista previa</h1>
					<p className='text-sm text-muted-foreground mt-1'>Así verán tu árbol los visitantes</p>
				</motion.div>

				<Button onClick={handleCopyLink} variant='outline' className='w-full mb-6'>
					{copied ? <Check className='mr-2 h-4 w-4 text-primary' /> : <Copy className='mr-2 h-4 w-4' />}
					{copied ? '¡Copiado!' : 'Copiar enlace público'}
				</Button>

				<Card className='overflow-hidden'>
					<CardContent className='pt-8 pb-4'>
						<div className='flex flex-col items-center mb-6'>
							<Avatar className='h-24 w-24 mb-3 ring-4 ring-primary/10'>
								<AvatarImage src={imageURL} alt={username} />
								<AvatarFallback className='text-2xl'>{username?.charAt(0)?.toUpperCase()}</AvatarFallback>
							</Avatar>
							<span className='font-semibold text-lg'>@{username}</span>
						</div>
						<LinkList />
					</CardContent>
				</Card>
			</div>
		</Layout>
	);
};

export default PreviewPage;
