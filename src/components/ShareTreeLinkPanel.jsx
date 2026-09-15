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
import { cn } from '@/lib/utils';

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

export const ShareTreeLinkPanel = ({ publicUrl, username, compact = false }) => {
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
		<div className={cn('surface-panel space-y-5', compact ? 'p-5' : 'p-6')}>
			<div className='flex items-start gap-3'>
				<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl badge-primary-icon'>
					<Share2 className='h-5 w-5 text-primary' />
				</div>
				<div>
					<h3 className='font-display text-lg font-bold tracking-tight'>Comparte tu TreeLink</h3>
					<p className='mt-1 text-sm leading-relaxed text-muted-foreground'>
						Abre tu página, copia el enlace o compártelo en tus redes.
					</p>
				</div>
			</div>

			<div className='rounded-xl border border-border/80 bg-secondary/60 px-4 py-3'>
				<p className='mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground'>
					Tu URL pública
				</p>
				<p className='break-all font-mono text-sm text-foreground'>{publicUrl}</p>
			</div>

			<div className='flex flex-col gap-2 sm:flex-row'>
				<Button onClick={handleOpen} variant='default' className='flex-1 rounded-xl'>
					<ExternalLink className='mr-2 h-4 w-4' />
					Abrir mi página
				</Button>
				<Button onClick={handleCopy} variant='outline' className='flex-1 rounded-xl'>
					{copied ? <Check className='mr-2 h-4 w-4 text-primary' /> : <Copy className='mr-2 h-4 w-4' />}
					{copied ? '¡Copiado!' : 'Copiar link'}
				</Button>
			</div>

			{typeof navigator !== 'undefined' && navigator.share && (
				<Button onClick={handleNativeShare} variant='secondary' className='w-full rounded-xl'>
					<Share2 className='mr-2 h-4 w-4' />
					Compartir desde el dispositivo
				</Button>
			)}

			{!compact && (
				<div>
					<p className='mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground'>
						Compartir en redes
					</p>
					<div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
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
			)}
		</div>
	);
};
