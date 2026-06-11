import { useField } from 'formik';
import { cn } from '@/lib/utils';

export const CheckboxFormik = ({ label, ...props }) => {
	const [field, { error, touched }] = useField({ ...props, type: 'checkbox' });
	const showError = touched && error;

	return (
		<div className='space-y-1'>
			<div className='flex items-start gap-3'>
				<input
					type='checkbox'
					{...field}
					{...props}
					id={props.id || props.name}
					className='mt-1 h-4 w-4 rounded border-input text-primary focus:ring-primary'
				/>
				<label
					htmlFor={props.id || props.name}
					className={cn('text-sm leading-relaxed', showError && 'text-destructive')}
				>
					{label}
				</label>
			</div>
			{showError && <p className='text-sm text-destructive'>{error}</p>}
		</div>
	);
};
