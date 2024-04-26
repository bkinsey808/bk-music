import { ReactNode } from "react";

export const PageColumn = ({ children }: { children: ReactNode }) => {
	// vertically scrollable, styled with tailwind
	return (
		<div className="mb-[var(--section-gap)] flex flex-col gap-[var(--section-gap)] px-[0.5rem] @[1700px]:max-h-screen @[1700px]:overflow-y-auto">
			{children}
		</div>
	);
};
