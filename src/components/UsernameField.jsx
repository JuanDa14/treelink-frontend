import { useField } from 'formik';
import { CheckCircle2, Loader2, XCircle, AlertCircle } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { slugifyUsername } from '../utils/slug';
import { useUsernameAvailability, USERNAME_STATUS } from '../hooks/useUsernameAvailability';

const STATUS_COPY = {
	[USERNAME_STATUS.CHECKING]: {
		text: 'Verificando disponibilidad...',
		icon: Loader2,
		className: 'text-muted-foreground',
		spin: true,
	},
	[USERNAME_STATUS.AVAILABLE]: {
		text: 'Nombre de usuario disponible',
		icon: CheckCircle2,
		className: 'text-primary',
	},
	[USERNAME_STATUS.TAKEN]: {
		text: 'Este nombre de usuario ya está en uso',
		icon: XCircle,
		className: 'text-destructive',
	},
	[USERNAME_STATUS.INVALID]: {
		text: 'Formato inválido. Usa solo letras minúsculas, números, guiones y guiones bajos',
		icon: AlertCircle,
		className: 'text-destructive',
	},
};

export const UsernameField = ({
	name = 'username',
	text = 'Nombre de usuario (URL pública)',
	placeholder = 'juan-morales',
	currentUsername = '',
	classNameContainer,
}) => {
	const [{ onBlur }, { error, touched, value }, { setValue }] = useField(name);
	const { status } = useUsernameAvailability(value, currentUsername);
	const showError = touched && error;
	const statusInfo = STATUS_COPY[status];
	const showStatus = statusInfo && status !== USERNAME_STATUS.IDLE;

	return (
		<div className={cn('flex flex-col w-full gap-2', classNameContainer)}>
			{text && (
				<Label htmlFor={name} className={cn(showError && 'text-destructive')}>
					{text}
				</Label>
			)}
			<Input
				id={name}
				name={name}
				type='text'
				placeholder={placeholder}
				value={value}
				onBlur={onBlur}
				onChange={(e) => setValue(slugifyUsername(e.target.value))}
				className={cn(showError && 'border-destructive focus-visible:ring-destructive')}
				aria-invalid={showError || status === USERNAME_STATUS.TAKEN}
			/>
			{showError && <p className='text-sm text-destructive'>{error}</p>}
			{showStatus && (
				<p className={cn('flex items-center gap-1.5 text-xs font-medium', statusInfo.className)}>
					<statusInfo.icon className={cn('h-3.5 w-3.5', statusInfo.spin && 'animate-spin')} />
					{statusInfo.text}
				</p>
			)}
		</div>
	);
};

export const isUsernameReadyToSave = (status) =>
	![USERNAME_STATUS.CHECKING, USERNAME_STATUS.TAKEN, USERNAME_STATUS.INVALID].includes(status);
