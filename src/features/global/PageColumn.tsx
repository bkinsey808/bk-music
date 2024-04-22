import { ReactNode } from "react";

export const PageColumn = ({ children }: { children: ReactNode }) => {
	// vertically scrollable, styled with tailwind
	return (
		<div className="mb-[3rem] flex flex-col gap-[3rem] px-[0.5rem] @[1700px]:max-h-screen @[1700px]:overflow-y-auto">
			{children}
		</div>
	);
};
