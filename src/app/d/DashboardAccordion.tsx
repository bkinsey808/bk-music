"use client";

import { ReactNode } from "react";

import { useDashboardState } from "@/app/d/useDashboardState";
import { Accordion } from "@/features/design-system/Accordion";
import { Section } from "@/features/sections/sections";

export const DashboardAccordion = ({
	title,
	id,
	children,
}: {
	title: ReactNode;
	id: Section;
	children: ReactNode;
}) => {
	const { isAccordionOpen, toggleAccordion } = useDashboardState();

	return (
		<Accordion
			title={title}
			id={id}
			key={id}
			isOpen={isAccordionOpen(id)}
			toggleIsOpen={(open) => toggleAccordion(id, open)}
		>
			{children}
		</Accordion>
	);
};
