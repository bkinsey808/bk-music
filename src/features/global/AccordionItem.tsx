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

	const { isAccordionOpen, toggleAccordion } = useDashboardState();

	const handleToggle = useCallback(async () => {
		toggleAccordion(id);
	}, [id, toggleAccordion]);
	const details = detailsRef.current;
	const accordionOpen = isAccordionOpen(id);

	// add listener to details element to update query params
	useEffect(() => {
		if (!details) {
			return;
		}

		(async () => {
			details.open = accordionOpen;

			// wait long enough so that setting the open attribute doesn't trigger the toggle event
			await new Promise((resolve) => setTimeout(resolve, 0));

			details.addEventListener("toggle", handleToggle);
		})();

		return () => {
			details.removeEventListener("toggle", handleToggle);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [details, handleToggle, id]);

	return (
		<details id={id} ref={detailsRef} data-open={accordionOpen}>
			<summary
				className="mb-[0.75rem] flex cursor-pointer flex-row
       flex-nowrap gap-[0.5rem]"
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
