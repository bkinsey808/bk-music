"use client";

import { ReactNode, useEffect, useRef } from "react";

export const Accordion = <Section extends string>({
	title,
	id,
	isOpen,
	toggleIsOpen,
	children,
}: {
	title: ReactNode;
	id: Section;
	isOpen: boolean;
	toggleIsOpen: (open?: boolean) => void;
	children: ReactNode;
}) => {
	const detailsRef = useRef<HTMLDetailsElement>(null);

	// open the accordion when the state changes
	useEffect(() => {
		if (detailsRef.current) {
			detailsRef.current.open = isOpen;
		}
	}, [isOpen]);

	return (
		<details id={id} ref={detailsRef} data-open={isOpen}>
			<summary
				className="mb-[0.25rem] flex cursor-pointer flex-row flex-nowrap gap-[0.5rem]"
				onClick={(e) => {
					e.preventDefault();
					toggleIsOpen();

					if (detailsRef.current) {
						detailsRef.current.open = !detailsRef.current.open;
					}
				}}
			>
				<div>
					<div className="transition-all [[data-open='true']>summary>div>&]:rotate-90">
						▶
					</div>
				</div>
				{title}
			</summary>
			{children}
		</details>
	);
};
