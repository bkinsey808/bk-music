import { ReactNode, useContext } from "react";

import { FormContext } from "./Form";

export const Field = ({
	fieldKey,
	label,
	checkbox = false,
	children,
}: {
	fieldKey: string;
	label: string;
	checkbox?: boolean;
	children: ReactNode;
}) => {
	const { errors, messageMap } = useContext(FormContext);
	return (
		<label>
			{!checkbox ? <FieldLabel>{label}</FieldLabel> : null}
			<FieldMessages messages={messageMap[fieldKey]} />
			<div className="flex gap-[1rem] align-baseline">
				{children}
				{checkbox ? <FieldLabel>{label}</FieldLabel> : null}
			</div>
			<FieldError error={errors[fieldKey]} />
		</label>
	);
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
