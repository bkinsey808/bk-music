"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect, useMemo, useRef } from "react";

import { DashboardProps, getDashboardUrl } from "@/app/d/dashboard-url";
import { setPageSearchParam } from "@/helpers/state-url";

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
	const router = useRouter();

	const detailsRef = useRef<HTMLDetailsElement>(null);
	const params = dashboardProps.params;
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

			const searchParams = setPageSearchParam(
				dashboardProps,
				"o",
				newOpenSections.join("_"),
			);

			router.push(getDashboardUrl({ params, searchParams }));
		}
	}, [id, params, openSections, dashboardProps, router]);

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
			<summary className="cursor-pointer">{title}</summary>
			{children}
		</details>
	);
}
