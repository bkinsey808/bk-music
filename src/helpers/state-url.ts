export type PagePropsGeneric = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	searchParams: any;
};

export const setPageParam = <PageProps extends PagePropsGeneric>(
	pageProps: PageProps,
	key: keyof PageProps["params"],
	value: string,
) => {
	const newParams = {
		...pageProps.params,
		[key]: value,
	};

	return newParams;
};

export const setPageSearchParam = <PageProps extends PagePropsGeneric>(
	pageProps: PageProps,
	key: keyof PageProps["searchParams"],
	value: string,
) => {
	const currentSearchParams = pageProps.searchParams;

	const newSearchParams = {
		...currentSearchParams,
		[key]: value,
	};

	if (value === undefined || value === "") {
		delete newSearchParams[key];
	}

	return newSearchParams;
};
