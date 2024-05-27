import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, ...otherProps }, ref) => (
		<input
			ref={ref}
			className={twMerge(
				"w-full rounded-[0.2rem] border-[0.1rem] border-current bg-[var(--background)] p-[0.3rem] px-[0.6rem] text-current",
				className,
			)}
			{...otherProps}
		/>
	),
);
Input.displayName = "Input";
