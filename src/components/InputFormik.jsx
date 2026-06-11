import { useField } from 'formik';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export const InputFormik = ({ text, name, type, placeholder, classNameText, classNameInput, classNameContainer }) => {
	const [{ onChange, value, ...fields }, { error, touched }] = useField(name);
	const showError = touched && error;

	return (
		<div className={cn('flex flex-col w-full gap-2', classNameContainer)}>
			{text && (
				<Label htmlFor={name} className={cn(classNameText, showError && 'text-destructive')}>
					{text}
				</Label>
			)}
			<Input
				{...fields}
				id={name}
				onChange={onChange}
				value={value}
				name={name}
				type={type}
				placeholder={placeholder}
				className={cn(classNameInput, showError && 'border-destructive focus-visible:ring-destructive')}
				aria-invalid={showError}
			/>
			{showError && <p className='text-sm text-destructive'>{error}</p>}
		</div>
	);
};
