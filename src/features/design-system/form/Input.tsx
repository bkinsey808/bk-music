import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const Input = forwardRef<
	HTMLInputElement,
	InputHTMLAttributes<HTMLInputElement>
>(({ className, onBlur, ...otherProps }, ref) => (
	<input
		ref={ref}
		className={twMerge(
			"w-full rounded-[0.2rem]  border-transparent bg-[var(--background)] p-[0.3rem] px-[0.6rem] text-current focus:border-transparent focus:outline-none focus:ring-0 [&[type='checkbox']]:h-[1.5rem] [&[type='checkbox']]:w-[1.5rem]",
			className,
		)}
		onBlur={(e) => {
			e.target.value = e.target.value.trim();
			onBlur?.(e);
		}}
		{...otherProps}
	/>
));
Input.displayName = "Input";
