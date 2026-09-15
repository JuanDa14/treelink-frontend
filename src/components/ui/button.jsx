import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow-soft hover:brightness-105 hover:shadow-lift hover:-translate-y-0.5',
				destructive: 'bg-destructive text-destructive-foreground shadow-soft hover:brightness-95',
				outline:
					'border border-border bg-card/80 backdrop-blur-sm hover:bg-secondary hover:border-primary/35 shadow-soft',
				secondary: 'bg-secondary text-secondary-foreground hover:brightness-95 shadow-soft',
				ghost: 'rounded-xl hover:bg-secondary',
				link: 'text-primary underline-offset-4 hover:underline rounded-none',
			},
			size: {
				default: 'h-11 px-5 py-2',
				sm: 'h-9 rounded-xl px-3.5 text-xs',
				lg: 'h-12 rounded-xl px-7 text-base',
				icon: 'h-10 w-10 rounded-xl',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	const Comp = asChild ? Slot : 'button';
	return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
