"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect, useMemo, useRef } from "react";

import { PagePropsGeneric } from "../state-url/types";
import { setPageSearchParam } from "@/features/state-url/setPageSearchParam";

export function AccordionItem<PageProps extends PagePropsGeneric>({
	title,
	id,
	pageProps,
	getPageUrl,
	children,
}: {
	title: string;
	id: string;
	pageProps: PageProps;
	getPageUrl: (pageProps: PageProps) => string;
	children: ReactNode;
}) {
	const router = useRouter();

	const detailsRef = useRef<HTMLDetailsElement>(null);
	const params: PageProps["params"] = pageProps.params;
	const { o } = pageProps.searchParams;
	const openSections: string[] = useMemo(() => (o ? o.split("_") : []), [o]);

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
				pageProps,
				"o",
				newOpenSections.join("_"),
			);

			router.push(getPageUrl({ params, searchParams } as PageProps));
		}
	}, [id, params, openSections, pageProps, router, getPageUrl]);

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
