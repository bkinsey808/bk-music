"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect, useMemo, useRef } from "react";

import { DashboardProps } from "@/app/d/[tuning]/[keyScale]/[chord]/page";

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
	const router = useRouter();
	const { o } = dashboardProps.searchParams;
	const openSections = useMemo(() => (o ? o.split("_") : []), [o]);

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

			const newParams: Partial<DashboardProps["searchParams"]> = {
				...dashboardProps.searchParams,
				o: newOpenSections.join("_"),
			};

			if (newParams.o === "") {
				delete newParams.o;
			}

			const newParamsString = new URLSearchParams(newParams).toString();

			const newURL = `/d/${dashboardProps.params.tuning}/${dashboardProps.params.keyScale}/${dashboardProps.params.chord}?${newParamsString}`;

			router.push(newURL);
		}
	}, [id, openSections, router, dashboardProps]);

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
