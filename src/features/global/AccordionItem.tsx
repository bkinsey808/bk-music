"use client";

import { ReactNode, useCallback, useEffect, useRef } from "react";

import { useDashboardState } from "@/app/d/useDashboardState";

export const AccordionItem = ({
	title,
	id,
	children,
}: {
	title: ReactNode;
	id: string;
	children: ReactNode;
}) => {
	const detailsRef = useRef<HTMLDetailsElement>(null);

	const { accordionOpen, toggleAccordion } = useDashboardState();

	const handleToggle = useCallback(async () => {
		toggleAccordion(id);
	}, [id, toggleAccordion]);
	const details = detailsRef.current;

	// add listener to details element to update query params
	useEffect(() => {
		if (!details) {
			return;
		}

		(async () => {
			details.open = accordionOpen(id);

			await new Promise((resolve) => setTimeout(resolve, 0));

			details.addEventListener("toggle", handleToggle);
		})();

		return () => {
			details.removeEventListener("toggle", handleToggle);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [details, handleToggle, id]);

	return (
		<details id={id} ref={detailsRef}>
			<summary className="mb-[0.75rem] cursor-pointer">{title}</summary>
			{children}
		</details>
	);
};
