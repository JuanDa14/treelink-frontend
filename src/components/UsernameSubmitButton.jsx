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
	const { status } = useUsernameAvailability(values.username, currentUsername);
	const usernameOk = isUsernameReadyToSave(status);

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
