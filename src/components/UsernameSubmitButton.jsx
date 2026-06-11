import { useFormikContext } from 'formik';

import { Button } from '@/components/ui/button';
import { useUsernameAvailability } from '../hooks/useUsernameAvailability';
import { isUsernameReadyToSave } from './UsernameField';

export const UsernameSubmitButton = ({
	currentUsername = '',
	children,
	className,
	...props
}) => {
	const { values, isSubmitting } = useFormikContext();
	const skipCheck = Boolean(values.usernameTrusted);
	const { status } = useUsernameAvailability(values.username, currentUsername, {
		enabled: !skipCheck,
	});
	const usernameOk = isUsernameReadyToSave(status, skipCheck);

	return (
		<Button
			type='submit'
			disabled={isSubmitting || !usernameOk}
			className={className}
			{...props}
		>
			{isSubmitting ? props.loadingLabel || 'Guardando...' : children}
		</Button>
	);
};
