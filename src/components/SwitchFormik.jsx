import { useField } from 'formik';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export const SwitchFormik = ({ name, label, description }) => {
	const [field, , helpers] = useField({ name, type: 'checkbox' });

	return (
		<div className='flex items-center justify-between gap-4 rounded-2xl border border-border/80 bg-secondary/50 px-4 py-3 shadow-soft'>
			<div className='space-y-0.5'>
				<Label htmlFor={name} className='text-sm font-semibold cursor-pointer'>
					{label}
				</Label>
				{description && <p className='text-xs text-muted-foreground'>{description}</p>}
			</div>
			<Switch
				id={name}
				checked={Boolean(field.value)}
				onCheckedChange={(checked) => helpers.setValue(checked)}
				className={cn(field.value && 'bg-primary')}
			/>
		</div>
	);
};
