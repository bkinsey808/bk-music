import { PagePropsGeneric } from "./types";

export const setPageSearchParam = <PageProps extends PagePropsGeneric>(
	pageProps: PageProps,
	key: keyof PageProps["searchParams"],
	value: string,
) => {
	const currentSearchParams = pageProps.searchParams;

	const newSearchParams: PageProps["searchParams"] = {
		...currentSearchParams,
		[key]: value,
	};

	if (value === undefined || value === "") {
		delete newSearchParams[key];
	}

	return newSearchParams;
};
