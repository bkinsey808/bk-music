"use client";

import { ReactNode, useCallback, useEffect, useMemo, useRef } from "react";

import { DashboardProps } from "@/app/d/[tuning]/[keyScale]/[chord]/page";
import { useDashboardURL } from "@/app/d/use-dashboard-url";

export default function AccordionItem({
	title,
	id,
	dashboardProps,
	children,
}: {
	title: string;
	id: string;
	dashboardProps: DashboardProps;
	children: ReactNode;
}) {
	const detailsRef = useRef<HTMLDetailsElement>(null);
	const { o } = dashboardProps.searchParams;
	const openSections = useMemo(() => (o ? o.split("_") : []), [o]);
	const { setURL, setSearchParams } = useDashboardURL();

	// set initial state of details element based on query params
	useEffect(() => {
		const details = detailsRef.current;
		if (details) {
			details.open = openSections.some((section) => section === id);
		}
	}, [id, openSections]);

	const handleToggle = useCallback(() => {
		const details = detailsRef.current;
		if (details) {
			const newOpenSections = details.open
				? Array.from(new Set([...openSections, id]))
				: openSections.filter((section) => section !== id);

			console.log({ newOpenSections });

			const searchParams = setSearchParams("o", newOpenSections.join("_"));

			setURL({ searchParams });
		}
	}, [id, openSections, setURL, setSearchParams]);

	// add listener to details element to update query params
	useEffect(() => {
		const details = detailsRef.current;
		if (details) {
			details.addEventListener("toggle", handleToggle);

			return () => {
				details.removeEventListener("toggle", handleToggle);
			};
		}
	}, [handleToggle, detailsRef]);

	return (
		<details id={id} ref={detailsRef}>
			<summary>{title}</summary>
			{children}
		</details>
	);
}
