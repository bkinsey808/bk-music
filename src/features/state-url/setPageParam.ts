import { PagePropsGeneric } from "./types";

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
