import { ReactNode } from "react";

export const PageColumn = ({ children }: { children: ReactNode }) => {
	// vertically scrollable, styled with tailwind
	return <div className="max-h-screen overflow-y-auto">{children}</div>;
};
