"use client";

import { ReactNode, useEffect, useRef } from "react";

import { Section } from "../sections/sections";
import { useDashboardState } from "@/app/d/useDashboardState";

export const AccordionItem = ({
	title,
	id,
	children,
}: {
	title: ReactNode;
	id: Section;
	children: ReactNode;
}) => {
	const detailsRef = useRef<HTMLDetailsElement>(null);

	const { isAccordionOpen, toggleAccordion } = useDashboardState();
	const isOpen = isAccordionOpen(id);

	// open the accordion when the state changes
	useEffect(() => {
		if (detailsRef.current) {
			detailsRef.current.open = isOpen;
		}
	}, [isOpen]);

	return (
		<details id={id} ref={detailsRef} data-open={isAccordionOpen(id)}>
			<summary
				className="mb-[0.25rem] flex cursor-pointer flex-row flex-nowrap gap-[0.5rem]"
				onClick={(e) => {
					e.preventDefault();
					toggleAccordion(id);

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
