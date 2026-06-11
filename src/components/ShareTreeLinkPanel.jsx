import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
	Check,
	Copy,
	ExternalLink,
	Share2,
	Link2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const SOCIAL_NETWORKS = [
	{
		id: 'whatsapp',
		label: 'WhatsApp',
		getUrl: (url, text) => `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
	},
	{
		id: 'twitter',
		label: 'X',
		getUrl: (url, text) =>
			`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
	},
	{
		id: 'facebook',
		label: 'Facebook',
		getUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
	},
	{
		id: 'linkedin',
		label: 'LinkedIn',
		getUrl: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
	},
	{
		id: 'telegram',
		label: 'Telegram',
		getUrl: (url, text) =>
			`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
	},
];

export const ShareTreeLinkPanel = ({ publicUrl, username }) => {
	const [copied, setCopied] = useState(false);
	const shareText = `Mira mi TreeLink @${username}`;

	const handleCopy = () => {
		navigator.clipboard.writeText(publicUrl);
		toast.success('Enlace copiado al portapapeles');
		setCopied(true);
	};

	const handleOpen = () => {
		window.open(publicUrl, '_blank', 'noopener,noreferrer');
	};

	const handleNativeShare = async () => {
		if (!navigator.share) {
			handleCopy();
			return;
		}
		try {
			await navigator.share({ title: 'Mi TreeLink', text: shareText, url: publicUrl });
		} catch {
			// usuario canceló
		}
	};

	useEffect(() => {
		if (!copied) return;
		const timer = setTimeout(() => setCopied(false), 2000);
		return () => clearTimeout(timer);
	}, [copied]);

	return (
		<div className='rounded-3xl border-2 border-border bg-card p-6 space-y-5'>
			<div className='flex items-start gap-3'>
				<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full badge-primary-icon'>
					<Share2 className='h-5 w-5 text-primary' />
				</div>
				<div>
					<h3 className='font-bold text-lg'>Comparte tu TreeLink</h3>
					<p className='text-sm text-muted-foreground mt-1'>
						Abre tu página, copia el enlace o compártelo directamente en tus redes.
					</p>
				</div>
			</div>

			<div className='rounded-2xl border-2 border-border bg-secondary px-4 py-3'>
				<p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1'>Tu URL pública</p>
				<p className='text-sm font-mono break-all text-foreground'>{publicUrl}</p>
			</div>

			<div className='flex flex-col sm:flex-row gap-2'>
				<Button onClick={handleOpen} variant='default' className='flex-1'>
					<ExternalLink className='mr-2 h-4 w-4' />
					Abrir mi página
				</Button>
				<Button onClick={handleCopy} variant='outline' className='flex-1'>
					{copied ? <Check className='mr-2 h-4 w-4 text-primary' /> : <Copy className='mr-2 h-4 w-4' />}
					{copied ? '¡Copiado!' : 'Copiar link'}
				</Button>
			</div>

			{typeof navigator !== 'undefined' && navigator.share && (
				<Button onClick={handleNativeShare} variant='secondary' className='w-full'>
					<Share2 className='mr-2 h-4 w-4' />
					Compartir desde el dispositivo
				</Button>
			)}

			<div>
				<p className='text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3'>
					Compartir en redes
				</p>
				<div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
					{SOCIAL_NETWORKS.map(({ id, label, getUrl }) => (
						<a
							key={id}
							href={getUrl(publicUrl, shareText)}
							target='_blank'
							rel='noopener noreferrer'
							className='share-social-btn'
						>
							<Link2 className='h-4 w-4 shrink-0' />
							{label}
						</a>
					))}
				</div>
			</div>
		</div>
	);
};
