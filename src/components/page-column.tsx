import { ReactNode } from "react";

export const PageColumn = ({ children }: { children: ReactNode }) => {
	// vertically scrollable, styled with tailwind
	return <div className="h-full max-w-[50rem] overflow-y-auto">{children}</div>;
};
