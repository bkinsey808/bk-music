import { ReactNode } from "react";

export const Field = ({ children }: { children: ReactNode }) => {
	return <label>{children}</label>;
};

export const FieldLabel = ({ children }: { children: ReactNode }) => {
	return (
		<span className="font-bold text-[var(--color-text-secondary)]">
			{children}
		</span>
	);
};

export const FieldMessages = ({ messages }: { messages: string[] }) => {
	return (
		<ul>
			{messages.map((message, i) => (
				<li key={i} className="list-inside list-disc">
					{message}
				</li>
			))}
		</ul>
	);
};

export const FieldError = ({ error }: { error: string }) => {
	return error ? <p className="text-[var(--color-error)]">{error}</p> : null;
};
