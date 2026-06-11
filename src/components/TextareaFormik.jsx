import { useField, useFormikContext } from 'formik';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export const TextareaFormik = ({ text, name, placeholder, rows = 3, classNameText, classNameInput, classNameContainer }) => {
	const { submitCount } = useFormikContext();
	const [{ onChange, value, ...fields }, { error, touched }] = useField(name);
	const showError = Boolean(error) && (touched || submitCount > 0);

	return (
		<div className={cn('flex flex-col w-full gap-2', classNameContainer)}>
			{text && (
				<Label htmlFor={name} className={cn(classNameText, showError && 'text-destructive')}>
					{text}
				</Label>
			)}
			<textarea
				{...fields}
				id={name}
				onChange={onChange}
				value={value}
				name={name}
				rows={rows}
				placeholder={placeholder}
				className={cn(
					'flex min-h-[88px] w-full rounded-2xl border-2 border-input bg-background px-4 py-3 text-sm font-medium ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary/40 transition-colors disabled:cursor-not-allowed disabled:opacity-50 resize-none',
					classNameInput,
					showError && 'border-destructive focus-visible:ring-destructive'
				)}
				aria-invalid={showError}
			/>
			{showError && <p className='text-sm text-destructive'>{error}</p>}
		</div>
	);
};
