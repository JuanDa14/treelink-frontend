import { useField, useFormikContext } from 'formik';
import { CheckCircle2, Loader2, XCircle, AlertCircle, Sparkles } from 'lucide-react';

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

const AUTO_GENERATED_COPY = {
	text: 'Nombre generado automáticamente',
	icon: Sparkles,
	className: 'text-primary',
};

export const UsernameField = ({
	name = 'username',
	text = 'Nombre de usuario (URL pública)',
	placeholder = 'juan-morales',
	currentUsername = '',
	classNameContainer,
	endAction,
	skipAvailabilityCheck = false,
	onManualEdit,
}) => {
	const { submitCount } = useFormikContext();
	const [{ onBlur }, { error, touched, value }, { setValue }] = useField(name);
	const { status } = useUsernameAvailability(value, currentUsername, {
		enabled: !skipAvailabilityCheck,
	});
	const showError = Boolean(error) && (touched || submitCount > 0);
	const statusInfo = skipAvailabilityCheck ? AUTO_GENERATED_COPY : STATUS_COPY[status];
	const showStatus =
		skipAvailabilityCheck || (statusInfo && status !== USERNAME_STATUS.IDLE);

	const handleChange = (e) => {
		onManualEdit?.();
		setValue(slugifyUsername(e.target.value));
	};

	return (
		<div className={cn('flex flex-col w-full gap-2', classNameContainer)}>
			{text && (
				<Label htmlFor={name} className={cn(showError && 'text-destructive')}>
					{text}
				</Label>
			)}
			<div className='flex items-center gap-2'>
				<Input
					id={name}
					name={name}
					type='text'
					placeholder={placeholder}
					value={value}
					onBlur={onBlur}
					onChange={handleChange}
					className={cn(
						'flex-1 min-w-0',
						showError && 'border-destructive focus-visible:ring-destructive'
					)}
					aria-invalid={showError || status === USERNAME_STATUS.TAKEN}
				/>
				{endAction}
			</div>
			{showError && <p className='text-sm text-destructive'>{error}</p>}
			{showStatus && statusInfo && (
				<p className={cn('flex items-center gap-1.5 text-xs font-medium', statusInfo.className)}>
					<statusInfo.icon className={cn('h-3.5 w-3.5', statusInfo.spin && 'animate-spin')} />
					{statusInfo.text}
				</p>
			)}
		</div>
	);
};

export const isUsernameReadyToSave = (status, skipAvailabilityCheck = false) => {
	if (skipAvailabilityCheck) return true;
	return ![USERNAME_STATUS.CHECKING, USERNAME_STATUS.TAKEN, USERNAME_STATUS.INVALID].includes(status);
};
