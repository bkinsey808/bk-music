import { ReactNode } from "react";

export const PageColumn = ({ children }: { children: ReactNode }) => {
	// vertically scrollable, styled with tailwind
	return (
		<div className="mb-[3rem] flex max-h-screen flex-col gap-[3rem] overflow-y-auto px-[0.5rem]">
			{children}
		</div>
	);
};
